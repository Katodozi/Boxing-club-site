import Link from "next/link";
import { getNewsPosts } from "@/lib/news";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const metadata = { title: "Admin — News" };

export default async function AdminNewsPage() {
  const posts = await getNewsPosts();

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="font-mono mb-2 text-xs text-brass-bright">Admin</p>
          <h1 className="font-display text-3xl">News Posts</h1>
        </div>
        <Link href="/admin/news/new" className="btn-primary !px-5 !py-2.5">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-bone-dim">No news posted yet.</p>
      ) : (
        <div className="overflow-x-auto border border-hairline">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas-alt">
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Title</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Category</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Event Date</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Published</th>
                <th className="font-mono px-4 py-3 text-right text-[10px] uppercase tracking-wide text-brass-bright">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3.5 text-bone">{post.title}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.category}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.eventDate || "—"}</td>
                  <td className="px-4 py-3.5 text-bone-dim">{post.publishedAt}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/news/${post.id}/edit`}
                        className="font-mono text-[11px] uppercase tracking-wide text-brass-bright hover:underline"
                      >
                        Edit
                      </Link>
                      <ConfirmDeleteButton endpoint={`/api/news/${post.id}`} itemLabel="post" />
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
