"use client";
import { useState } from "react";
import { StaticCertificate } from "../data/static-certificates";
import { getCoaDetail } from "../data/static-coa-details";
import { CoaDetailModal } from "./CoaDetailModal";

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function StaticCertificateCard({ cert }: { cert: StaticCertificate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-500 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light">
            <ShieldCheckIcon className="h-5 w-5 text-brand" />
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-ink">{cert.name}</h3>
            <p className="text-sm text-muted">{cert.dosage}</p>
          </div>
        </div>

        <p className="mt-4">
          <span className="text-2xl font-bold text-brand">{cert.purity}</span>{" "}
          <span className="text-sm text-muted">purity</span>
        </p>

        <p className="mt-2 text-xs text-muted/70">{cert.lab}</p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-auto flex items-center justify-center gap-1.5 border-t border-gray-100 py-3 text-brand/40 transition-colors group-hover:text-brand"
      >
        <ShieldCheckIcon className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold uppercase tracking-wide transition-all group-hover:font-bold">
          View Full COA
        </span>
      </button>

      {open && (
        <CoaDetailModal
          productName={cert.name}
          detail={getCoaDetail(cert.name, cert.dosage, cert.purity, cert.lab)}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
