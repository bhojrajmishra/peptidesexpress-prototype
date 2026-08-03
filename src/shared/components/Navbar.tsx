"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/modules/cart/context/CartContext";
import { SearchOverlay } from "./SearchOverlay";

const NAV = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Certificates of Analysis", href: "/certificates-of-analysis" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function CartIcon() {
  const { totalItems } = useCart();
  return (
    <Link href="/cart" aria-label="View cart" className="relative transition-opacity hover:opacity-60">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6M17 13l1.4 5.6M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zm8 0a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Fragment>
      <header className="fixed left-1/2 top-4 z-40 w-[95%] max-w-5xl -translate-x-1/2">
        <nav
          className={`border border-white/40 bg-white/70 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md transition-[border-radius] duration-150 ease-out ${
            mobileOpen ? "rounded-3xl" : "rounded-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <a href="/" className="shrink-0">
              <Image src="/logo-icon.png" alt="Defcon Peptides" width={40} height={40} priority className="h-8 w-8" />
            </a>

            <ul className="hidden items-center gap-8 text-xs uppercase tracking-widest text-ink md:flex">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-opacity hover:opacity-60">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-ink">
              <button aria-label="Search" onClick={() => setSearchOpen(true)} className="transition-opacity hover:opacity-60">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </button>
              <CartIcon />
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="transition-opacity hover:opacity-60 md:hidden"
              >
                {mobileOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-150 ease-out motion-reduce:transition-none md:hidden ${
              mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={`overflow-hidden transition-opacity duration-150 ease-out motion-reduce:transition-none ${
                mobileOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <ul className="mt-4 flex flex-col gap-1 border-t border-black/5 pt-4 text-sm font-medium text-ink">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-2 py-2.5 uppercase tracking-wide transition-colors hover:bg-black/5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Fragment>
  );
}
