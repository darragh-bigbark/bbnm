"use client";

import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const POST_TYPES = [
  { value: "news", label: "News Story" },
  { value: "press_release", label: "Press Release" },
  { value: "event", label: "Event" },
];

const INITIAL_FORM = {
  title: "",
  type: "news",
  summary: "",
  content: "",
  imageUrl: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  websiteUrl: "",
  eventDate: "",
  eventVenue: "",
};

export default function SubmitPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Document extraction state
  const [docExtracting, setDocExtracting] = useState(false);
  const [docExtracted, setDocExtracted] = useState<string | null>(null); // filename
  const [docError, setDocError] = useState("");
  const docInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) { setImageError("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setImageError("Image must be under 5MB."); return; }

    setImageError("");
    setImagePreview(URL.createObjectURL(file));
    setImageUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        setImageError(data.error ?? "Upload failed.");
        setImagePreview(null);
      }
    } catch {
      setImageError("Upload failed. Please try again.");
      setImagePreview(null);
    } finally {
      setImageUploading(false);
    }
  }

  function removeImage() {
    setImagePreview(null);
    setImageError("");
    setForm((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    if (!name.endsWith(".docx") && !name.endsWith(".pdf")) {
      setDocError("Only .docx and .pdf files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setDocError("File must be under 20MB.");
      return;
    }

    setDocError("");
    setDocExtracting(true);
    setDocExtracted(null);

    try {
      const fd = new FormData();
      fd.append("document", file);
      const res = await fetch("/api/extract-document", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setDocError(data.error || "Extraction failed. Please try again.");
        return;
      }

      // Populate content field
      setForm((prev) => ({
        ...prev,
        content: data.content,
        // Pre-fill title only if it's currently empty and we have a suggestion
        title: prev.title === "" && data.suggestedTitle ? data.suggestedTitle : prev.title,
      }));
      setDocExtracted(file.name);
    } catch {
      setDocError("Failed to extract content. Please try again.");
    } finally {
      setDocExtracting(false);
      if (docInputRef.current) docInputRef.current.value = "";
    }
  }

  function clearDocument() {
    setDocExtracted(null);
    setDocError("");
    setForm((prev) => ({ ...prev, content: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed. Please try again.");
      } else {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitAnother() {
    setForm(INITIAL_FORM);
    setSuccess(false);
    setError("");
    setImagePreview(null);
    setImageError("");
    setDocExtracted(null);
    setDocError("");
  }

  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center" style={{ color: "var(--muted)" }}>
        Loading…
      </div>
    );
  }

  if (!session) return null;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "#dcfce7" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
          Submission Received!
        </h1>
        <p className="mb-2" style={{ color: "var(--muted)" }}>
          Your submission is pending admin review. We&apos;ll publish it once approved.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          You&apos;ll be able to see your submissions in the dashboard once approved.
        </p>
        <button onClick={handleSubmitAnother} className="btn-primary">Submit Another</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Submit Content</h1>
        <p style={{ color: "var(--muted)" }}>
          Submitting as <span className="font-semibold">{session.user?.name}</span>
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit}>

          {/* Type selector */}
          <div className="form-group">
            <label>Content Type</label>
            <div className="flex gap-2 flex-wrap">
              {POST_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type: t.value }))}
                  className={form.type === t.value ? "btn-primary" : "btn-outline"}
                  style={{ padding: "0.45rem 1.1rem", fontSize: "0.9rem" }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Document import ───────────────────────────────────────── */}
          <div className="form-group">
            <label>
              Import from Document{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
              Upload a Word document (.docx) or PDF and the content will be automatically
              extracted into the fields below. You can still edit everything after import.
            </p>

            {docExtracted ? (
              /* Success state */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "0.75rem",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="text-sm font-semibold" style={{ color: "#166534" }}>
                    Content extracted successfully
                  </p>
                  <p className="text-xs truncate" style={{ color: "#16a34a" }}>
                    {docExtracted}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearDocument}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#16a34a",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    flexShrink: 0,
                  }}
                >
                  Clear
                </button>
              </div>
            ) : docExtracting ? (
              /* Extracting state */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "#f0f4ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: "0.75rem",
                }}
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"
                  style={{ animation: "spin 1s linear infinite", flexShrink: 0 }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
                  Extracting content from document…
                </p>
              </div>
            ) : (
              /* Upload button */
              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.5rem",
                  background: "#fafafa",
                  border: "2px dashed var(--border)",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  color: "var(--navy)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.background = "#fef9f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "#fafafa";
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Attach Document (.docx or .pdf)
              </button>
            )}

            <input
              ref={docInputRef}
              type="file"
              accept=".docx,.pdf"
              onChange={handleDocumentChange}
              style={{ display: "none" }}
            />

            {docError && (
              <p className="text-sm mt-2" style={{ color: "#991b1b" }}>{docError}</p>
            )}
          </div>
          {/* ─────────────────────────────────────────────────────────── */}

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a clear, descriptive title"
              required
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label htmlFor="summary">
              Summary *{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                ({form.summary.length}/200)
              </span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="A brief summary of your content (max 200 characters)"
              maxLength={200}
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label>Full Content *</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            />
          </div>

          {/* Event fields */}
          {form.type === "event" && (
            <div
              className="rounded-xl p-5 mb-5 border-l-4"
              style={{ background: "#f0fdf4", borderColor: "#16a34a" }}
            >
              <div className="font-semibold mb-3 text-sm" style={{ color: "#166534" }}>
                Event Details
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={handleChange}
                  required={form.type === "event"}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="eventVenue">Event Venue *</label>
                <input
                  id="eventVenue"
                  name="eventVenue"
                  type="text"
                  value={form.eventVenue}
                  onChange={handleChange}
                  placeholder="Venue name and location"
                  required={form.type === "event"}
                />
              </div>
            </div>
          )}

          {/* Featured Image */}
          <div className="form-group">
            <label>
              Featured Image{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional, max 5MB)</span>
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full object-cover" style={{ maxHeight: "240px" }} />
                {imageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                    <span className="text-white text-sm font-medium">Uploading…</span>
                  </div>
                )}
                {!imageUploading && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                    aria-label="Remove image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3 cursor-pointer bg-transparent transition-colors"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div className="text-center">
                  <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>Click to upload an image</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>PNG, JPG, GIF, WebP — max 5MB</p>
                </div>
              </button>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            {imageError && <p className="text-sm mt-2" style={{ color: "#991b1b" }}>{imageError}</p>}
          </div>

          {/* Contact info */}
          <div
            className="rounded-xl p-5 mb-5 border"
            style={{ background: "var(--cream)", borderColor: "var(--border)" }}
          >
            <div className="font-semibold mb-3 text-sm" style={{ color: "var(--navy)" }}>
              Contact Information{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional — shown on the post)</span>
            </div>
            <div className="form-group">
              <label htmlFor="contactName">Contact Name</label>
              <input id="contactName" name="contactName" type="text" value={form.contactName} onChange={handleChange} placeholder="Press contact name" />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input id="contactEmail" name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} placeholder="press@organisation.com" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="contactPhone">
                Contact Phone{" "}
                <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
              </label>
              <input id="contactPhone" name="contactPhone" type="tel" value={form.contactPhone} onChange={handleChange} placeholder="+353 87 000 0000" />
            </div>
          </div>

          {/* Website URL */}
          <div className="form-group">
            <label htmlFor="websiteUrl">
              Website URL{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} placeholder="https://www.yourorganisation.com" />
          </div>

          {error && (
            <div className="rounded-lg px-4 py-3 mb-4 text-sm" style={{ background: "#fee2e2", color: "#991b1b" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full text-center"
            disabled={loading || imageUploading || docExtracting}
            style={{ opacity: loading || imageUploading || docExtracting ? 0.7 : 1, fontSize: "1rem" }}
          >
            {loading ? "Submitting…" : "Submit for Review"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
