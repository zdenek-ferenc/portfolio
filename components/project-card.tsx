"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <CardWrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block bg-[#222222] rounded-2xl p-8 border border-white/5 hover:border-[#CF2F31]/30 transition-all duration-300 cursor-pointer"
      >
        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#CF2F31] transition-colors">
          {title}
        </h3>
        <p className="text-[#A1A1A1] mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 rounded-full text-sm text-[#EDEDED] border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardWrapper>
    </motion.div>
  );
}
