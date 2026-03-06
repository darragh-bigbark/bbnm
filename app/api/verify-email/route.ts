import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login?verifyError=1", req.url));
  }

  const user = await prisma.user.findUnique({ where: { emailVerifyToken: token } });

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login?verifyError=1", req.url));
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerifyToken: null },
  });

  return NextResponse.redirect(new URL("/auth/login?emailVerified=1", req.url));
}
