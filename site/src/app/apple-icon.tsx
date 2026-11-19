import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDFCFA",
          borderRadius: 40,
        }}
      >
        <svg
          width="100"
          height="100"
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
      </div>
    ),
    { ...size }
  );
}
