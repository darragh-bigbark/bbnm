"use client";

import { Suspense, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailVerified = searchParams.get("emailVerified");
  const verifyError = searchParams.get("verifyError");
  const passwordReset = searchParams.get("passwordReset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<{ reset: () => void }>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }

    setLoading(true);

    // Verify Turnstile server-side before attempting sign-in
    const verify = await fetch("/api/verify-turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: turnstileToken }),
    });

    if (!verify.ok) {
      setError("Security check failed. Please try again.");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);

    if (result?.error) {
      const msg = result.error;
      if (msg.includes("verify your email") || msg.includes("pending approval")) {
        setError(msg);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } else {
      router.push("/submit");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <div style={{ fontSize: "2.5rem" }} className="mb-2">🐾</div>
            <div className="font-bold text-xl" style={{ color: "var(--gold)" }}>
              Big Bark News & Media
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: "var(--navy)" }}>Sign In</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Access your organisation&apos;s account</p>
        </div>

        {emailVerified && (
          <div className="rounded-lg px-4 py-3 mb-6 text-sm text-center" style={{ background: "#dcfce7", color: "#166534" }}>
            Email verified! Your account is now pending approval. We&apos;ll email you once it&apos;s approved.
          </div>
        )}
        {verifyError && (
          <div className="rounded-lg px-4 py-3 mb-6 text-sm text-center" style={{ background: "#fee2e2", color: "#991b1b" }}>
            That verification link is invalid or has already been used.
          </div>
        )}
        {passwordReset && (
          <div className="rounded-lg px-4 py-3 mb-6 text-sm text-center" style={{ background: "#dcfce7", color: "#166534" }}>
            Password updated successfully. You can now sign in with your new password.
          </div>
        )}

        <div className="card p-8">
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

            <div className="form-group">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" style={{ margin: 0 }}>Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs no-underline"
                  style={{ color: "var(--muted)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mb-4">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
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
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold no-underline" style={{ color: "var(--navy)" }}>
              Register your organisation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
