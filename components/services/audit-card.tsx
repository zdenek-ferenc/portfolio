"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Palette } from "lucide-react";
import { prettyDomain } from "./audit-modal";

// Nabídka auditu zdarma: nadpis se při psaní adresy přepíše na doménu návštěvníka
export function AuditCard({ onOpen }: { onOpen: (url: string) => void }) {
  const [url, setUrl] = useState("");
  const domain = prettyDomain(url);

  return (
    <motion.div
      data-glow
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mobile-no-animate sm:col-span-2 relative overflow-hidden rounded-2xl border border-accent/25 bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-80 w-[36rem] rounded-full bg-accent/[0.09] blur-3xl"
      />

      <div className="relative grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-10">
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-white leading-[1.1] break-words">
            Co brzdí{" "}
            <span className={domain ? "text-white underline decoration-accent decoration-2 underline-offset-[6px]" : "text-neutral-400"}>
              {domain || "tvůj web"}
            </span>
            ?
          </h3>
          <p className="mt-3 max-w-[46ch] text-sm sm:text-base text-neutral-400 leading-relaxed">
            <strong className="font-medium text-white">Audit zdarma a bez závazků.</strong> Pošli mi odkaz, projdu
            design i rychlost a napíšu ti, co bych opravil jako první.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-300">
            <li className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-neutral-500" />
              Design a UX
            </li>
            <li className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-neutral-500" />
              Rychlost a Core Web Vitals
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpen(url.trim());
          }}
          className="flex flex-col gap-2.5"
        >
          <label htmlFor="audit-inline-url" className="sr-only">
            Adresa tvého webu
          </label>
          <div className="flex items-center rounded-xl border border-white/[0.1] bg-neutral-950 px-4 transition-colors focus-within:border-accent/60 hover:border-white/[0.18]">
            <span aria-hidden className="select-none text-sm text-neutral-500">
              https://
            </span>
            <input
              id="audit-inline-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="tvujweb.cz"
              className="min-w-0 flex-1 bg-transparent py-3.5 pl-0.5 text-sm text-white placeholder:text-neutral-500 caret-accent outline-none"
            />
          </div>
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b82a2c] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="truncate">{domain ? `Projít ${domain}` : "Chci audit zdarma"}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
