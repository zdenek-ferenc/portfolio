"use client";

import { motion } from "framer-motion";

interface LiveWidgetProps {
  value: number;
  color: string;
  label: string;
  isActive: boolean;
}

export default function LiveWidget({ value, color, label, isActive }: LiveWidgetProps) {
  return (
    <div className="bg-[#222222] rounded-2xl p-8 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#A1A1A1]">{label}</h3>
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
        )}
      </div>
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8"
      >
        <div className="text-6xl font-bold" style={{ color }}>
          {value}%
        </div>
      </motion.div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => {
          const barValue = Math.max(0, value - i * 15);
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs text-[#A1A1A1]">
                <span>Metric {i + 1}</span>
                <span>{barValue}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barValue}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#A1A1A1]">Status</span>
          <span className={isActive ? "text-green-500" : "text-[#A1A1A1]"}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}
