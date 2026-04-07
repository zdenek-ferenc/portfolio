"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, MouseEvent, useState, useEffect } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => scale.set(1.02);
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group/image shadow-2xl border border-white/[0.05]"
    >
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/image:opacity-40 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(circle 300px at calc(50% + ${x} * 100%) calc(50% + ${y} * 100%), rgba(255,255,255,0.1), transparent)`
        }}
      />
      
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function ProjectsSection() {
  const projects = [
    {
      num: "01",
      title: "RiseHigh",
      description: "Platforma propojující studenty s firmami skrze reálné challenge. Komplexní marketplace s dashboardem a onboardingem.",
      tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Stripe"],
      href: "https://risehigh.io",
      link: "/projects/risehigh",
      image: "/risehigh.png",
      impact: "VUT Startup",
    },
    {
      num: "02",
      title: "Alexander Kovačka",
      description: "Minimalistické portfolio s komplexním CMS a klientskou zónou pro sdílení a schvalování svatebních galerií.",
      tags: ["Next.js", "React", "Supabase", "Tailwind", "CMS", "Client Proofing"],
      href: "https://www.alexanderkovacka.com/cs",
      link: "/projects/alexander-kovacka",
      image: "/kovacka.png",
      impact: "Portfolio & Admin",
    },
  ];

  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return (window as (typeof window & { __lastHighlightedSkill?: string })).__lastHighlightedSkill || null;
    }
    return null;
  });

  useEffect(() => {
    const handleHighlight = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const skill = customEvent.detail;
      if (skill && typeof skill === "string") {
        setHighlightedSkill(skill);
        (window as (typeof window & { __lastHighlightedSkill?: string })).__lastHighlightedSkill = skill;
      }
    };
    window.addEventListener("highlight-skill", handleHighlight);
    return () => window.removeEventListener("highlight-skill", handleHighlight);
  }, []);

  const SKILL_COLORS: Record<string, string> = {
    "Next.js": "#ffffff",
    "React": "#67DAF5",
    "TypeScript": "#0980D4",
    "Tailwind": "#47A9B4",
    "Supabase": "#40CE91",
    "Stripe": "#635BFF",
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-12 px-6 overflow-hidden" id="projects">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 sm:mb-24 text-center sm:text-left flex flex-col items-center gap-6 sm:gap-12"
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Vybrané projekty
            </h2>
          </div>
          <div className="flex-1 hidden sm:block">
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-md">
              Ukázka mých nejlepších prací. Zaměřuji se na perfektní UX, moderní technologie a čistý kód.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className={`flex flex-col-reverse relative ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10 items-center`}
            >
              <div className="flex-1 w-full space-y-4 relative z-10">
                <div className="absolute -top-12 -left-6 text-[140px] font-bold text-white/[0.02] -z-10 leading-none select-none tracking-tighter">
                  {project.num}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="text-xs font-semibold text-neutral-300 uppercase tracking-widest">
                    {project.impact}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed font-light md:max-w-[90%]">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {project.tags.map((tag) => {
                    const isHighlighted = highlightedSkill === tag;
                    const glowColor = SKILL_COLORS[tag] || "#ffffff";
                    
                    return (
                      <span
                        key={tag}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium border backdrop-blur-sm transition-all duration-500 ${
                          isHighlighted 
                            ? "bg-white/10 text-white ring-1 ring-white/20 animate-pulse" 
                            : "bg-white/[0.02] text-neutral-400 border-white/[0.05] hover:bg-white/[0.06] hover:text-neutral-200"
                        }`}
                        style={
                          isHighlighted 
                          ? { borderColor: glowColor, boxShadow: `0 0 20px ${glowColor}30` } 
                          : {}
                        }
                      >
                        {isHighlighted && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: glowColor, boxShadow: `0 0 8px ${glowColor}` }}
                          />
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6">
                  <Link
                    href={project.link}
                    className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
                  >
                    <span>O projektu</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-bold text-sm border border-white/[0.15] hover:bg-white/[0.05] active:scale-95 transition-all duration-300 ease-out"
                    >
                      <span>Web</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full perspective-1000 relative">
                <div className="absolute inset-4 bg-accent/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <ProjectImage src={project.image} alt={project.title} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}