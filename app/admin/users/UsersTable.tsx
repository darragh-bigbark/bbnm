"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  orgType: string;
  role: string;
  createdAt: string;
  _count: { posts: number };
  password?: undefined;
};

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organisation.toLowerCase().includes(q)
    );
  });

  async function toggleRole(user: User) {
    const newRole = user.role === "admin" ? "submitter" : "admin";
    if (
      !confirm(
        `Change ${user.name}'s role from "${user.role}" to "${newRole}"?`
      )
    )
      return;
    setLoading(`${user.id}-role`);
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    setLoading(null);
    router.refresh();
  }

  async function deleteUser(user: User) {
    if (
      !confirm(
        `Delete ${user.name}? This will also delete all their posts. This cannot be undone.`
      )
    )
      return;
    setLoading(`${user.id}-delete`);
    await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    setLoading(null);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, email or organisation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "360px" }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "var(--muted)" }}>
          No users match your search.
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "#f9fafb" }}>
                {["Name", "Email", "Organisation", "Org Type", "Role", "Posts", "Joined", "Actions"].map(
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
              {filtered.map((user, i) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--navy)", whiteSpace: "nowrap" }}>
                    {user.name}
                  </td>

                  <td className="px-4 py-3" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {user.email}
                  </td>

                  <td className="px-4 py-3" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {user.organisation}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${user.orgType}`}>
                      {user.orgType === "charity" ? "Charity" : "Business"}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`badge ${user.role === "admin" ? "badge-event" : "badge-news"}`}
                      style={{ fontSize: "0.72rem" }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td
                    className="px-4 py-3 text-center font-medium"
                    style={{ color: "var(--navy)" }}
                  >
                    {user._count.posts}
                  </td>

                  <td
                    className="px-4 py-3 whitespace-nowrap"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleRole(user)}
                        disabled={loading === `${user.id}-role`}
                        className="btn-outline"
                        style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                      >
                        {user.role === "admin" ? "Make Submitter" : "Make Admin"}
                      </button>
                      <button
                        onClick={() => deleteUser(user)}
                        disabled={loading === `${user.id}-delete`}
                        className="btn-danger"
                        style={{
                          padding: "0.3rem 0.75rem",
                          fontSize: "0.78rem",
                          background: "#6b7280",
                        }}
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
