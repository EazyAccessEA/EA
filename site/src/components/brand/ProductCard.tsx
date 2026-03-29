"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product: p }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={p.featured ? "sm:col-span-2" : ""}
      style={{
        background: p.bg,
        borderRadius: 16,
        padding: p.featured ? "40px 36px 36px" : "36px 32px 32px",
        border: `1px solid ${p.accent}${p.featured ? "28" : "14"}`,
        boxShadow: hovered
          ? `0 14px 44px ${p.accent}12, 0 4px 14px rgba(0,0,0,0.04)`
          : p.featured
            ? `0 4px 20px ${p.accent}10`
            : "0 2px 10px rgba(0,0,0,0.03)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
      }}
    >
      {/* Type badge for featured */}
      {p.featured && (
        <div
          className="absolute right-6 top-6 rounded-[4px] font-body text-[9px] font-semibold uppercase tracking-[0.15em]"
          style={{
            background: p.accent,
            color: "#FDFCFA",
            padding: "5px 12px",
          }}
        >
          {p.type}
        </div>
      )}

      <div className={`flex ${p.featured ? "flex-col gap-5 sm:flex-row sm:items-start sm:gap-8" : "flex-col"}`}>
        <div className="flex-1">
          {/* Category eyebrow */}
          <p
            className="font-body text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: p.muted }}
          >
            {p.category}
          </p>

          {/* Headline */}
          <div className="mt-5">
            {p.tagline.split(". ").map((line, j) => (
              <span
                key={j}
                className="block font-display italic"
                style={{
                  fontSize: p.featured ? "clamp(28px, 4vw, 44px)" : "clamp(24px, 3vw, 36px)",
                  lineHeight: 1.08,
                  color: j === 0 ? p.text : p.accent,
                  letterSpacing: "-0.02em",
                }}
              >
                {line}{j === 0 && p.tagline.includes(". ") ? "." : ""}
              </span>
            ))}
          </div>

          {/* Body */}
          <p
            className="mt-4 font-body leading-[1.7]"
            style={{
              fontSize: p.featured ? 15 : 14,
              color: p.text,
              opacity: 0.6,
              maxWidth: p.featured ? 560 : "100%",
            }}
          >
            {p.oneliner}
          </p>
        </div>

        {/* Featured stats grid */}
        {p.featured && (
          <div className="grid min-w-[200px] grid-cols-2 gap-3 sm:min-w-[280px]">
            {[
              { label: "UK Primary Schools", value: "16,000" },
              { label: "DfE Objectives Met", value: "3 of 3" },
              { label: "Tools Replaced", value: "4–7" },
              { label: "Pilot Partner", value: "Univ. of Birmingham" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-[10px]"
                style={{
                  padding: "14px 16px",
                  background: `${p.accent}0C`,
                  border: `1px solid ${p.accent}14`,
                }}
              >
                <div
                  className="font-display italic leading-none"
                  style={{ fontSize: 22, color: p.accent }}
                >
                  {value}
                </div>
                <div
                  className="mt-1.5 font-body text-[10px] font-normal leading-snug"
                  style={{ color: p.muted }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer row */}
      <div
        className="mt-6 flex items-center justify-between pt-5"
        style={{ borderTop: `1px solid ${p.accent}14` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-[5px] w-[5px] rounded-full"
            style={{ background: p.accent }}
          />
          <span className="font-mono text-[10px] tracking-[0.04em]" style={{ color: p.muted }}>
            {p.domain}
          </span>
        </div>
        <span
          className="text-[11px] font-medium transition-opacity duration-300"
          style={{ color: p.accent, opacity: hovered ? 1 : 0 }}
        >
          Visit →
        </span>
      </div>
    </div>
  );
}
