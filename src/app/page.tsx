import { getFeaturedProducts, getAllProducts } from "@/modules/products/services/product.service";
import { getCategories } from "@/modules/categories/services/category.service";

import { AnnouncementBar } from "@/shared/components/AnnouncementBar";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

import { Hero } from "@/modules/home/components/Hero";
import { FeaturedProducts } from "@/modules/home/components/FeaturedProducts";
import { FeatureCards } from "@/modules/home/components/FeatureCards";
import { CategoryGrid } from "@/modules/categories/components/CategoryGrid";
import { FAQ } from "@/modules/home/components/FAQ";
import { SeoContent } from "@/modules/home/components/SeoContent";

export default async function HomePage() {
  // Fetch all homepage data in parallel; fall back to empty on error
  const [products, allProducts, categories] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getAllProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AnnouncementBar />
        <FeaturedProducts products={products} />
        <FeatureCards />
        <CategoryGrid categories={categories} products={allProducts} />
        <FAQ />
        <SeoContent />
      </main>
      <Footer />
    </>
  );
}
