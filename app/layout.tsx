import type { Metadata } from "next";
// 1. Importujeme Plus_Jakarta_Sans místo Inter
import { Space_Grotesk, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import FloatingDock from "@/components/ui/floating-dock";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

// 2. Nakonfigurujeme Plus Jakarta Sans jako hlavní font
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zdenek Ferenc - Product Engineer",
  description: "Product Engineer turning complex ideas into clean software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark custom-scrollbar">
      <body
        // 3. Použijeme jakarta.variable místo inter.variable
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${caveat.variable} antialiased bg-neutral-950 text-neutral-200 selection:bg-red-500/30`}
      >
        {/* Noise overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay bg-noise" />
        
        {children}
        
        <FloatingDock />
      </body>
    </html>
  );
}