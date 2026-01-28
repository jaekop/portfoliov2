import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json({ ok: true, profile });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
