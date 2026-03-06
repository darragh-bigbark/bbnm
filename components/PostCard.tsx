import Link from "next/link";
import { formatDate, POST_TYPE_LABELS } from "@/lib/utils";

type Post = {
  id: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  imageUrl?: string | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  author: {
    name: string;
    organisation: string;
    orgType: string;
  };
};

const TYPE_ACCENT: Record<string, string> = {
  news: "#1d4ed8",
  press_release: "#d97706",
  event: "#16a34a",
};

const TYPE_PLACEHOLDER: Record<string, { from: string; to: string }> = {
  news: { from: "#1e3a8a", to: "#3b82f6" },
  press_release: { from: "#78350f", to: "#f59e0b" },
  event: { from: "#14532d", to: "#22c55e" },
};

export default function PostCard({ post }: { post: Post }) {
  const date = post.publishedAt || post.createdAt;
  const accent = TYPE_ACCENT[post.type] ?? "var(--gold)";
  const ph = TYPE_PLACEHOLDER[post.type] ?? { from: "#1b3a6b", to: "#3b5ea6" };

  return (
    <Link href={`/posts/${post.slug}`} className="no-underline block h-full group">
      <div
        className="card h-full flex flex-col"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {post.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${ph.from} 0%, ${ph.to} 100%)`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" />
                <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`badge badge-${post.type}`}>
              {POST_TYPE_LABELS[post.type] || post.type}
            </span>
            <span className={`badge badge-${post.author.orgType}`}>
              {post.author.orgType === "charity" ? "Charity" : "Business"}
            </span>
          </div>
          <h3
            className="font-bold mb-2 leading-snug flex-1"
            style={{ color: "var(--navy)", fontSize: "1rem", lineHeight: 1.35 }}
          >
            {post.title}
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            {post.summary.length > 120 ? post.summary.slice(0, 120) + "…" : post.summary}
          </p>
          <div
            className="text-xs border-t pt-3 flex items-center justify-between"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className="font-medium truncate mr-2">{post.author.organisation}</span>
            <span className="shrink-0">{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
