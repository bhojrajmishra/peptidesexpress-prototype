import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Refund Policy | Defcon Peptides",
  description: "How returns, replacements and cancellations work for Defcon Peptides research products.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Overview",
    blocks: [
      {
        type: "paragraph",
        text: "At Defcon Peptides, we supply premium research-grade peptides strictly for laboratory and scientific research purposes.",
      },
      {
        type: "paragraph",
        text: "Due to the sensitive and specialised nature of our products, all sales are considered final once payment has been processed, except as required under Australian Consumer Law.",
      },
    ],
  },
  {
    heading: "2. No Returns or Exchanges (Change of Mind)",
    blocks: [
      { type: "paragraph", text: "We do not accept returns, exchanges, or refunds for:" },
      {
        type: "list",
        items: [
          "Change of mind",
          "Incorrect selection",
          "Unused products",
          "Products delivered in good condition and functioning as described",
        ],
      },
      {
        type: "paragraph",
        text: "Because our products are intended strictly for research purposes and require controlled handling, they are not suitable for standard returns once dispatched.",
      },
    ],
  },
  {
    heading: "3. Damaged, Missing or Incorrect Orders",
    blocks: [
      { type: "paragraph", text: "If your order arrives:" },
      { type: "list", items: ["Damaged", "Incomplete", "Incorrect", "Faulty"] },
      {
        type: "paragraph",
        text: "You must notify us within 48 hours of the delivery timestamp.",
      },
      {
        type: "paragraph",
        text: "To lodge a claim, please email: support@defconpeptides.com.au",
      },
      { type: "paragraph", text: "Include:" },
      {
        type: "list",
        items: [
          "Your order number",
          "Clear photographs of packaging and product",
          "A brief description of the issue",
        ],
      },
      {
        type: "paragraph",
        text: "Once verified, we may, at our sole discretion, offer a replacement or reshipment of the affected product(s).",
      },
      {
        type: "paragraph",
        text: "Monetary refunds are generally not issued unless replacement is not reasonably possible.",
      },
    ],
  },
  {
    heading: "4. Order Cancellations",
    blocks: [
      {
        type: "paragraph",
        text: "Orders may only be cancelled before they enter processing or dispatch.",
      },
      {
        type: "paragraph",
        text: "Once an order has been prepared for shipment or dispatched, it cannot be cancelled.",
      },
    ],
  },
  {
    heading: "5. Australian Consumer Law",
    blocks: [
      {
        type: "paragraph",
        text: "Nothing in this policy excludes, restricts or modifies any rights you may have under the Australian Consumer Law.",
      },
      {
        type: "paragraph",
        text: "If a product is proven to be defective, significantly not as described, or not of acceptable quality, you may be entitled to a remedy under Australian Consumer Law.",
      },
    ],
  },
  {
    heading: "6. Shipping Location",
    blocks: [
      {
        type: "paragraph",
        text: "We currently ship within Australia only. Any international orders placed will be cancelled and refunded.",
      },
    ],
  },
  {
    heading: "7. Final Sale Acknowledgement",
    blocks: [
      { type: "paragraph", text: "By purchasing from Defcon Peptides, you acknowledge that:" },
      {
        type: "list",
        items: [
          "All products are sold for research purposes only",
          "Change-of-mind returns are not accepted",
          "Products must be handled responsibly and lawfully",
        ],
      },
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      updated="6 August 2026"
      intro="How returns, replacements and cancellations work for our research products."
    >
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
