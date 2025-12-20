import type { Metadata } from "next";
import "./globals.css";
import FloatingDock from "@/components/ui/floating-dock";

export const metadata: Metadata = {
  title: "Zdenek Ferenc - Product Engineer",
  description: "Product Engineer turning complex ideas into clean software. Full-stack developer with an eye for design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark custom-scrollbar">
      <body className="antialiased bg-neutral-950 text-neutral-200 selection:bg-red-500/30">
        
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay bg-noise" />
        
        {children}
        
        <FloatingDock />
      </body>
    </html>
  );
}