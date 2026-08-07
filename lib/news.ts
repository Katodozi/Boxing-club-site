import { readData, writeData } from "./db";
import { NewsPost } from "./types";
import { slugify, uniqueSlug } from "./slugify";

const FILE = "news.json";

export async function getNewsPosts(): Promise<NewsPost[]> {
  const posts = await readData<NewsPost[]>(FILE);
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | undefined> {
  const posts = await getNewsPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getNewsById(id: string): Promise<NewsPost | undefined> {
  const posts = await getNewsPosts();
  return posts.find((p) => p.id === id);
}

export async function createNews(
  input: Omit<NewsPost, "id" | "slug"> & { slug?: string }
): Promise<NewsPost> {
  const posts = await readData<NewsPost[]>(FILE);
  const base = slugify(input.slug || input.title);
  const slug = uniqueSlug(base, posts.map((p) => p.slug));
  const post: NewsPost = { id: `news-${crypto.randomUUID()}`, slug, ...input };
  posts.push(post);
  await writeData(FILE, posts);
  return post;
}

export async function updateNews(
  id: string,
  input: Partial<Omit<NewsPost, "id">>
): Promise<NewsPost | null> {
  const posts = await readData<NewsPost[]>(FILE);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...input };
  await writeData(FILE, posts);
  return posts[index];
}

export async function deleteNews(id: string): Promise<boolean> {
  const posts = await readData<NewsPost[]>(FILE);
  const next = posts.filter((p) => p.id !== id);
  if (next.length === posts.length) return false;
  await writeData(FILE, next);
  return true;
}
