"use client";
import { useEffect, useState } from "react";

const SETTINGS = {
  title: "Get 10% Off Your First Order",
  description: "Sign up for research updates and exclusive discount codes.",
  button_text: "Get My Code",
  delay_seconds: 8,
  auto_dismiss_seconds: 20,
};

const SESSION_KEY = "popup_dismissed";

export function PopupModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      if (SETTINGS.auto_dismiss_seconds > 0) {
        setCountdown(SETTINGS.auto_dismiss_seconds);
      }
    }, SETTINGS.delay_seconds * 1000);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-dismiss countdown tick
  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown === 1) dismiss();
      else setCountdown(c => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [visible, countdown]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(dismiss, 2000);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Auto-dismiss countdown */}
        {countdown > 0 && (
          <div className="absolute right-10 top-4 text-xs text-gray-400">
            closes in {countdown}s
          </div>
        )}

        {submitted ? (
          <div className="py-6 text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-3 font-display text-lg font-bold text-ink">You&apos;re subscribed!</p>
            <p className="mt-1 text-sm text-muted">Check your email for your 10% discount code.</p>
          </div>
        ) : (
          <>
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
              <svg className="h-7 w-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-center font-display text-2xl font-extrabold text-ink">
              {SETTINGS.title}
            </h2>
            <p className="mt-3 text-center text-sm leading-relaxed text-muted">
              {SETTINGS.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand/20"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white hover:bg-brand-dark transition"
              >
                {SETTINGS.button_text}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-muted">
              By signing up, you agree to receive marketing emails. View our{" "}
              <a href="/privacy-policy" className="underline hover:text-brand">privacy policy</a>
              {" "}and{" "}
              <a href="/terms-of-service" className="underline hover:text-brand">terms of service</a>
              {" "}for more info.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
