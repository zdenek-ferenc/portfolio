"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export default function BentoTile({
  children,
  className = "",
  delay = 0,
  index = 0,
}: BentoTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.1 + delay,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={`relative bg-neutral-900/40 rounded-2xl border border-white/[0.05] hover:border-white/[0.09] transition-all duration-400 overflow-hidden group ${className}`}
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.025] via-transparent to-transparent" />
      {children}
    </motion.div>
  );
}
