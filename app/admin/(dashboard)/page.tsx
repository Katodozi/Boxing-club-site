import Link from "next/link";
import { getBlogs } from "@/lib/blogs";
import { getNewsPosts } from "@/lib/news";
import { getCoaches } from "@/lib/coaches";
import { getRegistrations } from "@/lib/registrations";

export const metadata = { title: "Admin Dashboard — Iron Bell" };

export default async function AdminDashboardPage() {
  const [blogs, news, coaches, registrations] = await Promise.all([
    getBlogs(),
    getNewsPosts(),
    getCoaches(),
    getRegistrations(),
  ]);

  const newRegistrations = registrations.filter((r) => r.status === "new");

  const cards = [
    { label: "Blog Posts", count: blogs.length, href: "/admin/blogs" },
    { label: "News Posts", count: news.length, href: "/admin/news" },
    { label: "Coaches", count: coaches.length, href: "/admin/coaches" },
    {
      label: "New Registrations",
      count: newRegistrations.length,
      href: "/admin/registrations",
      highlight: newRegistrations.length > 0,
    },
  ];

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin</p>
      <h1 className="font-display mb-10 text-3xl">Dashboard</h1>

      <div className="mb-14 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-canvas-alt p-7 transition-colors hover:bg-[#241f16] ${
              card.highlight ? "ring-1 ring-inset ring-corner-red" : ""
            }`}
          >
            <span className="font-mono block text-4xl font-bold text-brass-bright">
              {card.count}
            </span>
            <span className="mt-2 block text-xs uppercase tracking-wide text-bone-dim">
              {card.label}
            </span>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg text-bone">Recent Registrations</h2>
          <Link href="/admin/registrations" className="font-mono text-xs text-brass-bright hover:underline">
            View all →
          </Link>
        </div>
        {registrations.length === 0 ? (
          <p className="text-sm text-bone-dim">No registrations yet.</p>
        ) : (
          <div className="overflow-x-auto border border-hairline">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline bg-canvas-alt">
                  <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Name</th>
                  <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Category</th>
                  <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Status</th>
                  <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.slice(0, 5).map((r) => (
                  <tr key={r.id} className="border-b border-hairline last:border-0">
                    <td className="px-4 py-3 text-bone">{r.name}</td>
                    <td className="px-4 py-3 text-bone-dim">{r.category}</td>
                    <td className="px-4 py-3 text-bone-dim">{r.status}</td>
                    <td className="px-4 py-3 text-bone-dim">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
