import { ImageResponse } from "next/og";

export const alt = "EazyAccess — Access everything.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FDFCFA",
          padding: "80px 80px 60px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: Logo mark + eyebrow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M6 4H4V24H24V22"
                stroke="#C8622A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="miter"
              />
              <path
                d="M10 4H24V18"
                stroke="#141210"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="miter"
              />
            </svg>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: "#141210",
                fontFamily: "sans-serif",
              }}
            >
              EAZY<span style={{ color: "#C8622A" }}>ACCESS</span>
            </span>
          </div>

          {/* Main headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span
              style={{
                fontSize: 88,
                fontStyle: "italic",
                lineHeight: 0.95,
                color: "#141210",
                letterSpacing: "-0.02em",
              }}
            >
              Access
            </span>
            <span
              style={{
                fontSize: 88,
                fontStyle: "italic",
                lineHeight: 0.95,
                color: "#C8622A",
                letterSpacing: "-0.02em",
              }}
            >
              everything.
            </span>
          </div>

          {/* Subtitle */}
          <span
            style={{
              fontSize: 22,
              color: "#6E6A64",
              fontFamily: "sans-serif",
              fontWeight: 300,
              maxWidth: 600,
              lineHeight: 1.5,
            }}
          >
            A permanent portfolio of software built for the serious, practical
            parts of British life.
          </span>
        </div>

        {/* Bottom row: domain + product count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #DDD8D0",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#A8A49E",
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            eazyaccess.org · est. 2025 · United Kingdom
          </span>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Products", value: "5" },
              { label: "Domains", value: "7" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontStyle: "italic",
                    color: "#C8622A",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#A8A49E",
                    fontFamily: "sans-serif",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
