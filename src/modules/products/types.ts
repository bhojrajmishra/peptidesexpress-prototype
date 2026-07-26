export type StockStatus = "in_stock" | "restocking" | "out_of_stock";

export interface ProductVariant {
  label: string;
  price: number;
  image_url: string;
}

export interface Product {
  id: number;
  name: string;
  subtitle: string | null;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  stock_status: StockStatus;
  badge: string | null;
  category_slug: string;
  is_featured: number;
  is_on_sale: number;
  variants: ProductVariant[];
  // Technical specifications
  purity: string | null;
  appearance: string | null;
  molecular_formula: string | null;
  molecular_weight: string | null;
  amino_acid_length: string | null;
  sequence_type: string | null;
  solubility: string | null;
  stability: string | null;
  form_type: string | null;
  grade: string | null;
  research_context: string | null;
  intended_use: string | null;
  quantity: number;
  sold: number;
}
