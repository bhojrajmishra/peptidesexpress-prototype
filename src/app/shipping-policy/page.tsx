import { LegalPageLayout, LegalSections, LegalSection } from "@/modules/legal/components/LegalPageLayout";

export const metadata = {
  title: "Shipping Policy | Defcon Peptides",
  description: "How Defcon Peptides dispatches and delivers research products within Australia.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Where We Ship",
    blocks: [
      {
        type: "paragraph",
        text: "Defcon Peptides ships within Australia only. We deliver to all states and territories, including metropolitan, regional and remote addresses serviced by our carriers.",
      },
      {
        type: "paragraph",
        text: "We do not deliver to parcel lockers or PO boxes where the carrier requires a signature on delivery.",
      },
    ],
  },
  {
    heading: "2. Processing and Dispatch",
    blocks: [
      {
        type: "paragraph",
        text: "Orders placed before 2:00pm AEST on a business day (Monday to Friday) are dispatched the same day.",
      },
      { type: "paragraph", text: "Orders are dispatched the next business day where they are:" },
      {
        type: "list",
        items: [
          "Placed after the 2:00pm AEST cut-off",
          "Placed on a weekend or public holiday",
          "Awaiting payment clearance or customer verification",
        ],
      },
      {
        type: "paragraph",
        text: "Dispatch is subject to stock availability and successful payment. Where an item is unavailable after an order is placed, we will contact you to arrange a replacement, backorder or refund.",
      },
    ],
  },
  {
    heading: "3. Delivery Timeframes",
    blocks: [
      {
        type: "paragraph",
        text: "Delivery timeframes depend on the destination and are set by the carrier, not by us. An estimated delivery window is shown on the product page and at checkout.",
      },
      {
        type: "paragraph",
        text: "All timeframes are estimates only and are not guaranteed. Deliveries to regional and remote areas typically take longer than deliveries to metropolitan areas.",
      },
    ],
  },
  {
    heading: "4. Tracking",
    blocks: [
      {
        type: "paragraph",
        text: "A tracking number is emailed to you once your order has been dispatched. Please allow time for the carrier to scan the parcel into their network before tracking updates appear.",
      },
      {
        type: "paragraph",
        text: "If you have not received tracking details within one business day of dispatch, contact us at Support@defconpeptides.com.au.",
      },
    ],
  },
  {
    heading: "5. Delivery Address",
    blocks: [
      {
        type: "paragraph",
        text: "You are responsible for providing a complete and accurate delivery address. We are not liable for orders delivered to an incorrect address supplied at checkout.",
      },
      {
        type: "paragraph",
        text: "Address changes can only be made before dispatch. Once an order has been handed to the carrier, we cannot redirect it.",
      },
    ],
  },
  {
    heading: "6. Risk and Title",
    blocks: [
      {
        type: "paragraph",
        text: "Risk in the goods passes to you once the order has been handed to the carrier. Title passes on receipt of payment in full.",
      },
      {
        type: "paragraph",
        text: "Where the carrier leaves a parcel unattended in accordance with an authority to leave, the parcel is at your risk from that point.",
      },
    ],
  },
  {
    heading: "7. Delays Outside Our Control",
    blocks: [
      {
        type: "paragraph",
        text: "We are not responsible for delays caused by matters outside our reasonable control, including:",
      },
      {
        type: "list",
        items: [
          "Carrier delays, network backlogs or missed scans",
          "Peak periods, industrial action or public holidays",
          "Severe weather, natural disasters or road closures",
          "Failed delivery attempts where nobody is available to receive the parcel",
        ],
      },
    ],
  },
  {
    heading: "8. Lost, Damaged or Incorrect Deliveries",
    blocks: [
      {
        type: "paragraph",
        text: "If your order arrives damaged, incomplete or incorrect, you must notify us within 48 hours of the delivery timestamp, with your order number and clear photographs of the packaging and product.",
      },
      {
        type: "paragraph",
        text: "If tracking shows no movement for an extended period, contact us and we will open an enquiry with the carrier. Carrier investigations can take several business days to resolve.",
      },
      {
        type: "paragraph",
        text: "Claims are handled under our Refund Policy, which sets out when a replacement or reshipment is offered.",
      },
    ],
  },
  {
    heading: "9. Storage on Arrival",
    blocks: [
      {
        type: "paragraph",
        text: "All products are supplied as lyophilised powder in sterile sealed vials and are stable for normal transit periods. On arrival, products should be stored by qualified personnel in accordance with the storage and handling guidance on the product page.",
      },
    ],
  },
  {
    heading: "10. Research Use Only",
    blocks: [
      {
        type: "paragraph",
        text: "All products are supplied strictly for in vitro laboratory and analytical research purposes. They are not for human or veterinary use or consumption. It is your responsibility to ensure the products you order are lawful to possess and use in your jurisdiction.",
      },
    ],
  },
  {
    heading: "11. Australian Consumer Law",
    blocks: [
      {
        type: "paragraph",
        text: "Nothing in this policy excludes, restricts or modifies any right or remedy you may have under the Australian Consumer Law that cannot lawfully be excluded, including the consumer guarantee that goods will be supplied within a reasonable time.",
      },
    ],
  },
  {
    heading: "12. Contact",
    blocks: [
      { type: "paragraph", text: "For any question about a delivery, contact us:" },
      { type: "paragraph", text: "Defcon Peptides" },
      { type: "paragraph", text: "Support@defconpeptides.com.au" },
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      title="Shipping Policy"
      updated="9 August 2026"
      intro="How we dispatch and deliver research products within Australia."
    >
      <LegalSections sections={SECTIONS} />
    </LegalPageLayout>
  );
}
