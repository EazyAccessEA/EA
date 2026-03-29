import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Press — EazyAccess",
  description:
    "Press kit, brand assets, and contact for journalists and partners.",
};

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-16">
        <section className="px-6 pb-20 pt-28 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                For journalists & partners
              </p>
              <h1
                className="mt-7 font-display italic text-ink"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                Press kit.
              </h1>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 py-20 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[740px] space-y-16">
            <FadeIn>
              <div>
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Company description
                </p>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-mid">
                  EazyAccess is a UK-based permanent capital vehicle for British software. The
                  portfolio includes HushRealm (private document vault), PagePerfect (document
                  publishing), FarmCompanion (UK farm directory), AllowanceGuard (family financial
                  control), and OneSchool (school management platform). We build independently —
                  no venture capital, no exit pressure — with a focus on craft, clarity, and
                  permanent ownership.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={60}>
              <div>
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Brand assets
                </p>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-mid">
                  Logo SVGs, colour codes, and press-ready assets are available on request.
                  For specific requirements, use the contact below.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div>
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Contact
                </p>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-mid">
                  Press and partnership enquiries:{" "}
                  <a
                    href="mailto:info@eazyaccess.org"
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-3 transition-colors hover:decoration-accent"
                  >
                    info@eazyaccess.org
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
