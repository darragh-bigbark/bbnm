"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate, POST_TYPE_LABELS } from "@/lib/utils";

type Post = {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  createdAt: string;
  author: { name: string; organisation: string; orgType: string };
};

const TABS = ["all", "pending", "approved", "rejected"] as const;

const TAB_LABELS: Record<string, string> = {
  all: "All",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export default function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const counts = {
    all: posts.length,
    pending: posts.filter((p) => p.status === "pending").length,
    approved: posts.filter((p) => p.status === "approved").length,
    rejected: posts.filter((p) => p.status === "rejected").length,
  };

  const filtered = posts.filter((p) => {
    const matchTab = tab === "all" || p.status === tab;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.author.organisation.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  async function handleAction(postId: string, action: "approve" | "reject" | "delete") {
    if (action === "delete") {
      if (!confirm("Permanently delete this post?")) return;
    }
    setLoading(`${postId}-${action}`);
    if (action === "delete") {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    } else {
      await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
      });
    }
    setLoading(null);
    router.refresh();
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by title, organisation or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "360px" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors"
            style={{
              color: tab === t ? "var(--navy)" : "var(--muted)",
              borderBottom: tab === t ? "2px solid var(--gold)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {TAB_LABELS[t]}
            <span
              className="ml-2 px-1.5 py-0.5 rounded text-xs"
              style={{
                background: tab === t ? "var(--gold)" : "var(--border)",
                color: tab === t ? "#fff" : "var(--muted)",
              }}
            >
              {counts[t as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "var(--muted)" }}>
          No posts match your filters.
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "#f9fafb" }}>
                {["Title", "Type", "Org Type", "Organisation", "Status", "Date", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                      style={{ color: "var(--muted)", whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                >
                  <td className="px-4 py-3" style={{ maxWidth: "220px" }}>
                    <a
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium no-underline block leading-snug"
                      style={{ color: "var(--navy)" }}
                    >
                      {post.title.length > 55 ? post.title.slice(0, 55) + "…" : post.title}
                    </a>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      {post.author.name}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.type}`}>
                      {POST_TYPE_LABELS[post.type] ?? post.type}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.author.orgType}`}>
                      {post.author.orgType === "charity" ? "Charity" : "Business"}
                    </span>
                  </td>

                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {post.author.organisation}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.status}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>

                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <a
                        href={`/admin/posts/${post.id}/edit`}
                        style={{
                          padding: "0.3rem 0.75rem",
                          fontSize: "0.78rem",
                          background: "var(--navy)",
                          color: "#fff",
                          borderRadius: "0.375rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        Edit
                      </a>
                      {post.status !== "approved" && (
                        <button
                          className="btn-success"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                          disabled={loading === `${post.id}-approve`}
                          onClick={() => handleAction(post.id, "approve")}
                        >
                          Approve
                        </button>
                      )}
                      {post.status !== "rejected" && (
                        <button
                          className="btn-danger"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                          disabled={loading === `${post.id}-reject`}
                          onClick={() => handleAction(post.id, "reject")}
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className="btn-danger"
                        style={{
                          padding: "0.3rem 0.75rem",
                          fontSize: "0.78rem",
                          background: "#6b7280",
                        }}
                        disabled={loading === `${post.id}-delete`}
                        onClick={() => handleAction(post.id, "delete")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
