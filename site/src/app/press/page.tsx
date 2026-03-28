import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "Press — EazyAccess",
  description:
    "Press kit, brand assets, and contact for journalists and partners. EazyAccess — a sovereign portfolio of tools for British life.",
};

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 px-6 py-16 md:px-9">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-normal italic leading-tight tracking-tight text-bone sm:text-4xl">
            Press kit.
          </h1>
          <p className="mt-6 font-body text-stone leading-relaxed">
            For journalists and partners: brand assets, one-liners, and contact details.
          </p>

          <section className="mt-12 border-t border-surface pt-10">
            <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
              Company description (one paragraph)
            </h2>
            <p className="mt-4 font-body text-bone/90 leading-relaxed">
              EazyAccess is a UK-based portfolio of tools for British life: HushRealm (private document vault), PagePerfect (document publishing), FarmCompanion (UK farm directory), and AllowanceGuard (family financial control). We build independently — no venture capital, no exit pressure — with a focus on craft, clarity, and long-term value for the people who use our products.
            </p>
          </section>

          <section className="mt-12 border-t border-surface pt-10">
            <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
              Brand assets
            </h2>
            <p className="mt-4 font-body text-stone text-sm">
              Logo SVGs, colour codes, and press-ready assets are available in{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">public/brand/</code>.
              For specific requests, use the contact below.
            </p>
          </section>

          <section className="mt-12 border-t border-surface pt-10">
            <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
              Contact
            </h2>
            <p className="mt-4 font-body text-stone text-sm">
              Press and partnership enquiries:{" "}
              <a
                href="mailto:press@eazyaccess.org"
                className="text-ember underline decoration-ember/50 underline-offset-2 hover:decoration-ember"
              >
                press@eazyaccess.org
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
