import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { products } from "@/lib/products";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-surface px-6 py-4 md:px-9">
      <div className="flex items-center gap-3">
        <Link href="/" aria-label="EazyAccess home">
          <LogoMark size={20} variant="light" showWordmark />
        </Link>
        <span className="font-mono text-[10px] tracking-widest text-stone/70">
          © {new Date().getFullYear()} EazyAccess
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {products.map((p) => (
          <a
            key={p.slug}
            href={`https://${p.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-stone/70 transition-colors hover:text-stone"
          >
            {p.domain}
          </a>
        ))}
        <Link
          href="/press"
          className="font-mono text-[10px] text-stone/70 transition-colors hover:text-stone"
        >
          Press
        </Link>
        <Link
          href="/privacy"
          className="font-mono text-[10px] text-stone/70 transition-colors hover:text-stone"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
