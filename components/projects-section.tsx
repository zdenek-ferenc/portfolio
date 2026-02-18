"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => scale.set(1.03);
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
      className="aspect-video rounded-2xl relative overflow-hidden cursor-pointer group/image"
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 z-20 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <div className="absolute -inset-1 bg-gradient-to-b from-transparent via-transparent to-black/60 rounded-2xl -z-10 blur-xl opacity-0 group-hover/image:opacity-80 transition-opacity duration-500" />

      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover/image:scale-[1.04]"
      />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-10" />
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export default function ProjectsSection() {
  const projects = [
    {
      title: "RiseHigh",
      description: "Platforma propojující studenty s firmami skrze reálné challenge.",
      tags: ["Next.js", "Supabase", "Stripe", "VUT Spin-off"],
      href: "https://risehigh.io",
      link: "/projects/risehigh",
      image: "/risehigh.png",
      impact: "První studentský startup s podílem VUT",
    },
    {
      title: "Alexander Kovačka",
      description: "Fotografické portfolio s komplexním CMS a klientskou zónou.",
      tags: ["React", "Admin Panel", "Automation"],
      href: "https://www.alexanderkovacka.com/cs",
      link: "/projects/alexander-kovacka",
      image: "/kovacka.png",
      impact: "Automatizace faktur & Client proofing",
    },
  ];

  return (
    <section
      className="flex flex-col items-center justify-center px-6 sm:py-28"
      id="projects"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Vybrané projekty
          </h2>
          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-accent to-orange-500 mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative"
            >
              <div
                className="relative grid md:grid-cols-2 gap-6 md:gap-12 items-center rounded-3xl p-5 sm:p-8 md:p-10 bg-neutral-900/40 backdrop-blur-sm border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent" />
                <div style={{ perspective: "1000px" }}>
                  <ProjectImage src={project.image} alt={project.title} />
                </div>
                <div className="space-y-5 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/15 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-wider">
                      {project.impact}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/[0.04] rounded-full text-xs font-medium text-neutral-300 border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.07] transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={project.link}
                      className="group/btn relative px-7 py-3 bg-white text-black rounded-full font-bold text-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center gap-2 overflow-hidden"
                    >
                      <span className="relative z-10">Příběh projektu</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </Link>

                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/live px-7 py-3 bg-transparent border border-white/15 text-white rounded-full font-medium text-sm hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 flex items-center gap-2"
                      >
                        Live Web
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}