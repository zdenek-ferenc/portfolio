"use client";

import { useEffect } from "react";

/**
 * Jeden globální listener: každému [data-glow] prvku nastaví --mx / --my
 * (pozici kurzoru uvnitř prvku). Žádný React state, žádné re-rendery.
 */
export default function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>("[data-glow]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
