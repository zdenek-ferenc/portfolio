"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LiveWidget from "./live-widget";

export default function InteractivePlayground() {
  const [value, setValue] = useState(75);
  const [color, setColor] = useState("#CF2F31");
  const [isActive, setIsActive] = useState(true);

  const colorOptions = [
    { name: "Red", value: "#CF2F31" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
  ];

  return (
    <section className="px-6 py-20" id="playground">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Components
          </h2>
          <p className="text-xl text-[#A1A1A1]">
            Play with the controls to see live updates
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Widget */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <LiveWidget
              value={value}
              color={color}
              label="Performance Dashboard"
              isActive={isActive}
            />
          </motion.div>

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#222222] rounded-2xl p-8 border border-white/10 space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Control Panel</h3>

            {/* Value Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#A1A1A1]">
                  Value
                </label>
                <span className="text-lg font-bold" style={{ color }}>
                  {value}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, rgba(255,255,255,0.05) ${value}%, rgba(255,255,255,0.05) 100%)`,
                }}
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-[#A1A1A1] block">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setColor(option.value)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      color === option.value
                        ? "border-white/30 scale-105"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: option.value }}
                    />
                    <span className="text-xs text-[#A1A1A1]">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-[#A1A1A1] block">
                Status
              </label>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative w-full p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isActive ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <motion.div
                      animate={{ x: isActive ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 bg-white rounded-full mt-0.5"
                    />
                  </div>
                </div>
              </button>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-[#A1A1A1]">
                💡 Adjust the controls above and watch the widget update in real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
