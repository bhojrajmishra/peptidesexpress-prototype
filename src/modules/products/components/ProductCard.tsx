"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "../types";
import { StockBadge } from "./StockBadge";
import { useCart } from "@/modules/cart/context/CartContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const price = Number(product.price);
  const compareAtPrice = product.compare_at_price != null ? Number(product.compare_at_price) : null;
  const onSale = Boolean(product.is_on_sale);
  const restocking = product.stock_status === "restocking";
  const soldOut = product.stock_status === "out_of_stock";
  const disabled = restocking || soldOut;
  const variant = product.variants[variantIdx];
  const unitPrice = Number(variant?.price) || price;
  const displayImage = variant?.image_url || product.image_url;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image_url: product.image_url,
      variantLabel: variant?.label ?? "",
      price: unitPrice,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-500 animate-fade-in-up hover:shadow-lg"
      style={{ animationDelay: `${Math.min(index, 10) * 60}ms` }}
    >
      <Link href={`/products/${product.slug}`} className="relative block">
        {onSale && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            On Sale
          </span>
        )}
        <div className="aspect-[4/5] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display text-sm font-semibold text-ink hover:text-brand sm:text-base">{product.name}</h3>
          </Link>
          <div className="shrink-0 text-right">
            {product.variants.length > 0 && <p className="text-xs text-muted">From</p>}
            {onSale && compareAtPrice != null && (
              <p className="text-xs text-gray-400 line-through">${compareAtPrice.toFixed(2)}</p>
            )}
            <p className="text-base font-bold text-ink sm:text-lg">${unitPrice.toFixed(2)}</p>
          </div>
        </div>

        {product.subtitle && <p className="mt-1 text-xs italic text-muted sm:text-sm">{product.subtitle}</p>}

        {/* mt-auto pins this row to the bottom of the card, so the stock badge
            and size control line up across a row of cards whose titles and
            subtitles run to different numbers of lines. */}
        <div className="mt-auto flex min-h-[2rem] flex-wrap items-center justify-between gap-2 pt-3">
          <div className="flex items-center gap-2">
            {product.badge && (
              <span className="rounded bg-brand-light px-2 py-1 text-xs font-medium text-brand">{product.badge}</span>
            )}
            <StockBadge status={product.stock_status} />
          </div>

          {product.variants.length > 0 && (
            <label className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              Size
              <select
                value={variantIdx}
                onChange={(e) => setVariantIdx(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-normal text-ink outline-none focus:border-brand"
              >
                {product.variants.map((v, i) => (
                  <option key={i} value={i}>{v.label}</option>
                ))}
              </select>
            </label>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={disabled}
          className={`mt-3 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
            added
              ? "bg-green-600 text-white"
              : disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-brand text-white hover:bg-brand-dark"
          }`}
        >
          {added ? (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Added!
            </>
          ) : soldOut ? "Sold Out" : restocking ? (
            "Restock In Progress"
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6M17 13l1.4 5.6M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zm8 0a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
