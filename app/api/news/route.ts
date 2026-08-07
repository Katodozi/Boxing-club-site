import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createNews, getNewsPosts } from "@/lib/news";
import { newsSchema } from "@/lib/validation";

export async function GET() {
  const posts = await getNewsPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = newsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 }
    );
  }

  const post = await createNews(parsed.data);
  return NextResponse.json({ post }, { status: 201 });
}
