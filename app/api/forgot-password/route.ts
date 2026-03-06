import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

// Always return the same response to prevent email enumeration
const OK = NextResponse.json({ ok: true });

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) return OK;

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return OK;

  const token = crypto.randomUUID();
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: token, passwordResetExpiry: expiry },
  });

  await sendPasswordResetEmail(user.email, user.name, token).catch(() => {});

  return OK;
}
