"use client";
import { useEffect } from "react";
import { CoaDetail } from "../data/static-coa-details";

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 2v6.5L3.5 19a2 2 0 001.8 3h13.4a2 2 0 001.8-3L15 8.5V2M8 2h8M8 15h8"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-bold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function CoaDetailModal({
  productName,
  detail,
  onClose,
}: {
  productName: string;
  detail: CoaDetail;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10 sm:pt-16">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-ink transition hover:bg-gray-200"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light">
              <FlaskIcon className="h-6 w-6 text-brand" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Third-Party COA — Tested &amp; Verified</h2>
              <p className="text-sm font-semibold text-brand">{detail.labLine}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">
            <BoldText text={detail.summary} />
          </p>

          {detail.sampleInfo && detail.sampleInfo.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink">Sample Information</h3>
              <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
                {detail.sampleInfo.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="text-muted">{row.label}</span>
                    <span className="font-bold text-ink">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detail.sections.map((section) => (
            <div key={section.heading} className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink">{section.heading}</h3>
              <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
                {section.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <div>
                      <p className="text-sm text-ink">{row.label}</p>
                      {row.spec && <p className="text-xs text-muted">Spec: {row.spec}</p>}
                    </div>
                    {row.pass === false ? (
                      <span className="shrink-0 text-right text-sm font-bold text-ink">{row.value}</span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1.5 text-right text-sm font-bold text-green-600">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0" />
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="sr-only">Certificate of analysis for {productName}</p>
        </div>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-ink py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
