"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GeneralContactModal } from "@/components/services/general-contact-modal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="relative px-6 pt-24 pb-10 mt-24 overflow-hidden bg-neutral-950 border-t border-white/[0.07]">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mobile-no-animate mb-16"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="group block text-left w-full cursor-pointer"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1]">
              Pojďme
              <br />
              spolupracovat<span className="text-accent">.</span>
            </h2>
            <div className="mt-8 flex items-center gap-3 text-neutral-400 group-hover:text-white transition-colors duration-300">
              <span className="font-mono text-base md:text-lg">zdenekk.ferenc@gmail.com</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mobile-no-animate flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.07]"
        >
          <div>
            <p className="text-sm font-semibold text-neutral-200 mb-1">Zdenek Ferenc</p>
            <p className="text-sm text-neutral-500 max-w-xs">
              Developer & Founder. Tvořím moderní webové aplikace s důrazem na čisté UI a skvělé UX.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex gap-5 text-sm text-neutral-500">
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                Email
              </button>
            </div>
            <p className="font-mono text-xs text-neutral-600">
              © {currentYear} Zdenek Ferenc
            </p>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <GeneralContactModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </footer>
  );
}
