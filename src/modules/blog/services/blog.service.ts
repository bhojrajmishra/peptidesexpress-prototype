import { BlogPost } from "../types";
import { STATIC_BLOG_POSTS } from "../data/static-blog-posts";

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  STATIC_BLOG_POSTS.filter((p) => p.is_published === 1).sort((a, b) => a.sort_order - b.sort_order);

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = STATIC_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`Blog post not found: ${slug}`);
  return post;
};
