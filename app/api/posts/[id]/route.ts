import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendPostNotification } from "@/lib/mail";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  if (!user?.role || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  if (!user?.role || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();

  const {
    title, slug, type, summary, content, imageUrl,
    eventDate, eventVenue, contactName, contactEmail,
    contactPhone, websiteUrl, status, isLive, liveEnded,
  } = body;

  // Build update data — only include fields that were sent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = {};
  if (title !== undefined) data.title = title;
  if (slug !== undefined) data.slug = slug;
  if (type !== undefined) data.type = type;
  if (summary !== undefined) data.summary = summary;
  if (content !== undefined) data.content = content;
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (eventDate !== undefined) data.eventDate = eventDate || null;
  if (eventVenue !== undefined) data.eventVenue = eventVenue || null;
  if (contactName !== undefined) data.contactName = contactName || null;
  if (contactEmail !== undefined) data.contactEmail = contactEmail || null;
  if (contactPhone !== undefined) data.contactPhone = contactPhone || null;
  if (websiteUrl !== undefined) data.websiteUrl = websiteUrl || null;
  if (isLive !== undefined) data.isLive = isLive;
  if (liveEnded !== undefined) data.liveEnded = liveEnded;

  if (status !== undefined) {
    data.status = status;
    // Set publishedAt when approving if not already set
    if (status === "approved") {
      const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
      if (!existing?.publishedAt) data.publishedAt = new Date();
    }
  }

  const post = await prisma.post.update({ where: { id }, data });

  // Send subscriber notification when newly approved
  if (status === "approved") {
    const subscribers = await prisma.subscriber.findMany({ where: { confirmed: true } });
    if (subscribers.length > 0) {
      sendPostNotification(post, subscribers).catch(console.error);
    }
  }

  return NextResponse.json(post);
}
