import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogById } from "@/lib/blogs";
import { getCoaches } from "@/lib/coaches";

export const metadata = { title: "Admin — Edit Blog Post" };

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, coaches] = await Promise.all([getBlogById(id), getCoaches()]);
  if (!post) notFound();

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — Blogs</p>
      <h1 className="font-display mb-10 text-3xl">Edit Post</h1>
      <BlogForm post={post} coaches={coaches} />
    </div>
  );
}
