"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, ArrowUpRight, Calendar, Code2, Handshake } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

function CalButton({ compact = false }: { compact?: boolean }) {
  const CAL_LINK = "zdenekferenc/intro";
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("contact=true")) {
      const initTimer = setTimeout(() => setPulse(true), 50);
      const clearTimer = setTimeout(() => setPulse(false), 3050);
      return () => {
        clearTimeout(initTimer);
        clearTimeout(clearTimer);
      };
    }
  }, []);

  return (
    <button
      onClick={async () => {
        const cal = await getCalApi({ embedJsUrl: "https://app.cal.eu/embed/embed.js" });
        cal("modal", {
          calLink: CAL_LINK,
          config: { theme: "dark" },
        });
      }}
      className={`group/cal relative flex items-center justify-center gap-2.5 bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] font-bold transition-all duration-300 cursor-pointer overflow-hidden ${
        compact 
          ? "w-fit py-2.5 px-4 rounded-xl text-xs" 
          : "w-full py-3.5 rounded-xl text-sm"
      } ${
        pulse ? " shadow-[0_0_40px_rgba(207,47,49,0.4)] scale-[1.02] animate-pulse transition-all ease-in-out duration-300" : ""
      }`}
    >
      <Calendar className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} relative z-10 transition-transform duration-300 group-hover/cal:-translate-y-0.5`} />
      <span className="relative z-10">{compact ? "Call" : "Pojďme si zavolat"}</span>
      <div className="absolute inset-0 -translate-x-full group-hover/cal:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </button>
  );
}

function FloatingCard({ title, description, color, badge }: { title: string, icon: React.ReactNode, description: string, color: 'accent' | 'orange', badge?: string, delay?: number }) {
  const lineColors = {
    accent: "bg-accent",
    orange: "bg-orange-500"
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col pr-4"
    >
      {/* Background watermark icon */}
      
      

      {/* Decorative gradient blur in top left */}
      <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${lineColors[color]}`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top header: Line + optional badge */}
        <div className="hidden md:flex items-start justify-between mb-4 sm:mb-0">
          <div className={`w-8 h-[2px] rounded-full ${lineColors[color]} group-hover:w-16 transition-all duration-500`} />
          {badge && (
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-500 uppercase tracking-widest">
               <span className="relative flex h-1.5 w-1.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
               </span>
               {badge}
             </div>
          )}
        </div>

        {/* Bottom content */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ embedJsUrl: "https://app.cal.eu/embed/embed.js" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);

  return (
    <section className="relative overflow-hidden" id="about-me">
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mobile-no-animate hidden md:block"
          >
            <div className="relative mb-2">
              <div className="grid grid-cols-12 gap-8 items-end">
                <motion.div variants={itemVariants} className="col-span-7 relative z-10 pb-6">
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-5">
                    O mně
                  </p>
                  <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] mb-8">
                    Developer,{" "}
                    <br />
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CF2F31, #ff8c42)" }}>
                      Founder
                    </span>
                    <span className="text-neutral-700">.</span>
                  </h1>
                  <div className="space-y-4 max-w-lg">
                    <p className="text-lg text-neutral-300 font-light leading-relaxed">
                      Jsem vývojář a Founder. Momentálně věnuju většinu času budování{" "}
                      <Link
                        href="/projects/risehigh"
                        className="inline-flex items-baseline gap-1 font-semibold text-white hover:text-accent transition-all duration-300 group/rh cursor-pointer"
                      >
                        <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-no-repeat bg-left-bottom group-hover/rh:bg-[length:100%_1.5px] transition-all duration-500">
                          RiseHigh
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 self-center text-accent transform transition-transform duration-300 group-hover/rh:-translate-y-0.5 group-hover/rh:translate-x-0.5" />
                      </Link>
                      {" "}— platformy, která propojuje studenty s firmami přes reálné challenge.
                    </p>
                    <p className="text-[15px] text-neutral-500 font-light leading-relaxed">
                      Baví mě stavět věci od nuly. Rád přemýšlím nad celým produktem — ne jen nad kódem, ale i nad tím, jestli to vůbec dává smysl pro lidi, kteří to budou používat. Většinu věcí řeším sám, od designu přes frontend až po backend.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="col-span-5 relative z-20"
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-accent/[0.08] blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src="/me.png"
                          alt="Zdenek Ferenc"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          priority={true}
                          fetchPriority="high"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-accent uppercase tracking-[0.25em] mb-0.5">Developer & Founder</p>
                            <p className="md:text-2xl text-lg font-bold text-white">Zdenek Ferenc</p>
                          </div>
                          <CalButton compact />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-8 mb-6 mt-6 py-4 border-y border-white/[0.04]"
            >
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Brno, CZ</span>
              </div>
              <div className="w-px h-4 bg-white/[0.08]" />
              <a href="mailto:zdenekk.ferenc@gmail.com" className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>zdenekk.ferenc@gmail.com</span>
              </a>
              <div className="w-px h-4 bg-white/[0.08]" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-green-500 font-medium">Open for work</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              <FloatingCard 
                title="Co dělám?"
                icon={<Code2 className="w-5 h-5 text-accent" />}
                color="accent"
                description="Navrhuju a stavím weby a webové aplikace. Postarám se o všechno od UI až po backend. Většinou stavím na Next.js a Supabase . Baví mě vymýšlet zajímavé funkce a vylepšení."
              />
              <FloatingCard 
                title="Freelance & Spolupráce"
                icon={<Handshake className="w-5 h-5 text-orange-500" />}
                color="orange"
                badge="Mám volnou kapacitu"
                description="Hodně času věnuju svému startupu, ale vždy si najdu čas na zajímavý freelance projekt nebo web na zakázku. Full-time nehledám, ale pokud něco potřebuješ postavit, ozvi se."
              />
            </div>
          </motion.div>
        </div>

        <div className="md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mobile-no-animate space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-5">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">O mně</p>
                <h1 className="text-4xl font-bold text-white leading-[0.95]">
                  Developer,{" "}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CF2F31, #ff8c42)" }}>
                    Founder
                  </span>
                  <span className="text-neutral-600">.</span>
                </h1>
              </div>

              <div className="flex items-center gap-4 bg-neutral-900/50 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 w-full">
                 <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-inner">
                    <Image src="/me.png" alt="Zdenek Ferenc" fill className="object-cover" sizes="56px" priority={true} fetchPriority="high"/>
                 </div>
                 <div className="flex-1 flex flex-col justify-center gap-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Developer & Founder</span>
                    <span className="text-sm font-bold text-white leading-none">Zdenek Ferenc</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>Brno, CZ</span>
                    </div>
                 </div>
                 <div className="w-fit">
                    <CalButton compact />
                 </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-base text-neutral-400 font-light leading-relaxed"
            >
              Jsem vývojář a Founder. Momentálně věnuju většinu času budování{" "}
              <Link
                href="/projects/risehigh"
                className="inline-flex items-baseline gap-1 font-semibold text-white hover:text-accent transition-all duration-300 group/rh cursor-pointer"
              >
                <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-no-repeat bg-left-bottom group-hover/rh:bg-[length:100%_1.5px] transition-all duration-500">
                  RiseHigh
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 self-center text-accent" />
              </Link>
            </motion.p>

            <div className="space-y-4">
              <FloatingCard 
                title="Co dělám?"
                icon={<Code2 className="w-5 h-5 text-accent" />}
                color="accent"
                delay={0.1}
                description="Navrhuju a kóduju webové aplikace. Postarám se o všechno od UI až po backend. Většinou stavím na Next.js a Supabase — baví mě dělat věci, které jsou rychlé a dávají smysl."
              />
              <FloatingCard 
                title="Freelance & Spolupráce"
                icon={<Handshake className="w-5 h-5 text-orange-500" />}
                color="orange"
                badge="Mám volnou kapacitu"
                delay={0.2}
                description="Většinu času věnuju svému startupu, ale rád si najdu čas na zajímavý freelance projekt nebo web na zakázku. Full-time nehledám, ale pokud něco potřebuješ postavit, ozvi se."
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              <div className="bg-transparent md:bg-neutral-900/40 backdrop-blur-sm border border-transparent md:border-white/[0.04] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3 text-neutral-400 text-sm">
                  <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/15">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <span>Brno, Česká republika</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400 text-sm">
                  <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/15">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <a href="mailto:zdenekk.ferenc@gmail.com" className="hover:text-white transition-colors duration-300">
                    zdenekk.ferenc@gmail.com
                  </a>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent w-full" />
                <CalButton />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}