const FEATURES = [
  {
    icon: "🕑",
    title: "Express Shipping Australia Wide",
    body: "Orders placed before 2pm ship the same business day, sent express with tracking. Most deliveries arrive in 1–3 business days.",
  },
  {
    icon: "🛡️",
    title: "High-Quality Products",
    body: "Every item is checked for quality and consistency before it ships, with reliable supply and clean, accurate labelling.",
  },
  {
    icon: "📈",
    title: "Lowest Prices Guaranteed",
    body: "We aim to offer the strongest value around. Find a lower like-for-like price and we'll do our best to beat it.",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-2xl text-white shadow-md">
              {f.icon}
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-ink">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
