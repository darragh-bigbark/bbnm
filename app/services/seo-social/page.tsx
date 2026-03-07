import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO & Social Media Management",
  description: "Expert SEO and social media management services for canine businesses, charities and organisations. Let Big Bark News & Media grow your online presence while you focus on what you do best.",
  openGraph: { url: "https://bbnm.ie/services/seo-social" },
  alternates: { canonical: "https://bbnm.ie/services/seo-social" },
};

const seoServices = [
  {
    title: "Technical SEO Audit & Setup",
    desc: "We start by thoroughly auditing your existing online presence — identifying technical issues, missing metadata, slow load times, and indexing problems that are holding your rankings back.",
  },
  {
    title: "Keyword Research & Strategy",
    desc: "We research the exact terms your target audience is searching for and build a content and optimisation strategy around them — putting your organisation in front of the right people at the right time.",
  },
  {
    title: "On-Page Optimisation",
    desc: "From page titles and meta descriptions to headings, internal linking, and content structure — we optimise every element of your site to maximise visibility in search results.",
  },
  {
    title: "Local SEO",
    desc: "For canine businesses serving a local area — trainers, groomers, kennels, vets — we optimise your Google Business Profile and local signals so you appear at the top when people nearby are searching.",
  },
  {
    title: "Content SEO",
    desc: "We create and optimise blog content, landing pages, and service pages that rank for the terms your audience is searching — building long-term organic traffic that compounds over time.",
  },
  {
    title: "Ongoing Monitoring & Reporting",
    desc: "You get regular, clear reports showing your ranking improvements, traffic growth, and the impact of our work — no jargon, just results you can see and understand.",
  },
];

const socialServices = [
  {
    title: "Full Social Media Management",
    desc: "We take over your social media channels completely — Instagram, Facebook, TikTok — creating, scheduling, and publishing content consistently so your brand stays active and visible every day.",
  },
  {
    title: "Content Creation",
    desc: "From graphics and captions to short-form video and stories — we create professional, on-brand content designed to engage your audience and grow your following organically.",
  },
  {
    title: "Community Management",
    desc: "We monitor your comments, messages, and mentions — responding to your audience in your brand voice and building the kind of genuine community engagement that drives loyalty.",
  },
  {
    title: "Campaign Management",
    desc: "Running a fundraiser, product launch, or awareness campaign? We plan and execute social media campaigns that create real momentum and reach beyond your existing audience.",
  },
  {
    title: "Analytics & Growth Strategy",
    desc: "We track what's working, identify growth opportunities, and continually refine the strategy — ensuring your social channels are always moving in the right direction.",
  },
  {
    title: "Paid Social Advertising",
    desc: "When organic growth needs a boost, we can run targeted paid campaigns on Facebook and Instagram to reach your ideal audience in the canine sector — with precise targeting and clear ROI tracking.",
  },
];

export default function SeoSocialServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            SEO &amp; Social Media<br />Management
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            We take care of your entire online presence — from search engine rankings to daily social
            media management — so you can focus on running your business or charity while we grow
            your brand.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 border-l-4" style={{ background: "#fff", borderColor: "var(--gold)" }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Most canine businesses and charities know they should be more visible online — but
              between the day-to-day demands of running an organisation, there simply isn&apos;t time
              to do SEO and social media properly.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              That&apos;s exactly where we come in. We handle everything on the digital side, so you
              can focus entirely on the work that matters to you.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Search Engine Optimisation
            </p>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--navy)" }}>SEO Services</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Rank higher. Get found. Grow organically. We make sure the people searching for what
              you offer can find you — ahead of your competition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seoServices.map((s) => (
              <div key={s.title} className="rounded-xl p-6 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
                <div className="w-1 h-6 rounded-full mb-4" style={{ background: "var(--gold)" }} />
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--navy)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Social Media Management
            </p>
            <h2 className="text-3xl font-bold text-white mb-3">Social Media Services</h2>
            <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Consistent, professional, engaging social media — without the time investment.
              We manage your channels end-to-end.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialServices.map((s) => (
              <div key={s.title} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,161,53,0.2)" }}>
                <div className="w-1 h-6 rounded-full mb-4" style={{ background: "var(--gold)" }} />
                <h3 className="font-bold text-base mb-2 text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Service Package */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              The Full Package
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
              SEO + Social Media — Done for You
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              For the best results, SEO and social media work together. A strong social presence
              supports your SEO, and strong search rankings grow your social audience. We offer
              a combined service that covers both — giving your brand a complete, consistent, and
              growing online presence managed entirely by us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                "One point of contact for all your digital needs",
                "Integrated SEO and social strategy",
                "Monthly reporting across all channels",
                "Regular strategy reviews and updates",
                "Deep knowledge of the canine sector and its audience",
                "No long-term lock-in contracts",
              ].map((item) => (
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
            <div className="rounded-xl p-5 border-l-4" style={{ background: "#f0f4ff", borderColor: "var(--gold)" }}>
              <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
                Our approach is simple:
              </p>
              <p className="font-bold text-base mt-1" style={{ color: "var(--navy)" }}>
                &ldquo;You focus on running your organisation. We focus on making sure the right people find it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Get Started
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Online Presence?
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Get in touch today for a free initial consultation. We&apos;ll assess your current online
            presence and show you exactly what we can do for your business or charity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Get a Free Consultation</Link>
            <Link href="/services/web-app" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>View Web Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
