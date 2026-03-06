import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  const entries = await prisma.liveEntry.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}
