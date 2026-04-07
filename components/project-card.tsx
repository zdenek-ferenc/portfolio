"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent, useRef, useState } from "react";

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
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group relative h-full flex"
    >
      <div className="absolute -inset-1 rounded-3xl bg-accent opacity-0 blur-2xl group-hover:opacity-15 transition-opacity duration-700" />

      <CardWrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="w-full relative flex flex-col justify-between bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/[0.04] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      >
        <div 
          ref={cardRef} 
          onMouseMove={handleMouseMove}
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
          }}
        />

        <div className="absolute inset-0 mix-blend-overlay opacity-[0.02] bg-noise pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-500 tracking-tight leading-tight">
              {title}
            </h3>
            <span className="font-mono text-sm text-neutral-600 tracking-widest font-bold border-b border-neutral-800 pb-1">
              {numLabel}
            </span>
          </div>
          
          <p className="text-neutral-400 mb-10 leading-relaxed text-base font-light">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono px-3 py-1.5 bg-white/[0.02] rounded-lg text-xs font-medium text-neutral-400 border border-white/[0.03] group-hover:border-white/[0.08] transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="w-full h-[1px] bg-white/[0.04] mb-6 group-hover:bg-gradient-to-r from-accent/50 to-transparent transition-colors duration-500" />

          {href && (
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-bold tracking-wide uppercase transition-colors duration-500 group-hover:text-white">
              <span>Zjistit více</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}
