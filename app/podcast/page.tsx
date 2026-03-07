import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast",
  description: "The Big Bark News & Media podcast — conversations, interviews and discussions from Ireland's canine community.",
  openGraph: {
    title: "Podcast | Big Bark News & Media",
    description: "Conversations, interviews and discussions from Ireland's canine community.",
    url: "https://bbnm.ie/podcast",
  },
  alternates: { canonical: "https://bbnm.ie/podcast" },
};

const topics = [
  { title: "Animal Welfare & Rescue", desc: "Stories from rescues, campaigns, and the people fighting for better standards across Ireland." },
  { title: "Training & Behaviour", desc: "Expert conversations with certified trainers and behaviourists on responsible, effective dog training." },
  { title: "Industry & Business", desc: "Insights from canine businesses, brands, and the professionals shaping the industry." },
  { title: "Veterinary & Nutrition", desc: "Science-backed discussions with vets and nutritionists on keeping dogs healthy." },
  { title: "Community & Events", desc: "Coverage of shows, fundraisers, and initiatives bringing the canine community together." },
  { title: "Advocacy & Policy", desc: "Conversations with campaigners and voices influencing canine welfare legislation in Ireland." },
];

export default function PodcastPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Big Bark News &amp; Media
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The Big Bark Podcast
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Ireland&apos;s dedicated canine podcast — bringing together charity leaders, business owners,
            trainers, vets and advocates to discuss the topics that matter most to dogs and the people
            who care for them.
          </p>
        </div>
      </section>

      {/* Spotify embed */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Listen Now
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Latest Episodes</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <iframe
              src="https://open.spotify.com/embed/show/1q1moteO1FTB0B6pzSQnG7?utm_source=generator"
              width="100%"
              height="352"
              style={{ border: "none", display: "block" }}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-center mt-4" style={{ color: "var(--muted)" }}>
            Can&apos;t see the player?{" "}
            <a
              href="https://open.spotify.com/show/1q1moteO1FTB0B6pzSQnG7"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--navy)", fontWeight: 600 }}
            >
              Listen directly on Spotify →
            </a>
          </p>
        </div>
      </section>

      {/* About */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              About the Show
            </p>
            <h2 className="text-3xl font-bold text-white mb-6">What We Cover</h2>
          </div>
          <div
            className="rounded-2xl p-8 border mb-8"
            style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(244,161,53,0.3)" }}
          >
            <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
              <strong className="text-white">The Big Bark Podcast</strong> is the canine industry&apos;s
              go-to audio destination. Each episode we dive deep into news from across the sector —
              from animal welfare campaigns and rescue operations, to breed standards, nutrition science
              and the growing world of canine-focused businesses.
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              Whether you&apos;re a professional in the industry or simply passionate about dogs,
              there&apos;s something for every listener. New episodes drop regularly — subscribe on
              Spotify to never miss an instalment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t) => (
              <div
                key={t.title}
                className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,161,53,0.2)" }}
              >
                <div className="w-1 h-5 rounded-full mb-3" style={{ background: "var(--gold)" }} />
                <h3 className="font-bold text-sm text-white mb-2">{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature on podcast CTA */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Get Involved
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Want to Feature on the Podcast?
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            We&apos;re always looking for interesting guests — whether you represent a charity,
            run a canine business, or have a story worth telling. Get in touch to discuss
            featuring on The Big Bark Podcast.
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
