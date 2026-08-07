import BlogForm from "@/components/admin/BlogForm";
import { getCoaches } from "@/lib/coaches";

export const metadata = { title: "Admin — New Blog Post" };

export default async function NewBlogPage() {
  const coaches = await getCoaches();

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — Blogs</p>
      <h1 className="font-display mb-10 text-3xl">New Post</h1>
      <BlogForm coaches={coaches} />
    </div>
  );
}
