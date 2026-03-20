"use client";

import { useState } from "react";
import { MapPin, Github, Linkedin, Mail, ArrowUpRight, Code2, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export default function BentoGrid() {
  const techStack: Array<{ name: string; icon: string; className?: string; glow: string; hasProject: boolean; hiddenOnMobile?: boolean; desc?: string }> = [
    { name: "Next.js", icon: "/nextjs-icon.svg", className: "invert", glow: "#ffffff", hasProject: true },
    { name: "React", icon: "/React-icon.svg.png", glow: "#67DAF5", hasProject: true },
    { name: "TypeScript", icon: "/919832.png", glow: "#0980D4", hasProject: true },
    { name: "Tailwind", icon: "/tailwind.svg", glow: "#47A9B4", hasProject: true },
    { name: "Supabase", icon: "/supabase-icon-5uqgeeqeknngv9las8zeef.webp", glow: "#40CE91", hasProject: true },
    { name: "Stripe", icon: "/stripe-v2.svg", hiddenOnMobile: true, glow: "#635BFF", hasProject: true },
    { 
      name: "Firebase", 
      icon: "/firebase.png", 
      hiddenOnMobile: true, 
      glow: "#F79000", 
      hasProject: false,
      desc: "Tento skill aktivně používám přímo na tomto portfoliu, ale momentálně pro něj teprve připravuji samostatnou case-study."
    },
  ];

  const [activeModal, setActiveModal] = useState<{ name: string; glow: string; desc?: string } | null>(null);


  const socialLinks = [
    {
      name: "Github",
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/zdenek-ferenc",
      color: "hover:text-white hover:border-white/20 hover:bg-white/[0.06]",
      glow: "hover:shadow-[0_0_16px_rgba(255,255,255,0.07)]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/zdenek-ferenc-92a64b2ba/",
      color: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06]",
      glow: "hover:shadow-[0_0_16px_rgba(59,130,246,0.12)]",
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:zdenekk.ferenc@gmail.com",
      color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06]",
      glow: "hover:shadow-[0_0_16px_rgba(52,211,153,0.12)]",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-6" id="about">
      <div className="max-w-5xl mx-auto w-full px-4 md:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          <motion.div variants={cardVariants} className="md:col-span-2">
            <SpotlightCard className="p-6 backdrop-blur-xl group h-full overflow-hidden">
              <div className="flex flex-col items-center md:items-start w-full gap-5 h-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-[0.14em]">
                    Tech Stack
                  </h3>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 md:grid md:grid-cols-7 md:gap-3 w-full mt-auto">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`flex flex-col items-center gap-2 group/icon duration-200 relative ${tech.hiddenOnMobile ? "hidden md:flex" : "flex"}`}
                    >
                      <div 
                        onClick={() => {
                          if (tech.hasProject) {
                            const section = document.getElementById("projects");
                            if (section) {
                              section.scrollIntoView({ behavior: "smooth" });
                              window.dispatchEvent(new CustomEvent("highlight-skill", { detail: tech.name }));
                            }
                          } else {
                            setActiveModal({ name: tech.name, glow: tech.glow, desc: tech.desc });
                          }
                        }}
                        className="p-2.5 md:p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover/icon:bg-white/[0.06] group-hover/icon:border-white/10 transition-all duration-300 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer relative"
                      >
                        {/* Glow back-lit effect */}
                        <div 
                           className="absolute inset-0 rounded-2xl opacity-0 group-hover/icon:opacity-20 blur-md transition-all duration-300 -z-10 scale-95 group-hover/icon:scale-100"
                           style={{ backgroundColor: tech.glow, boxShadow: `0 0 20px ${tech.glow}` }}
                        />
                        {/* Dynamic Core Border */}
                        <div 
                           className="absolute inset-0 rounded-2xl border-[0.1px] transition-all duration-300 opacity-0 group-hover/icon:opacity-100 pointer-events-none"
                           style={{ borderColor: tech.glow }}
                        />
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={32}
                          height={32}
                          className={`object-contain w-6 md:w-8 ${tech.className || ""}`}
                          style={{ height: "auto" }}
                        />
                      </div>
                      <span className="text-[10px] md:text-xs font-medium text-neutral-500 group-hover/icon:text-neutral-300 transition-colors duration-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={cardVariants} className="hidden md:block">
            <SpotlightCard className="p-8 backdrop-blur-xl flex flex-col items-center justify-center text-center gap-5 group h-full">
              <div className="relative">
                <div className="w-16 h-16 bg-accent/[0.08] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-accent/[0.14] group-hover:shadow-[0_0_30px_rgba(207,47,49,0.2)] border border-accent/10">
                  <MapPin className="w-7 h-7 text-accent transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 flex items-center justify-center">
                  <span className="animate-ping absolute inset-0 rounded-full bg-accent/50 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent border border-neutral-900" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] font-semibold mb-1.5">
                  Lokace
                </p>
                <p className="text-xl font-bold text-neutral-200">Brno, Česko</p>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={cardVariants} className="md:col-span-3">
            <SpotlightCard className="backdrop-blur-xl group">
              <div className="flex flex-col md:flex-row items-center w-full justify-between gap-5 sm:gap-4 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white/[0.04] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-200">Spojme se</h3>
                    <p className="text-xs text-neutral-600 hidden md:block">Najdeš mě tady</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center md:justify-end">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.02] rounded-xl border border-white/10 transition-all duration-300 text-neutral-500 text-sm font-medium z-30 relative ${social.color} ${social.glow}`}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
      <AnimatePresence>
        {activeModal && (
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             onClick={() => setActiveModal(null)}
             className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
             <motion.div 
                initial={{ scale: 0.95, y: 15 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.95, y: 15 }} 
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-900 border border-white/[0.08] max-w-sm w-full p-8 rounded-2xl text-center shadow-2xl relative cursor-default"
             >
                <div 
                   className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                   style={{ backgroundColor: activeModal.glow }}
                />
                
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6" style={{ color: activeModal.glow }} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{activeModal.name}</h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                   {activeModal.desc || (
                      <>Tento skill aktivně používám na projektech, ale momentálně pro něj <strong className="text-white">teprve připravuji case-study</strong>.</>
                   )}
                </p>

                <button 
                  onClick={() => setActiveModal(null)}
                  className="cursor-pointer w-full bg-white text-black font-bold py-2.5 rounded-xl text-sm hover:bg-neutral-200 transition-all hover:scale-[0.98]"
                >
                   Rozumím
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}