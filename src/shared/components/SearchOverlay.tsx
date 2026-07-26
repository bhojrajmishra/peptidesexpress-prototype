"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { search } from "@/modules/search/services/search.service";
import { SearchResults } from "@/modules/search/types";

const EMPTY: SearchResults = { products: [], blog: [], faqs: [] };
const DEBOUNCE_MS = 300;

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Autofocus + reset on open
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setResults(EMPTY);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Debounced live search, cancelling any in-flight request from a stale keystroke
  useEffect(() => {
    if (!query.trim()) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }

    setLoading(true);
    const t = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      search(query, controller.signal)
        .then((data) => setResults(data))
        .catch((err) => { if (err.name !== "AbortError") setResults(EMPTY); })
        .finally(() => setLoading(false));
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [query]);

  if (!open) return null;

  const hasQuery = query.trim().length >= 2;
  const hasResults = results.products.length > 0 || results.blog.length > 0 || results.faqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div data-testid="search-overlay" className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, blog posts, FAQs…"
            className="flex-1 text-sm text-ink outline-none placeholder:text-gray-400"
          />
          <button onClick={onClose} aria-label="Close search" className="text-gray-400 hover:text-gray-600 transition">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[70vh] overflow-y-auto">
          {!hasQuery ? (
            <p className="px-5 py-10 text-center text-sm text-muted">Start typing to search the store.</p>
          ) : loading ? (
            <p className="px-5 py-10 text-center text-sm text-muted">Searching…</p>
          ) : !hasResults ? (
            <p className="px-5 py-10 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo;.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {results.products.length > 0 && (
                <section className="px-5 py-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Products</h3>
                  <ul className="space-y-1">
                    {results.products.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50 transition"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image_url} alt={p.name} className="h-10 w-10 shrink-0 rounded-lg border border-gray-100 object-contain p-1" />
                          <span className="flex-1 text-sm font-medium text-ink">{p.name}</span>
                          <span className="text-sm font-semibold text-ink">${Number(p.price).toFixed(2)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.blog.length > 0 && (
                <section className="px-5 py-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Blog</h3>
                  <ul className="space-y-1">
                    {results.blog.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={`/blog/${b.slug}`}
                          onClick={onClose}
                          className="block rounded-lg px-2 py-2 hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-ink">{b.title}</p>
                          {b.excerpt && <p className="mt-0.5 line-clamp-1 text-xs text-muted">{b.excerpt}</p>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.faqs.length > 0 && (
                <section className="px-5 py-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">FAQs</h3>
                  <ul className="space-y-1">
                    {results.faqs.map((f) => (
                      <li key={f.id}>
                        <Link
                          href="/#faqs"
                          onClick={onClose}
                          className="block rounded-lg px-2 py-2 hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-ink">{f.question}</p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted">{f.answer}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
