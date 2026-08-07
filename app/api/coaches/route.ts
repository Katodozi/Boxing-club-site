import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCoach, getCoaches } from "@/lib/coaches";
import { coachSchema } from "@/lib/validation";

export async function GET() {
  const coaches = await getCoaches();
  return NextResponse.json({ coaches });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = coachSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 }
    );
  }

  const coach = await createCoach(parsed.data);
  return NextResponse.json({ coach }, { status: 201 });
}
