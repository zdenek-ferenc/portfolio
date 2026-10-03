"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.2 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.12);
    y.set((e.clientY - (top + height / 2)) * 0.12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.button>
  );
}
