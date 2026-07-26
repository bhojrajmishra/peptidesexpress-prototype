import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Terms of Service | Defcon Peptides",
  description: "The terms that govern your use of the Defcon Peptides website and products.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    blocks: [
      {
        type: "paragraph",
        text: "By accessing or using the Website, you confirm that you are at least 18 years old and have the legal capacity to enter into these Terms. If you are using the Website on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
      },
    ],
  },
  {
    heading: "2. Eligibility",
    blocks: [
      {
        type: "paragraph",
        text: "Access to Defcon Peptides products and services is limited to qualified researchers, laboratory professionals, and organisations engaged in legitimate scientific research. We reserve the right to approve or deny any customer or order at our sole discretion, and may request verification of research credentials or institutional affiliation at any time. Failure to provide satisfactory verification may result in order cancellation or account termination.",
      },
    ],
  },
  {
    heading: "3. Products and Intended Use",
    blocks: [
      {
        type: "paragraph",
        text: "All products sold by Defcon Peptides are intended for laboratory research purposes only. None of our products are therapeutic goods and none of our products or statements have been evaluated by the Therapeutic Goods Administration (TGA). By purchasing from us, you acknowledge and agree that:",
      },
      {
        type: "list",
        items: [
          "Products are sold strictly for in vitro research and laboratory use",
          "Products are not for human or animal consumption, diagnostic, or therapeutic use",
          "Products are not intended to diagnose, treat, cure, or prevent any disease",
          "No product information on this Website constitutes medical advice, dosing guidance, or a recommendation for human or animal use",
          "You will comply with all applicable Australian Commonwealth, state, and territory laws relating to the purchase, possession, and use of research chemicals",
          "You are a qualified researcher, or purchasing for legitimate research purposes",
        ],
      },
    ],
  },
  {
    heading: "4. Account Registration",
    blocks: [
      {
        type: "paragraph",
        text: "You may create an account to make purchases and track orders. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You agree to provide accurate and complete information and to keep it up to date.",
      },
    ],
  },
  {
    heading: "5. Orders and Payment",
    blocks: [
      { type: "paragraph", text: "When you place an order:" },
      {
        type: "list",
        items: [
          "You agree to pay all charges at the prices in effect when the order is placed, in Australian dollars unless stated otherwise",
          "You authorise us to charge your payment method for the total amount",
          "All orders are subject to acceptance and availability",
          "We reserve the right to refuse or cancel any order for any reason",
          "Prices are subject to change without notice",
        ],
      },
    ],
  },
  {
    heading: "6. Shipping and Delivery",
    blocks: [
      {
        type: "paragraph",
        text: "We ship to addresses within Australia. Shipping times are estimates and are not guaranteed. Risk in the goods passes to you on delivery, in line with the Australian Consumer Law. We are not responsible for delays caused by carriers or circumstances beyond our reasonable control.",
      },
    ],
  },
  {
    heading: "7. Returns and Refunds",
    blocks: [
      {
        type: "paragraph",
        text: "Our return process is detailed on our Contact page. In general, unopened products may be returned within 30 days for a full refund; opened or reconstituted products cannot be returned, and damaged or defective products are replaced at no cost. Nothing in this section limits your rights under the Australian Consumer Law (ACL). Our goods come with guarantees that cannot be excluded under the ACL — you are entitled to a replacement or refund for a major failure, and to compensation for other reasonably foreseeable loss or damage. You are also entitled to have goods repaired or replaced if they fail to be of acceptable quality and the failure does not amount to a major failure.",
      },
    ],
  },
  {
    heading: "8. Intellectual Property",
    blocks: [
      {
        type: "paragraph",
        text: "All content on the Website, including text, graphics, logos, images, and software, is the property of Defcon Peptides or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.",
      },
    ],
  },
  {
    heading: "9. Prohibited Conduct",
    blocks: [
      { type: "paragraph", text: "You agree not to:" },
      {
        type: "list",
        items: [
          "Use the Website for any unlawful purpose",
          "Misrepresent your identity or affiliation",
          "Interfere with or disrupt the Website or its servers",
          "Attempt to gain unauthorised access to any part of the Website",
          "Use automated means to access or scrape the Website",
          "Resell products without our written authorisation",
          "Use products in a manner inconsistent with their intended research use",
          "Discuss, promote, or engage in any practice of human or animal dosing of products purchased from us, through any channel",
          "Market, label, or represent any product purchased from us as suitable for human consumption, therapeutic use, or veterinary application",
        ],
      },
      {
        type: "paragraph",
        text: "Violation of the above, in particular any discussion or practice of human or animal dosing, may result in immediate termination of your account, cancellation of pending orders, and a permanent ban from our services, at our sole discretion.",
      },
    ],
  },
  {
    heading: "10. Termination",
    blocks: [
      {
        type: "paragraph",
        text: "We reserve the right to suspend or terminate your account and refuse any current or future use of the Website at any time, for any reason, at our sole discretion, including for violation of these Terms, suspected misuse of products, failure to provide satisfactory research credentials, or conduct we determine to be harmful to our business or other customers. Termination does not relieve you of any obligations under these Terms, including indemnification.",
      },
    ],
  },
  {
    heading: "11. Assumption of Risk",
    blocks: [
      {
        type: "paragraph",
        text: "You acknowledge that your purchase, possession, handling, storage, and use of any products from Defcon Peptides is at your own risk. We sell research chemicals intended solely for in vitro laboratory use. By purchasing any product, you assume the risks associated with the product, including risks arising from improper storage, handling, contamination, degradation, misuse, or application of the product to any human or animal, to the fullest extent permitted by law. Nothing in this clause excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred on you under the Australian Consumer Law that cannot lawfully be excluded.",
      },
    ],
  },
  {
    heading: "12. Disclaimer of Warranties",
    blocks: [
      {
        type: "paragraph",
        text: "The Website and all products are provided \"as is\" and \"as available\". To the extent permitted by law, and subject to the non-excludable consumer guarantees under the Australian Consumer Law, we disclaim all other warranties, including warranties of merchantability and fitness for a particular purpose. Certificates of Analysis (CoA) reflect testing results at the time of analysis and do not constitute a warranty of fitness for any specific application.",
      },
    ],
  },
  {
    heading: "13. Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "To the extent permitted by law, Defcon Peptides and its owners, officers, employees, agents, and affiliates are not liable for any indirect, incidental, special, or consequential loss or damage arising from your use of the Website, purchase of products, or reliance on information provided on the Website. Nothing in these Terms excludes, restricts, or modifies any guarantee, right, or remedy under the Australian Consumer Law that cannot lawfully be excluded, restricted, or modified. Where our liability cannot be excluded but can be limited, our liability is limited (at our option) to resupplying the goods or services, or paying the cost of having them resupplied.",
      },
    ],
  },
  {
    heading: "14. Indemnification",
    blocks: [
      {
        type: "paragraph",
        text: "To the extent permitted by law, you agree to indemnify and hold harmless Defcon Peptides, its owners, officers, employees, agents, and affiliates from claims, losses, and expenses (including reasonable legal costs) arising from: your use, misuse, or handling of any products purchased from us, including any personal injury, illness, or property damage resulting from administration or application of products to any human or animal; any health claims, dosing recommendations, or representations you make to third parties about our products; any promotional content you create referencing our products; and any violation of these Terms or applicable law. This indemnity survives termination of your account and these Terms.",
      },
    ],
  },
  {
    heading: "15. Dispute Resolution and Governing Law",
    blocks: [
      {
        type: "paragraph",
        text: "These Terms are governed by the laws of Australia. If a dispute arises, we encourage you to contact us first so we can try to resolve it informally. If it cannot be resolved informally, the dispute will be subject to the non-exclusive jurisdiction of the courts of the Australian state or territory in which you reside or in which our business operates. Nothing in this clause limits any right you have to bring a claim under the Australian Consumer Law, including through a state or territory tribunal.",
      },
    ],
  },
  {
    heading: "16. Changes to Terms",
    blocks: [
      {
        type: "paragraph",
        text: "We reserve the right to modify these Terms at any time. Changes are effective on posting to the Website. Your continued use of the Website after changes constitutes acceptance of the updated Terms. It is your responsibility to review these Terms periodically.",
      },
    ],
  },
  {
    heading: "17. Severability",
    blocks: [
      {
        type: "paragraph",
        text: "If any provision of these Terms is found to be invalid, illegal, or unenforceable, that finding does not affect the validity of the remaining provisions, which continue in full force and effect.",
      },
    ],
  },
  {
    heading: "18. Entire Agreement",
    blocks: [
      {
        type: "paragraph",
        text: "These Terms, together with our Privacy Policy, Disclaimer, and Legal & Compliance page, constitute the entire agreement between you and Defcon Peptides regarding your use of the Website and purchase of products, and supersede all prior communications on the subject.",
      },
    ],
  },
  {
    heading: "19. Contact Information",
    blocks: [
      { type: "paragraph", text: "For questions about these Terms, please contact us:" },
      { type: "paragraph", text: "Defcon Peptides — Email: support@peptidesexpress.com.au" },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      updated="25 July 2026"
      intro="Please read these terms carefully before using our website or making a purchase."
    >
      <p className="mb-6 text-sm leading-relaxed text-muted">
        Welcome to Defcon Peptides. By accessing our website or purchasing products from us, you agree to be
        bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not
        use our Website or services. Nothing in these Terms excludes, restricts, or modifies any consumer
        guarantee or right that cannot lawfully be excluded under the Australian Consumer Law (ACL).
      </p>
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
