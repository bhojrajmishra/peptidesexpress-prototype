import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Terms of Service | Defcon Peptides",
  description: "The terms that govern your use of the Defcon Peptides website and products.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Overview",
    blocks: [
      {
        type: "paragraph",
        text: "These Terms of Service (\"Terms\") govern your access to and use of the website and services operated by Defcon Peptides (\"we\", \"us\", \"our\").",
      },
      {
        type: "paragraph",
        text: "By accessing, browsing or purchasing from our website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use our website or purchase our products.",
      },
    ],
  },
  {
    heading: "2. Eligibility",
    blocks: [
      {
        type: "paragraph",
        text: "You must be at least 18 years of age to access this website or purchase any products.",
      },
      { type: "paragraph", text: "By placing an order, you represent and warrant that:" },
      {
        type: "list",
        items: [
          "You are of legal age in your jurisdiction",
          "You have the legal capacity to enter into binding contracts",
          "You are purchasing products for lawful research purposes only",
          "All information provided is accurate and complete",
        ],
      },
    ],
  },
  {
    heading: "3. Research Use Only",
    blocks: [
      {
        type: "paragraph",
        text: "All products sold by Defcon Peptides are supplied strictly for in vitro laboratory and analytical research purposes only.",
      },
      { type: "paragraph", text: "Our products:" },
      {
        type: "list",
        items: [
          "Are not for human or animal consumption",
          "Are not therapeutic goods",
          "Are not approved for medical, veterinary, or diagnostic use",
          "Must be handled by qualified personnel in appropriate facilities",
        ],
      },
      { type: "paragraph", text: "By purchasing from us, you acknowledge and agree that:" },
      {
        type: "list",
        items: [
          "You are solely responsible for compliance with all applicable laws",
          "You will not misuse products for unlawful or prohibited purposes",
          "You have appropriate qualifications and facilities for research use",
        ],
      },
      {
        type: "paragraph",
        text: "You agree to indemnify and hold harmless Defcon Peptides from any misuse of products purchased from us.",
      },
    ],
  },
  {
    heading: "4. Orders",
    blocks: [
      {
        type: "paragraph",
        text: "When you place an order, you are making an offer to purchase. We reserve the right to accept or decline any order at our discretion.",
      },
      { type: "paragraph", text: "Orders are not confirmed until payment has been received and processed." },
      { type: "paragraph", text: "We reserve the right to:" },
      {
        type: "list",
        items: ["Limit order quantities", "Verify customer information before processing"],
      },
      {
        type: "paragraph",
        text: "We reserve the right to refuse, suspend or cancel any order where we reasonably believe the purchase may involve unlawful activity, misuse of our products, fraud, inaccurate customer information or any breach of these Terms.",
      },
      { type: "paragraph", text: "Once an order is dispatched, it cannot be cancelled." },
    ],
  },
  {
    heading: "5. Pricing and Payment",
    blocks: [
      { type: "paragraph", text: "All prices are listed in AUD (AU) unless otherwise stated." },
      { type: "paragraph", text: "Prices are subject to change without notice." },
      {
        type: "paragraph",
        text: "You agree to provide accurate billing and payment information and confirm that you are authorised to use the payment method provided.",
      },
      { type: "paragraph", text: "We are not responsible for any fees charged by your financial institution." },
    ],
  },
  {
    heading: "6. Shipping and Risk",
    blocks: [
      { type: "paragraph", text: "Delivery timeframes are estimates only and are not guaranteed." },
      {
        type: "paragraph",
        text: "We are not responsible for delays caused by postal carriers, customs processing, or events outside our control.",
      },
      { type: "paragraph", text: "Risk of loss passes to you once the order is handed to the carrier." },
      {
        type: "paragraph",
        text: "It is your responsibility to ensure the products you order are legal to possess in your jurisdiction.",
      },
    ],
  },
  {
    heading: "7. Intellectual Property",
    blocks: [
      {
        type: "paragraph",
        text: "All content on this website — including text, branding, product descriptions, graphics and logos — is the property of Defcon Peptides and is protected under Australian intellectual property laws.",
      },
      {
        type: "paragraph",
        text: "You may not reproduce, distribute or use any content without our prior written consent.",
      },
    ],
  },
  {
    heading: "8. Prohibited Uses",
    blocks: [
      { type: "paragraph", text: "You must not use our website or products:" },
      {
        type: "list",
        items: [
          "For any unlawful purpose",
          "To violate any laws or regulations",
          "To harm, threaten, or harass others",
          "To transmit malicious code or interfere with website functionality",
          "For human or animal consumption",
        ],
      },
      {
        type: "paragraph",
        text: "We reserve the right to suspend or terminate access where misuse is suspected.",
      },
    ],
  },
  {
    heading: "9. Disclaimer of Warranties",
    blocks: [
      {
        type: "paragraph",
        text: "To the fullest extent permitted by law, our website and products are provided \"as is\" and \"as available\".",
      },
      { type: "paragraph", text: "We make no representations or warranties regarding:" },
      {
        type: "list",
        items: [
          "The accuracy or completeness of information on the website",
          "The suitability of products for any particular purpose",
          "Uninterrupted or error-free operation",
        ],
      },
      { type: "paragraph", text: "You use the website and products at your own risk." },
    ],
  },
  {
    heading: "10. Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "To the maximum extent permitted under Australian law, Defcon Peptides shall not be liable for:",
      },
      {
        type: "list",
        items: [
          "Any indirect, incidental, or consequential damages",
          "Loss of profits, data, or business opportunities",
          "Any damages arising from misuse of products",
        ],
      },
      {
        type: "paragraph",
        text: "Our total liability, if any, shall not exceed the amount paid by you for the product giving rise to the claim.",
      },
      {
        type: "paragraph",
        text: "Nothing in these Terms excludes rights you may have under the Australian Consumer Law that cannot be excluded.",
      },
    ],
  },
  {
    heading: "11. Indemnification",
    blocks: [
      {
        type: "paragraph",
        text: "You agree to indemnify and hold harmless Defcon Peptides, its directors, officers and affiliates from any claims, damages, losses or liabilities arising from:",
      },
      {
        type: "list",
        items: [
          "Your use or misuse of products",
          "Your breach of these Terms",
          "Your violation of any laws or third-party rights",
        ],
      },
    ],
  },
  {
    heading: "12. Governing Law",
    blocks: [
      { type: "paragraph", text: "These Terms are governed by the laws of Queensland, Australia." },
      {
        type: "paragraph",
        text: "You submit to the exclusive jurisdiction of the courts of Queensland and the Commonwealth of Australia.",
      },
    ],
  },
  {
    heading: "13. Changes to Terms",
    blocks: [
      {
        type: "paragraph",
        text: "We reserve the right to update these Terms at any time. Continued use of the website constitutes acceptance of any changes.",
      },
    ],
  },
  {
    heading: "14. Contact",
    blocks: [
      { type: "paragraph", text: "Defcon Peptides" },
      { type: "paragraph", text: "Support@defconpeptides.com.au" },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      updated="6 August 2026"
      intro="Please read these terms carefully before using our website or making a purchase."
    >
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
