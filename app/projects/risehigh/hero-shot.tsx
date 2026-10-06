"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Screenshot se při scrollu roztáhne ze šířky textu do plné šířky. */
export default function HeroShot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [20, 20] : [28, 20]);
  const clipPath = useTransform(
    [inset, radius] as const,
    ([i, r]: number[]) => `inset(0 ${i}% round ${r}px)`
  );

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ clipPath }}
        className="relative aspect-[1926/1083] w-full overflow-hidden bg-[#06101f] animate-fade-in delay-300"
      >
        <Image
          src="/risehigh.webp"
          alt="Úvodní stránka risehigh.io: nadpis Praxe, která dává smysl, tlačítka pro studenty a firmy a vpravo interaktivní ukázka výzvy"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1216px) 100vw, 1216px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
