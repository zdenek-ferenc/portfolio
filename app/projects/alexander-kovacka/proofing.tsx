"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { Heart } from "lucide-react";

/** Ukázka klientského výběru. Stav žije jen v prohlížeči, nic se neukládá. */
export default function Proofing() {
  const inputId = useId();
  const [picked, setPicked] = useState(false);
  const [text, setText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setComments((c) => [...c, value]);
    setText("");
  };

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-inset ring-white/[0.08]">
        <Image
          src="/marek.webp"
          alt="Ukázková fotka z klientské galerie"
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
        <button
          type="button"
          aria-pressed={picked}
          onClick={() => setPicked((p) => !p)}
          className={`absolute right-3 top-3 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            picked ? "bg-accent text-white" : "bg-[#050505]/80 text-neutral-200 hover:bg-[#050505] hover:text-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${picked ? "fill-current" : ""}`} aria-hidden />
          {picked ? "Vybráno" : "Vybrat"}
        </button>
      </div>

      <form onSubmit={send} className="mt-4 flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          Poznámka k úpravě fotky
        </label>
        <input
          id={inputId}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Např. trochu prosvětlit stíny"
          className="min-w-0 flex-1 rounded-xl border border-white/[0.12] bg-transparent px-4 py-3 text-[15px] text-neutral-100 placeholder:text-neutral-500 focus-visible:border-white/40 focus-visible:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-all hover:bg-neutral-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          Odeslat
        </button>
      </form>

      {comments.length > 0 ? (
        <ul aria-live="polite" className="mt-4 border-t border-white/[0.08]">
          {comments.map((c, i) => (
            <li key={i} className="border-b border-white/[0.08] py-3 text-[15px] text-neutral-300">
              <span className="mr-2 text-sm text-text-tertiary">Klient</span>
              {c}
            </li>
          ))}
        </ul>
      ) : null}

      <figcaption className="mt-4 text-sm leading-relaxed text-text-tertiary">
        Funkční ukázka klientské zóny. Označ fotku nebo napiš poznámku, přesně tak to vidí Alexův klient.
      </figcaption>
    </figure>
  );
}
