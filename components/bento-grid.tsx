"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import { GeneralContactModal } from "@/components/services/general-contact-modal";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const cardAnimation = (delay: number = 0) => ({
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 0.9] as const },
});

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
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);


  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/zdenek-ferenc-92a64b2ba/",
      color: "hover:text-white hover:border-white/25 hover:bg-white/[0.04]",
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      action: () => setIsGeneralModalOpen(true),
      color: "hover:text-white hover:border-white/25 hover:bg-white/[0.04]",
    },
    {
      name: "Github",
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/zdenek-ferenc",
      color: "hover:text-white hover:border-white/25 hover:bg-white/[0.04]",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-6" id="about">
      <div className="max-w-5xl mx-auto w-full px-4 lg:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mobile-no-animate grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {/* Tech stack: hairline mřížka, ikony v klidu monochromní, barva až při hoveru */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <SpotlightCard className="p-6 md:p-7 group h-full overflow-hidden">
              <div className="flex flex-col w-full gap-6 h-full">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Tech stack
                  </h3>
                  <span className="text-xs text-neutral-500">Klikni a uvidíš projekty</span>
                </div>
                <div className="mt-auto grid grid-cols-6 md:grid-cols-12 lg:grid-cols-7 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
                  {techStack.map((tech, index) => (
                    <button
                      type="button"
                      key={tech.name}
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
                      className={`group/cell cursor-pointer flex-col items-center justify-center gap-3 bg-surface px-2 py-6 transition-colors duration-300 hover:bg-[#1a1a1a] focus-visible:bg-[#1a1a1a] focus-visible:outline-none ${
                        tech.hiddenOnMobile ? "hidden md:flex" : "flex"
                      } ${index < 3 ? "col-span-2" : "col-span-3"} ${index < 4 ? "md:col-span-3" : "md:col-span-4"} lg:col-span-1`}
                    >
                      <Image
                        src={tech.icon}
                        alt=""
                        width={32}
                        height={32}
                        className={`object-contain w-7 md:w-8 grayscale opacity-60 transition-all duration-300 group-hover/cell:grayscale-0 group-hover/cell:opacity-100 group-hover/cell:-translate-y-0.5 ${tech.className || ""}`}
                        style={{ height: "auto" }}
                      />
                      <span className="font-mono text-[11px] text-neutral-500 transition-colors duration-300 group-hover/cell:text-neutral-100">
                        {tech.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Lokace: typografie + tečkový vzor z hero, jedna červená tečka = Brno */}
          <motion.div {...cardAnimation(0.1)} className="hidden md:block">
            <SpotlightCard className="group h-full min-h-[220px]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)",
                  backgroundSize: "16px 16px",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 62% 36%, #000 0%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 80% 70% at 62% 36%, #000 0%, transparent 100%)",
                }}
              />
              <div aria-hidden className="absolute left-[62%] top-[36%] -translate-x-1/2 -translate-y-1/2">
                <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="absolute -inset-2.5 rounded-full border border-accent/40" />
              </div>
              <div className="relative flex h-full w-full flex-col justify-end p-7 pt-24">
                <p className="font-mono text-[11px] text-neutral-500 mb-2">49.19° N, 16.61° E</p>
                <p className="text-3xl font-semibold tracking-tight text-white leading-none">Brno</p>
                <p className="mt-1.5 text-sm text-neutral-400">Česko</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Odkazy */}
          <motion.div {...cardAnimation(0.15)} className="md:col-span-3">
            <SpotlightCard className="group">
              <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-5 px-6 md:px-7 py-5">
                <h3 className="text-lg font-semibold tracking-tight text-white">Najdeš mě zde</h3>

                <div className="flex flex-wrap gap-2.5 md:justify-end">
                  {socialLinks.map((social) => {
                    const cls = `group/link relative flex items-center gap-2.5 pl-4 pr-3.5 py-2.5 rounded-xl border border-white/[0.1] transition-colors duration-300 text-neutral-300 text-sm font-medium cursor-pointer active:scale-[0.98] ${social.color}`;
                    const inner = (
                      <>
                        {social.icon}
                        <span>{social.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 transition-all duration-300 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </>
                    );
                    if (social.action) {
                      return (
                        <button key={social.name} onClick={social.action} className={cls}>
                          {inner}
                        </button>
                      );
                    }
                    return (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    );
                  })}
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
             className="fixed inset-0 bg-neutral-950/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
             <motion.div 
                initial={{ scale: 0.95, y: 15 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.95, y: 15 }} 
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-900 border border-white/[0.08] max-w-sm w-full p-8 rounded-2xl text-center relative cursor-default"
             >
                <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{activeModal.name}</h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                   {activeModal.desc || (
                      <>Tento skill aktivně používám na projektech, ale momentálně pro něj <strong className="text-white font-medium">teprve připravuji case-study</strong>.</>
                   )}
                </p>

                <button 
                  onClick={() => setActiveModal(null)}
                  className="cursor-pointer w-full bg-white text-neutral-950 font-medium py-2.5 rounded-xl text-sm hover:bg-neutral-200 transition-colors active:scale-[0.98]"
                >
                   Rozumím
                </button>
             </motion.div>
          </motion.div>
        )}
        {isGeneralModalOpen && (
          <GeneralContactModal onClose={() => setIsGeneralModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}