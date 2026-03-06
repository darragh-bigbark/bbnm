"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/auth/login?passwordReset=1");
  }

  if (!token) {
    return (
      <div className="text-center">
        <p style={{ color: "var(--muted)" }}>Invalid or missing reset token.</p>
        <Link href="/auth/forgot-password" className="btn-primary mt-4 inline-block">Request a new link</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm">Confirm New Password</label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat your new password"
          required
          autoComplete="new-password"
        />
      </div>
      {error && (
        <div className="rounded-lg px-4 py-3 mb-4 text-sm" style={{ background: "#fee2e2", color: "#991b1b" }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        className="btn-primary w-full text-center"
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Saving…" : "Set New Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <div style={{ fontSize: "2.5rem" }} className="mb-2">🐾</div>
            <div className="font-bold text-xl" style={{ color: "var(--gold)" }}>Big Bark News & Media</div>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: "var(--navy)" }}>Set New Password</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Choose a strong password for your account</p>
        </div>
        <div className="card p-8">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
