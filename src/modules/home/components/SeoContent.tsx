const PARAGRAPHS = [
  "Replace this block with your own SEO and brand copy. Introduce who you are, what you sell, and the audience you serve. Keep the opening paragraph focused on your core value proposition.",
  "Use the following paragraphs to describe your product range, the categories you cover, and what makes your offering distinct. Write naturally for real readers first and search engines second.",
  "Explain your quality standards, sourcing, or process here. Specifics build trust — describe what buyers can actually expect when they order from you.",
  "Close with a summary of why customers choose you: fast dispatch, reliable support, strong value, or whatever your real differentiators are.",
];

export function SeoContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-6 font-display text-3xl font-bold text-ink">About Defcon Peptides</h2>
      <div className="space-y-5 text-[15px] leading-relaxed text-muted">
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
