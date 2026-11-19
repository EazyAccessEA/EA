import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/Cormorant-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Cormorant-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/Cormorant-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Cormorant-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Cormorant-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Cormorant-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Cormorant-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Cormorant-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/Cormorant-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Cormorant-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = localFont({
  src: [
    { path: "./fonts/Outfit-Thin.ttf", weight: "100" },
    { path: "./fonts/Outfit-ExtraLight.ttf", weight: "200" },
    { path: "./fonts/Outfit-Light.ttf", weight: "300" },
    { path: "./fonts/Outfit-Regular.ttf", weight: "400" },
    { path: "./fonts/Outfit-Medium.ttf", weight: "500" },
    { path: "./fonts/Outfit-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Outfit-Bold.ttf", weight: "700" },
    { path: "./fonts/Outfit-ExtraBold.ttf", weight: "800" },
    { path: "./fonts/Outfit-Black.ttf", weight: "900" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eazyaccess.org"),
  title: {
    default: "EazyAccess — Access everything.",
    template: "%s — EazyAccess",
  },
  description:
    "A permanent portfolio of software built for the serious, practical parts of British life. Five products. Seven domains. Never for sale.",
  openGraph: {
    title: "EazyAccess — Access everything.",
    description:
      "A permanent portfolio of software built for the serious, practical parts of British life.",
    type: "website",
    siteName: "EazyAccess",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "EazyAccess — Access everything.",
    description:
      "A permanent portfolio of software built for the serious, practical parts of British life.",
  },
  other: {
    "theme-color": "#C8622A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {/* Top accent rule — thin, confident */}
        <div
          className="fixed left-0 right-0 top-0 z-[600] h-[2px]"
          style={{ background: "var(--color-accent)" }}
        />
        {children}
      </body>
    </html>
  );
}
