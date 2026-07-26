import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { ContactForm } from "@/modules/contact/components/ContactForm";

export const metadata = {
  title: "Contact Us | Defcon Peptides",
  description:
    "Get in touch with our team. We respond to all enquiries within 1 hour (Monday–Saturday).",
};

const INFO_CARDS = [
  {
    icon: (
      <svg className="h-6 w-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-blue-50",
    title: "Email Support",
    body: "We operate as an email-only support service to ensure all communication is documented and handled efficiently.",
    extra: (
      <a
        href="mailto:support@peptidesexpress.com.au"
        className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
      >
        support@peptidesexpress.com.au
      </a>
    ),
  },
  {
    icon: (
      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-green-50",
    title: "Response Time",
    body: "We pride ourselves on providing exceptional customer service.",
    extra: (
      <div className="mt-3 text-center">
        <p className="text-base font-bold text-ink">Within 1 hour</p>
        <p className="text-sm text-muted">(Monday–Saturday)</p>
      </div>
    ),
  },
  {
    icon: (
      <svg className="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    iconBg: "bg-amber-50",
    title: "No Phone Support",
    body: "We do not provide phone support to ensure all enquiries are properly documented and handled efficiently.",
    extra: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            For all enquiries, product requests, or suggestions for compounds you would like to see
            added to our range, please email us or complete the contact form below.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${card.iconBg}`}>
                {card.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              {card.extra}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="mx-auto mt-14 max-w-xl">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
