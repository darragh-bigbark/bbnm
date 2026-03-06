"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

type PostData = {
  id?: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  content: string;
  imageUrl: string;
  status: string;
  eventDate: string;
  eventVenue: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
};

function localSlugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor({ initial }: { initial?: Partial<PostData> & { id?: string } }) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [form, setForm] = useState<PostData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    type: initial?.type ?? "news",
    summary: initial?.summary ?? "",
    content: initial?.content ?? "",
    imageUrl: initial?.imageUrl ?? "",
    status: initial?.status ?? "approved",
    eventDate: initial?.eventDate ?? "",
    eventVenue: initial?.eventVenue ?? "",
    contactName: initial?.contactName ?? "",
    contactEmail: initial?.contactEmail ?? "",
    contactPhone: initial?.contactPhone ?? "",
    websiteUrl: initial?.websiteUrl ?? "",
  });

  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (!slugLocked) {
      setForm((f) => ({ ...f, slug: localSlugify(f.title) }));
    }
  }, [form.title, slugLocked]);

  function set(field: keyof PostData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      imageUrl: form.imageUrl || null,
      eventDate: form.eventDate || null,
      eventVenue: form.eventVenue || null,
      contactName: form.contactName || null,
      contactEmail: form.contactEmail || null,
      contactPhone: form.contactPhone || null,
      websiteUrl: form.websiteUrl || null,
      isLive: form.type === "live",
    };

    const res = isEdit
      ? await fetch(`/api/posts/${initial!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save post.");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "860px" }}>
      {error && (
        <div
          className="mb-5 p-3 rounded-lg text-sm"
          style={{ background: "#fee2e2", color: "#dc2626" }}
        >
          {error}
        </div>
      )}

      {/* Title */}
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          placeholder="Enter post title…"
        />
      </div>

      {/* Slug */}
      <div className="form-group">
        <label>Slug *</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => {
            setSlugLocked(true);
            set("slug", e.target.value);
          }}
          required
          placeholder="post-slug"
        />
        {isEdit && (
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            ⚠️ Changing the slug will break existing links to this post.
          </p>
        )}
      </div>

      {/* Type + Status */}
      <div
        className="form-group"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label>Type *</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)}>
            <option value="news">News</option>
            <option value="press_release">Press Release</option>
            <option value="event">Event</option>
            <option value="live">Live Blog</option>
          </select>
        </div>
        <div>
          <label>Status *</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="approved">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="form-group">
        <label>Summary *</label>
        <textarea
          rows={3}
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          required
          placeholder="Brief summary shown in listings and SEO…"
        />
      </div>

      {/* Cover image */}
      <div className="form-group">
        <label>Cover Image URL</label>
        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://…"
        />
      </div>

      {/* Content */}
      <div className="form-group">
        <label>
          {form.type === "live" ? "Intro / Opening Content" : "Content"} *
        </label>
        {form.type === "live" && (
          <p className="mb-2 text-xs" style={{ color: "var(--muted)" }}>
            This is the opening text shown above the live entries. Add timestamped live updates from
            the edit page after saving.
          </p>
        )}
        <RichTextEditor content={form.content} onChange={(html) => set("content", html)} />
      </div>

      {/* Event-specific fields */}
      {form.type === "event" && (
        <div
          className="form-group"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
          }}
        >
          <p className="font-semibold mb-4" style={{ color: "var(--navy)", fontSize: "0.95rem" }}>
            Event Details
          </p>
          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => set("eventDate", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              value={form.eventVenue}
              onChange={(e) => set("eventVenue", e.target.value)}
              placeholder="Event venue or location"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Contact Name</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => set("contactName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(e) => set("contactPhone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Website URL</label>
              <input
                type="url"
                value={form.websiteUrl}
                onChange={(e) => set("websiteUrl", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingTop: "0.5rem" }}>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
        </button>
        <a href="/admin/posts" className="btn-outline">
          Cancel
        </a>
      </div>
    </form>
  );
}
