"use client";
import { useRef, useCallback } from "react";

export default function SpotlightCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--spotlight-x", `${x}px`);
    divRef.current.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    divRef.current?.style.setProperty("--spotlight-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    divRef.current?.style.setProperty("--spotlight-opacity", "0");
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/50 transition-colors ${className}`}
      style={{
        "--spotlight-x": "0px",
        "--spotlight-y": "0px",
        "--spotlight-opacity": "0",
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute -inset-px hidden md:block z-10 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: "radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), rgba(255, 255, 255, 0.06), transparent 40%)",
        }}
      />
      <div className="flex flex-col gap-4 items-center h-full z-20">{children}</div>
    </div>
  );
}