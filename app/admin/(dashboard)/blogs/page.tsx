import Link from "next/link";
import { getBlogs } from "@/lib/blogs";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const metadata = { title: "Admin — Blogs" };

export default async function AdminBlogsPage() {
  const posts = await getBlogs();

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="font-mono mb-2 text-xs text-brass-bright">Admin</p>
          <h1 className="font-display text-3xl">Blog Posts</h1>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary !px-5 !py-2.5">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-bone-dim">No posts yet.</p>
      ) : (
        <div className="overflow-x-auto border border-hairline">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas-alt">
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Title</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Author</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Tag</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Published</th>
                <th className="font-mono px-4 py-3 text-right text-[10px] uppercase tracking-wide text-brass-bright">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3.5 text-bone">{post.title}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.authorName}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.tag}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.publishedAt}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="font-mono text-[11px] uppercase tracking-wide text-brass-bright hover:underline"
                      >
                        Edit
                      </Link>
                      <ConfirmDeleteButton endpoint={`/api/blogs/${post.id}`} itemLabel="post" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
