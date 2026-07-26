import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Legal & Compliance | Defcon Peptides",
  description: "Legal and regulatory compliance information for Defcon Peptides.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Research Use Only",
    blocks: [
      {
        type: "paragraph",
        text: "All products offered by Defcon Peptides are intended strictly for research and laboratory use only. They are not intended for human or veterinary use, nor for use as food additives, drugs, cosmetics, or household chemicals. By purchasing from us, you acknowledge that all products are for in vitro research purposes only.",
      },
    ],
  },
  {
    heading: "General Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "The information on this website is for informational and educational purposes only. While we strive for accuracy, we make no representations or warranties, express or implied, regarding the completeness, accuracy, reliability, or suitability of any information, products, or content on this site, except to the extent such a warranty cannot be excluded under the Australian Consumer Law.",
      },
    ],
  },
  {
    heading: "Product Use Disclaimer",
    blocks: [
      { type: "paragraph", text: "All products sold by Defcon Peptides:" },
      {
        type: "list",
        items: [
          "Are intended solely for laboratory and in vitro research use",
          "Are not intended for human or veterinary use",
          "Are not intended for use as food, drugs, cosmetics, or medical treatments",
          "Are not intended to diagnose, treat, cure, or prevent any disease",
          "Must be handled only by qualified professionals in controlled research environments",
        ],
      },
      { type: "paragraph", text: "Any improper use of these products is strictly prohibited." },
    ],
  },
  {
    heading: "No Medical Advice",
    blocks: [
      {
        type: "paragraph",
        text: "Nothing on this website should be interpreted as medical advice. The content is not a substitute for professional medical guidance, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any medical condition or health-related concern.",
      },
    ],
  },
  {
    heading: "Research Information",
    blocks: [
      {
        type: "paragraph",
        text: "Any research references, scientific information, or data on this website are for informational purposes only and do not constitute endorsement of any specific application or use. Researchers are solely responsible for verifying all data and conducting independent evaluation before use.",
      },
    ],
  },
  {
    heading: "Buyer Responsibility",
    blocks: [
      { type: "paragraph", text: "By purchasing from Defcon Peptides, you agree that:" },
      {
        type: "list",
        items: [
          "You are at least 18 years of age",
          "You are purchasing products strictly for legitimate research purposes",
          "You will comply with all applicable Australian laws and regulations",
          "You will not use products for any unauthorised or prohibited purpose",
          "You accept responsibility for handling, storage, and use",
        ],
      },
    ],
  },
  {
    heading: "Product Quality Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "We are committed to providing high-quality research-grade compounds. While products are tested for purity and quality, outcomes may vary depending on handling, storage conditions, and research methodology. Certificates of Analysis (CoA) reflect product quality at the time of testing and do not guarantee results in any specific application.",
      },
    ],
  },
  {
    heading: "Regulatory Status",
    blocks: [
      {
        type: "paragraph",
        text: "Our products are research chemicals, not therapeutic goods, and are not evaluated, registered, or listed by the Therapeutic Goods Administration (TGA) under the Therapeutic Goods Act 1989 (Cth). They are supplied on the basis that they are used solely for legitimate laboratory research and never for human or animal administration.",
      },
    ],
  },
  {
    heading: "Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "To the extent permitted by law, Defcon Peptides is not liable for any direct, indirect, incidental, or consequential loss arising from the use or misuse of its products or information, including loss of data, research outcomes, or financial loss. Nothing in this page excludes, restricts, or modifies any consumer guarantee or right under the Australian Consumer Law that cannot lawfully be excluded.",
      },
    ],
  },
  {
    heading: "Indemnification",
    blocks: [
      {
        type: "paragraph",
        text: "By purchasing from Defcon Peptides, you agree, to the extent permitted by law, to indemnify and hold harmless Defcon Peptides, its owners, affiliates, and team members from any claims, damages, or liabilities resulting from improper use or handling of products, use inconsistent with intended research purposes, any representations you make to third parties, or violation of applicable laws or regulations. This obligation remains in effect after purchase.",
      },
    ],
  },
  {
    heading: "External Links",
    blocks: [
      {
        type: "paragraph",
        text: "This website may include links to external websites. We are not responsible for the content, accuracy, or practices of any third-party site and do not endorse any external content.",
      },
    ],
  },
  {
    heading: "Changes to This Page",
    blocks: [
      {
        type: "paragraph",
        text: "We reserve the right to update or modify this page at any time without prior notice. Changes become effective immediately on publication.",
      },
    ],
  },
  {
    heading: "Contact",
    blocks: [
      { type: "paragraph", text: "For legal or compliance enquiries, please contact:" },
      { type: "paragraph", text: "Defcon Peptides — Email: support@peptidesexpress.com.au" },
    ],
  },
];

export default function LegalCompliancePage() {
  return (
    <LegalPageLayout
      title="Legal & Compliance"
      updated="25 July 2026"
      intro="Please read the following carefully before using this website or purchasing any products from Defcon Peptides."
    >
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
