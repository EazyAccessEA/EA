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
        padding: p.featured ? "36px 32px 32px" : "32px 28px 28px",
        border: `1px solid ${p.accent}${p.featured ? "33" : "1A"}`,
        boxShadow: hovered
          ? `0 20px 56px ${p.accent}18, 0 4px 16px rgba(0,0,0,0.06)`
          : p.featured
            ? `0 4px 24px ${p.accent}14`
            : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
      }}
    >
      {/* Type badge for featured */}
      {p.featured && (
        <div
          className="absolute right-5 top-5 rounded font-body text-[9px] font-semibold uppercase tracking-[0.15em]"
          style={{
            background: p.accent,
            color: "#FDFCFA",
            padding: "4px 10px",
          }}
        >
          {p.type}
        </div>
      )}

      <div className={`flex ${p.featured ? "flex-col gap-4 sm:flex-row sm:items-start sm:gap-6" : "flex-col"}`}>
        <div className="flex-1">
          {/* Category eyebrow */}
          <p
            className="font-body text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ color: p.muted }}
          >
            {p.category}
          </p>

          {/* Headline */}
          <div className="mt-4">
            {p.tagline.split(". ").map((line, j) => (
              <span
                key={j}
                className="block font-display italic"
                style={{
                  fontSize: p.featured ? "clamp(28px, 4vw, 44px)" : "clamp(22px, 3vw, 34px)",
                  lineHeight: 1.05,
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
            className="mt-3.5 font-body font-light leading-relaxed"
            style={{
              fontSize: p.featured ? 14 : 13,
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
          <div className="grid min-w-[200px] grid-cols-2 gap-2.5 sm:min-w-[280px]">
            {[
              { label: "UK Primary Schools", value: "16,000" },
              { label: "DfE Objectives Met", value: "3 of 3" },
              { label: "Tools Replaced", value: "4–7" },
              { label: "Pilot Partner", value: "Univ. of Birmingham" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg"
                style={{
                  padding: "12px 14px",
                  background: `${p.accent}0C`,
                  border: `1px solid ${p.accent}18`,
                }}
              >
                <div
                  className="font-display italic leading-none"
                  style={{ fontSize: 22, color: p.accent }}
                >
                  {value}
                </div>
                <div
                  className="mt-1 font-body text-[10px] font-normal leading-snug"
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
        className="mt-5 flex items-center justify-between pt-4"
        style={{ borderTop: `1px solid ${p.accent}18` }}
      >
        <div className="flex items-center gap-[7px]">
          <div
            className="h-[5px] w-[5px] rounded-full"
            style={{ background: p.accent }}
          />
          <span className="font-mono text-[10px] tracking-[0.04em]" style={{ color: p.muted }}>
            {p.domain}
          </span>
        </div>
        <span
          className="text-[11px] font-medium transition-opacity"
          style={{ color: p.accent, opacity: hovered ? 1 : 0 }}
        >
          Visit →
        </span>
      </div>
    </div>
  );
}
