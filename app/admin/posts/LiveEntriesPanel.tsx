"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import { formatDate } from "@/lib/utils";

type LiveEntry = {
  id: string;
  heading: string | null;
  content: string;
  createdAt: string;
};

type Props = {
  postId: string;
  liveEnded: boolean;
  entries: LiveEntry[];
};

export default function LiveEntriesPanel({ postId, liveEnded: initialLiveEnded, entries: initialEntries }: Props) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [liveEnded, setLiveEnded] = useState(initialLiveEnded);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!content || content === "<p></p>") {
      setError("Entry content is required.");
      return;
    }
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/live-entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, heading: heading || null, content }),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add entry.");
      return;
    }

    const newEntry = await res.json();
    setEntries([{ ...newEntry, createdAt: newEntry.createdAt }, ...entries]);
    setHeading("");
    setContent("");
  }

  async function deleteEntry(id: string) {
    if (!confirm("Delete this entry?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/live-entries/${id}`, { method: "DELETE" });
    setEntries(entries.filter((e) => e.id !== id));
    setDeletingId(null);
  }

  async function toggleLiveStatus() {
    setTogglingStatus(true);
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liveEnded: !liveEnded }),
    });
    setTogglingStatus(false);
    if (res.ok) {
      setLiveEnded(!liveEnded);
      router.refresh();
    }
  }

  return (
    <div
      style={{
        marginTop: "2.5rem",
        border: "2px solid var(--border)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: liveEnded ? "#f9fafb" : "var(--navy)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {!liveEnded && (
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 0 3px rgba(239,68,68,0.3)",
                animation: "pulse 1.5s infinite",
              }}
            />
          )}
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: liveEnded ? "var(--navy)" : "#fff",
            }}
          >
            {liveEnded ? "Live Blog — Ended" : "Live Blog — LIVE"}
          </span>
          <span
            style={{
              background: liveEnded ? "var(--border)" : "rgba(255,255,255,0.15)",
              color: liveEnded ? "var(--muted)" : "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.15rem 0.6rem",
              borderRadius: "999px",
            }}
          >
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        <button
          type="button"
          onClick={toggleLiveStatus}
          disabled={togglingStatus}
          style={{
            padding: "0.4rem 1rem",
            background: liveEnded ? "#16a34a" : "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            fontWeight: 700,
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          {togglingStatus ? "Updating…" : liveEnded ? "Re-open Live Blog" : "End Live Blog"}
        </button>
      </div>

      <div style={{ padding: "1.25rem", background: "#fff" }}>
        {/* Add entry form */}
        {!liveEnded && (
          <form onSubmit={addEntry} style={{ marginBottom: "1.5rem" }}>
            <p
              className="font-semibold mb-3"
              style={{ color: "var(--navy)", fontSize: "0.9rem" }}
            >
              Add New Entry
            </p>

            {error && (
              <div
                className="mb-3 p-2 rounded text-sm"
                style={{ background: "#fee2e2", color: "#dc2626" }}
              >
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Heading (optional)</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g. Breaking: New development…"
              />
            </div>
            <div className="form-group">
              <label>Content *</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Adding…" : "Add Entry"}
            </button>
          </form>
        )}

        {/* Existing entries */}
        {entries.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>
            No entries yet. Add the first update above.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {entries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "#fafafa",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--gold)",
                        display: "block",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {formatDate(entry.createdAt)}{" "}
                      {new Date(entry.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {entry.heading && (
                      <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy)" }}>
                        {entry.heading}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteEntry(entry.id)}
                    disabled={deletingId === entry.id}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#dc2626",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      flexShrink: 0,
                    }}
                  >
                    {deletingId === entry.id ? "…" : "Delete"}
                  </button>
                </div>
                <div
                  className="prose"
                  style={{ fontSize: "0.875rem", color: "var(--muted)" }}
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
