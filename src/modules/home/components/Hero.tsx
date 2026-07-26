import Link from "next/link";

function Star() {
  return (
    <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.02 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-light">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-16 md:grid-cols-2 md:items-center">
        <div className="pb-8 md:py-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span className="text-sm font-medium text-muted">Trusted by 10,000+ Researchers</span>
          </div>

          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Peptides, done
            <span className="block">right.</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-muted">
            No guesswork. No shortcuts. Just verified research compounds.
          </p>

          <Link
            href="/products"
            className="mt-9 inline-flex w-fit items-center rounded-full bg-brand px-9 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
          >
            Explore All
          </Link>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-vials-2.jpg"
          alt="Defcon Peptides research vials"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </section>
  );
}
