import type { Metadata } from "next";
import { Cormorant, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eazyaccess.org"),
  title: "EazyAccess — Access everything.",
  description:
    "A permanent portfolio of software built for the serious, practical parts of British life. Five products. Seven domains. Never for sale.",
  openGraph: {
    title: "EazyAccess — Access everything.",
    description:
      "A permanent portfolio of software built for the serious, practical parts of British life.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
