"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoTile({ children, className = "", delay = 0 }: BentoTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-surface rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
