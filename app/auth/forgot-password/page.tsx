"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <div style={{ fontSize: "2.5rem" }} className="mb-2">🐾</div>
            <div className="font-bold text-xl" style={{ color: "var(--gold)" }}>Big Bark News & Media</div>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: "var(--navy)" }}>Forgot Password</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="card p-8">
          {submitted ? (
            <div className="text-center">
              <div style={{ fontSize: "2.5rem" }} className="mb-3">📧</div>
              <p className="font-semibold mb-2" style={{ color: "var(--navy)" }}>Check your inbox</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                If that email address is registered, you&apos;ll receive a reset link shortly. The link expires in 1 hour.
              </p>
              <Link href="/auth/login" className="btn-outline mt-6 inline-block">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organisation.com"
                  required
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full text-center"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
              <div className="mt-4 text-center text-sm" style={{ color: "var(--muted)" }}>
                <Link href="/auth/login" className="font-semibold no-underline" style={{ color: "var(--navy)" }}>
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
