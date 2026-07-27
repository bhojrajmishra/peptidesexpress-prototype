"use client";
import { useState } from "react";
import { STATIC_FAQS, FAQ_CATEGORIES } from "../data/static-faqs";

const TRANSITION_MS = 200;

export function FAQ() {
  const [category, setCategory] = useState("All Questions");
  const [displayCategory, setDisplayCategory] = useState("All Questions");
  const [isSwitching, setIsSwitching] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const faqs =
    displayCategory === "All Questions" ? STATIC_FAQS : STATIC_FAQS.filter((f) => f.category === displayCategory);

  function selectCategory(cat: string) {
    if (cat === category) return;
    setCategory(cat);
    setIsSwitching(true);
    setOpen(null);
    setTimeout(() => {
      setDisplayCategory(cat);
      setIsSwitching(false);
    }, TRANSITION_MS);
  }

  return (
    <section id="faqs" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 font-display text-3xl font-bold text-ink">FAQ</h2>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => selectCategory("All Questions")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              category === "All Questions" ? "bg-brand text-white" : "border border-gray-300 text-ink hover:border-brand"
            }`}
          >
            All Questions
          </button>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === cat ? "bg-brand text-white" : "border border-gray-300 text-ink hover:border-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          key={displayCategory}
          className={`space-y-4 transition-opacity duration-200 ${isSwitching ? "opacity-0" : "animate-fade-in-up opacity-100"}`}
        >
          {faqs.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-ink"
                  aria-expanded={isOpen}
                >
                  {f.question}
                  <span
                    className={`shrink-0 text-xl leading-none text-muted transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <div className="px-6 pb-5 text-sm leading-relaxed text-muted">{f.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
