import { notFound } from "next/navigation";
import { getAllProducts, getProduct } from "@/modules/products/services/product.service";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { ProductDetail } from "@/modules/products/components/ProductDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.slug).catch(() => null);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Defcon Peptides`,
    description: product.description?.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug).catch(() => null);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-20">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
