"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Sorry, something went wrong. Please email us directly at hello@bbnm.ie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Whether you have a press enquiry, want to discuss our services, or just want to say hello
            — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
                  Contact Details
                </p>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--muted)" }}>Email</p>
                    <a href="mailto:hello@bbnm.ie" className="font-semibold" style={{ color: "var(--navy)" }}>
                      hello@bbnm.ie
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--muted)" }}>Website</p>
                    <a href="https://bbnm.ie" target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: "var(--navy)" }}>
                      bbnm.ie
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 border-l-4"
                style={{ background: "#fff", borderColor: "var(--gold)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  For press enquiries, submission queries, service discussions or general questions
                  about the platform — use the form or email us directly.
                </p>
              </div>

              <div className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
                  Our Services
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {[
                    { label: "News & Media", href: "/services/news-media" },
                    { label: "Web & App Development", href: "/services/web-app" },
                    { label: "SEO & Social Media", href: "/services/seo-social" },
                  ].map((s) => (
                    <a key={s.href} href={s.href} className="flex items-center gap-2 font-medium no-underline" style={{ color: "var(--navy)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              {submitted ? (
                <div className="rounded-2xl p-10 text-center border" style={{ background: "#fff", borderColor: "var(--border)" }}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(244,161,53,0.1)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>Message sent!</h2>
                  <p style={{ color: "var(--muted)" }}>
                    Thanks for getting in touch. We&apos;ve sent a confirmation to <strong>{form.email}</strong> and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 border"
                  style={{ background: "#fff", borderColor: "var(--border)" }}
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "var(--gold)" }}>
                    Send a Message
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
                        <option value="">Select a subject…</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Services Enquiry">Services Enquiry</option>
                        <option value="Submission Query">Submission Query</option>
                        <option value="Press Enquiry">Press Enquiry</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">
                        Service of Interest{" "}
                        <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}>
                        <option value="">Not applicable / Not sure</option>
                        <optgroup label="News & Media">
                          <option value="News & Media Services">News &amp; Media Services</option>
                          <option value="Podcast Feature">Podcast Feature</option>
                          <option value="Press Release Distribution">Press Release Distribution</option>
                          <option value="Live Event Coverage">Live Event Coverage</option>
                          <option value="Branded Content">Branded Content Production</option>
                        </optgroup>
                        <optgroup label="Web & App Development">
                          <option value="WordPress Website">WordPress Website</option>
                          <option value="Custom Next.js Website">Custom Next.js Website</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Custom WordPress Plugin">Custom WordPress Plugin</option>
                        </optgroup>
                        <optgroup label="SEO & Social Media">
                          <option value="SEO Services">SEO Services</option>
                          <option value="Social Media Management">Social Media Management</option>
                          <option value="SEO & Social Media Package">SEO &amp; Social Media Package</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="How can we help?" />
                  </div>
                  {error && (
                    <p className="text-sm mb-3" style={{ color: "#dc2626" }}>{error}</p>
                  )}
                  <button type="submit" className="btn-primary w-full" style={{ fontSize: "1rem" }} disabled={loading}>
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
