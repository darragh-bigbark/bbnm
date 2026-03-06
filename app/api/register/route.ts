import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendUserVerificationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, organisation, orgType } = body;

  if (!name || !email || !password || !organisation || !orgType) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const emailVerifyToken = crypto.randomUUID();

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      organisation,
      orgType,
      role: "submitter",
      approved: false,
      emailVerified: false,
      emailVerifyToken,
    },
  });

  await sendUserVerificationEmail(email, name, emailVerifyToken);

  return NextResponse.json({ ok: true }, { status: 201 });
}
