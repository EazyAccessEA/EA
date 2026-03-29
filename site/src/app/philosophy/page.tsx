import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Philosophy — EazyAccess",
  description:
    "Six decisions made in advance, published so they can be tested against our actions rather than our intentions.",
};

const decisions = [
  {
    number: "01",
    title: "We do not use dark patterns.",
    body: "Manufactured urgency, hidden cancellation flows, confusing pricing structures, interfaces designed to extract rather than serve — none of it. If a product is genuinely useful, people will choose to pay for it. If they wouldn\u2019t choose to without manipulation, the product is not good enough yet.",
  },
  {
    number: "02",
    title: "We build for British life.",
    body: "Not British by registration. British in substance. Our products know what a council tax bill is, what the NHS looks like from the patient\u2019s side, what a tenancy agreement requires under English and Scottish law, what a British farm\u2019s regulatory obligations actually are. When context matters, we get it right.",
  },
  {
    number: "03",
    title: "We own what we build. Permanently.",
    body: "We do not build things to sell them. We do not acquire things to package them. Every product we own today we expect to be improving twenty years from now. If we would not own it for twenty years, we do not build it.",
  },
  {
    number: "04",
    title: "We design as if design is the product.",
    body: "Because it is. A confusing interface is not an aesthetic failure. It is a functional failure. Time a user spends confused is time they spent experiencing our product failing them. We treat the design of every product as seriously as we treat the code.",
  },
  {
    number: "05",
    title: "Privacy is the infrastructure, not the pitch.",
    body: "We do not advertise our privacy practices as a feature. We implement them as a requirement and mention them once. User data is not revenue. Encryption is not optional. GDPR compliance is the floor. We do not measure our practices against the legal minimum. We measure them against what a user would consider fair if they read every line of our implementation.",
  },
  {
    number: "06",
    title: "We remove more than we add.",
    body: "Feature requests are easy to receive and easy to implement. The discipline is knowing which ones to refuse. Our products do fewer things than our competitors. They do those things better. We prefer to do one thing that earns trust over three things that dilute focus.",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="px-6 pb-20 pt-28 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                What we believe
              </p>
              <h1
                className="mt-7 font-display italic text-ink"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                Six decisions
              </h1>
              <h1
                className="font-display italic text-accent"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                made in advance.
              </h1>
              <p className="mt-10 max-w-[600px] font-body text-[16px] leading-[1.8] text-mid">
                Most organisations describe their values on a wall. Values on a wall change when
                they become inconvenient. We prefer decisions made in advance, published so they
                can be tested against our actions rather than our intentions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* The six decisions */}
        <section className="px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-[740px]">
            {decisions.map((d, i) => (
              <FadeIn key={d.number} delay={i * 50}>
                <div className={`group ${i > 0 ? "mt-16 border-t border-rule-light pt-16" : ""}`}>
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-[32px] italic text-ghost transition-colors duration-300 group-hover:text-accent">
                      {d.number}
                    </span>
                    <h2 className="font-body text-[18px] font-semibold tracking-tight text-ink">
                      {d.title}
                    </h2>
                  </div>
                  <p className="mt-5 max-w-[600px] font-body text-[16px] leading-[1.85] text-mid">
                    {d.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* The constraint */}
        <section className="px-6 py-24 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                The one decision that makes everything else possible
              </p>
              <h2
                className="mt-7 font-display italic text-ink"
                style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05 }}
              >
                We will never take outside investment.
              </h2>
              <div className="mt-10 space-y-7">
                <p className="font-body text-[16px] leading-[1.85] text-mid">
                  Not because investors are bad. Not because the relationships are unpleasant.
                  Because the structure changes everything. One investor introduces one timeline.
                  One timeline introduces one objective that is not the product. The moment that
                  objective exists, every decision is made in its shadow.
                </p>
                <p className="font-body text-[16px] leading-[1.85] text-mid">
                  Constellation Software never took outside capital. 37signals never took outside
                  capital. The most enduring software companies in the world — the ones that got
                  better every year, that their customers could rely on a decade after they first
                  signed up — were almost uniformly built on revenue.
                </p>
                <p className="font-body text-[16px] leading-[1.85] text-ink">
                  Revenue is slow. Revenue requires building something people want badly enough to
                  pay for it. Revenue means you cannot fake traction. Revenue is the right constraint.
                  We have chosen it permanently.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* The test — dark section */}
        <section style={{ background: "var(--color-void)" }}>
          <div className="mx-auto max-w-[740px] px-6 py-28 md:px-12">
            <FadeIn>
              <p className="font-body text-[16px] leading-[1.85] text-[#7A776F]">
                These six beliefs, if genuinely held and visibly embodied in every product,
                every hire, every decision about what to acquire and what to decline — they
                become a brand that cannot be purchased, cannot be copied, and cannot be
                competed with on price.
              </p>
              <p className="mt-10 font-display text-[28px] italic text-[#FDFCFA]" style={{ lineHeight: 1.15 }}>
                You cannot undercut a philosophy.
              </p>
              <div className="mt-12">
                <Link
                  href="/founders"
                  className="font-body text-[13px] font-medium text-accent transition-colors duration-300 hover:text-[#FDFCFA]"
                >
                  A letter to founders considering selling →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
