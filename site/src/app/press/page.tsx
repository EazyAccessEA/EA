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

      <main className="flex-1 pt-14">
        <section className="px-6 pb-16 pt-24 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                For journalists & partners
              </p>
              <h1
                className="mt-6 font-display italic text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                Press kit.
              </h1>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px] space-y-14">
            <FadeIn>
              <div>
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                  Company description
                </p>
                <p className="mt-4 font-body text-[15px] font-light leading-[1.85] text-mid">
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
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                  Brand assets
                </p>
                <p className="mt-4 font-body text-[15px] font-light leading-[1.85] text-mid">
                  Logo SVGs, colour codes, and press-ready assets are available on request.
                  For specific requirements, use the contact below.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div>
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                  Contact
                </p>
                <p className="mt-4 font-body text-[15px] font-light leading-[1.85] text-mid">
                  Press and partnership enquiries:{" "}
                  <a
                    href="mailto:info@eazyaccess.org"
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
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
