"use client";
import { useState } from "react";
import { Category } from "../types";
import { Product } from "@/modules/products/types";
import { ProductCard } from "@/modules/products/components/ProductCard";
import { TagIcon } from "@/shared/components/TagIcon";

export function CategoryGrid({ categories, products }: { categories: Category[]; products: Product[] }) {
  const [selected, setSelected] = useState("all");

  if (categories.length === 0) return null;

  const filtered = selected === "all" ? products : products.filter((p) => p.category_slug === selected);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-10 text-center font-display text-3xl font-bold text-ink">
        Explore by Category
      </h2>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelected("all")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            selected === "all" ? "bg-brand text-white" : "bg-brand-light text-brand-dark hover:bg-brand hover:text-white"
          }`}
        >
          See All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.slug)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              selected === c.slug ? "bg-brand text-white" : "bg-brand-light text-brand-dark hover:bg-brand hover:text-white"
            }`}
          >
            <TagIcon className="h-4 w-4" />
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">No products in this category yet.</p>
      )}
    </section>
  );
}
