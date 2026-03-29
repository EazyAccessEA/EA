import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "About — EazyAccess",
  description:
    "A permanent capital vehicle for British software. Built independently, held permanently, designed with care.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-14">
        <section className="px-6 pb-16 pt-24 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                About EazyAccess
              </p>
              <h1
                className="mt-6 font-display italic text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                Mission, story, founder.
              </h1>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px] space-y-8">
            <FadeIn>
              <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                EazyAccess is a permanent capital vehicle for British software. We build and acquire
                tools for the serious, practical parts of British life — documents, education,
                agriculture, family finance — and hold them permanently. No venture capital. No exit
                pressure. No timeline except: is this better than it was last year?
              </p>
            </FadeIn>

            <FadeIn delay={60}>
              <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                The model is Constellation Software meets 37signals, made British. Patient capital.
                Permanent ownership. A design standard and philosophical identity that creates trust
                over years, not quarters. Five products today. Thirty within fifteen years.
              </p>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="font-body text-[15px] font-light leading-[1.85] text-ink">
                If you want the one-paragraph version: EazyAccess builds tools that give control back
                to the people using them. No extraction, no complexity, no compromise. Just clean,
                considered software that works.
              </p>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="flex flex-wrap gap-6 pt-4">
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Read our philosophy →
                </Link>
                <Link
                  href="/founders"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Letter to founders →
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
