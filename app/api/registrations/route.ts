import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createRegistration, getRegistrations } from "@/lib/registrations";
import { registrationSchema } from "@/lib/validation";

// Public: submit the Join / Book a Trial form.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    const registration = await createRegistration(parsed.data);
    return NextResponse.json({ registration }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// Admin only: list all registrations.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const registrations = await getRegistrations();
  return NextResponse.json({ registrations });
}
