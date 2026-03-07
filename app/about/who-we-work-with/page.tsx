import Link from "next/link";

export const metadata = {
  title: "Who We Work With",
  description: "Big Bark News & Media partners with charities, rescues, responsible brands, trainers, media outlets and advocates who share our commitment to the canine community.",
  openGraph: { url: "https://bbnm.ie/about/who-we-work-with" },
  alternates: { canonical: "https://bbnm.ie/about/who-we-work-with" },
};

const partners = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Charities & Rescues",
    desc: "Supporting welfare organisations is a core pillar of our platform.",
    items: [
      "Animal rescues",
      "Breed-specific charities",
      "Welfare advocacy groups",
      "Community rehoming initiatives",
    ],
    note: "Through interviews, digital features, press amplification and structured media distribution, we help organisations increase visibility, strengthen engagement, and extend their reach.",
    quote: "Impact matters more than impressions.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    label: "Responsible Canine Brands",
    desc: "We collaborate with brands that understand their responsibility within the industry.",
    items: [
      "Nutrition",
      "Accessories and equipment",
      "Training services",
      "Insurance",
      "Grooming",
      "Canine technology",
      "Events and community initiatives",
    ],
    note: "The organisations we partner with prioritise transparency, ethical standards, and long-term value for dog owners.",
    quote: "Our audience trusts us. That trust is protected carefully.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l1.06-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Trainers, Behaviourists & Veterinary Professionals",
    desc: "Education is central to everything we produce.",
    items: [
      "Certified dog trainers",
      "Accredited behaviourists",
      "Veterinary professionals",
      "Canine nutritionists",
      "Groomers and welfare specialists",
    ],
    note: "Our platform ensures credible expertise reaches dog owners in an accessible, responsible and impactful way.",
    quote: null,
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
    label: "Industry Voices & Advocates",
    desc: "We collaborate with individuals and organisations shaping the future of the canine sector.",
    items: [
      "Campaigners and welfare advocates",
      "Policy voices influencing regulation",
      "Industry innovators",
      "Event organisers",
      "Community leaders",
    ],
    note: "If you are contributing meaningfully to the canine conversation, we provide the platform to ensure your voice is heard.",
    quote: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    label: "Media Outlets & Press Partners",
    desc: "As Ireland's central canine media hub, we work directly with national and regional press.",
    items: [
      "Newspapers",
      "Radio stations",
      "Digital news platforms",
      "Broadcast media",
      "Independent journalists",
    ],
    note: "Charities, rescues, businesses and advocates can share news through our platform. In turn, media outlets can subscribe to our dedicated RSS feed — giving them streamlined access to verified, relevant canine industry information.",
    quote: null,
  },
];

export default function WhoWeWorkWithPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--navy)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            Partnerships &amp; Collaboration
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Who We Work With
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            As Ireland&apos;s central canine media hub, Big Bark News &amp; Media connects the people
            shaping the industry with the audiences and outlets that amplify their impact.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 border-l-4"
            style={{ background: "#fff", borderColor: "var(--gold)" }}
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              At Big Bark News &amp; Media, we partner with organisations and individuals who share
              our commitment to responsible dog ownership, long-term impact, and raising standards
              within the canine industry.
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--navy)" }}>
              Our role is not simply to create content — it is to strengthen the flow of credible
              information across Ireland&apos;s canine community.
            </p>
          </div>
        </div>
      </section>

      {/* Partner categories */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl p-8 border flex flex-col"
                style={{ background: "#fff", borderColor: "var(--border)" }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ background: "rgba(244,161,53,0.1)", color: "var(--gold)" }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-snug" style={{ color: "var(--navy)" }}>
                      {p.label}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{p.desc}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5 flex-1">
                  {p.items.map((item) => (
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

                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                  {p.note}
                </p>

                {p.quote && (
                  <p className="text-sm font-semibold italic" style={{ color: "var(--navy)" }}>
                    {p.quote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSS / Press hub */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Media Infrastructure
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              A Shared Information Network
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                heading: "Greater Visibility",
                body: "Greater visibility for responsible organisations",
              },
              {
                heading: "Easier Access",
                body: "Easier access to credible stories for journalists",
              },
              {
                heading: "Stronger Coverage",
                body: "Stronger, more consistent coverage of Ireland's canine community",
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl p-6 text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(244,161,53,0.25)",
                }}
              >
                <p className="font-bold text-white mb-2">{item.heading}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-semibold italic" style={{ color: "rgba(255,255,255,0.65)" }}>
            We simplify the connection between those doing the work and those reporting on it.
          </p>
        </div>
      </section>

      {/* Strategic collaborations */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
              Strategic Partnerships
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
              Strategic &amp; Media Collaborations
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              We also partner with carefully selected production teams, event venues, sponsors and
              digital collaborators who support the continued growth of Ireland&apos;s canine media
              ecosystem.
            </p>
            <div
              className="rounded-xl p-5 border-l-4"
              style={{ background: "#f0f4ff", borderColor: "var(--gold)" }}
            >
              <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
                Every partnership is considered through one guiding question:
              </p>
              <p className="font-bold text-base mt-2" style={{ color: "var(--navy)" }}>
                &ldquo;Does this strengthen the canine community and uphold our standards?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared standard */}
      <section style={{ background: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Our Standard
          </p>
          <h2 className="text-3xl font-bold text-white mb-6">A Shared Standard</h2>
          <p className="leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Big Bark News &amp; Media is built on integrity. We align ourselves with organisations
            that demonstrate ethical practices, transparency, and a genuine commitment to the welfare
            of dogs and their owners.
          </p>
          <div
            className="rounded-xl p-6 mb-8"
            style={{
              background: "rgba(244,161,53,0.12)",
              border: "1px solid rgba(244,161,53,0.3)",
            }}
          >
            <p className="text-white font-semibold mb-1">Shared values create stronger impact.</p>
            <p style={{ color: "var(--gold)", fontWeight: 600 }}>Stronger impact creates lasting change.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Start the Conversation
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            If your organisation is working to improve, inform or support the canine community, we
            would welcome the opportunity to collaborate.
          </p>
          <p className="font-semibold mb-2" style={{ color: "var(--navy)" }}>
            Big Bark News &amp; Media isn&apos;t just producing content.
          </p>
          <p className="font-bold italic mb-8" style={{ color: "var(--navy)" }}>
            We are building the infrastructure that connects Ireland&apos;s canine world.
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
