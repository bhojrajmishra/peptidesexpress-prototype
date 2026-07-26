import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/modules/blog/services/blog.service";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Defcon Peptides Blog`,
    description: post.excerpt?.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Splits content into typed blocks for rendering */
function parseContent(raw: string): Array<{ type: "h2" | "p"; text: string }> {
  return raw
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "h2" as const, text: block.slice(3) };
      }
      return { type: "p" as const, text: block };
    });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) notFound();

  const blocks = parseContent(post.content ?? "");

  return (
    <>
      <Navbar />

      {/* Page header — white, no blue banner */}
      <div className="border-b border-gray-100 bg-white px-4 pb-10 pt-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink">
            {post.title}
          </h1>

          {post.published_at && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>
          )}
        </div>
      </div>

      {/* Article body */}
      <main className="bg-white px-4 pb-20 pt-10">
        <article className="mx-auto max-w-3xl">
          {blocks.map((block, i) =>
            block.type === "h2" ? (
              <h2
                key={i}
                className="mb-4 mt-10 font-display text-xl font-bold text-ink first:mt-0"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="mb-4 text-sm leading-relaxed text-muted">
                {block.text}
              </p>
            )
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
