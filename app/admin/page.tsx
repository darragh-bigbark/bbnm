import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [posts, users, subscribers] = await Promise.all([
    prisma.post.findMany({
      include: { author: { select: { name: true, organisation: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const pending = posts.filter((p) => p.status === "pending");
  const approved = posts.filter((p) => p.status === "approved");
  const confirmedSubs = subscribers.filter((s) => s.confirmed);

  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      sub: `${approved.length} published`,
      bg: "#f0f4ff",
      border: "#c7d2fe",
      color: "var(--navy)",
    },
    {
      label: "Pending Review",
      value: pending.length,
      sub: "need attention",
      bg: "#fef3c7",
      border: "#fde68a",
      color: "#92400e",
    },
    {
      label: "Registered Users",
      value: users.length,
      sub: `${users.filter((u) => u.role === "admin").length} admin(s)`,
      bg: "#ede9fe",
      border: "#ddd6fe",
      color: "#5b21b6",
    },
    {
      label: "Subscribers",
      value: confirmedSubs.length,
      sub: `${subscribers.length - confirmedSubs.length} unconfirmed`,
      bg: "#dcfce7",
      border: "#bbf7d0",
      color: "#166534",
    },
  ];

  return (
    <div>
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--muted)" }}>Welcome back — here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5 border"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <div className="text-4xl font-bold mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm font-semibold" style={{ color: s.color }}>
              {s.label}
            </div>
            <div className="text-xs mt-1" style={{ color: s.color, opacity: 0.65 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending posts */}
        <div className="bg-white rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="font-bold text-base" style={{ color: "var(--navy)" }}>
              Needs Attention
            </h2>
            <Link
              href="/admin/posts"
              className="text-sm no-underline font-medium"
              style={{ color: "var(--gold)" }}
            >
              View all →
            </Link>
          </div>
          {pending.length === 0 ? (
            <div className="px-6 py-10 text-sm text-center" style={{ color: "var(--muted)" }}>
              No pending posts — you&apos;re all caught up!
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {pending.slice(0, 6).map((post) => (
                <div key={post.id} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <a
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm no-underline block truncate"
                      style={{ color: "var(--navy)" }}
                    >
                      {post.title}
                    </a>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {post.author.organisation} · {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <span className="badge badge-pending shrink-0">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent registrations */}
        <div className="bg-white rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="font-bold text-base" style={{ color: "var(--navy)" }}>
              Recent Registrations
            </h2>
            <Link
              href="/admin/users"
              className="text-sm no-underline font-medium"
              style={{ color: "var(--gold)" }}
            >
              View all →
            </Link>
          </div>
          {users.length === 0 ? (
            <div className="px-6 py-10 text-sm text-center" style={{ color: "var(--muted)" }}>
              No users yet.
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {users.slice(0, 6).map((u) => (
                <div key={u.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "var(--navy)" }}>
                      {u.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      {u.organisation} · {formatDate(u.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`badge shrink-0 ${u.role === "admin" ? "badge-event" : "badge-news"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
