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
  author: { name: string; organisation: string; orgType: string };
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

function PlaceholderIcon({ type }: { type: string }) {
  if (type === "press_release") {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    );
  }
  if (type === "event") {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function PostImage({
  post,
  className,
  style,
}: {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ph = TYPE_PLACEHOLDER[post.type] ?? { from: "#1b3a6b", to: "#3b5ea6" };
  return post.imageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.imageUrl}
      alt={post.title}
      className={`w-full h-full object-cover ${className ?? ""}`}
      style={style}
    />
  ) : (
    <div
      className={`w-full h-full flex items-center justify-center ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, ${ph.from} 0%, ${ph.to} 100%)`,
        ...style,
      }}
    >
      <PlaceholderIcon type={post.type} />
    </div>
  );
}

// ── Featured card (large, left 2/3) ─────────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  const accent = TYPE_ACCENT[post.type] ?? "var(--gold)";
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/posts/${post.slug}`} className="no-underline block h-full group">
      <article className="bg-white rounded-xl overflow-hidden border h-full flex flex-col" style={{ borderColor: "var(--border)", borderTop: `3px solid ${accent}` }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <PostImage post={post} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-3 left-3">
            <span className={`badge badge-${post.type}`}>
              {POST_TYPE_LABELS[post.type] ?? post.type}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2
            className="font-bold leading-snug mb-3 transition-colors"
            style={{ color: "var(--navy)", fontSize: "1.35rem", lineHeight: 1.35 }}
          >
            {post.title}
          </h2>
          <p className="text-sm flex-1 mb-4" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
            {post.summary.length > 180 ? post.summary.slice(0, 180) + "…" : post.summary}
          </p>
          <div
            className="flex items-center justify-between text-xs border-t pt-3"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className="font-medium truncate mr-2">{post.author.organisation}</span>
            <span className="shrink-0">{formatDate(date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Compact card (stacked, right 1/3) ───────────────────────────────────────
function CompactCard({ post }: { post: Post }) {
  const accent = TYPE_ACCENT[post.type] ?? "var(--gold)";
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/posts/${post.slug}`} className="no-underline block group">
      <article className="bg-white rounded-xl overflow-hidden border flex h-full" style={{ borderColor: "var(--border)", borderLeft: `3px solid ${accent}` }}>
        <div className="relative shrink-0 overflow-hidden" style={{ width: "110px" }}>
          <PostImage post={post} className="transition-transform duration-500 group-hover:scale-105" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div className="p-4 flex flex-col justify-between min-w-0">
          <div>
            <span className={`badge badge-${post.type} mb-2 block w-fit`} style={{ fontSize: "0.68rem" }}>
              {POST_TYPE_LABELS[post.type] ?? post.type}
            </span>
            <h3
              className="font-bold leading-snug"
              style={{ color: "var(--navy)", fontSize: "0.92rem", lineHeight: 1.35 }}
            >
              {post.title.length > 80 ? post.title.slice(0, 80) + "…" : post.title}
            </h3>
          </div>
          <div className="text-xs mt-3" style={{ color: "var(--muted)" }}>
            <span className="block truncate">{post.author.organisation}</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Standard card (bottom row, 1/3 width) ────────────────────────────────────
function StandardCard({ post }: { post: Post }) {
  const accent = TYPE_ACCENT[post.type] ?? "var(--gold)";
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/posts/${post.slug}`} className="no-underline block group">
      <article className="bg-white rounded-xl overflow-hidden border h-full flex flex-col" style={{ borderColor: "var(--border)", borderTop: `3px solid ${accent}` }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <PostImage post={post} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-2 left-2">
            <span className={`badge badge-${post.type}`} style={{ fontSize: "0.68rem" }}>
              {POST_TYPE_LABELS[post.type] ?? post.type}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3
            className="font-bold leading-snug mb-2 flex-1"
            style={{ color: "var(--navy)", fontSize: "1rem", lineHeight: 1.35 }}
          >
            {post.title.length > 90 ? post.title.slice(0, 90) + "…" : post.title}
          </h3>
          <div
            className="flex items-center justify-between text-xs border-t pt-3"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className="truncate mr-2">{post.author.organisation}</span>
            <span className="shrink-0">{formatDate(date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function MagazineGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  const [featured, second, third, ...rest] = posts;

  return (
    <div>
      {/* Row 1: featured (left 1/2) + 2 stacked (right 1/2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div>
          <FeaturedCard post={featured} />
        </div>
        <div className="flex flex-col gap-5">
          {second && (
            <div className="flex-1">
              <CompactCard post={second} />
            </div>
          )}
          {third && (
            <div className="flex-1">
              <CompactCard post={third} />
            </div>
          )}
        </div>
      </div>

      {/* Row 2: up to 3 equal cards */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.slice(0, 3).map((post) => (
            <StandardCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
