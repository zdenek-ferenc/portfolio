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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
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
    <section className="relative min-h-full flex flex-col items-center justify-center pt-12 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
          <motion.div
        className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #CF2F31 0%, transparent 70%)",
          animation: "float-slow 12s ease-in-out infinite",
        }}
      />
      
      <motion.div
        className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #ff8c42 0%, transparent 70%)",
          animation: "float-slow-reverse 15s ease-in-out infinite",
        }}
      />
      
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none bg-accent/20"
        style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-10 px-4"
      >
        <motion.div variants={item}>
          <StatusBadge />
        </motion.div>

        <motion.h1
          variants={item}
          className="flex flex-col items-center justify-center font-bold tracking-tighter leading-tight"
        >
          <span className="text-5xl md:text-7xl lg:text-8xl text-white mb-2 md:mb-4">
            Měním nápady na
          </span>

          <div className="relative flex flex-col items-center">
            <div className="relative h-[1.5em] pb-2 flex items-center justify-center overflow-hidden text-5xl md:text-7xl lg:text-8xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 30, opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ y: -30, opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const }}
                  className="animate-gradient-text whitespace-nowrap block font-extrabold leading-tight"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.div
              className="absolute -bottom-1 h-[3px] md:h-[4px] w-full rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #CF2F31, #ff8c42, #CF2F31, transparent)",
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
            <span className="text-white font-medium">RiseHigh</span>.
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-row gap-4 items-center"
        >
          <MagneticButton
            onClick={handleViewWork}
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-[0_0_30px_rgba(207,47,49,0.3)]"
          >
            Moje práce
          </MagneticButton>

          <MagneticButton
            onClick={handleContact}
            className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-white/10 text-neutral-400 rounded-full font-medium text-sm md:text-base hover:text-white hover:border-white/25 transition-all duration-300"
          >
            Kontakt
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>
      </motion.div>
      <div className="mt-16 w-full max-w-6xl px-4">
        <BentoGrid />
      </div>
    </section>
  );
}