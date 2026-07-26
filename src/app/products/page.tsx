import { getAllProducts } from "@/modules/products/services/product.service";
import { getCategories } from "@/modules/categories/services/category.service";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { ProductsPageClient } from "@/modules/products/components/ProductsPageClient";

export const metadata = {
  title: "All Products | Defcon Peptides",
  description: "Browse our full range of research-grade products.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    getAllProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-20">
        <h1 className="mb-6 font-display text-3xl font-extrabold text-ink">All Products</h1>
        <ProductsPageClient products={products} categories={categories} initialCategory={searchParams.category ?? "all"} />
      </main>
      <Footer />
    </>
  );
}
