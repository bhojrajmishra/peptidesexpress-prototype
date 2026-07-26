import Link from "next/link";
import { getBlogPosts } from "@/modules/blog/services/blog.service";
import { BlogPost } from "@/modules/blog/types";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

export const metadata = {
  title: "Peptide Research Blog | Defcon Peptides",
  description:
    "Research backed insights and practical education on peptide science and emerging developments.",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CalendarIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-muted"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-2 text-sm text-muted">
        <CalendarIcon />
        <time dateTime={post.published_at ?? ""}>{formatDate(post.published_at)}</time>
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="mt-3 font-display text-xl font-bold text-ink hover:text-brand transition-colors">
          {post.title}
        </h2>
      </Link>

      {post.excerpt && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        Read more…
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="bg-brand pb-14 pt-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-display text-4xl font-extrabold text-white">
            Peptide Research Blog
          </h1>
          <p className="mt-3 text-base text-white/80">
            Research backed insights and practical education on peptide science and emerging
            developments
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-14">
        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted">No posts published yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
