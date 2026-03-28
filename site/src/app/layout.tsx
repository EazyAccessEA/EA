import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eazyaccess.org"),
  title: "EazyAccess — Access everything.",
  description:
    "A sovereign portfolio of tools for British life. HushRealm, PagePerfect, FarmCompanion, AllowanceGuard.",
  openGraph: {
    title: "EazyAccess — Access everything.",
    description: "A sovereign portfolio of tools for British life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
