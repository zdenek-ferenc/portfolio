"use client";

import { MapPin, Github, Linkedin, Mail, ArrowUpRight, Code2, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  const techStack = [
    { name: "Next.js", icon: "/nextjs-icon.svg", className: "invert" },
    { name: "React", icon: "/React-icon.svg.png" },
    { name: "TypeScript", icon: "/919832.png" },
    { name: "Tailwind", icon: "/tailwind.svg" },
    { name: "Supabase", icon: "/supabase-icon-5uqgeeqeknngv9las8zeef.webp" },
    { name: "Stripe", icon: "/stripe-v2.svg" },
  ];

  const socialLinks = [
    {
      name: "Github",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/zdenek-ferenc",
      hoverColor: "group-hover/social:text-white group-hover/social:border-white/20",
      glowColor: "group-hover/social:shadow-[0_0_20px_rgba(255,255,255,0.08)]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/zdenek-ferenc-92a64b2ba/",
      hoverColor: "group-hover/social:text-blue-400 group-hover/social:border-blue-500/30",
      glowColor: "group-hover/social:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:zdenekk.ferenc@gmail.com",
      hoverColor: "group-hover/social:text-emerald-400 group-hover/social:border-emerald-500/30",
      glowColor: "group-hover/social:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 sm:py-12" id="about">
      <div className="max-w-6xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          <motion.div variants={cardVariants} className="md:col-span-2">
            <SpotlightCard className="p-6 sm:p-6 backdrop-blur-xl group h-full">
              <div className="flex flex-col w-full justify-between gap-6 md:gap-4 h-full md:px-2 md:py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-200">TechStack</h3>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 items-center justify-items-center w-full">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex flex-col items-center justify-end gap-2 group/icon duration-200 self-center relative h-18 md:h-20 w-full"
                    >
                      <div className="p-3 md:p-4 cursor-pointer rounded-2xl bg-white/[0.03] border border-white/5 group-hover/icon:bg-white/[0.08] group-hover/icon:border-white/10 transition-all duration-300 shadow-lg relative h-14 w-14 md:h-16 md:w-16 flex items-center justify-center group-hover/icon:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={36}
                          height={36}
                          className={`object-contain ${tech.className || ""}`}
                        />
                      </div>
                      <span className="absolute -bottom-1 text-[11px] font-semibold text-neutral-300 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/icon:translate-y-0">
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
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-accent/15 group-hover:shadow-[0_0_30px_rgba(207,47,49,0.15)]">
                  <MapPin className="w-7 h-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-accent/60 border-2 border-background"></span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-semibold mb-1.5">Lokace</p>
                <p className="text-xl font-bold text-neutral-200">Brno, Česko</p>
              </div>
            </SpotlightCard>
          </motion.div>
          <motion.div variants={cardVariants} className="md:col-span-3">
            <SpotlightCard className="sm:p-5 backdrop-blur-xl group">
              <div className="flex flex-col md:flex-row items-center w-full justify-between gap-5 sm:gap-6 h-full px-4 py-4 md:py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-200">Spojme se</h3>
                    <p className="text-xs text-neutral-500 hidden md:block">Najdeš mě tady</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`group/social flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.07] transition-all duration-300 text-neutral-400 z-30 relative ${social.hoverColor} ${social.glowColor}`}
                    >
                      {social.icon}
                      <span className="font-medium text-sm">{social.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/social:opacity-100 group-hover/social:translate-x-0 transition-all duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}