import SubscribeForm from "@/components/SubscribeForm";

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; unsubscribed?: string }>;
}) {
  const { confirmed, unsubscribed } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bbnm.ie";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* Confirmed / unsubscribed banners */}
      {confirmed === "1" && (
        <div
          className="rounded-lg px-4 py-3 mb-8 text-sm font-medium flex items-center gap-3"
          style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Your subscription is confirmed! You&apos;ll receive email alerts when new posts are published.
        </div>
      )}

      {unsubscribed === "1" && (
        <div
          className="rounded-lg px-4 py-3 mb-8 text-sm font-medium"
          style={{ background: "#fef9f0", color: "#92400e", border: "1px solid #fde68a" }}
        >
          You&apos;ve been unsubscribed and won&apos;t receive any more email alerts.
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
          style={{ background: "#f0f4ff", border: "1px solid #c7d2fe" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--navy)" }}>
          Stay in the Loop
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Get notified by email whenever new stories, press releases or events are published
          on Big Bark News &amp; Media. No spam — unsubscribe any time.
        </p>
      </div>

      {/* Subscribe form */}
      <SubscribeForm />

      {/* How it works */}
      <div className="mt-10 grid grid-cols-3 gap-4 text-center">
        {[
          {
            step: "1",
            title: "Enter your email",
            desc: "Type your email address in the box above.",
          },
          {
            step: "2",
            title: "Confirm",
            desc: "Click the link in the confirmation email we send you.",
          },
          {
            step: "3",
            title: "Stay updated",
            desc: "Receive an alert each time a new story is published.",
          },
        ].map((s) => (
          <div key={s.step} className="flex flex-col items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              {s.step}
            </div>
            <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>{s.title}</p>
            <p className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* RSS section — for journalists/technical users */}
      <details className="mt-14 group">
        <summary
          className="cursor-pointer text-sm font-semibold flex items-center gap-2 select-none list-none"
          style={{ color: "var(--muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-open:rotate-90">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          RSS feeds for journalists &amp; media outlets
        </summary>

        <div className="mt-5 rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "#fff" }}>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--muted)" }}>
            Copy a feed URL below into your RSS reader or news aggregator to monitor new posts automatically.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "All Posts", url: `${baseUrl}/api/rss` },
              { label: "Charity Organisations", url: `${baseUrl}/api/rss?org=charity` },
              { label: "Business Organisations", url: `${baseUrl}/api/rss?org=business` },
            ].map((feed) => (
              <div key={feed.url} className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold shrink-0 w-28"
                  style={{ color: "var(--navy)" }}
                >
                  {feed.label}
                </span>
                <code
                  className="flex-1 text-xs px-3 py-2 rounded-lg border truncate select-all"
                  style={{
                    background: "var(--cream)",
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                    fontFamily: "monospace",
                  }}
                >
                  {feed.url}
                </code>
              </div>
            ))}
          </div>
        </div>
      </details>

    </div>
  );
}
