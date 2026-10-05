"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function ProjectImage({ src, alt, priority = false, children }: { src: string; alt: string; priority?: boolean; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <div
      ref={ref}
      data-glow
      className="relative w-full aspect-video rounded-2xl overflow-hidden group/image border border-white/[0.08]"
    >
      {/* Obrázek se při scrollu jemně posouvá uvnitř rámu (hloubka) */}
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.1]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
        />
      </motion.div>
      {children}
    </div>
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
  hidden: { opacity: 0, y: 24 },
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

export default function ProjectsSection() {
  const projects = [
    {
      num: "01",
      title: "RiseHigh",
      description: "Platforma propojující studenty s firmami skrze reálné challenge. Komplexní marketplace s dashboardem a onboardingem.",
      tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Stripe"],
      href: "https://risehigh.io",
      link: "/projects/risehigh",
      image: "/risehigh.webp",
      impact: "VUT Startup",
    },
    {
      num: "02",
      title: "Alexander Kovačka",
      description: "Minimalistické portfolio s komplexním CMS a klientskou zónou pro sdílení a schvalování svatebních galerií.",
      tags: ["Next.js", "React", "Supabase", "Tailwind", "CMS", "Client Proofing"],
      href: "https://www.alexanderkovacka.com/cs",
      link: "/projects/alexander-kovacka",
      image: "/kovacka.webp",
      impact: "Portfolio & Admin",
    },
    {
      num: "03",
      title: "Hravé slovíčka",
      description: "Web pro soukromé centrum rozvoje řeči dětí. Z dotazníku od klientky jsem udělal přehledný ceník, pokyny pro rodiče a online rezervace.",
      tags: ["Astro", "TypeScript", "Tailwind", "SEO", "Reservio", "Leaflet"],
      href: "",
      link: "/projects/hraveslovicka",
      image: "/hraveslovicka.webp",
      impact: "Klientský web",
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

  return (
    <section className="relative flex flex-col items-center justify-center px-6 overflow-hidden" id="projects">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mobile-no-animate mb-14 sm:mb-20 max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-[1] mb-4">
            Vybrané projekty<span className="text-accent">.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Ukázka mojí práce. Zaměřuji se na čisté UI, moderní technologie a baví mě vymýšlet zajímavé featury.
          </p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mobile-no-animate space-y-20 sm:space-y-28"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className={`mobile-no-animate flex flex-col-reverse relative ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-6 md:gap-12 items-center`}
            >
              <div className="flex-1 w-full space-y-4 relative z-10">
                <p className="hidden md:block font-mono text-xs text-neutral-500">
                  {project.impact}
                </p>

                <div className="space-y-4">
                  <h3 className="hidden md:block text-4xl lg:text-5xl font-semibold text-white tracking-tighter">
                    {project.title}
                  </h3>
                  <p className="text-base sm:text-lg text-neutral-400 leading-relaxed md:max-w-[90%]">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => {
                    const isHighlighted = highlightedSkill === tag;
                    return (
                      <span
                        key={tag}
                        className={`font-mono px-3 py-1.5 rounded-lg text-xs border transition-colors duration-300 ${
                          isHighlighted
                            ? "bg-accent/10 text-white border-accent/50"
                            : "bg-white/[0.02] text-neutral-400 border-white/[0.07] hover:text-neutral-200 hover:border-white/[0.14]"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6">
                  <Link
                    href={project.link}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-950 rounded-xl font-medium text-sm hover:bg-neutral-200 active:scale-[0.98] transition-all duration-300"
                  >
                    <span>O projektu</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>

                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 px-6 py-3.5 text-neutral-200 rounded-xl font-medium text-sm border border-white/[0.12] hover:bg-white/[0.04] hover:border-white/25 active:scale-[0.98] transition-all duration-300"
                    >
                      <span>Web</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full relative">
                <ProjectImage src={project.image} alt={project.title} priority={idx === 0}>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent z-20 md:hidden pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-5 z-30 md:hidden flex flex-col items-start gap-1 pointer-events-none">
                    <span className="font-mono text-xs text-neutral-300">{project.impact}</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </ProjectImage>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
