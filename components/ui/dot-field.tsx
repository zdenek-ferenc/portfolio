"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const DOT = 28; // rozteč teček v px

/**
 * Pole teček za hero. Základ je sotva viditelný, červená vrstva se
 * odmaskuje jen kolem "světelného bodu". Bod v klidu stojí u rotujícího slova
 * a líně sleduje kurzor (stejný jazyk jako svit okrajů karet).
 */
export default function DotField({ homeY = 0.4 }: { homeY?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 55, damping: 22, mass: 0.6 });

  const mask = useMotionTemplate`radial-gradient(230px circle at ${sx}px ${sy}px, #000 0%, transparent 100%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const home = (instant = false) => {
      const r = el.getBoundingClientRect();
      x.set(r.width / 2);
      y.set(r.height * homeY);
      if (instant) {
        sx.jump(r.width / 2);
        sy.jump(r.height * homeY);
      }
    };
    home(true);
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top - 80 || e.clientY > r.bottom + 80) return;
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    const onLeave = () => home();
    document.documentElement.addEventListener("pointerleave", onLeave);
    const onResize = () => home(true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce, homeY, x, y, sx, sy]);

  const grid = `${DOT}px ${DOT}px`;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
      }}
    >
      {/* Ambient: sotva viditelné tečky, ztrácí se k okrajům */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1.4px)",
          backgroundSize: grid,
          backgroundPosition: "center top",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 70% at 50% 40%, #000 0%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 65% 70% at 50% 40%, #000 0%, transparent 100%)",
        }}
      />
      {/* Akcent: stejné tečky, odmaskované kolem světelného bodu */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(207,47,49,0.95) 1.3px, transparent 1.8px)",
          backgroundSize: grid,
          backgroundPosition: "center top",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}
