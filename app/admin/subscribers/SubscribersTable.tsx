"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

type Subscriber = {
  id: string;
  email: string;
  confirmed: boolean;
  createdAt: string;
};

const TABS = ["all", "confirmed", "unconfirmed"] as const;

const TAB_LABELS: Record<string, string> = {
  all: "All",
  confirmed: "Confirmed",
  unconfirmed: "Unconfirmed",
};

export default function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const counts = {
    all: subscribers.length,
    confirmed: subscribers.filter((s) => s.confirmed).length,
    unconfirmed: subscribers.filter((s) => !s.confirmed).length,
  };

  const filtered = subscribers.filter((s) => {
    const matchTab =
      tab === "all" ||
      (tab === "confirmed" && s.confirmed) ||
      (tab === "unconfirmed" && !s.confirmed);
    const matchSearch = !search || s.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  async function deleteSubscriber(id: string, email: string) {
    if (!confirm(`Remove ${email} from subscribers?`)) return;
    setLoading(id);
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    setLoading(null);
    router.refresh();
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by email…"
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
          No subscribers match your filters.
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "#f9fafb" }}>
                {["Email", "Status", "Subscribed", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                    style={{ color: "var(--muted)", whiteSpace: "nowrap" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, i) => (
                <tr
                  key={sub.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>
                    {sub.email}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {sub.confirmed ? (
                      <span className="badge badge-approved">Confirmed</span>
                    ) : (
                      <span className="badge badge-pending">Unconfirmed</span>
                    )}
                  </td>

                  <td
                    className="px-4 py-3 whitespace-nowrap"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(sub.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteSubscriber(sub.id, sub.email)}
                      disabled={loading === sub.id}
                      className="btn-danger"
                      style={{
                        padding: "0.3rem 0.75rem",
                        fontSize: "0.78rem",
                        background: "#6b7280",
                      }}
                    >
                      Remove
                    </button>
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
