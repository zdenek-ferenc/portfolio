"use client";

import { motion } from "framer-motion";

interface StatusPillProps {
  text: string;
  variant?: "success" | "warning" | "info";
}

export default function StatusPill({ text, variant = "success" }: StatusPillProps) {
  const colors = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[variant]} text-sm font-medium`}
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`w-2 h-2 rounded-full ${variant === "success" ? "bg-green-500" : variant === "warning" ? "bg-yellow-500" : "bg-blue-500"}`}
      />
      {text}
    </motion.div>
  );
}
