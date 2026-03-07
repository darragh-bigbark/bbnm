import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about Big Bark News & Media — Ireland's dedicated canine news and media platform connecting the dog community.",
  openGraph: { url: "https://bbnm.ie/about" },
  alternates: { canonical: "https://bbnm.ie/about" },
};

const whatWeDo = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    title: "News",
    desc: "We publish timely news stories from across the canine world — welfare campaigns, industry developments, research findings and more.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "Press Releases",
    desc: "Businesses and charities can submit press releases directly, reaching journalists and media outlets who subscribe to our RSS feeds.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Events",
    desc: "From agility competitions to charity fundraisers and trade shows, we help promote events to the people who matter most.",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bigbarknewsandmedia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bigbarknewsandmedia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bigbarknewsandmedia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Ireland&apos;s Canine Media Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            About Big Bark<br />News &amp; Media
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            An independent media platform built specifically for the canine industry — providing a
            dedicated space for charities, businesses, trainers and advocates to share their stories
            with a wide and engaged audience.
          </p>
        </div>
      </section>

      {/* Mission quote */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 border-l-4"
            style={{ background: "#fff", borderColor: "var(--gold)" }}
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Big Bark News &amp; Media is an independent media platform built specifically for the canine
              industry. Whether you&apos;re a rescue charity celebrating rehomings, a dog food brand
              launching a new product, or an event organiser promoting an upcoming show — Big Bark is
              your platform.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              Our mission is simple: to give the canine industry a voice and ensure the stories that
              matter are seen, heard, and taken seriously.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              What We Do
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              One Platform, Three Content Types
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              By bringing together news, press releases and events in one place, we make it easier
              for journalists, media professionals and dog lovers to stay informed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDo.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-8 border flex flex-col"
                style={{ background: "#fff", borderColor: "var(--border)" }}
              >
                <div className="mb-5 p-3 rounded-xl w-fit" style={{ background: "rgba(244,161,53,0.1)", color: "var(--gold)" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: "var(--navy)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Our Podcast
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">The Big Bark Podcast</h2>
          </div>
          <div
            className="rounded-2xl p-8 border"
            style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(244,161,53,0.3)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Alongside the news platform, we produce the <strong className="text-white">Big Bark Podcast</strong> —
                  a regular show featuring interviews with industry leaders, charity founders, vets,
                  trainers and campaigners.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  New episodes are available on Spotify, creating space for meaningful conversations
                  around responsible ownership, welfare issues, and the experiences that connect dog
                  lovers everywhere.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "In-depth interviews with industry voices",
                  "Welfare, training and ownership discussions",
                  "Stories from rescues and charities",
                  "Available on Spotify",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <p className="text-sm text-white">{item}</p>
                  </div>
                ))}
                <div className="mt-4">
                  <Link href="/podcast" className="btn-primary">Listen Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow us */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 border flex flex-col md:flex-row items-center gap-8"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div className="flex-1">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
                Social Media
              </p>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>Follow Us</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Stay connected with Big Bark News &amp; Media across social media for the latest
                canine news, podcast clips, and community updates.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium transition-colors rounded-xl px-5 py-3 border"
                  style={{ color: "var(--navy)", borderColor: "var(--border)" }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Get Involved
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Share Your Story?
          </h2>
          <p className="leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            Whether you are a dog owner, rescue organisation, trainer, brand, journalist or advocate,
            Big Bark News &amp; Media exists to help strengthen the canine community we all care about.
          </p>
          <p className="font-semibold italic mb-8" style={{ color: "var(--gold)" }}>
            Register your organisation and submit news, press releases or events today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary">Register Your Organisation</Link>
            <Link href="/contact" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
