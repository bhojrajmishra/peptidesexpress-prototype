// Static marquee content — the prototype has no backend, so this list
// replaces the old /api/announcements fetch. Edit this array to change
// what scrolls in the bar.
const MESSAGES = [
  "Free shipping on all orders over $150",
  "Certificate of Analysis on every batch",
  "Research grade quality",
  "Secure checkout",
  "99% purity guaranteed",
];

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function AnnouncementBar() {
  const track = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {MESSAGES.map((m, i) => (
        <span
          key={i}
          className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-white sm:text-sm"
        >
          <CheckIcon />
          {m}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-brand py-2.5">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track}
        {track}
      </div>
    </div>
  );
}
