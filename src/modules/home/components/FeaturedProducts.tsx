"use client";
import { useRef } from "react";
import { Product } from "@/modules/products/types";
import { ProductCard } from "@/modules/products/components/ProductCard";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  }

  return (
    <section className="py-16">
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-ink">Top Picks</h2>
          <p className="mt-2 text-sm text-muted">Best Sellers · Our most trusted research peptides</p>
          <a
            href="/products"
            className="mt-5 inline-flex items-center rounded-full border border-ink px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white"
          >
            View All
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-ink transition hover:border-ink"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-ink transition hover:border-ink"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pl-[max(1rem,calc((100vw-1280px)/2+1rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p, i) => (
          <div key={p.id} className="w-64 shrink-0 sm:w-72">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
