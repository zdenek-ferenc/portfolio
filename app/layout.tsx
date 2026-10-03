import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingDock from "@/components/ui/floating-dock";
import PointerGlow from "@/components/ui/pointer-glow";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Zdenek Ferenc - Developer & Founder",
  description: "Developer & Founder tvořící moderní webové aplikace s důrazem na čisté UI a skvělé UX.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="dark custom-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-200 selection:bg-accent/30`}
      >
        {/* Jemný noise overlay (fixed, bez pointer events) */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.025] mix-blend-overlay bg-noise" />

        {children}

        <PointerGlow />
        <FloatingDock />
        <Analytics />
      </body>
    </html>
  );
}
