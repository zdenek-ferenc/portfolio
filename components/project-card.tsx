"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  delay?: number;
}

export default function ProjectCard({ title, description, tags, href, delay = 0 }: ProjectCardProps) {
  const CardWrapper = href ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group"
    >
      <CardWrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/[0.04] hover:border-accent/20 transition-all duration-500 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent" />

        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">
          {title}
        </h3>
        <p className="text-neutral-400 mb-6 leading-relaxed relative z-10">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 relative z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/[0.04] rounded-full text-xs font-medium text-neutral-300 border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>

        {href && (
          <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 group-hover:text-accent transition-colors duration-300 relative z-10">
            <span>View project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        )}
      </CardWrapper>
    </motion.div>
  );
}
