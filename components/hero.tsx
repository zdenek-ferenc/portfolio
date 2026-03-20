"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import BentoGrid from "@/components/bento-grid";
import StatusBadge from "@/components/status-badge";

const words = ["projekty", "aplikace", "produkty"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    window.location.href = "mailto:zdenekk.ferenc@gmail.com";
  };

  return (
    <section className="relative min-h-full flex flex-col items-center justify-center pt-8 md:pt-16 pb-12 overflow-hidden">
      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-100 pointer-events-none" />

      {/* Radial mask over grid — fades edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, #0a0a0a 100%)",
        }}
      />

      {/* Aurora rings — layered conic gradient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.12]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #CF2F31 60deg, transparent 120deg, #ff8c42 180deg, transparent 240deg, #CF2F31 300deg, transparent 360deg)",
          filter: "blur(60px)",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />

      {/* Soft center glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,47,49,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />


      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-6 md:space-y-10 px-4"
      >
        <motion.div variants={item}>
          <StatusBadge />
        </motion.div>

        <motion.h1
          variants={item}
          className="flex flex-col items-center justify-center font-extrabold tracking-tighter leading-tight"
        >
          <span className="text-5xl md:text-7xl lg:text-8xl text-white mb-2 md:mb-4">
            Měním nápady na
          </span>

          <div className="relative flex flex-col items-center">
            <div className="relative h-[1.5em] pb-2 flex items-center justify-center overflow-hidden text-5xl md:text-7xl lg:text-8xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)", scale: 0.92 }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ y: -40, opacity: 0, filter: "blur(10px)", scale: 0.92 }}
                  transition={{ duration: 0.55, ease: [0.2, 0.65, 0.3, 0.9] as const }}
                  className="animate-gradient-text whitespace-nowrap block font-extrabold leading-tight"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.div
              className="absolute -bottom-1 h-[3px] md:h-[4px] w-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #CF2F31, #ff8c42, #CF2F31, transparent)",
                transformOrigin: "left",
                animation: "draw-line 1s ease-out 0.8s forwards",
                transform: "scaleX(0)",
              }}
            />
          </div>
        </motion.h1>

        <motion.div variants={item}>
          <p className="text-sm md:text-lg text-neutral-400 max-w-xl leading-relaxed">
            Aktuálně tvořím budoucnost studentských stáží v{" "}
            <span className="text-white font-semibold">RiseHigh</span>.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-row gap-3 items-center"
        >
          <MagneticButton
            onClick={handleViewWork}
            className="cursor-pointer flex items-center justify-center group relative px-7 py-3.5 md:px-9 md:py-4 bg-accent text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(207,47,49,0.35)] overflow-hidden"
          >
            <span className="relative z-10">Moje práce</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </MagneticButton>

          <MagneticButton
            onClick={handleContact}
            className="cursor-pointer group flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 bg-white/[0.04] border border-white/[0.08] text-neutral-300 rounded-full font-medium text-sm md:text-base hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            Kontakt
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="mt-6 md:mt-12 w-full">
        <BentoGrid />
      </div>
    </section>
  );
}