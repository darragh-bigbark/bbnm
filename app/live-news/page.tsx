import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Live News | Big Bark News & Media",
  description: "Follow live breaking news and rolling coverage from across Ireland's canine community.",
};

export const dynamic = "force-dynamic";

export default async function LiveNewsPage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved", type: "live" },
    include: {
      author: { select: { name: true, organisation: true, orgType: true } },
      liveEntries: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="section-header mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#dc2626",
              boxShadow: "0 0 0 3px rgba(220,38,38,0.25)",
              animation: "livePulse 1.5s infinite",
              flexShrink: 0,
            }}
          />
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            Live News
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>
          Breaking news and rolling coverage from across Ireland&apos;s canine community
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-5">
          {posts.map((post) => {
            const date = post.publishedAt || post.createdAt;
            const latestEntry = post.liveEntries[0];
            const isActive = !post.liveEnded;

            return (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="no-underline block"
              >
                <div
                  className="live-card"
                  style={{
                    borderLeft: `4px solid ${isActive ? "#dc2626" : "var(--border)"}`,
                    border: `1px solid ${isActive ? "rgba(220,38,38,0.3)" : "var(--border)"}`,
                  }}
                >
                  <div className="p-6">
                    {/* Status + meta */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {isActive ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            background: "#fee2e2",
                            color: "#dc2626",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.65rem",
                            borderRadius: "999px",
                            border: "1px solid #fca5a5",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#dc2626",
                              animation: "livePulse 1.5s infinite",
                            }}
                          />
                          Live
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "#f3f4f6",
                            color: "var(--muted)",
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.65rem",
                            borderRadius: "999px",
                          }}
                        >
                          Ended
                        </span>
                      )}
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        {formatDate(date)}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        {post.author.organisation}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-bold text-xl mb-2 leading-snug"
                      style={{ color: "var(--navy)" }}
                    >
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                      {post.summary.length > 160
                        ? post.summary.slice(0, 160) + "…"
                        : post.summary}
                    </p>

                    {/* Latest entry preview */}
                    {latestEntry && (
                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                          paddingTop: "0.85rem",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "0.75rem",
                            color: "var(--gold)",
                            whiteSpace: "nowrap",
                            marginTop: "1px",
                          }}
                        >
                          {new Date(latestEntry.createdAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <p className="text-sm leading-snug" style={{ color: "var(--muted)" }}>
                          {latestEntry.heading ? (
                            <span className="font-semibold" style={{ color: "var(--navy)" }}>
                              {latestEntry.heading}
                            </span>
                          ) : (
                            latestEntry.content.replace(/<[^>]+>/g, " ").trim().slice(0, 120) + "…"
                          )}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 text-xs font-semibold" style={{ color: "var(--muted)" }}>
                      Follow for live updates →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📡</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            No live blogs running right now
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Check back soon for breaking news and live coverage.
          </p>
        </div>
      )}

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
