"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Certificates of Analysis", href: "/certificates-of-analysis" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact Us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Legal & Compliance", href: "/legal-compliance" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Research Use Only banner */}
        <div className="rounded-2xl border border-brand/30 bg-brand-light p-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand">
            Research Use Only
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            All peptide compounds offered are of premium quality and are intended strictly for in
            vitro laboratory research purposes only. These products are not intended for human or
            animal consumption and are not approved for clinical, medical or diagnostic applications.
            Purchasers are solely responsible for ensuring compliance with all applicable laws in
            their jurisdiction.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h4 className="font-display text-base font-bold text-ink">Unlock 10% Off Your Order</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Join the Peptides Express research community for 10% off your order, early access,
              exclusive offers &amp; updates.
            </p>
            <div className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand"
              />
              <button className="mt-3 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-base font-bold text-ink">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-base font-bold text-ink">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold text-ink">Contact Us</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We pride ourselves on providing exceptional customer service and respond to all
              enquiries within{" "}
              <strong className="text-ink">1 hour (Monday–Saturday)</strong>. Please note that we
              operate as an{" "}
              <strong className="text-ink">email-only support service</strong> to ensure all
              communication is documented and handled efficiently. We do not provide phone support.
            </p>
            <a
              href="mailto:support@peptidesexpress.com.au"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@peptidesexpress.com.au
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-muted">
          © 2026 Peptides Express. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
