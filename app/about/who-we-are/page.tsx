import Link from "next/link";

export const metadata = {
  title: "Who We Are | Big Bark News & Media",
  description:
    "Big Bark News & Media is Ireland's central canine media hub — a platform dedicated to informing, connecting, and elevating the canine community.",
};

const values = [
  {
    title: "Integrity",
    desc: "Trust is the foundation of any media platform. We are committed to responsible reporting, credible sources, and honest storytelling.",
  },
  {
    title: "Advocacy for Dogs",
    desc: "Animal welfare matters. Responsible dog ownership and ethical standards should always be promoted.",
  },
  {
    title: "Community First",
    desc: "Dog owners, rescues, and professionals are at the centre of everything we do.",
  },
  {
    title: "Amplifying Good Work",
    desc: "We aim to highlight the incredible work happening across rescues, charities, and the canine industry.",
  },
  {
    title: "Raising Industry Standards",
    desc: "Transparency, responsibility and higher standards benefit dogs and their owners.",
  },
  {
    title: "Media Responsibility",
    desc: "As Ireland's central canine media hub, we aim to provide journalists and the public with credible access to canine-related news and information.",
  },
];

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    title: "News & Media Coverage",
    desc: "We publish stories and coverage from across the canine sector, highlighting developments in welfare, training, industry innovation, and community initiatives. Our goal is to provide responsible, informative media coverage that strengthens understanding within the dog-owning community.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: "The Big Bark Podcast",
    desc: "Our flagship podcast brings together voices from across the canine world — including trainers, rescue organisations, advocates, and everyday dog owners. The show creates space for meaningful conversations around responsible ownership, welfare issues, and the experiences that connect dog lovers everywhere.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "Industry Press Hub",
    desc: "BBNM acts as a central press hub for the canine sector. Charities, rescues, businesses and advocates can submit news, campaigns and announcements through our platform, while media outlets can access verified canine stories through our RSS distribution system.",
  },
];

const futureVision = [
  "Expanding national canine news coverage",
  "Hosting live events and industry discussions",
  "Strengthening partnerships with charities and rescues",
  "Increasing media collaboration across Ireland",
  "Building a trusted resource for dog owners and professionals alike",
];

