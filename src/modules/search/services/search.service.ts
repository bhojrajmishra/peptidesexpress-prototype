import { SearchResults } from "../types";
import { STATIC_PRODUCTS } from "@/modules/products/data/static-products";
import { STATIC_BLOG_POSTS } from "@/modules/blog/data/static-blog-posts";
import { STATIC_FAQS } from "@/modules/home/data/static-faqs";

const EMPTY: SearchResults = { products: [], blog: [], faqs: [] };

export async function search(query: string, signal?: AbortSignal): Promise<SearchResults> {
  const term = query.trim().toLowerCase();
  if (term.length < 2) return EMPTY;

  const products = STATIC_PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(term) || p.subtitle?.toLowerCase().includes(term)
  )
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image_url: p.image_url,
      stock_status: p.stock_status,
    }));

  const blog = STATIC_BLOG_POSTS.filter(
    (b) => b.is_published === 1 && (b.title.toLowerCase().includes(term) || b.excerpt?.toLowerCase().includes(term))
  )
    .slice(0, 5)
    .map((b) => ({ id: b.id, title: b.title, slug: b.slug, excerpt: b.excerpt }));

  const faqs = STATIC_FAQS.filter(
    (f) => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
  )
    .slice(0, 5)
    .map((f) => ({ id: f.id, question: f.question, answer: f.answer }));

  return signal?.aborted ? EMPTY : { products, blog, faqs };
}
