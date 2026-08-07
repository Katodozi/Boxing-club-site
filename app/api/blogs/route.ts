import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createBlog, getBlogs } from "@/lib/blogs";
import { blogSchema } from "@/lib/validation";

export async function GET() {
  const posts = await getBlogs();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 }
    );
  }

  const post = await createBlog(parsed.data);
  return NextResponse.json({ post }, { status: 201 });
}
