"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Persisted rather than session-scoped: a returning visitor has already made
// this declaration, so re-asking on every visit is noise rather than diligence.
const STORAGE_KEY = "research_use_confirmed";
// Set on <html> by the inline script in the root layout, before anything
// paints. CSS keys off it to hide this screen for a returning visitor, so
// neither party sees a flash of the other's view.
const READY_CLASS = "rc-ok";

export function AgeVerificationGate() {
  // Rendered by default, on the server too, so the very first paint is this
  // screen and never the site behind it. The inline script has already hidden
  // it via CSS for anyone who previously confirmed.
  const [dismissed, setDismissed] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);

  useEffect(() => {
    try {
      // Already confirmed: drop it from the DOM. CSS hid it before paint, so
      // this is cleanup rather than a visible change.
      if (localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {
      // Private mode with storage disabled — keep the gate up rather than skip it.
    }
  }, []);

  if (dismissed) return null;

  const bothConfirmed = isAdult && isResearcher;

  function enterSite() {
    if (!bothConfirmed) return;
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // Storage unavailable — let them through for this visit regardless.
    }
    // Adding the class both hides this screen and releases the scroll lock,
    // which are the two things the stylesheet keys off.
    document.documentElement.classList.add(READY_CLASS);
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-heading"
      className="research-gate fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background p-4"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-10">
        <div className="flex justify-center">
          <Image src="/logo-icon.png" alt="Defcon Peptides" width={56} height={56} className="h-12 w-12" priority />
        </div>

        <h2
          id="age-gate-heading"
          className="mt-5 text-center font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
        >
          For research use <span className="text-brand">only.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted">
          Products on this site are sold exclusively for laboratory research. They are not for human
          consumption, medical, veterinary, or any in-vivo use.
        </p>

        <div className="mt-7 space-y-3">
          <Confirmation checked={isAdult} onChange={setIsAdult}>
            I confirm that I am <strong className="font-semibold text-ink">18 years of age or older</strong>.
          </Confirmation>

          <Confirmation checked={isResearcher} onChange={setIsResearcher}>
            I acknowledge that all products are sold strictly for{" "}
            <strong className="font-semibold text-ink">in vitro laboratory research purposes only</strong>. I
            understand they are not for human or veterinary use or consumption, and I agree to comply with all
            applicable laws and these Terms.
          </Confirmation>
        </div>

        <button
          type="button"
          onClick={enterSite}
          disabled={!bothConfirmed}
          className={`mt-7 w-full rounded-full py-4 text-base font-bold transition ${
            bothConfirmed
              ? "bg-brand text-white hover:bg-brand-dark"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          Enter site
        </button>

        <p className="mt-5 text-center text-xs text-muted">
          <a href="/terms-of-service" className="underline underline-offset-2 hover:text-brand">
            Terms of Service
          </a>
          <span className="mx-2">·</span>
          <a href="/disclaimer" className="underline underline-offset-2 hover:text-brand">
            Research Use Disclaimer
          </a>
        </p>
      </div>
    </div>
  );
}

/** A full-width tick row — the whole box is the target, not just the circle. */
function Confirmation({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
        checked ? "border-brand bg-brand-light" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          checked ? "border-brand bg-brand text-white" : "border-gray-300 bg-white"
        }`}
      >
        {checked && (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-sm leading-relaxed text-muted">{children}</span>
    </label>
  );
}
