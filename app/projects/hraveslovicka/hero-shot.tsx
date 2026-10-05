"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function HeroShot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Světlý web se při scrollu jemně "usadí" do tmavé stránky
  const scale = useTransform(scrollYProgress, [0.25, 0.6], reduce ? [1, 1] : [1.04, 1]);

  return (
    <div
      ref={ref}
      className="animate-fade-in-up delay-200 relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#FAF8F5] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]"
    >
      <motion.div style={{ scale, transformOrigin: "50% 0%" }} className="absolute inset-0">
        <Image
          src="/hraveslovicka.webp"
          alt="Úvodní obrazovka webu Hravé slovíčka"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1200px) 100vw, 1152px"
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );
}
