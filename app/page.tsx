import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import LatestStories from "@/components/LatestStories";
import SubscribeForm from "@/components/SubscribeForm";

export const dynamic = "force-dynamic";

const categories = [
  {
    href: "/news",
    label: "News",
    desc: "Breaking stories and the latest industry updates from across the canine world.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
  {
    href: "/press-releases",
    label: "Press Releases",
    desc: "Official announcements and statements from businesses and charities.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    href: "/events",
    label: "Events",
    desc: "Shows, seminars, charity fundraisers and community gatherings.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const statementPhrases = [
  {
    text: "Connecting the industry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    text: "Amplifying important voices",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    text: "Driving progress across the canine community",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved" },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
    take: 12,
  });

  return (
    <div>
      {/* Hero banner */}
      <section>
        <div className="w-full" style={{ background: "#000" }}>
          <Image
            src="/home-banner.png"
            alt="Big Bark News & Media — Ireland's Only Dedicated Canine News & Media Agency"
            width={1400}
            height={735}
            className="w-full h-auto block"
            priority
          />
        </div>

        {/* CTA strip */}
        <div style={{ background: "var(--navy)", borderTop: "3px solid var(--gold)" }} className="py-6 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center items-center">
            <p className="text-white/80 text-sm font-medium hidden sm:block">
              The canine industry&apos;s trusted source for news, press releases &amp; events
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link href="/submit" className="btn-primary">Submit Your Story</Link>
              <Link
                href="/auth/register"
                className="btn-outline"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
              >
                Register Your Organisation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category browse */}
      <section style={{ background: "var(--navy)" }} className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center text-sm font-bold tracking-widest uppercase mb-8"
            style={{ color: "var(--gold)" }}
          >
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="no-underline">
                <div className="category-card">
                  <div className="mb-4" style={{ color: "var(--gold)" }}>{cat.icon}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{cat.label}</h3>
                  <p className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>{cat.desc}</p>
                  <span className="text-sm font-semibold mt-5 block" style={{ color: "var(--gold)" }}>
                    Browse {cat.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        {posts.length > 0 ? (
          <>
            <div className="section-header mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Latest Stories</h2>
            </div>
            <LatestStories posts={posts} />
          </>
        ) : (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#f0f4ff" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>No posts yet</h2>
            <p className="mb-6" style={{ color: "var(--muted)" }}>Be the first to share a story with the canine community.</p>
            <Link href="/submit" className="btn-primary">Submit Your Story</Link>
          </div>
        )}
      </section>

      {/* Subscribe callout */}
      <section style={{ background: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
              style={{ background: "rgba(244,161,53,0.15)", border: "1px solid rgba(244,161,53,0.3)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">Stay in the Loop</h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Journalists and media outlets can subscribe to our RSS feeds —{" "}
              <Link href="/rss" className="underline" style={{ color: "var(--gold)" }}>
                click here to subscribe to our RSS feeds
              </Link>
              .
            </p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      {/* Mission statement — full-bleed editorial */}
      <section
        style={{ background: "#fff", padding: "7rem 1.5rem" }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center" }}>

          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "3rem",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Ireland&apos;s Central Canine Media Hub
            </span>
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          </div>

          {/* Main typographic statement */}
          <div style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.6rem",
              }}
            >
              Big Bark News &amp; Media
            </p>
            <p
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.25rem)",
                fontWeight: 900,
                color: "var(--navy)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "0.4rem",
              }}
            >
              Powers the
            </p>
            <p
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.25rem)",
                fontWeight: 900,
                color: "var(--gold)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "0.4rem",
              }}
            >
              Conversation
            </p>
            <p
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--navy)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                opacity: 0.75,
              }}
            >
              around dogs in Ireland
            </p>
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: "64px",
              height: "3px",
              background: "var(--gold)",
              margin: "0 auto 3.5rem",
              borderRadius: "2px",
            }}
          />

          {/* Three pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2.5rem 3rem",
              textAlign: "left",
            }}
          >
            {statementPhrases.map((p) => (
              <div key={p.text}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(244,161,53,0.1)",
                    color: "var(--gold)",
                    marginBottom: "0.85rem",
                  }}
                >
                  {p.icon}
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--navy)",
                    lineHeight: 1.35,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
