import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import LatestStories from "@/components/LatestStories";

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
              <Link href="/submit" className="btn-primary">
                Submit Your Story
              </Link>
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
                  <div className="mb-4" style={{ color: "var(--gold)" }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{cat.label}</h3>
                  <p className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {cat.desc}
                  </p>
                  <span
                    className="text-sm font-semibold mt-5 block"
                    style={{ color: "var(--gold)" }}
                  >
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
              <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
                Latest Stories
              </h2>
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
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
              No posts yet
            </h2>
            <p className="mb-6" style={{ color: "var(--muted)" }}>
              Be the first to share a story with the canine community.
            </p>
            <Link href="/submit" className="btn-primary">Submit Your Story</Link>
          </div>
        )}
      </section>

      {/* RSS / Subscribe callout */}
      <section style={{ background: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{ background: "rgba(244,161,53,0.15)", border: "1px solid rgba(244,161,53,0.3)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">
            Stay Informed via RSS
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            Journalists and media outlets can subscribe to our RSS feeds — choose all posts
            or filter by charity or business organisations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/api/rss"
              className="btn-primary"
            >
              All Posts Feed
            </a>
            <a
              href="/api/rss?org=charity"
              className="btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
            >
              Charity Feed
            </a>
            <a
              href="/api/rss?org=business"
              className="btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
            >
              Business Feed
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
