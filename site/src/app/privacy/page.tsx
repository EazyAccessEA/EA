import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "Privacy Policy — EazyAccess",
  description: "Privacy policy for EazyAccess and its portfolio of products.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 px-6 py-16 md:px-9">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-normal italic leading-tight tracking-tight text-bone sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body text-sm text-stone">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div className="mt-10 space-y-6 font-body text-stone leading-relaxed">
            <p>
              EazyAccess (“we”) respects your privacy. This site (eazyaccess.org) is the parent brand site for our portfolio of products. We do not sell your data. We use minimal, privacy-respecting analytics (e.g. Vercel Analytics) where applicable; we do not use Google Analytics or advertising trackers on this site.
            </p>
            <p>
              For product-specific privacy practices (e.g. HushRealm, PagePerfect), please refer to the privacy policy on each product’s domain when you use that product.
            </p>
            <p>
              If you contact us (e.g. via press@eazyaccess.org), we use your details only to respond. We do not add you to marketing lists without your consent.
            </p>
            <p>
              For questions about this policy, contact{" "}
              <a
                href="mailto:press@eazyaccess.org"
                className="text-ember underline decoration-ember/50 underline-offset-2 hover:decoration-ember"
              >
                press@eazyaccess.org
              </a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
