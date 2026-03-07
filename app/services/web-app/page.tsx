import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web & App Development Services",
  description: "Professional website and app development for the canine sector — WordPress, Next.js custom builds, mobile apps, and custom plugins from Big Bark News & Media.",
  openGraph: { url: "https://bbnm.ie/services/web-app" },
  alternates: { canonical: "https://bbnm.ie/services/web-app" },
};

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    label: "WordPress Websites",
    badge: "Most Popular",
    desc: "A professionally designed WordPress website gives your organisation a powerful, easy-to-manage online presence. WordPress is the world's most widely used content management system — meaning your team can update pages, add posts, and manage content without any technical knowledge.",
    items: [
      "Custom-designed themes built for your brand",
      "Easy content management — no coding required",
      "SEO-optimised from the ground up",
      "Fully mobile responsive",
      "Plugin integration for bookings, donations, events, and more",
      "Ongoing support and maintenance available",
    ],
    note: "Ideal for charities, rescues, trainers, groomers, breeders, and canine businesses who need a professional online presence that's simple to maintain.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Custom Next.js Web Applications",
    badge: "For Complex Needs",
    desc: "For organisations that need something truly unique — a fully custom-built web application using Next.js gives you complete control, unmatched performance, and a powerful backend that scales with your needs. This is the same technology powering bbnm.ie itself.",
    items: [
      "Bespoke design and functionality built from scratch",
      "Powerful custom backend — memberships, submissions, databases",
      "Blazing fast performance and top-tier SEO",
      "Fully tailored admin dashboard for easy content management",
      "Secure authentication and user management",
      "Scalable architecture built to grow with your organisation",
    ],
    note: "Perfect for organisations that have outgrown off-the-shelf solutions and need a platform built specifically around their workflows and audience.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    label: "Mobile Apps",
    badge: "iOS & Android",
    desc: "Bring your organisation directly to your audience's pocket. We develop cross-platform mobile apps for canine businesses, charities, and services — giving your users a seamless native app experience on both iOS and Android from a single codebase.",
    items: [
      "Cross-platform iOS and Android development",
      "Push notifications for events, news, and updates",
      "Booking and appointment systems",
      "Member portals and community features",
      "Donation and fundraising integration",
      "App Store and Google Play submission",
    ],
    note: "Ideal for kennels, training centres, rescue organisations, vets, and any canine business wanting a dedicated app experience for their clients.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    label: "Custom WordPress Plugins",
    badge: "Extend Your Site",
    desc: "Already running WordPress but need functionality that doesn't exist off the shelf? We build custom WordPress plugins tailored specifically to your requirements — whether that's a canine breed directory, adoption listings, event management, or a members area.",
    items: [
      "Bespoke plugin development for any requirement",
      "Dog listings, breed directories, and adoption portals",
      "Custom booking and appointment systems",
      "Membership and subscription plugins",
      "Integration with third-party APIs and services",
      "Full documentation and handover",
    ],
    note: "If you can describe what you need, we can build it — purpose-built for the canine sector.",
  },
];

export default function WebAppServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Web &amp; App<br />Development
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Professional websites, web applications, and mobile apps built specifically for the canine
            sector — from simple WordPress sites to powerful custom-built platforms that scale with
            your organisation.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 border-l-4" style={{ background: "#fff", borderColor: "var(--gold)" }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              We understand the canine sector — the unique needs of rescues, charities, training centres,
              breeders, and canine businesses. That sector-specific knowledge means the digital solutions
              we build are designed around how your organisation actually works, not adapted from a
              generic template.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              From a clean, manageable WordPress site to a fully custom Next.js platform — we build
              the right solution for your needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              What We Build
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              Our Development Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.label} className="rounded-2xl p-8 border flex flex-col" style={{ background: "#fff", borderColor: "var(--border)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl flex-shrink-0" style={{ background: "rgba(244,161,53,0.1)", color: "var(--gold)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg leading-snug" style={{ color: "var(--navy)" }}>{s.label}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(244,161,53,0.15)", color: "var(--gold-dark, #D4861A)" }}>
                        {s.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>{s.desc}</p>
                <div className="space-y-2 mb-5 flex-1">
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
                <p className="text-sm font-semibold italic" style={{ color: "var(--navy)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Which Is Right For You?
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">WordPress vs Next.js</h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>Not sure which platform suits your needs? Here&apos;s a simple guide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(244,161,53,0.3)" }}>
              <p className="font-bold text-white text-lg mb-4">Choose WordPress if you…</p>
              <div className="space-y-3">
                {[
                  "Want to manage content yourself without a developer",
                  "Need a straightforward, professional website",
                  "Are working with a modest budget",
                  "Want a fast turnaround",
                  "Need common features like blogs, contact forms, donations",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8 border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(244,161,53,0.3)" }}>
              <p className="font-bold text-white text-lg mb-4">Choose Next.js if you…</p>
              <div className="space-y-3">
                {[
                  "Need custom functionality not available off the shelf",
                  "Want maximum performance and SEO",
                  "Have complex user flows — submissions, memberships, dashboards",
                  "Are building a platform, not just a website",
                  "Want a fully bespoke product built around your organisation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Start the Conversation
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Let&apos;s Build Something Great
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            Tell us about your organisation and what you need — we&apos;ll recommend the right solution
            and walk you through the process from start to finish.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
            <Link href="/services/news-media" className="btn-outline">View Media Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
