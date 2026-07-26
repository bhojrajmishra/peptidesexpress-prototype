import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Disclaimer | Defcon Peptides",
  description: "Important information to read before purchasing from Defcon Peptides.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Research Use Only",
    blocks: [
      {
        type: "paragraph",
        text: "All products sold by Defcon Peptides are intended for research and laboratory use only. They are not intended for human or veterinary use and are not to be used as food additives, drugs, or household chemicals.",
      },
    ],
  },
  {
    heading: "General Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "The information provided on this website is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the information, products, or services on this website, except to the extent such a warranty cannot be excluded under the Australian Consumer Law.",
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
          "Are sold strictly for in vitro research and laboratory use only",
          "Are not intended for human or veterinary use",
          "Are not intended for use as food additives, drugs, cosmetics, or household chemicals",
          "Are not intended to diagnose, treat, cure, or prevent any disease",
          "Are not therapeutic goods and have not been evaluated by the Therapeutic Goods Administration (TGA)",
          "Should only be handled by qualified and licensed professionals",
        ],
      },
    ],
  },
  {
    heading: "No Medical Advice",
    blocks: [
      {
        type: "paragraph",
        text: "Nothing on this website should be construed as medical advice. The content is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your doctor or other qualified health provider with any questions you may have regarding a medical condition.",
      },
    ],
  },
  {
    heading: "Research Information",
    blocks: [
      {
        type: "paragraph",
        text: "Any research information, scientific data, or study references provided on this website are for educational purposes only and do not constitute endorsement of any particular use of our products. Researchers are responsible for verifying all information and conducting their own due diligence before using any product.",
      },
    ],
  },
  {
    heading: "Buyer Responsibility",
    blocks: [
      { type: "paragraph", text: "By purchasing products from Defcon Peptides, you represent that:" },
      {
        type: "list",
        items: [
          "You are at least 18 years of age",
          "You are purchasing products for legitimate research purposes only",
          "You will comply with all applicable Australian Commonwealth, state, and territory laws regarding the purchase, possession, and use of our products",
          "You will not use products in any manner inconsistent with their intended research use",
          "You accept responsibility for the proper handling, storage, and use of products",
        ],
      },
    ],
  },
  {
    heading: "Product Quality Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "We strive to provide research-grade peptide compounds of 99% or greater purity, as verified by independent third-party testing. Results may vary based on research conditions, storage, handling, and other factors beyond our control. Certificate of Analysis documents reflect quality at the time of testing and do not guarantee outcomes in specific research applications.",
      },
    ],
  },
  {
    heading: "Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "To the extent permitted by law, Defcon Peptides, its owners, employees, or affiliates are not liable for any indirect, incidental, special, or consequential loss arising from your use of our products or the information on this website. Nothing in this disclaimer excludes, restricts, or modifies any consumer guarantee or right under the Australian Consumer Law that cannot lawfully be excluded.",
      },
    ],
  },
  {
    heading: "Indemnification",
    blocks: [
      {
        type: "paragraph",
        text: "To the extent permitted by law, you agree to indemnify and hold harmless Defcon Peptides, its owners, officers, employees, agents, and affiliates from claims, losses, and reasonable legal costs arising from: (a) your use, misuse, or handling of our products, including any injury, illness, or damage resulting from administration to any human or animal; (b) any health claims, dosing recommendations, or representations you make to third parties about our products; (c) any promotional content you create referencing our products; and (d) any violation of this disclaimer or our Terms of Service. This indemnity survives termination of your account.",
      },
    ],
  },
  {
    heading: "External Links",
    blocks: [
      {
        type: "paragraph",
        text: "This website may contain links to external websites. We have no control over the content of these sites and are not responsible for their content or privacy practices. Inclusion of a link does not imply endorsement.",
      },
    ],
  },
  {
    heading: "Changes to This Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "We may modify this disclaimer at any time. Changes are effective immediately upon posting. Your continued use of our website and products after any changes constitutes acceptance of the modified disclaimer.",
      },
    ],
  },
  {
    heading: "Contact",
    blocks: [
      { type: "paragraph", text: "If you have questions about this disclaimer, please contact us:" },
      { type: "paragraph", text: "Defcon Peptides — Email: support@peptidesexpress.com.au" },
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      updated="25 July 2026"
      intro="Please read this important information before purchasing from Defcon Peptides."
    >
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
