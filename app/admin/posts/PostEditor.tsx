"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Upload failed.");
      return;
    }

    const { url } = await res.json();
    onChange(url);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      {value ? (
        /* Preview */
        <div
          style={{
            position: "relative",
            borderRadius: "0.75rem",
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#f9fafb",
          }}
        >
          <Image
            src={value}
            alt="Cover preview"
            width={800}
            height={400}
            style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
            unoptimized
          />
          <div
            style={{
              position: "absolute",
              top: "0.6rem",
              right: "0.6rem",
              display: "flex",
              gap: "0.4rem",
            }}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                padding: "0.3rem 0.7rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                color: "var(--navy)",
              }}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              style={{
                background: "rgba(220,38,38,0.9)",
                border: "none",
                borderRadius: "0.375rem",
                padding: "0.3rem 0.7rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                color: "#fff",
              }}
            >
              Remove
            </button>
          </div>
          {uploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              Uploading…
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed var(--border)",
            borderRadius: "0.75rem",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            cursor: "pointer",
            background: "#fafafa",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)";
            (e.currentTarget as HTMLDivElement).style.background = "#fef9f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLDivElement).style.background = "#fafafa";
          }}
        >
          {uploading ? (
            <p style={{ color: "var(--navy)", fontWeight: 700 }}>Uploading…</p>
          ) : (
            <>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</div>
              <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.25rem" }}>
                Click to upload or drag &amp; drop
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                PNG, JPG, WebP — max 5MB
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
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

      {/* Cover image upload */}
      <div className="form-group">
        <label>Cover Image</label>
        <ImageUpload value={form.imageUrl} onChange={(url) => set("imageUrl", url)} />
      </div>

      {/* Content */}
      <div className="form-group">
        <label>
          {form.type === "live" ? "Intro / Opening Content" : "Content"} *
        </label>
        {form.type === "live" && (
          <p className="mb-2 text-xs" style={{ color: "var(--muted)" }}>
            This is the opening text shown above the live entries. Add timestamped live updates
            from the edit page after saving.
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
