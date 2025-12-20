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
    }, 3000); // Pomalejší interval pro klidnější dojem
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
    <section className="relative min-h-full flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      
      {/* Decentní pozadí - žádný šum, jen velmi jemné glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-10 px-4">

        <div className="animate-fade-in-up">
          <StatusBadge />
        </div>

        {/* Hlavní nadpis - Flexbox stack pro perfektní centrování */}
        <h1 className="flex flex-col items-center justify-center font-bold tracking-tighter leading-tight animate-fade-in-up delay-100">
          
          {/* Statická část - velká a dominantní */}
          <span className="text-5xl md:text-7xl lg:text-8xl text-white mb-2 md:mb-4">
            Měním nápady na
          </span>
          
          <div className="flex flex-row items-center justify-center text-4xl md:text-7xl lg:text-8xl gap-3 md:gap-5">
            <div className="relative h-[1.2em] min-w-5 flex items-center justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-accent whitespace-nowrap block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </h1>

        <div className="animate-fade-in-up delay-200">
          <p className="text-sm md:text-lg text-neutral-400 max-w-xl leading-relaxed">
            Aktuálně tvořím budoucnost studentských stáží v <span className="text-white font-medium">RiseHigh</span>.
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center animate-fade-in-up delay-300">
          <MagneticButton
            onClick={handleViewWork}
            className="px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold text-sm md:text-base hover:bg-neutral-200 transition-colors"
          >
            Moje práce
          </MagneticButton>

          <MagneticButton
            onClick={handleContact}
            className="px-6 py-3 md:px-8 md:py-4 bg-transparent text-neutral-400 rounded-full font-medium text-sm md:text-base hover:text-white transition-colors"
          >
            Kontakt
          </MagneticButton>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-6xl px-4">
        <BentoGrid />
      </div>
    </section>
  );
}