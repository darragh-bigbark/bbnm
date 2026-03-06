import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, POST_TYPE_LABELS } from "@/lib/utils";
import LiveBlog from "@/components/LiveBlog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, summary: true },
  });
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Big Bark News & Media`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      liveEntries: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post || post.status !== "approved") {
    notFound();
  }

  const date = post.publishedAt || post.createdAt;
  const isLive = post.type === "live";

  const backHref =
    post.type === "news" || post.type === "live"
      ? "/news"
      : post.type === "press_release"
      ? "/press-releases"
      : "/events";

  const serialisedEntries = post.liveEntries.map((e) => ({
    id: e.id,
    heading: e.heading,
    content: e.content,
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm font-semibold mb-8 no-underline"
        style={{ color: "var(--navy)" }}
      >
        &larr; Back
      </Link>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {isLive && !post.liveEnded ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#fee2e2",
              color: "#dc2626",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "0.2rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #fca5a5",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#dc2626",
                animation: "livePulse 1.5s infinite",
              }}
            />
            Live
          </span>
        ) : (
          <span className={`badge badge-${post.type}`}>
            {POST_TYPE_LABELS[post.type] || post.type}
          </span>
        )}
        <span className={`badge badge-${post.author.orgType}`}>
          {post.author.orgType === "charity" ? "Charity" : "Business"}
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
        style={{ color: "var(--navy)" }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8 text-sm"
        style={{ color: "var(--muted)" }}
      >
        <span>Published {formatDate(date)}</span>
        <span>&bull;</span>
        <span>
          {post.author.name},{" "}
          <span className="font-semibold">{post.author.organisation}</span>
        </span>
      </div>

      {/* Event details box */}
      {post.type === "event" && (post.eventDate || post.eventVenue) && (
        <div
          className="rounded-xl p-5 mb-8 border-l-4 flex flex-col gap-2"
          style={{ background: "#fef9e7", borderColor: "var(--gold)" }}
        >
          <div
            className="font-bold text-base flex items-center gap-2"
            style={{ color: "var(--navy)" }}
          >
            <span>📅</span> Event Details
          </div>
          {post.eventDate && (
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              <span className="font-semibold" style={{ color: "var(--navy)" }}>Date:</span>{" "}
              {formatDate(post.eventDate)}
            </div>
          )}
          {post.eventVenue && (
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              <span className="font-semibold" style={{ color: "var(--navy)" }}>Venue:</span>{" "}
              {post.eventVenue}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <p className="text-lg mb-8 leading-relaxed font-medium" style={{ color: "var(--muted)" }}>
        {post.summary}
      </p>

      {/* Divider */}
      <hr className="mb-8" style={{ borderColor: "var(--border)" }} />

      {/* Content */}
      {post.content && post.content !== "<p></p>" && (
        <div
          className="prose max-w-none mb-10 leading-relaxed"
          style={{ color: "var(--text, #1a1a1a)" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {/* Live Blog entries */}
      {isLive && (
        <LiveBlog
          postId={post.id}
          liveEnded={post.liveEnded}
          initialEntries={serialisedEntries}
        />
      )}

      {/* Contact info */}
      {(post.contactName || post.contactEmail || post.contactPhone) && (
        <div
          className="rounded-xl p-5 mb-6 border"
          style={{ background: "#f0f4ff", borderColor: "#c7d2fe" }}
        >
          <div
            className="font-bold text-base flex items-center gap-2 mb-3"
            style={{ color: "var(--navy)" }}
          >
            <span>📞</span> Contact Information
          </div>
          <div className="flex flex-col gap-1 text-sm" style={{ color: "var(--muted)" }}>
            {post.contactName && (
              <div>
                <span className="font-semibold" style={{ color: "var(--navy)" }}>Name:</span>{" "}
                {post.contactName}
              </div>
            )}
            {post.contactEmail && (
              <div>
                <span className="font-semibold" style={{ color: "var(--navy)" }}>Email:</span>{" "}
                <a href={`mailto:${post.contactEmail}`} style={{ color: "var(--navy)" }}>
                  {post.contactEmail}
                </a>
              </div>
            )}
            {post.contactPhone && (
              <div>
                <span className="font-semibold" style={{ color: "var(--navy)" }}>Phone:</span>{" "}
                <a href={`tel:${post.contactPhone}`} style={{ color: "var(--navy)" }}>
                  {post.contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Website link */}
      {post.websiteUrl && (
        <div className="mb-8">
          <a
            href={post.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Visit Website &rarr;
          </a>
        </div>
      )}

      {/* Footer attribution */}
      <div
        className="rounded-xl p-4 text-sm border-t"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        Submitted by <span className="font-semibold">{post.author.name}</span> on behalf of{" "}
        <span className="font-semibold">{post.author.organisation}</span>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
