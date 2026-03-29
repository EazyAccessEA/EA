import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex flex-1 items-center justify-center px-6 pt-14 md:px-10">
        <div className="text-center">
          <p className="font-display text-[120px] italic leading-none text-ghost md:text-[180px]">
            404
          </p>
          <h1 className="mt-4 font-body text-lg font-semibold tracking-tight text-ink">
            Page not found.
          </h1>
          <p className="mx-auto mt-3 max-w-[360px] font-body text-sm font-light leading-relaxed text-mid">
            The page you are looking for does not exist, or has been moved.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-button border-[1.5px] border-accent px-6 py-[10px] font-body text-[13px] font-medium text-accent transition-all hover:bg-accent hover:text-[#FDFCFA]"
            >
              Back to home
            </Link>
            <Link
              href="/products"
              className="font-body text-[13px] text-faint transition-colors hover:text-ink"
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
