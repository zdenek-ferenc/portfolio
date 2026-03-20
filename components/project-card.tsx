"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  delay?: number;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  delay = 0,
  index = 0,
}: ProjectCardProps) {
  const CardWrapper = href ? "a" : "div";
  const numLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="group relative"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent/30 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-600 -z-10" />

      <CardWrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block bg-neutral-900/40 backdrop-blur-sm rounded-2xl p-7 border-6 border-white hover:border-orange-500 transition-all duration-500 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent" />

        <span className="font-mono text-xs text-neutral-700 tracking-widest absolute top-5 right-5">
          {numLabel}
        </span>

        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300 relative z-10 pr-8">
          {title}
        </h3>
        <p className="text-neutral-500 mb-5 leading-relaxed text-sm relative z-10">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 relative z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono px-2.5 py-0.5 bg-white/[0.03] rounded-md text-[11px] font-medium text-neutral-500 border border-white/[0.05]"
            >
              {tag}
            </span>
          ))}
        </div>

        {href && (
          <div className="mt-5 flex items-center gap-1.5 text-xs text-neutral-600 group-hover:text-accent transition-colors duration-300 relative z-10">
            <span className="font-medium">View project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </CardWrapper>
    </motion.div>
  );
}
