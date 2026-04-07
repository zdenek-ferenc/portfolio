"use client";

import { motion } from "framer-motion";

interface LiveWidgetProps {
  value: number;
  color: string;
  label: string;
  isActive: boolean;
}

export default function LiveWidget({ value, color, label, isActive }: LiveWidgetProps) {
  const segments = 10;
  const filledSegments = Math.round((value / 100) * segments);

  return (
    <div className="bg-neutral-900/40 rounded-2xl p-7 border border-white/[0.05] h-full hover:border-white/[0.09] transition-all duration-400">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.12em]">
          {label}
        </h3>
        {isActive && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Live</span>
            <div className="relative w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span
                className="relative inline-flex rounded-full w-2 h-2 bg-green-500"
                style={{ boxShadow: "0 0 6px rgba(34,197,94,0.5)" }}
              />
            </div>
          </div>
        )}
      </div>

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <span
          className="text-5xl font-bold tabular-nums"
          style={{ color }}
        >
          {value}
          <span className="text-2xl ml-0.5 opacity-70">%</span>
        </span>
      </motion.div>

      {/* Segmented bars */}
      <div className="space-y-3 mb-6">
        {[...Array(4)].map((_, i) => {
          const barValue = Math.max(0, value - i * 18);
          const barSegments = Math.round((barValue / 100) * segments);
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] text-neutral-700 font-mono">
                <span>M{i + 1}</span>
                <span>{barValue}%</span>
              </div>
              <div className="flex gap-1">
                {[...Array(segments)].map((_, s) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{
                      opacity: s < barSegments ? 1 : 0.12,
                      scaleY: 1,
                    }}
                    transition={{ duration: 0.4, delay: s * 0.03 + i * 0.04 }}
                    className="flex-1 h-1.5 rounded-sm"
                    style={{
                      backgroundColor: s < barSegments ? color : "rgba(255,255,255,0.04)",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs">
        <span className="text-neutral-700 uppercase tracking-[0.12em] font-medium">Status</span>
        <span
          className={`font-semibold ${isActive ? "text-green-500" : "text-neutral-600"}`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}
