"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import BentoGrid from "@/components/bento-grid";
import StatusBadge from "@/components/status-badge";
import DotField from "@/components/ui/dot-field";

const words = ["projekty", "aplikace", "produkty"];
const CYCLE_MS = 3200;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Timer se po ručním přepnutí slova restartuje (index je v závislostech)
  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [index]);

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    window.location.href = "mailto:zdenekk.ferenc@gmail.com";
  };

  return (
    <section className="relative flex flex-col items-center pt-24 pb-12 overflow-hidden">
      <DotField homeY={0.4} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-7 md:gap-8 px-5 md:pt-6"
      >
        <motion.div variants={item}>
          <StatusBadge />
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center gap-5">
          <h1 className="font-semibold tracking-[-0.04em] leading-[1.02] text-white text-[2.25rem] min-[400px]:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Měním nápady na</span>
            <span className="relative block h-[1.25em] overflow-hidden text-accent" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={words[index]}
                  className="absolute inset-x-0 top-0 flex justify-center whitespace-nowrap"
                  aria-label={words[index]}
                >
                  {words[index].split("").map((char, i) => (
                    <motion.span
                      key={`${words[index]}-${i}`}
                      aria-hidden
                      className="inline-block"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%" }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1] as const,
                        delay: i * 0.035,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Indikátor slova: aktivní segment se plní po dobu jednoho cyklu */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slovo v nadpisu">
            {words.map((word, i) => (
              <button
                key={word}
                role="tab"
                aria-selected={i === index}
                aria-label={word}
                onClick={() => setIndex(i)}
                className="group relative h-5 w-9 cursor-pointer flex items-center"
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/[0.14] transition-colors group-hover:bg-white/30">
                  {i === index && (
                    <motion.span
                      key={`fill-${index}`}
                      className="absolute inset-0 origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={item}
          className="text-base md:text-lg text-neutral-400 max-w-md leading-relaxed"
        >
          Aktuálně tvořím budoucnost studentských stáží v{" "}
          <span className="text-white font-medium">RiseHigh</span>.
        </motion.p>

        <motion.div variants={item} className="flex flex-row gap-3 items-center">
          <MagneticButton
            onClick={handleViewWork}
            className="cursor-pointer flex items-center justify-center px-6 py-3 md:px-8 md:py-3.5 bg-accent text-white rounded-xl font-medium text-sm md:text-base transition-colors duration-300 hover:bg-[#b82a2c]"
          >
            Moje práce
          </MagneticButton>

          <MagneticButton
            onClick={handleContact}
            className="cursor-pointer group flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 border border-white/[0.12] text-neutral-200 rounded-xl font-medium text-sm md:text-base hover:text-white hover:bg-white/[0.04] hover:border-white/25 transition-colors duration-300"
          >
            Kontakt
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="mt-16 md:mt-20 w-full">
        <BentoGrid />
      </div>
    </section>
  );
}