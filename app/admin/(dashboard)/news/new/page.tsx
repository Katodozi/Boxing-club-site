import NewsForm from "@/components/admin/NewsForm";

export const metadata = { title: "Admin — New News Post" };

export default function NewNewsPage() {
  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — News</p>
      <h1 className="font-display mb-10 text-3xl">New Post</h1>
      <NewsForm />
    </div>
  );
}
