import { readData, writeData } from "./db";
import { BlogPost } from "./types";
import { slugify, uniqueSlug } from "./slugify";

const FILE = "blogs.json";

export async function getBlogs(): Promise<BlogPost[]> {
  const posts = await readData<BlogPost[]>(FILE);
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogs();
  return posts.find((p) => p.slug === slug);
}

export async function getBlogById(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogs();
  return posts.find((p) => p.id === id);
}

export async function createBlog(
  input: Omit<BlogPost, "id" | "slug"> & { slug?: string }
): Promise<BlogPost> {
  const posts = await readData<BlogPost[]>(FILE);
  const base = slugify(input.slug || input.title);
  const slug = uniqueSlug(base, posts.map((p) => p.slug));
  const post: BlogPost = { id: `blog-${crypto.randomUUID()}`, slug, ...input };
  posts.push(post);
  await writeData(FILE, posts);
  return post;
}

export async function updateBlog(
  id: string,
  input: Partial<Omit<BlogPost, "id">>
): Promise<BlogPost | null> {
  const posts = await readData<BlogPost[]>(FILE);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...input };
  await writeData(FILE, posts);
  return posts[index];
}

export async function deleteBlog(id: string): Promise<boolean> {
  const posts = await readData<BlogPost[]>(FILE);
  const next = posts.filter((p) => p.id !== id);
  if (next.length === posts.length) return false;
  await writeData(FILE, next);
  return true;
}
