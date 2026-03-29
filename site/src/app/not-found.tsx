import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex flex-1 items-center justify-center px-6 pt-16 md:px-12">
        <div className="text-center">
          <p className="font-display text-[120px] italic leading-none text-ghost md:text-[160px]">
            404
          </p>
          <h1 className="mt-5 font-body text-[18px] font-semibold tracking-tight text-ink">
            Page not found.
          </h1>
          <p className="mx-auto mt-4 max-w-[360px] font-body text-[15px] leading-[1.7] text-mid">
            The page you are looking for does not exist, or has been moved.
          </p>
          <div className="mt-12 flex items-center justify-center gap-7">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-button border-[1.5px] border-accent px-7 py-3 font-body text-[13px] font-medium tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-[#FDFCFA]"
            >
              Back to home
            </Link>
            <Link
              href="/products"
              className="font-body text-[13px] text-faint transition-colors duration-300 hover:text-ink"
            >
              View products →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
