"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Persisted rather than session-scoped: a returning visitor has already made
// this declaration, so re-asking on every visit is noise rather than diligence.
const STORAGE_KEY = "research_use_confirmed";

export function AgeVerificationGate() {
  // Start hidden and decide on mount — reading localStorage during render
  // would mismatch the server-rendered HTML and flash the gate for everyone.
  const [visible, setVisible] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Private mode with storage disabled — show the gate rather than skip it.
      setVisible(true);
    }
  }, []);

  // Hold the page still while the gate is up, so the content behind it can't
  // be scrolled or read past the overlay.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  const bothConfirmed = isAdult && isResearcher;

  function enterSite() {
    if (!bothConfirmed) return;
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // Storage unavailable — let them through for this visit regardless.
    }
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-heading"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-10">
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
            I am at least <strong className="font-semibold text-ink">18 years of age</strong>.
          </Confirmation>

          <Confirmation checked={isResearcher} onChange={setIsResearcher}>
            I confirm I am a <strong className="font-semibold text-ink">qualified researcher</strong> purchasing
            for <strong className="font-semibold text-ink">in-vitro / laboratory research</strong> only — not for
            human or veterinary use.
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
