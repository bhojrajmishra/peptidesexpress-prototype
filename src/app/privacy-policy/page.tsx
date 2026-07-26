import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy | Defcon Peptides",
  description: "How Defcon Peptides collects, uses, and protects your personal information.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    blocks: [
      { type: "paragraph", text: "We collect information you provide directly to us, including:" },
      {
        type: "list",
        items: [
          "Contact Information: name, email address, phone number, and shipping and billing addresses",
          "Payment Information: card details and billing information, processed securely through our payment providers",
          "Order Information: products purchased, order history, and transaction details",
          "Communication Data: messages, emails, and support requests you send us",
          "Account Information: username and password if you create an account",
        ],
      },
      { type: "paragraph", text: "When you visit our website, we also automatically collect:" },
      {
        type: "list",
        items: [
          "IP address and browser type",
          "Device information and operating system",
          "Pages viewed and time spent on our site",
          "Referring website and exit pages",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    blocks: [
      { type: "paragraph", text: "We use the information we collect to:" },
      {
        type: "list",
        items: [
          "Process and fulfill your orders",
          "Communicate with you about your orders and our products",
          "Send promotional emails with your consent",
          "Improve our website and customer experience",
          "Prevent fraud and enhance security",
          "Comply with our legal obligations",
          "Respond to your questions and support requests",
        ],
      },
    ],
  },
  {
    heading: "3. Information Sharing",
    blocks: [
      { type: "paragraph", text: "We do not sell your personal information. We may share your information with:" },
      {
        type: "list",
        items: [
          "Service Providers: payment processors, shipping carriers, and email service providers who help us operate our business",
          "Legal Requirements: when required by Australian law or to protect our rights",
          "Business Transfers: in connection with a merger, acquisition, or sale of assets",
        ],
      },
    ],
  },
  {
    heading: "4. Data Security",
    blocks: [
      { type: "paragraph", text: "We implement reasonable technical and organisational measures to protect your personal information, including:" },
      {
        type: "list",
        items: [
          "SSL/TLS encryption for all data transmission",
          "Secure payment processing through PCI-compliant providers",
          "Regular security reviews and monitoring",
          "Limited access to personal information by staff",
          "Secure data storage with encryption at rest",
        ],
      },
    ],
  },
  {
    heading: "5. Cookies and Tracking",
    blocks: [
      { type: "paragraph", text: "We use cookies and similar technologies to remember your preferences and cart contents, analyse website traffic and usage patterns, personalise your experience, and serve relevant advertising. You can control cookies through your browser settings — disabling them may affect your ability to use certain features of our website." },
    ],
  },
  {
    heading: "6. Your Rights Under Australian Privacy Law",
    blocks: [
      {
        type: "paragraph",
        text: "We handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). Under the APPs, you have the right to:",
      },
      {
        type: "list",
        items: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate or out-of-date information",
          "Request deletion of your personal information, subject to our legal record-keeping obligations",
          "Opt out of marketing communications at any time",
          "Ask how we collect, hold, use, and disclose your information",
        ],
      },
      {
        type: "paragraph",
        text: "To exercise these rights, contact us using the details below. If you believe we have mishandled your personal information and are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.",
      },
    ],
  },
  {
    heading: "7. Children's Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "Our website is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn we have collected information from a child, we will promptly delete it.",
      },
    ],
  },
  {
    heading: "8. Third-Party Links",
    blocks: [
      {
        type: "paragraph",
        text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies before providing any personal information.",
      },
    ],
  },
  {
    heading: "9. Changes to This Policy",
    blocks: [
      {
        type: "paragraph",
        text: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the \"Last updated\" date. Your continued use of our website after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    heading: "10. Contact Us",
    blocks: [
      {
        type: "paragraph",
        text: "If you have questions about this Privacy Policy or our privacy practices, please contact us:",
      },
      { type: "paragraph", text: "Defcon Peptides — Email: support@peptidesexpress.com.au" },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      updated="25 July 2026"
      intro="How we collect, use, and protect your personal information."
    >
      <p className="mb-6 text-sm leading-relaxed text-muted">
        At Defcon Peptides (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
        when you visit our website or make a purchase from us, in accordance with Australian privacy law.
      </p>
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
