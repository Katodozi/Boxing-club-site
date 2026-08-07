import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { getNewsById } from "@/lib/news";

export const metadata = { title: "Admin — Edit News Post" };

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getNewsById(id);
  if (!post) notFound();

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — News</p>
      <h1 className="font-display mb-10 text-3xl">Edit Post</h1>
      <NewsForm post={post} />
    </div>
  );
}
