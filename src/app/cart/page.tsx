"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { useCart } from "@/modules/cart/context/CartContext";

const RESEARCH_PURPOSES = [
  "Academic or Institutional Research",
  "Private Laboratory Research",
  "Pharmaceutical Research",
  "Analytical Chemistry",
  "Other Scientific Research",
];

const FREE_SHIPPING_THRESHOLD = 200;
const FLAT_SHIPPING = 15;

function TrashIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart();
  const [researchPurpose, setResearchPurpose] = useState(RESEARCH_PURPOSES[0]);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-24 text-center">
          <svg className="mx-auto h-20 w-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6M17 13l1.4 5.6M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zm8 0a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/products" className="mt-6 inline-block rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition">
            Browse Products
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-20">
        <h1 className="mb-8 font-display text-3xl font-bold text-ink">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ── Cart items ── */}
          <div className="space-y-4">
            {items.map((item) => {
              const lineTotal = +(item.price * item.quantity).toFixed(2);
              const lineOriginal = item.originalPrice
                ? +(item.originalPrice * item.quantity).toFixed(2)
                : null;

              return (
                <div key={item.id} className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  {/* Image */}
                  <Link href={`/products/${item.slug}`} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-24 w-24 rounded-xl object-contain bg-gray-50 p-2"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.slug}`} className="font-display font-bold text-ink hover:text-brand transition">
                          {item.name}
                        </Link>
                        {item.variantLabel && (
                          <p className="mt-0.5 text-sm text-muted">
                            {item.variantLabel.replace(/ - \$[\d.]+/, "")}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-muted">
                          ${item.price.toFixed(2)} per vial
                        </p>
                        {item.discountLabel && (
                          <p className="mt-1 text-xs font-semibold text-brand">
                            {item.discountLabel}
                          </p>
                        )}
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    {/* Qty + line total */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-ink transition"
                        >
                          -
                        </button>
                        <span className="min-w-[2.5rem] text-center text-sm font-semibold text-ink border-x border-gray-200 py-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-ink transition"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-ink">${lineTotal.toFixed(2)}</p>
                        {lineOriginal && lineOriginal > lineTotal && (
                          <p className="text-sm text-gray-400 line-through">${lineOriginal.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ── */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>

            {/* Subtotal + Shipping */}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-ink"}`}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Free Express Shipping on orders over ${FREE_SHIPPING_THRESHOLD}
                <br />
                ${FLAT_SHIPPING} Express Shipping on orders under ${FREE_SHIPPING_THRESHOLD}
              </p>
            </div>

            {/* Research Purpose */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <label className="text-sm font-semibold text-ink">
                Research Purpose <span className="text-red-500">*</span>
              </label>
              <select
                value={researchPurpose}
                onChange={(e) => setResearchPurpose(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
              >
                {RESEARCH_PURPOSES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                By completing this purchase, you confirm that you are 18 years of age or older,
                that you operate a registered business, research institution, or analytical
                facility, and that this order is for legitimate research or analytical purposes
                in accordance with all applicable laws.
              </p>
            </div>

            {/* Total */}
            <div className="mt-5 border-t border-gray-100 pt-4 flex justify-between">
              <span className="font-bold text-ink">Total</span>
              <span className="text-xl font-bold text-ink">${total.toFixed(2)}</span>
            </div>

            {/* Discount code */}
            <div className="mt-4 rounded-xl border border-brand/20 bg-brand-light p-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <p className="text-sm font-semibold text-ink">Have a discount code?</p>
              </div>
              <p className="mt-1 text-xs text-brand hover:underline cursor-pointer">
                Apply your code at checkout for instant savings on your order.
              </p>
            </div>

            {/* Checkout button */}
            <Link href="/checkout" className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand py-4 text-sm font-bold text-white hover:bg-brand-dark transition">
              Proceed to Checkout — ${total.toFixed(2)}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
