"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/modules/cart/context/CartContext";

// ── Country list ────────────────────────────────────────────────────────────
const COUNTRIES = [
  "Australia","United States","United Kingdom","Canada","New Zealand",
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon",
  "Cape Verde","Chad","Chile","China","Colombia","Congo","Costa Rica","Croatia",
  "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Fiji","Finland","France",
  "Gabon","Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kosovo",
  "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali",
  "Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia",
  "Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
  "Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Timor-Leste","Togo","Tunisia","Turkey","Turkmenistan","Uganda",
  "Ukraine","United Arab Emirates","Uruguay","Uzbekistan","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe",
];

const AU_STATES = ["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"];

const SHIPPING_COUNTRIES = ["Australia"];

interface CheckoutFeature { id: number; icon: string; title: string; description: string }

const CHECKOUT_FEATURES: CheckoutFeature[] = [
  { id: 1, icon: "truck", title: "Free Express Shipping", description: "Every order ships free with tracked, same-day dispatch on orders placed before 2pm AEST." },
  { id: 2, icon: "mail", title: "Certificate of Analysis", description: "Every batch is independently HPLC-tested and verified for purity before it reaches you." },
  { id: 3, icon: "heart", title: "60-Day Guarantee", description: "Not satisfied? Reach out within 60 days for a full refund or replacement." },
];

const DISCOUNT_CODES: Record<string, number> = {
  WELCOME10: 10,
  SAVE15: 15,
  RESEARCH20: 20,
};

function generateDiscountCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SAVE10-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function FeatureIcon({ icon }: { icon: string }) {
  if (icon === "truck") return (
    <svg className="h-6 w-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
    </svg>
  );
  if (icon === "heart") return (
    <svg className="h-6 w-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
  return (
    <svg className="h-6 w-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
      >
        {value}
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              autoFocus
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand px-3 py-2 text-sm outline-none"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto text-sm">
            {filtered.map(c => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-50"
                >
                  {c === value && <svg className="h-4 w-4 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                  {c !== value && <span className="h-4 w-4 shrink-0" />}
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountApplying, setDiscountApplying] = useState(false);
  const [discountMessage, setDiscountMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Australia");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [diffBilling, setDiffBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card"|"applepay"|"bank">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasShipping = SHIPPING_COUNTRIES.includes(country);
  const shipping = 0;
  const totalSavings = items.reduce((s, i) => {
    if (i.originalPrice) return s + (i.originalPrice - i.price) * i.quantity;
    return s;
  }, 0);
  const discountAmount = +(subtotal * (discountPercent / 100)).toFixed(2);
  const total = Math.max(0, subtotal + shipping - discountAmount);

  async function handleApplyDiscount() {
    if (!discountCode.trim()) return;
    setDiscountApplying(true);
    setDiscountMessage(null);
    const code = discountCode.trim().toUpperCase();
    await new Promise(r => setTimeout(r, 400));
    const percent = DISCOUNT_CODES[code];
    if (percent) {
      setDiscountPercent(percent);
      setDiscountMessage({ type: "success", text: `Code applied — ${percent}% off` });
    } else {
      setDiscountPercent(0);
      setDiscountMessage({ type: "error", text: "Invalid discount code" });
    }
    setDiscountApplying(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasShipping) return;
    if (!accepted) return;

    setSubmitting(true);
    setSubmitError(null);
    await new Promise(r => setTimeout(r, 800));
    setConfirmedCode(generateDiscountCode());
    clearCart();
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full rounded-2xl bg-white p-10 shadow-sm text-center">
          <svg className="mx-auto h-14 w-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">Order Placed!</h1>
          <p className="mt-2 text-sm text-muted">Thank you for your order. We've sent a confirmation to {email}.</p>
          {confirmedCode && (
            <div className="mt-5 rounded-xl border border-brand-light bg-brand-light p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your discount code for next time</p>
              <p className="mt-1 text-xl font-extrabold tracking-widest text-brand">{confirmedCode}</p>
              <p className="mt-1 text-xs text-muted">Also emailed to you — reusable up to 8 times.</p>
            </div>
          )}
          <Link href="/products" className="mt-6 inline-block rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-brand">
          PEPTIDES<span className="text-ink">EXPRESS</span>
        </Link>
        <Link href="/cart" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[1fr_420px]">
        {/* ── Left: Form ── */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Express checkout */}
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Express checkout</h2>
            <p className="mt-1 text-sm text-muted">Skip the form and checkout faster with one of these options.</p>
            <div className="mt-4 space-y-3">
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-semibold text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.82 3.2.83.97-.19 1.89-.96 3.18-.91 1.52.06 2.68.71 3.39 1.86-3.06 1.81-2.54 5.74.53 6.83-.63 1.74-1.41 3.45-2.3 4.25zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Pay with Apple Pay
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-semibold text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-white font-semibold">Pay</span>
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-muted uppercase tracking-widest">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
            <p className="mt-1 text-sm text-muted">We&apos;ll use this information to send you updates about your order.</p>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </div>

          {/* Delivery */}
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Delivery</h2>
            <p className="mt-1 text-sm text-muted">Enter the address where you&apos;d like your order delivered.</p>
            <div className="mt-3 space-y-3">
              <CountrySelect value={country} onChange={setCountry} />
              <div className="grid grid-cols-2 gap-3">
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
              </div>
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
              <input value={apartment} onChange={e => setApartment(e.target.value)} placeholder="Apartment, suite, etc. (optional)" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
              <div className="grid grid-cols-3 gap-3">
                <input value={suburb} onChange={e => setSuburb(e.target.value)} placeholder="Suburb" required className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                {country === "Australia" ? (
                  <select value={state} onChange={e => setState(e.target.value)} required className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-brand">
                    <option value="">State</option>
                    {AU_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <input value={state} onChange={e => setState(e.target.value)} placeholder="State" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                )}
                <input value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="Postcode" required className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
              </div>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
              <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                <input type="checkbox" checked={diffBilling} onChange={e => setDiffBilling(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                My billing address is different from my shipping address
              </label>
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Shipping method</h2>
            <p className="mt-1 text-sm text-muted">Choose how you&apos;d like to receive your order.</p>
            <div className="mt-3">
              {hasShipping ? (
                <label className="flex items-center justify-between rounded-xl border-2 border-brand bg-brand-light px-4 py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" defaultChecked className="accent-brand" />
                    <div>
                      <p className="text-sm font-semibold text-ink">Free Express Shipping</p>
                      <p className="text-xs text-muted">Order before 2pm AEST — same day dispatch</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">FREE</span>
                </label>
              ) : (
                <div>
                  <p className="text-sm text-muted">No shipping methods are available for your country.</p>
                  <p className="mt-1 text-sm font-medium text-red-500">Shipping method is required</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Payment</h2>
            <p className="mt-1 text-sm text-muted">All transactions are secure and encrypted.</p>
            <div className="mt-3 space-y-3">
              {/* Card */}
              <label className={`block rounded-xl border-2 cursor-pointer transition ${paymentMethod === "card" ? "border-brand bg-gray-50" : "border-gray-200"}`}>
                <div className="flex items-center justify-between px-4 py-3" onClick={() => setPaymentMethod("card")}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-brand" />
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-brand">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Debit/Credit Card</p>
                      <p className="text-xs text-muted">Pay securely</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {["VISA","MC","AMEX","DISC","JCB"].map(b => (
                      <span key={b} className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-gray-600">{b}</span>
                    ))}
                  </div>
                </div>
                {paymentMethod === "card" && (
                  <div className="border-t border-gray-200 px-4 pb-4 pt-3 space-y-3">
                    <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Card number" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                    <div className="grid grid-cols-2 gap-3">
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                      <input value={cvv} onChange={e => setCvv(e.target.value)} placeholder="Security code" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand" />
                    </div>
                  </div>
                )}
              </label>

              {/* Apple Pay */}
              <label className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition ${paymentMethod === "applepay" ? "border-brand" : "border-gray-200"}`} onClick={() => setPaymentMethod("applepay")}>
                <input type="radio" checked={paymentMethod === "applepay"} onChange={() => setPaymentMethod("applepay")} className="accent-brand" />
                <svg className="h-5 w-8" viewBox="0 0 40 16" fill="currentColor"><text x="0" y="13" fontSize="13" fontFamily="system-ui" fontWeight="600">Pay</text></svg>
                <div>
                  <p className="text-sm font-semibold text-ink">Apple Pay</p>
                  <p className="text-xs text-muted">Complete your payment</p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition ${paymentMethod === "bank" ? "border-brand" : "border-gray-200"}`} onClick={() => setPaymentMethod("bank")}>
                <input type="radio" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} className="accent-brand" />
                <svg className="h-5 w-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-ink">Bank Transfer / PayID</p>
                  <p className="text-xs text-muted">Complete your payment</p>
                </div>
              </label>
            </div>
          </div>

          {/* Terms + Submit */}
          <div className="space-y-4">
            <label className="flex items-start gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300" />
              <span>
                I accept the{" "}
                <Link href="/terms-of-service" className="text-brand hover:underline">terms and conditions</Link>
                {" "}and{" "}
                <Link href="/privacy-policy" className="text-brand hover:underline">and general conditions</Link>
              </span>
            </label>

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}

            <button
              type="submit"
              disabled={!accepted || !hasShipping || submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {submitting ? "Placing order…" : "Complete order"}
            </button>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-4 text-xs text-muted">
            {["Privacy Policy","Terms of Service","Refund Policy","Shipping Policy","Contact Information"].map(l => (
              <Link key={l} href="#" className="hover:text-ink transition">{l}</Link>
            ))}
          </div>
        </form>

        {/* ── Right: Order Summary ── */}
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Order summary</h2>
            <p className="mt-1 text-sm text-muted">Review your items and total before completing your purchase.</p>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {items.map(item => {
              const lineTotal = +(item.price * item.quantity).toFixed(2);
              const lineOriginal = item.originalPrice ? +(item.originalPrice * item.quantity).toFixed(2) : null;
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-[11px] font-bold text-white">
                      {item.quantity}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-xl border border-gray-100 object-contain bg-gray-50 p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    {item.variantLabel && <p className="text-xs text-muted">{item.variantLabel.replace(/ - \$[\d.]+/, "")}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">A${lineTotal.toFixed(2)}</p>
                    {lineOriginal && lineOriginal > lineTotal && (
                      <p className="flex items-center gap-1 text-xs text-muted line-through">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        A${lineOriginal.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Discount code */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={e => { setDiscountCode(e.target.value); setDiscountPercent(0); setDiscountMessage(null); }}
                placeholder="Discount code"
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={discountApplying || !discountCode.trim()}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-muted hover:border-gray-400 transition disabled:opacity-50"
              >
                {discountApplying ? "Applying…" : "Apply"}
              </button>
            </div>
            {discountMessage && (
              <p className={`mt-1.5 text-xs ${discountMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {discountMessage.text}
              </p>
            )}
          </div>

          {/* Price breakdown */}
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal - {items.length} item{items.length !== 1 ? "s" : ""}</span>
              <span className="font-semibold text-ink">A${subtotal.toFixed(2)}</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-muted">
                <span>Total Savings</span>
                <span className="font-semibold text-green-600">-A${totalSavings.toFixed(2)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div className="flex justify-between text-muted">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-semibold text-green-600">-A${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span className="font-semibold text-ink">A${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Estimated taxes</span>
              <span className="font-semibold text-ink">A$0.00</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex items-baseline justify-between">
            <span className="font-display text-lg font-bold text-ink">Total (inc. GST)</span>
            <div className="text-right">
              <span className="mr-1 text-xs text-muted">AUD</span>
              <span className="text-xl font-extrabold text-ink">A${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Why choose us */}
          <div>
            <h3 className="font-display text-lg font-bold text-ink">Why choose us?</h3>
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
              {CHECKOUT_FEATURES.map(f => (
                <div key={f.id} className="flex items-start gap-4 p-5">
                  <div className="mt-0.5 shrink-0">
                    <FeatureIcon icon={f.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{f.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
