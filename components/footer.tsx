"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 pt-20 pb-10 overflow-hidden bg-neutral-950">
      {/* Accent gradient border-top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CF2F31 30%, #ff8c42 50%, #CF2F31 70%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      {/* Ambient glow from gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,47,49,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <p className="text-base font-mono text-gray-200 uppercase tracking-[0.35em] mb-6">
            Máte projekt?
          </p>
          <a
            href="mailto:zdenekk.ferenc@gmail.com"
            className="group block"
          >
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-200 group-hover:text-white transition-colors duration-500 leading-none"
            >
              Pojďme
              <br />
              <span className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #CF2F31, #ff8c42)",
                }}
              >
                spolupracovat.
              </span>
            </h2>
            <div className="mt-6 flex items-center gap-3 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-400">
              <span className="font-mono text-lg tracking-wide">zdenekk.ferenc@gmail.com</span>
              <motion.div
                className="h-[1px] bg-neutral-700 group-hover:bg-accent transition-colors duration-400"
                initial={{ width: 40 }}
                whileHover={{ width: 80 }}
                style={{ width: 40 }}
              />
            </div>
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.04]"
        >
          <div>
            <p className="text-sm font-bold text-neutral-200 mb-1">Zdenek Ferenc</p>
            <p className="text-xs text-neutral-600 max-w-xs">
              Product Engineer tvořící digitální produkty s důrazem na detail.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex gap-5 text-xs text-neutral-600">
              <a
                href="https://github.com/zdenek-ferenc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 font-medium"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zdenek-ferenc-92a64b2ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 font-medium"
              >
                LinkedIn
              </a>
              <a
                href="mailto:zdenekk.ferenc@gmail.com"
                className="hover:text-white transition-colors duration-300 font-medium"
              >
                Email
              </a>
            </div>
            <p className="font-mono text-[10px] text-neutral-700">
              © {currentYear} — All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
