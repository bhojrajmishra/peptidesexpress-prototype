export interface SearchProductResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  stock_status: "in_stock" | "restocking" | "out_of_stock";
}

export interface SearchBlogResult {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
}

export interface SearchFaqResult {
  id: number;
  question: string;
  answer: string;
}

export interface SearchResults {
  products: SearchProductResult[];
  blog: SearchBlogResult[];
  faqs: SearchFaqResult[];
}
