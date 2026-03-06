import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  if (!user?.role || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminUser = await prisma.user.findUnique({ where: { email: user.email! } });
  if (!adminUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const {
    title, type, summary, content, imageUrl,
    eventDate, eventVenue, contactName, contactEmail,
    contactPhone, websiteUrl, status, isLive,
  } = body;

  if (!title || !type || !summary || !content) {
    return NextResponse.json(
      { error: "Title, type, summary and content are required" },
      { status: 400 }
    );
  }

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const publishedAt = status === "approved" ? new Date() : null;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      type,
      summary,
      content,
      imageUrl: imageUrl || null,
      eventDate: eventDate || null,
      eventVenue: eventVenue || null,
      contactName: contactName || null,
      contactEmail: contactEmail || null,
      contactPhone: contactPhone || null,
      websiteUrl: websiteUrl || null,
      status: status || "approved",
      isLive: isLive ?? type === "live",
      liveEnded: false,
      publishedAt,
      authorId: adminUser.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
