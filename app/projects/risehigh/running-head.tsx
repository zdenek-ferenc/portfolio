"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { chapters } from "./shared";

/**
 * Běžící hlavička jako v knize: objeví se, až zmizí úvod,
 * ukazuje aktuální kapitolu a červenou linkou průběh čtení.
 */
export default function RunningHead() {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const hero = document.getElementById("uvod");
    const heroObserver = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    if (hero) heroObserver.observe(hero);

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.getAttribute("data-chapter"));
        }
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) chapterObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      chapterObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Na mobilu jen průběh čtení, vpravo nahoře je menu */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-accent lg:hidden"
      />

      <div
        className={`fixed inset-x-0 top-0 z-40 hidden border-b border-white/[0.07] bg-[#050505] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          shown ? "translate-y-0" : "-translate-y-full"
        }`}
        inert={!shown}
      >
        <div className="mx-auto flex h-14 max-w-[64rem] items-center gap-5 px-10 text-sm">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-md text-text-tertiary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Portfolio
          </Link>
          <span aria-hidden className="h-4 w-px bg-white/10" />
          <p className="min-w-0 truncate">
            <span className="font-medium text-white">RiseHigh</span>
            {current ? <span className="text-neutral-400"> / {current}</span> : null}
          </p>
          <a
            href="https://risehigh.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md text-text-tertiary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            risehigh.io
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        />
      </div>
    </>
  );
}
