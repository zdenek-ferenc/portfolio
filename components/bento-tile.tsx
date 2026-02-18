"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export default function BentoTile({ children, className = "", delay = 0, index = 0 }: BentoTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1 + delay,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={`bg-surface rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
