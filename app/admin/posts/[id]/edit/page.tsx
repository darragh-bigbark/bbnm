import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostEditor from "../../PostEditor";
import LiveEntriesPanel from "../../LiveEntriesPanel";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      liveEntries: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post) notFound();

  const serialised = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    type: post.type,
    summary: post.summary,
    content: post.content,
    imageUrl: post.imageUrl ?? "",
    status: post.status,
    eventDate: post.eventDate ?? "",
    eventVenue: post.eventVenue ?? "",
    contactName: post.contactName ?? "",
    contactEmail: post.contactEmail ?? "",
    contactPhone: post.contactPhone ?? "",
    websiteUrl: post.websiteUrl ?? "",
  };

  const entries = post.liveEntries.map((e) => ({
    id: e.id,
    heading: e.heading,
    content: e.content,
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="section-header mb-8">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              Edit Post
            </h1>
            <p style={{ color: "var(--muted)" }}>{post.title}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem" }}>
            <a
              href={`/posts/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View Post ↗
            </a>
            <Link href="/admin/posts" className="btn-outline">
              ← Back to Posts
            </Link>
          </div>
        </div>
      </div>

      <PostEditor initial={serialised} />

      {post.type === "live" && (
        <LiveEntriesPanel
          postId={post.id}
          liveEnded={post.liveEnded}
          entries={entries}
        />
      )}
    </div>
  );
}
