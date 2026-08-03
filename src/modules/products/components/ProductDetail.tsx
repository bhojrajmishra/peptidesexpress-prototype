"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import { useCart } from "@/modules/cart/context/CartContext";

const BUNDLES = [
  { label: "Buy One", qty: 1, discount: 0, popular: false },
  { label: "Buy Two", qty: 2, discount: 0.1, popular: true },
  { label: "Buy Three", qty: 3, discount: 0.15, popular: false },
  { label: "Buy Four", qty: 4, discount: 0.2, popular: false },
  { label: "Ten or More", qty: 10, discount: 0.3, popular: false },
];

const FEATURES = [
  "Lyophilised Powder | ≥99% Purity",
  "Express shipping — Orders before 2pm AEST ship same day",
  "For laboratory and scientific research purposes only",
];

function CartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6M17 13l1.4 5.6M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zm8 0a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Gallery arrows: always visible on touch, where there is no hover to reveal them.
const ARROW =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full " +
  "bg-white/90 text-ink shadow-md ring-1 ring-black/5 backdrop-blur transition " +
  "hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand";

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [bundleIdx, setBundleIdx] = useState(1); // "Buy Two" selected by default
  const [imageIdx, setImageIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function selectVariant(i: number) {
    setVariantIdx(i);
    setImageIdx(i);
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image_url: product.image_url,
      variantLabel: product.variants[variantIdx]?.label ?? "",
      price: priceEa,
      originalPrice: +basePrice.toFixed(2),
      discountLabel: bundle.discount > 0 ? `${Math.round(bundle.discount * 100)}% bundle discount` : undefined,
      quantity: bundle.qty,
    });
    setAdded(true);
    // Brief "Added to Cart!" flash so the click feels acknowledged, then on
    // to the cart itself rather than leaving the shopper on the product page.
    setTimeout(() => router.push("/cart"), 500);
  }

  const compareAtPrice = product.compare_at_price != null ? Number(product.compare_at_price) : null;
  const onSale = Boolean(product.is_on_sale);
  const inStock = product.stock_status === "in_stock";
  const restocking = product.stock_status === "restocking";

  // product.price comes back from the API as a string (mysql2 returns
  // DECIMAL columns as strings to avoid float precision loss) — coerce so
  // basePrice.toFixed() below doesn't throw when a product has no variants.
  const basePrice = Number(product.variants[variantIdx]?.price ?? product.price);
  const bundle = BUNDLES[bundleIdx];
  const priceEa = +(basePrice * (1 - bundle.discount)).toFixed(2);
  const priceTotal = +(priceEa * bundle.qty).toFixed(2);
  const originalTotal = +(basePrice * bundle.qty).toFixed(2);

  // thumbnails: one per variant's own image when set, falling back to the main product image
  const thumbnails = product.variants.length > 0
    ? product.variants.map((v) => v.image_url || product.image_url)
    : [product.image_url];

  const mainImage = thumbnails[imageIdx] ?? product.image_url;

  // Arrow navigation wraps around. Where an image belongs to a selectable
  // variant we move the size selection with it, so the price on the right can
  // never disagree with the vial being shown.
  function stepImage(delta: number) {
    const next = (imageIdx + delta + thumbnails.length) % thumbnails.length;
    setImageIdx(next);
    if (next < product.variants.length) setVariantIdx(next);
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-brand"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      {/* Top section: image | purchase panel */}
      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div>
          <div className="group relative overflow-hidden rounded-3xl bg-gray-50">
            {/* The image fills the frame so the parent's overflow-hidden clips it
                to the rounded corners — with object-contain it sits letterboxed
                inside the box instead and the corners still read as square. */}
            <div className="aspect-[4/5] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {thumbnails.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => stepImage(-1)}
                  aria-label="Previous image"
                  className={ARROW + " left-3"}
                >
                  <ChevronIcon dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => stepImage(1)}
                  aria-label="Next image"
                  className={ARROW + " right-3"}
                >
                  <ChevronIcon dir="right" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {thumbnails.length > 1 && (
            <div className="mt-4 flex gap-3">
              {thumbnails.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => selectVariant(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`rounded-xl border-2 p-2 transition ${
                    imageIdx === i ? "border-brand" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-16 w-16 rounded-lg object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase panel */}
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">{product.name}</h1>

          {/* Price row */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-ink">${priceTotal.toFixed(2)}</span>
            {onSale && (
              <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                Sale
              </span>
            )}
            {bundle.discount > 0 && (
              <span className="text-lg text-gray-400 line-through">${originalTotal.toFixed(2)}</span>
            )}
          </div>

          {/* Price per unit */}
          {bundle.qty > 1 && (
            <p className="mt-1 text-sm text-muted">
              Price per vial <span className="font-semibold text-ink">${priceEa.toFixed(2)}</span>
            </p>
          )}

          {/* Stock */}
          <div className="mt-3">
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckIcon /> In Stock
              </span>
            ) : restocking ? (
              <span className="text-sm font-medium text-gray-500">Restock In Progress</span>
            ) : (
              <span className="text-sm font-medium text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Variant / size buttons */}
          {product.variants.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => selectVariant(i)}
                    className={`rounded-lg border-2 px-5 py-2 text-sm font-semibold transition ${
                      variantIdx === i
                        ? "border-ink bg-ink text-white"
                        : "border-gray-200 bg-white text-ink hover:border-gray-400"
                    }`}
                  >
                    {v.label.replace(/ - \$[\d.]+/, "")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bundle & Save */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Bundle &amp; Save</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-2">
              {BUNDLES.map((b, i) => {
                const bEa = +(basePrice * (1 - b.discount)).toFixed(2);
                const bTotal = +(bEa * b.qty).toFixed(2);
                const bOriginal = +(basePrice * b.qty).toFixed(2);
                const isSelected = bundleIdx === i;

                return (
                  <button
                    key={i}
                    onClick={() => setBundleIdx(i)}
                    className={`relative w-full rounded-xl border-2 px-4 py-3 text-left transition ${
                      isSelected ? "border-brand bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {b.popular && (
                      <span className="absolute -top-2 right-3 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-4 w-4 rounded-full border-2 ${
                            isSelected ? "border-brand bg-brand" : "border-gray-300"
                          } flex items-center justify-center`}
                        >
                          {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-ink">{b.label}</span>
                          {b.discount > 0 && (
                            <span className="ml-2 text-sm font-semibold text-green-600">
                              -{Math.round(b.discount * 100)}%
                            </span>
                          )}
                          <p className="text-xs text-muted">${bEa.toFixed(2)}/ea</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-ink">${bTotal.toFixed(2)}</p>
                        {b.discount > 0 && (
                          <p className="text-xs text-gray-400 line-through">${bOriginal.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold transition ${
              added
                ? "bg-green-600 text-white"
                : inStock
                ? "bg-brand text-white hover:bg-brand-dark"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            {added ? (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <CartIcon />
                {inStock ? "Add to Cart" : restocking ? "Restock In Progress" : "Out of Stock"}
              </>
            )}
          </button>

          {/* Feature list */}
          <ul className="mt-6 space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Product Information ── */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">Product Information</h2>

        {(product.subtitle || product.purity) && (
          <p className="mt-2 text-sm font-medium text-muted">
            {product.subtitle && <span className="font-semibold text-ink">{product.name} – {product.subtitle}</span>}
            {product.purity && <span className="ml-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs">{product.purity}</span>}
          </p>
        )}

        {product.description && (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            {product.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
          </div>
        )}

        {product.research_context && (
          <>
            <h3 className="mt-8 font-display text-lg font-bold text-ink">Research Context</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {product.research_context.split("\n\n").map((para, i) => (
                para.startsWith("•") || para.startsWith("-") ? (
                  <ul key={i} className="space-y-1">
                    {para.split("\n").map((line, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                        {line.replace(/^[•\-]\s*/, "")}
                      </li>
                    ))}
                  </ul>
                ) : <p key={i}>{para}</p>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Technical Specifications ── */}
      <div className="mt-12 border-t border-gray-100 pt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Technical Specifications</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/3 px-5 py-3 text-left font-semibold text-ink">Specification</th>
                <th className="px-5 py-3 text-left font-semibold text-ink">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Peptide Name",      product.name],
                ["Purity",           product.purity            || "≥99% (HPLC verified)"],
                ["Appearance",       product.appearance        || null],
                ["Molecular Formula",product.molecular_formula || null],
                ["Molecular Weight", product.molecular_weight  || null],
                ["Amino Acid Length",product.amino_acid_length || null],
                ["Sequence Type",    product.sequence_type     || null],
                ["Solubility",       product.solubility        || null],
                ["Stability",        product.stability         || null],
                ["Form",             product.form_type         || "Freeze-dried (lyophilised) powder"],
                ["Grade",            product.grade             || "Research grade"],
                ["Stock Status",     product.stock_status === "in_stock" ? "In Stock" : product.stock_status === "restocking" ? "Restocking" : "Out of Stock"],
              ].filter(([, v]) => v !== null).map(([spec, detail]) => (
                <tr key={spec} className="even:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-ink">{spec}</td>
                  <td className="px-5 py-3 text-muted">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Storage & Handling ── */}
      <div className="mt-12 border-t border-gray-100 pt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Storage &amp; Handling</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {[
            { bold: "2–8°C for short-term storage.", rest: " Store lyophilised compound at" },
            { bold: "−20°C or below.", rest: " For extended storage, keep at" },
            { bold: "light and moisture.", rest: " Protect from" },
            { bold: "repeated freeze–thaw cycles after reconstitution.", rest: " Avoid" },
            { bold: "laboratory handling procedures.", rest: " Use appropriate" },
            { bold: null, rest: "Proper storage and handling are essential to maintain compound integrity and stability for research applications." },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
              <span>{item.rest}{item.bold && <strong className="text-ink"> {item.bold}</strong>}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Intended Use ── */}
      <div className="mt-12 border-t border-gray-100 pt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Intended Use</h2>
        <div className="mt-4 text-sm leading-relaxed text-muted">
          {product.intended_use ? (
            <p>{product.intended_use}</p>
          ) : (
            <p>This product is strictly for <strong className="text-ink">laboratory and scientific research purposes only</strong>.
            It is not intended for human or animal consumption and is not approved for clinical, medical, or
            diagnostic applications. Purchasers are solely responsible for ensuring compliance with all applicable
            laws in their jurisdiction.</p>
          )}
        </div>
      </div>

      {/* ── Research Use Only disclaimer ── */}
      <div className="mt-12 rounded-2xl border border-brand/30 bg-brand-light p-6">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand">
          Research Use Only
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          All compounds offered are of premium quality and are intended strictly for in vitro laboratory
          research purposes only. These products are not intended for human or animal consumption and are
          not approved for clinical, medical or diagnostic applications. Purchasers are solely responsible
          for ensuring compliance with all applicable laws in their jurisdiction.
        </p>
      </div>
    </div>
  );
}
