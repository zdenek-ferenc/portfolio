"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type BriefItem = {
  id: string;
  topic: string;
  question: string;
  answer: string;
  decision: string;
  image: { src: string; alt: string; width: number; height: number };
};

// Otázky a odpovědi jsou z dotazníku od klientky (slovensky, zkrácené)
const items: BriefItem[] = [
  {
    id: "sluzby",
    topic: "Služby",
    question: "Aké služby a konzultácie ponúkaš?",
    answer:
      "Individuálna stimulácia reči, skupinové kurzy Maxík, Sindelar a Elkonin, myofunkčný tréning. Každý nový klient musí najprv absolvovať úvodnú konzultáciu.",
    decision:
      "Sedm služeb je na první pohled hodně. Nabídku jsem seřadil podle toho, jak rodič opravdu postupuje: nahoře povinný první krok s cenou a tlačítkem na rezervaci, pod ním teprve individuální lekce a skupinové kurzy.",
    image: {
      src: "/hraveslovicka/consultation.webp",
      alt: "Karta Úvodné konzultácie s cenou 40 € a tlačítkem na rezervaci",
      width: 2592,
      height: 1660,
    },
  },
  {
    id: "ceny",
    topic: "Ceník",
    question: "Máš už cenník?",
    answer:
      "Cenník nie je finálne uzavretý. Cieľom je smerovať deti do skupinových kurzov a balíčkov sedení, aby sa zabezpečila pravidelnosť.",
    decision:
      "Ve finálním ceníku ukazuje každá karta cenu jednoho sezení a hned vedle výhodnější balíček pěti sezení. Skupinové kurzy mají cenu za dítě, takže rodič nemusí nic přepočítávat.",
    image: {
      src: "/hraveslovicka/services.webp",
      alt: "Mřížka individuálních lekcí a skupinových kurzů s cenami za sezení a za balíček",
      width: 2592,
      height: 2240,
    },
  },
  {
    id: "faq",
    topic: "Časté otázky",
    question: "Napadajú ťa témy do FAQ?",
    answer:
      "Sekcia FAQ sa na webe vynechá. Namiesto toho sa uvedú praktické pokyny: príchod iba so zdravým dieťaťom, čo si priniesť a storno podmienky.",
    decision:
      "Místo seznamu otázek, které nikdo nečte, má web čtyři krátké pokyny před první návštěvou. Rodič se je dozví dřív, než si termín zarezervuje, ne až ve dveřích.",
    image: {
      src: "/hraveslovicka/instructions.webp",
      alt: "Sekce Praktické pokyny pred návštevou se čtyřmi pokyny pro rodiče",
      width: 2592,
      height: 1540,
    },
  },
  {
    id: "styl",
    topic: "Vzhled",
    question: "Štýl webu: hravý, pokojný, alebo kombinácia?",
    answer: "Hravý a farebný, prispôsobený názvu Hravé slovíčka. Logo aj firemné farby sú k dispozícii.",
    decision:
      "Hravost nese písmo a jedna zvlněná linka pod hlavičkou, ne animace. Mátová z loga drží klidné plochy, terakotová patří jen rezervaci, aby bylo na každé obrazovce jasné, kam kliknout.",
    image: {
      src: "/hraveslovicka.webp",
      alt: "Úvodní obrazovka webu Hravé slovíčka s mátovou hlavičkou a terakotovým tlačítkem Rezervovať termín",
      width: 2880,
      height: 1620,
    },
  },
];

function Shot({ item, priority = false }: { item: BriefItem; priority?: boolean }) {
  return (
    <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-white/[0.08] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-contain p-3 sm:p-5"
      />
    </div>
  );
}

export default function BriefExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % items.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      {/* Desktop: otázky vlevo, výsledek vpravo */}
      <div className="hidden md:grid grid-cols-12 gap-10 lg:gap-14 items-start">
        <div
          role="tablist"
          aria-label="Otázky z dotazníku"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="col-span-5 flex flex-col gap-2"
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`brief-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="brief-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group text-left rounded-2xl border px-5 py-4 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                  selected
                    ? "bg-white/[0.04] border-white/[0.14]"
                    : "border-transparent hover:bg-white/[0.02] hover:border-white/[0.06]"
                }`}
              >
                <span
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    selected ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                  }`}
                >
                  {item.topic}
                </span>
                <span
                  className={`block mt-1 text-[15px] leading-snug transition-colors duration-300 ${
                    selected ? "text-neutral-300" : "text-neutral-500"
                  }`}
                >
                  „{item.question}“
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="brief-panel"
          role="tabpanel"
          aria-labelledby={`brief-tab-${current.id}`}
          className="col-span-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <Shot item={current} priority={active === 0} />
              <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-2">Odpověď v dotazníku</p>
                  <p className="text-neutral-400 leading-relaxed italic">„{current.answer}“</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-2">Co jsem z toho udělal</p>
                  <p className="text-neutral-200 leading-relaxed">{current.decision}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobil: všechno pod sebou, bez přepínání */}
      <div className="md:hidden space-y-16">
        {items.map((item) => (
          <article key={item.id} className="space-y-5">
            <div>
              <p className="text-sm font-medium text-neutral-500">{item.topic}</p>
              <h3 className="mt-1 text-xl font-semibold text-white tracking-tight leading-snug">
                „{item.question}“
              </h3>
            </div>
            <p className="text-neutral-400 leading-relaxed italic">„{item.answer}“</p>
            <Shot item={item} />
            <p className="text-neutral-200 leading-relaxed">{item.decision}</p>
          </article>
        ))}
      </div>
    </>
  );
}