export default function WhoWeArePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            About Big Bark News &amp; Media
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ireland&apos;s Central<br />Canine Media Hub
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Big Bark News &amp; Media (BBNM) is Ireland&apos;s central canine media hub — a platform
            dedicated to informing, connecting, and elevating the canine community through credible
            journalism, storytelling, and media collaboration.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 border-l-4"
            style={{ background: "#fff", borderColor: "var(--gold)" }}
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Founded by <strong style={{ color: "var(--navy)" }}>Darragh Bourke</strong>, BBNM was
              created to bring structure, visibility, and professionalism to canine media in Ireland.
              What began with The Big Bark Podcast has evolved into a wider media platform that
              connects dog owners, charities, professionals, advocates, and media outlets through one
              trusted source.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              Our mission is simple: to strengthen the conversation around dogs in Ireland and ensure
              the stories that matter are seen, heard, and taken seriously.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Our Platform
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              Three Pillars of Canine Media
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Big Bark News &amp; Media operates across three core areas that together form Ireland&apos;s
              central hub for canine media.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-8 border flex flex-col"
                style={{ background: "#fff", borderColor: "var(--border)" }}
              >
                <div className="mb-5 p-3 rounded-xl w-fit" style={{ background: "rgba(244,161,53,0.1)", color: "var(--gold)" }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: "var(--navy)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 font-semibold" style={{ color: "var(--navy)" }}>
            Together, these pillars help create a stronger and more connected canine media landscape.
          </p>
        </div>
      </section>

      {/* Why BBNM exists */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Why We Exist
            </p>
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Big Bark News &amp; Media Exists
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                Ireland is a nation of dog lovers. Across the country there are thousands of rescues,
                trainers, charities, professionals, and advocates working every day to improve the
                lives of dogs and their owners.
              </p>
              <p className="leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Yet for many years there has been no central media platform dedicated to the canine community.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Important stories often go untold.",
                  "Charities struggle for visibility.",
                  "Industry discussions happen in fragmented spaces.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "var(--gold)", marginTop: "2px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-8 border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(244,161,53,0.3)" }}
            >
              <p className="leading-relaxed mb-4 font-semibold text-lg text-white">
                Big Bark News &amp; Media was created to change that.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                Our goal is to provide a trusted, structured platform where the canine community can
                share stories, highlight important issues, and connect with a wider audience.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                By bringing these voices together, we help ensure the work happening across the
                industry receives the recognition and attention it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community + Press Hub */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Community
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
              A Platform Built for the Community
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              Ireland has a passionate and growing community of dog owners, trainers, vets, rescues,
              and advocates. Big Bark News &amp; Media exists to provide a space where these voices
              can come together.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Dog owners can stay informed",
                "Welfare organisations can amplify their work",
                "Industry professionals can share expertise",
                "Important issues affecting dogs can be discussed openly",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color: "var(--gold)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold italic" style={{ color: "var(--navy)" }}>
              The canine community deserves strong, responsible media.
            </p>
          </div>

          <div className="rounded-2xl p-8 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Press Hub
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
              A Press Hub for the Canine Industry
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Charities, rescues, businesses, and advocates can submit news, campaigns, announcements,
              and event updates through our platform.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Media outlets — including newspapers, radio stations, journalists, and digital publishers
              — can subscribe to our RSS feed to receive relevant canine-related stories in one place.
            </p>
            <p className="leading-relaxed text-sm font-semibold italic" style={{ color: "var(--navy)" }}>
              By simplifying this connection, we help ensure the stories shaping Ireland&apos;s canine
              community receive the attention they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: "var(--navy)", borderColor: "rgba(244,161,53,0.3)" }}
          >
            <div className="p-8 md:p-10">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
                The Team
              </p>
              <h2 className="text-3xl font-bold text-white mb-6">The Big Bark Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                    At the heart of Big Bark News &amp; Media is a small but passionate team.
                  </p>
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Leading the platform is <strong className="text-white">Darragh Bourke</strong>,
                    founder and host of The Big Bark Podcast, whose goal has always been to create a
                    stronger voice for Ireland&apos;s dog community.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Alongside him are the platform&apos;s four-legged personalities — often appearing
                    across podcast segments, media graphics, and digital content:
                  </p>
                  <div className="space-y-2">
                    {["Bruno", "Roxy", "Milly"].map((name) => (
                      <div key={name} className="flex items-center gap-3">
                        <span style={{ color: "var(--gold)" }}>&#128062;</span>
                        <span className="font-semibold text-white">{name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                    They represent the spirit behind the platform — a genuine love for dogs and the
                    community that surrounds them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              What Drives Us
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Our Values</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Everything we do is guided by a clear set of values that shape how we report,
              collaborate, and support the canine community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl p-6 border"
                style={{ background: "#fff", borderColor: "var(--border)" }}
              >
                <div className="w-1 h-6 rounded-full mb-4" style={{ background: "var(--gold)" }} />
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--navy)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              The Road Ahead
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">Looking Ahead</h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>
              Big Bark News &amp; Media is only getting started.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {futureVision.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span style={{ color: "var(--gold)", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className="text-sm font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(244,161,53,0.12)", border: "1px solid rgba(244,161,53,0.3)" }}
          >
            <p className="text-xl font-bold text-white mb-2">Our ambition is clear:</p>
            <p className="text-lg font-semibold" style={{ color: "var(--gold)" }}>
              to become the leading voice for canine media in Ireland.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Join the Conversation
          </h2>
          <p className="leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            Whether you are a dog owner, rescue organisation, trainer, brand, journalist, or advocate,
            Big Bark News &amp; Media exists to help strengthen the canine community we all care about.
          </p>
          <p className="font-semibold italic mb-8" style={{ color: "var(--navy)" }}>
            Because when the right stories are told, the entire community benefits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary">Register Your Organisation</Link>
            <Link href="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
