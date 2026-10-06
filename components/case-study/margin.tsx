"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { COLUMNS } from "./shared";

type RowState = {
  reading: boolean;
  lit: number | null;
  setLit: (n: number | null) => void;
};

const RowContext = createContext<RowState>({ reading: false, lit: null, setLit: () => {} });

/**
 * Jeden řádek příběhu: text ve sloupci, poznámky na okraji vedle něj.
 * Když je řádek ve čtecí výšce obrazovky, jeho poznámky se rozsvítí.
 */
export function Row({ children, notes }: { children: ReactNode; notes?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reading, setReading] = useState(false);
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !notes) return;
    // Čtecí pás je zhruba ve třetině výšky okna, kam se oko při čtení dívá
    const io = new IntersectionObserver(([entry]) => setReading(entry.isIntersecting), {
      rootMargin: "-30% 0px -55% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [notes]);

  return (
    <RowContext.Provider value={{ reading, lit, setLit }}>
      <div ref={ref} className={COLUMNS}>
        <div className="min-w-0">{children}</div>
        {notes ? (
          // Na desktopu poznámky nenatahují řádek, text si drží vlastní rytmus
          <aside className="mt-5 border-l border-white/[0.08] pl-4 lg:relative lg:mt-0 lg:border-l-0 lg:pl-0">
            <div className="space-y-5 lg:absolute lg:inset-x-0 lg:top-0">{notes}</div>
          </aside>
        ) : null}
      </div>
    </RowContext.Provider>
  );
}

/** Číslo odkazu v textu. Najetí nebo fokus rozsvítí odpovídající poznámku. */
export function Ref({ n }: { n: number }) {
  const { setLit } = useContext(RowContext);
  return (
    <a
      href={`#poznamka-${n}`}
      aria-label={`Poznámka ${n}`}
      onMouseEnter={() => setLit(n)}
      onMouseLeave={() => setLit(null)}
      onFocus={() => setLit(n)}
      onBlur={() => setLit(null)}
      className="relative -top-[0.55em] ml-[0.15em] rounded-sm px-[0.1em] font-mono text-[0.62em] font-medium tabular-nums text-accent no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {n}
    </a>
  );
}

/**
 * Poznámka na okraji. `n` ji spojí s odkazem v textu,
 * `summary` z ní udělá shrnutí kapitoly naproti nadpisu.
 */
export function Note({
  n,
  label,
  summary,
  children,
}: {
  n?: number;
  label?: string;
  summary?: boolean;
  children: ReactNode;
}) {
  const { reading, lit } = useContext(RowContext);
  const on = reading || (n !== undefined && lit === n);

  return (
    <div id={n !== undefined ? `poznamka-${n}` : undefined} className="relative scroll-mt-32 lg:pt-3">
      <span aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-white/[0.08] lg:block" />
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 hidden h-px origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          on ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <div
        className={`transition-colors duration-500 ${
          summary
            ? `text-[15px] font-medium leading-snug ${on ? "text-white" : "text-neutral-300"}`
            : `text-[14px] leading-[1.6] ${on ? "text-neutral-200" : "text-text-tertiary"}`
        }`}
      >
        {n !== undefined ? (
          <span className="mr-2 font-mono text-[11px] font-medium tabular-nums text-accent">{n}</span>
        ) : null}
        {label ? <span className="font-medium text-white">{label}. </span> : null}
        {children}
      </div>
    </div>
  );
}
