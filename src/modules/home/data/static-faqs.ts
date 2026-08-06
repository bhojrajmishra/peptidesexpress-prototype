// Static FAQ content — this replaces the DB-backed /faqs endpoint, which
// has no admin UI to manage it and returns empty in practice.

export interface StaticFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_CATEGORIES = ["Ordering", "Shipping", "Products", "Quality & Testing", "Returns & Support"];

export const STATIC_FAQS: StaticFaq[] = [
  {
    id: 1,
    category: "Ordering",
    question: "How do I place an order?",
    answer:
      "Simply browse our catalog, select your compounds, add them to your cart and proceed to checkout.",
  },
  {
    id: 2,
    category: "Ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept Zelle, CashApp, Venmo, and major credit and debit cards. Here is something worth knowing: peptides cannot be patented, which means no big pharmaceutical company profits from them. Because of that, major payment processors like Stripe and Shopify classify peptide businesses as high risk and restrict their services to us. It is not about legality — it is about profit. We work around that by offering the payment options above so you can still check out safely and confidently with us. All transactions are processed through secure, encrypted payment gateways to protect your information.",
  },
  {
    id: 3,
    category: "Ordering",
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or canceled within 1 hour of placement. If you would like to modify or cancel your order, please email us at Support@defconpeptides.com.au. After this window, orders enter processing and cannot be changed.",
  },
  {
    id: 4,
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "We offer same-day shipping on all orders placed before 2:00 PM Eastern Time. Orders placed after 2:00 PM ET will be shipped on the next business day. Expedited shipping options are available at checkout for customers who need faster delivery. Additionally, every order includes shipping protection for added peace of mind.",
  },
  {
    id: 5,
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the United States only. We're working on expanding our shipping capabilities to serve researchers worldwide. Sign up for our newsletter to be notified when international shipping becomes available.",
  },
  {
    id: 6,
    category: "Shipping",
    question: "How are peptides packaged for shipping?",
    answer:
      "Each vial is securely cushioned to prevent damage during transit. Temperature-sensitive products are clearly marked for proper handling.",
  },
  {
    id: 7,
    category: "Products",
    question: "What is the purity of your peptides?",
    answer:
      "All our peptides are manufactured to 99%+ purity standards. Each batch undergoes rigorous third-party HPLC and Mass Spectrometry testing. Certificates of Analysis (CoA) are available for every product on the product page.",
  },
  {
    id: 8,
    category: "Products",
    question: "How should I store my peptides?",
    answer:
      "Lyophilized (powder) peptides should be stored at -20°C for long-term storage or 2-8°C (refrigerator) for short-term. Always protect from light and avoid repeated freeze-thaw cycles.",
  },
  {
    id: 9,
    category: "Products",
    question: "What is the shelf life of your peptides?",
    answer:
      "Lyophilized peptides have a shelf life of 2+ years when stored properly at -20°C. Each product includes a lot-specific expiration date.",
  },
  {
    id: 10,
    category: "Products",
    question: "What is bacteriostatic water?",
    answer:
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol as a preservative. It is a standard laboratory supply used in research settings. We offer pharmaceutical-grade BAC water in our store.",
  },
  {
    id: 11,
    category: "Quality & Testing",
    question: "Are your peptides third-party tested?",
    answer:
      "Yes, every batch is tested by independent, accredited laboratories using HPLC for purity verification and Mass Spectrometry for identity confirmation. Test results are published on each product page as Certificates of Analysis (CoA).",
  },
  {
    id: 12,
    category: "Quality & Testing",
    question: "How do I access Certificates of Analysis?",
    answer:
      "CoAs are available on each product page. Simply click the 'Certificate of Analysis' link to view or download the current batch's test results. You can also visit the third-party lab's website and search for the search code.",
  },
  {
    id: 13,
    category: "Returns & Support",
    question: "What is your return policy?",
    answer:
      "We offer a 60-day money-back guarantee. If you're not completely satisfied with your purchase, contact us for a full refund or replacement. Products must be unopened and in original packaging. Damaged or incorrect orders are replaced at no cost.",
  },
  {
    id: 14,
    category: "Returns & Support",
    question: "How do I contact customer support?",
    answer: "For any questions or concerns, contact us. We typically respond within 24 hours on business days.",
  },
];
