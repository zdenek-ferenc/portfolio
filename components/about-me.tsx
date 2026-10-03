"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, ArrowUpRight, Calendar } from "lucide-react";
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
      className={`group/cal relative flex items-center justify-center gap-2.5 bg-white text-neutral-950 hover:bg-neutral-200 font-medium transition-colors duration-300 cursor-pointer ${
        compact 
          ? "w-fit py-2.5 px-4 rounded-xl text-xs" 
          : "w-full py-3.5 rounded-xl text-sm"
      } ${
        pulse ? " ring-2 ring-accent ring-offset-2 ring-offset-neutral-950" : ""
      }`}
    >
      <Calendar className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} relative z-10`} />
      <span className="relative z-10">{compact ? "Call" : "Pojďme si zavolat"}</span>
    </button>
  );
}

function FloatingCard({ title, description, badge }: { title: string, description: string, badge?: string }) {
  return (
    <motion.div
      variants={itemVariants}
      data-glow
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-surface p-6 transition-colors duration-300 hover:border-white/[0.14]"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>
        {badge && (
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-300 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {badge}
          </div>
        )}
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed">
        {description}
      </p>
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
                  <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-5">
                    O mně
                  </p>
                  <h1 className="text-5xl lg:text-6xl font-semibold text-white tracking-tighter leading-[1] mb-8">
                    Developer,{" "}
                    <br />
                    Founder<span className="text-accent">.</span>
                  </h1>
                  <div className="space-y-4 max-w-lg">
                    <p className="text-lg text-neutral-300 leading-relaxed">
                      Jsem vývojář a Founder. Momentálně věnuju většinu času budování{" "}
                      <Link
                        href="/projects/risehigh"
                        className="inline-flex items-baseline gap-1 font-medium text-white hover:text-accent transition-colors duration-300 group/rh cursor-pointer"
                      >
                        <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-no-repeat bg-left-bottom group-hover/rh:bg-[length:100%_1.5px] transition-all duration-500">
                          RiseHigh
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 self-center text-accent transform transition-transform duration-300 group-hover/rh:-translate-y-0.5 group-hover/rh:translate-x-0.5" />
                      </Link>
                      {" "}(platforma, která propojuje studenty s firmami přes reálné challenge).
                    </p>
                    <p className="text-[15px] text-neutral-500 leading-relaxed">
                      Baví mě stavět věci od nuly. Rád přemýšlím nad celým produktem: ne jen nad kódem, ale i nad tím, jestli to vůbec dává smysl pro lidi, kteří to budou používat. Většinu věcí řeším sám, od designu přes frontend až po backend.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="col-span-5 relative z-20"
                >
                  <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src="/me.png"
                          alt="Zdenek Ferenc"
                          fill
                          className="object-cover"
                          priority={true}
                          fetchPriority="high"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-neutral-300 mb-0.5">Developer & Founder</p>
                            <p className="md:text-2xl text-lg font-semibold text-white tracking-tight">Zdenek Ferenc</p>
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
              className="flex items-center gap-8 mb-6 mt-6 py-4 border-y border-white/[0.07]"
            >
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>Brno, CZ</span>
              </div>
              <div className="w-px h-4 bg-white/[0.08]" />
              <a href="mailto:zdenekk.ferenc@gmail.com" className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>zdenekk.ferenc@gmail.com</span>
              </a>
              <div className="w-px h-4 bg-white/[0.08]" />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-neutral-200 font-medium">Open for work</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              <FloatingCard 
                title="Co dělám?"
                description="Navrhuju a stavím weby a webové aplikace. Postarám se o všechno od UI až po backend. Většinou stavím na Next.js a Supabase. Baví mě vymýšlet zajímavé funkce a vylepšení."
              />
              <FloatingCard 
                title="Freelance & Spolupráce"
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
                <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">O mně</p>
                <h1 className="text-4xl font-semibold text-white tracking-tighter leading-[1]">
                  Developer,{" "}
                  Founder<span className="text-accent">.</span>
                </h1>
              </div>

              <div className="flex items-center gap-4 bg-surface border border-white/[0.07] rounded-2xl p-4 w-full">
                 <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/[0.07]">
                    <Image src="/me.png" alt="Zdenek Ferenc" fill className="object-cover" sizes="56px" priority={true} fetchPriority="high"/>
                 </div>
                 <div className="flex-1 flex flex-col justify-center gap-1">
                    <span className="text-[11px] text-neutral-400 leading-none">Developer & Founder</span>
                    <span className="text-sm font-semibold text-white leading-none">Zdenek Ferenc</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
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
              className="text-base text-neutral-400 leading-relaxed"
            >
              Jsem vývojář a Founder. Momentálně věnuju většinu času budování{" "}
              <Link
                href="/projects/risehigh"
                className="inline-flex items-baseline gap-1 font-medium text-white hover:text-accent transition-colors duration-300 group/rh cursor-pointer"
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
                description="Navrhuju a kóduju webové aplikace. Postarám se o všechno od UI až po backend. Většinou stavím na Next.js a Supabase. Baví mě dělat věci, které jsou rychlé a dávají smysl."
              />
              <FloatingCard 
                title="Freelance & Spolupráce"
                badge="Mám volnou kapacitu"
                description="Většinu času věnuju svému startupu, ale rád si najdu čas na zajímavý freelance projekt nebo web na zakázku. Full-time nehledám, ale pokud něco potřebuješ postavit, ozvi se."
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              <div className="bg-transparent border border-transparent rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3 text-neutral-400 text-sm">
                  <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                  </div>
                  <span>Brno, Česká republika</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400 text-sm">
                  <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]">
                    <Mail className="w-4 h-4 text-neutral-400" />
                  </div>
                  <a href="mailto:zdenekk.ferenc@gmail.com" className="hover:text-white transition-colors duration-300">
                    zdenekk.ferenc@gmail.com
                  </a>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent w-full" />
                <CalButton />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}