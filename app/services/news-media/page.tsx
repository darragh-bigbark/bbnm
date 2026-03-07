import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media Services",
  description: "Professional news and media services for the canine industry — live podcast production, press release distribution, event coverage and live media services from Big Bark News & Media.",
  openGraph: { url: "https://bbnm.ie/services/news-media" },
  alternates: { canonical: "https://bbnm.ie/services/news-media" },
};

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: "The Big Bark Podcast",
    desc: "Feature your organisation, campaign, or story on The Big Bark Podcast — Ireland's dedicated canine media podcast. We produce in-depth interviews, panel discussions, and campaign spotlights that reach a highly engaged audience of dog owners, industry professionals, and advocates.",
    items: [
      "Guest interviews and organisation spotlights",
      "Campaign and charity features",
      "Industry panel discussions",
      "Branded podcast segments",
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    title: "News & Press Release Services",
    desc: "We help businesses, charities, and organisations craft and distribute professional press releases and news stories that reach the right audience. Our platform distributes directly to subscribed journalists and media outlets across Ireland via RSS, ensuring your story gets seen.",
    items: [
      "Press release writing and editing",
      "News story creation and distribution",
      "RSS distribution to media subscribers",
      "Post approval and scheduling",
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "Live Event Media Coverage",
    desc: "We provide live and on-site media coverage for canine events, competitions, charity fundraisers, and industry gatherings. From live blogging to social media coverage and post-event write-ups, we ensure your event gets the coverage it deserves.",
    items: [
      "Live blog coverage during events",
      "On-site social media content creation",
      "Post-event news articles and write-ups",
      "Photography and media production support",
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Live Campaign Coverage",
    desc: "Running a fundraiser, awareness campaign, or industry initiative? We provide live rolling coverage across our platform and social channels — keeping your audience informed and engaged throughout the duration of your campaign.",
    items: [
      "Real-time campaign updates and live blog posts",
      "Social media amplification",
      "Campaign news stories and progress reports",
      "Community engagement and audience reach",
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Branded Content Production",
    desc: "We produce branded media content — including written features, sponsored articles, podcast episodes, and digital assets — that authentically connect your brand with Ireland's canine community while maintaining our editorial standards.",
    items: [
      "Sponsored editorial features",
      "Branded podcast episodes",
      "Digital content for social channels",
      "Organisation and brand profile pieces",
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    title: "Media Distribution Network",
    desc: "As Ireland's central canine media hub, we have built a direct distribution network connecting your content with journalists, media outlets, radio stations and digital publishers who subscribe to our RSS feeds — giving your story structured, verified reach.",
    items: [
      "RSS distribution to subscribed media outlets",
      "Journalist and press access",
      "National and regional media reach",
      "Verified canine industry news channel",
    ],
  },
];

export default function NewMediaServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            News &amp; Media Services
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            From press release distribution and podcast features to live event coverage and branded content
            — Big Bark News &amp; Media gives your organisation a credible, professional media voice across
            Ireland&apos;s canine community.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 border-l-4" style={{ background: "#fff", borderColor: "var(--gold)" }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Whether you are a rescue charity looking to amplify your work, a business launching a new
              product, or an event organiser seeking professional media coverage — Big Bark News &amp; Media
              provides the full range of media services your organisation needs.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              We handle the storytelling. You focus on the work that matters.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              What We Offer
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              Our News &amp; Media Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl p-8 border flex flex-col" style={{ background: "#fff", borderColor: "var(--border)" }}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-xl flex-shrink-0" style={{ background: "rgba(244,161,53,0.1)", color: "var(--gold)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-snug" style={{ color: "var(--navy)" }}>{s.title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>{s.desc}</p>
                <div className="space-y-2 mt-auto">
                  {s.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span style={{ color: "var(--gold)", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BBNM */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ireland&apos;s Only Dedicated Canine Media Platform
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { heading: "Targeted Audience", body: "Every reader, listener, and subscriber is directly connected to Ireland's canine community — no wasted reach." },
              { heading: "Credible Platform", body: "Stories on BBNM carry the weight of a structured, editorial media platform — not just a social media post." },
              { heading: "Full Distribution", body: "Your content is distributed across our website, social channels, and RSS network in one submission." },
            ].map((item) => (
              <div key={item.heading} className="rounded-xl p-6 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,161,53,0.25)" }}>
                <p className="font-bold text-white mb-2">{item.heading}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Get Started
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Ready to Amplify Your Story?
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            Get in touch to discuss how Big Bark News &amp; Media can support your organisation&apos;s
            media needs — from a single press release to full ongoing media partnership.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
            <Link href="/auth/register" className="btn-outline">Register Your Organisation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
