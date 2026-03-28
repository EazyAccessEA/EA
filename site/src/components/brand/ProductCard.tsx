import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  brand: Product;
  href: string;
  featured?: boolean;
}

export function ProductCard({ brand, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      data-brand={brand.slug}
      className="group relative block rounded-card border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: brand.bg,
        borderColor: `${brand.accent}22`,
      }}
    >
      <span
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: brand.accent }}
      >
        {brand.category}
      </span>
      <h3
        className="mt-2 font-body text-2xl font-bold tracking-tight"
        style={{ color: brand.text }}
      >
        {brand.name}
      </h3>
      <p
        className="mt-1 font-display italic"
        style={{ color: brand.accent }}
      >
        {brand.tagline}
      </p>
      <p
        className="mt-2 font-mono text-[10px] opacity-60"
        style={{ color: brand.text }}
      >
        {brand.domain}
      </p>
      {/* Hover: accent border glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-card border opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          borderColor: brand.accent,
          boxShadow: `0 0 0 1px ${brand.accent}44`,
        }}
        aria-hidden
      />
    </Link>
  );
}
