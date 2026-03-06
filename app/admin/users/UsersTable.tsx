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

type EditForm = { email: string; password: string };
type AddForm = { name: string; email: string; password: string; organisation: string; orgType: string; role: string };

const EMPTY_ADD: AddForm = { name: "", email: "", password: "", organisation: "", orgType: "business", role: "submitter" };

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  // Edit modal
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ email: "", password: "" });
  const [editError, setEditError] = useState("");

  // Add modal
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<AddForm>(EMPTY_ADD);
  const [addError, setAddError] = useState("");

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
    if (!confirm(`Change ${user.name}'s role from "${user.role}" to "${newRole}"?`)) return;
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
    if (!confirm(`Delete ${user.name}? This will also delete all their posts. This cannot be undone.`)) return;
    setLoading(`${user.id}-delete`);
    await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    setLoading(null);
    router.refresh();
  }

  function openEdit(user: User) {
    setEditUser(user);
    setEditForm({ email: user.email, password: "" });
    setEditError("");
  }

  async function saveEdit() {
    if (!editUser) return;
    if (!editForm.email) { setEditError("Email is required."); return; }
    setLoading("edit");
    const body: Record<string, string> = { email: editForm.email };
    if (editForm.password) body.password = editForm.password;
    const res = await fetch(`/api/admin/users/${editUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(null);
    if (!res.ok) {
      const d = await res.json();
      setEditError(d.error ?? "Something went wrong.");
      return;
    }
    setEditUser(null);
    router.refresh();
  }

  async function saveAdd() {
    if (!addForm.name || !addForm.email || !addForm.password || !addForm.organisation) {
      setAddError("All fields are required.");
      return;
    }
    setLoading("add");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setLoading(null);
    if (!res.ok) {
      const d = await res.json();
      setAddError(d.error ?? "Something went wrong.");
      return;
    }
    setShowAdd(false);
    setAddForm(EMPTY_ADD);
    setAddError("");
    router.refresh();
  }

  const inputStyle = { width: "100%", marginBottom: "0.75rem" };
  const labelStyle = { display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--navy)" };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, email or organisation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "360px" }}
        />
        <button className="btn-primary" onClick={() => { setShowAdd(true); setAddError(""); }}>
          + Add User
        </button>
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
                {["Name", "Email", "Organisation", "Org Type", "Role", "Posts", "Joined", "Actions"].map((h) => (
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
              {filtered.map((user, i) => (
                <tr
                  key={user.id}
                  style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "#fff" : "#fafafa" }}
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
                    <span className={`badge ${user.role === "admin" ? "badge-event" : "badge-news"}`} style={{ fontSize: "0.72rem" }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-medium" style={{ color: "var(--navy)" }}>
                    {user._count.posts}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--muted)" }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEdit(user)}
                        className="btn-outline"
                        style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                      >
                        Edit
                      </button>
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
                        style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem", background: "#6b7280" }}
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

      {/* Edit Modal */}
      {editUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditUser(null); }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-1" style={{ color: "var(--navy)" }}>Edit User</h2>
            <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>{editUser.name}</p>

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
              style={inputStyle}
            />

            <label style={labelStyle}>New Password <span style={{ fontWeight: 400, color: "var(--muted)" }}>(leave blank to keep current)</span></label>
            <input
              type="password"
              placeholder="••••••••"
              value={editForm.password}
              onChange={(e) => setEditForm((f) => ({ ...f, password: e.target.value }))}
              style={inputStyle}
            />

            {editError && <p className="text-sm mb-3" style={{ color: "#dc2626" }}>{editError}</p>}

            <div className="flex gap-3 mt-2">
              <button className="btn-primary" onClick={saveEdit} disabled={loading === "edit"}>
                {loading === "edit" ? "Saving…" : "Save Changes"}
              </button>
              <button className="btn-outline" onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--navy)" }}>Add User</h2>

            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={addForm.name}
              onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              style={inputStyle}
            />

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={addForm.email}
              onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
              style={inputStyle}
            />

            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={addForm.password}
              onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))}
              style={inputStyle}
            />

            <label style={labelStyle}>Organisation</label>
            <input
              type="text"
              value={addForm.organisation}
              onChange={(e) => setAddForm((f) => ({ ...f, organisation: e.target.value }))}
              style={inputStyle}
            />

            <label style={labelStyle}>Organisation Type</label>
            <select
              value={addForm.orgType}
              onChange={(e) => setAddForm((f) => ({ ...f, orgType: e.target.value }))}
              style={{ ...inputStyle }}
            >
              <option value="business">Business</option>
              <option value="charity">Charity</option>
            </select>

            <label style={labelStyle}>Role</label>
            <select
              value={addForm.role}
              onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
              style={{ ...inputStyle }}
            >
              <option value="submitter">Submitter</option>
              <option value="admin">Admin</option>
            </select>

            {addError && <p className="text-sm mb-3" style={{ color: "#dc2626" }}>{addError}</p>}

            <div className="flex gap-3 mt-2">
              <button className="btn-primary" onClick={saveAdd} disabled={loading === "add"}>
                {loading === "add" ? "Creating…" : "Create User"}
              </button>
              <button className="btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
