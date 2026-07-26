import { STATIC_CERTIFICATES } from "@/modules/certificates/data/static-certificates";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { StaticCertificateCard } from "@/modules/certificates/components/StaticCertificateCard";

export const metadata = {
  title: "Certificates of Analysis | Defcon Peptides",
  description:
    "Independently verified certificates of analysis for all our research-grade compounds.",
};

export default async function CertificatesPage() {
  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div className="bg-brand pb-14 pt-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-display text-4xl font-extrabold text-white">
            Certificates of Analysis
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Verified by notice */}
        <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-base font-bold text-ink">
            Verified by Janoshik
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            All analytical testing displayed on this page has been independently
            verified by Janoshik Analytical Laboratory, a recognised third-party
            testing provider specialising in peptide analysis.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Our Certificates of Analysis are sourced from multiple independent
            analytical sources to ensure accurate purity and identity
            verification. For confidentiality and security reasons, certain
            manufacturing details and facility information have been redacted.
          </p>
        </div>

        {/* Certificate grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STATIC_CERTIFICATES.map((cert, i) => (
            <StaticCertificateCard key={`${cert.name}-${cert.dosage}-${i}`} cert={cert} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
