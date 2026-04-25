"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { type Service, colorConfig } from "./data";

export function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: Service;
  index: number;
  onClick: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const config = colorConfig[service.color];
  const Icon = service.icon;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group/svc relative rounded-3xl p-5 sm:p-6 bg-neutral-900/40 border border-white/[0.06] ${config.border} transition-all duration-500 overflow-hidden backdrop-blur-md flex flex-col text-left cursor-pointer hover:bg-neutral-900/60`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/svc:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${config.gradient},
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-4 flex-1">
        <div className="flex items-center sm:items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl ${config.iconBg} border border-white/[0.04] group-hover/svc:scale-105 transition-transform duration-500`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconText}`} />
            </div>
            {/* Title on mobile (inline with icon) */}
            <h3 className="text-base font-bold text-white tracking-tight sm:hidden">
              {service.title}
            </h3>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-700 group-hover/svc:text-white group-hover/svc:translate-x-1 transition-all duration-300 sm:mt-2" />
        </div>

        <div className="space-y-1.5 flex-1">
          {/* Title on desktop (below icon) */}
          <h3 className="hidden sm:block text-lg font-bold text-white tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mt-1 sm:mt-0">
            {service.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-medium ${config.tagBg} ${config.tagText} border border-white/[0.03]`}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
