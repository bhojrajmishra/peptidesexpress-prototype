import { Product } from "../types";
import { STATIC_PRODUCTS } from "../data/static-products";

export const getFeaturedProducts = async (): Promise<Product[]> =>
  STATIC_PRODUCTS.filter((p) => p.is_featured === 1);

export const getAllProducts = async (): Promise<Product[]> => STATIC_PRODUCTS;

export const getProduct = async (slug: string): Promise<Product> => {
  const product = STATIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
};
