"use client";
import { useMemo, useState } from "react";
import { Product } from "../types";
import { Category } from "@/modules/categories/types";
import { ProductCard } from "./ProductCard";
import { TagIcon } from "@/shared/components/TagIcon";

type StockFilter = "all" | "in_stock" | "out_of_stock";
type SortKey = "name_asc" | "name_desc" | "price_asc" | "price_desc";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export function ProductsPageClient({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [sort, setSort] = useState<SortKey>("name_asc");

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (categorySlug !== "all") {
      list = list.filter((p) => p.category_slug === categorySlug);
    }

    if (stockFilter === "in_stock") {
      list = list.filter((p) => p.stock_status === "in_stock");
    } else if (stockFilter === "out_of_stock") {
      list = list.filter((p) => p.stock_status !== "in_stock");
    }

    list.sort((a, b) => {
      if (sort === "name_asc") return a.name.localeCompare(b.name);
      if (sort === "name_desc") return b.name.localeCompare(a.name);
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

    return list;
  }, [products, search, categorySlug, stockFilter, sort]);

  return (
    <>
      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand"
          />
        </div>

        {/* Stock filter */}
        <div className="flex rounded-lg border border-gray-200 text-sm font-medium overflow-hidden">
          {(["all", "in_stock", "out_of_stock"] as StockFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStockFilter(s)}
              className={`px-4 py-2.5 transition ${
                stockFilter === s
                  ? "bg-brand text-white"
                  : "bg-white text-ink hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : s === "in_stock" ? "In Stock" : "Out of Stock"}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative min-w-[180px] ml-auto">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 12h12M9 17h6" />
          </svg>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-8 text-sm outline-none focus:border-brand"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setCategorySlug("all")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            categorySlug === "all" ? "bg-brand text-white" : "bg-gray-100 text-ink hover:bg-gray-200"
          }`}
        >
          See All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategorySlug(c.slug)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              categorySlug === c.slug ? "bg-brand text-white" : "bg-gray-100 text-ink hover:bg-gray-200"
            }`}
          >
            <TagIcon className="h-4 w-4" />
            {c.name}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="mb-4 text-sm text-muted">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted">
          No products match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
