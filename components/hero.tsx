"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/magnetic-button";
import BentoGrid from "@/components/bento-grid";
import StatusBadge from "@/components/status-badge";

const words = ["projekty", "aplikace", "produkty"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
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
    <section className="min-h-full flex flex-col items-center justify-center px-6 pt-18 sm:pt-22 pb-12 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] sm:w-[1000px] sm:h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[800px] sm:h-[300px] bg-[#CF2F31]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-8">

        <div className="flex justify-center animate-fade-in-up">
          <StatusBadge />
        </div>

        <div className="flex flex-col items-center justify-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight animate-fade-in-up delay-100">
          <span className="text-white block mb-2 md:mb-4">Měním nápady</span>
          <div className="flex flex-row items-center justify-center gap-3 md:gap-4">
            <span className="text-white">na</span>
            <div className="relative h-[1.2em] w-full min-w-[200px] md:min-w-[400px] overflow-hidden flex items-center justify-start">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute text-[#CF2F31]"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center animate-fade-in-up delay-200">
          <p className="text-base md:text-xl text-center text-neutral-400 bg-none leading-relaxed max-w-2xl font-light tracking-wide">
            Aktuálně tvořím budoucnost studentských stáží v <span className="font-black">RiseHigh</span>.
          </p>
        </div>

        <div className="flex flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
          <MagneticButton
            onClick={handleViewWork}
            className="group relative px-4 md:px-8 md:py-4 py-2 cursor-pointer hover:bg-white text-black rounded-full font-bold text-sm md:text-lg flex items-center gap-2 bg-neutral-100 transition-all ease-in-out duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
          >
            Moje práce
          </MagneticButton>

          <MagneticButton
            onClick={handleContact}
            className="px-4 md:px-8 md:py-4 py-2 cursor-pointer bg-transparent text-neutral-400 font-medium text-sm md:text-lg rounded-full hover:text-white hover:bg-white/5 transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] flex items-center gap-2 duration-300 border border-transparent hover:border-white/10"
          >
            Kontakt
          </MagneticButton>
        </div>
      </div>
      <BentoGrid />
    </section>
  );
}