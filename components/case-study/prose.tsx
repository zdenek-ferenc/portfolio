import type { ReactNode } from "react";
import { Note, Row } from "./margin";

export const linkClass =
  "text-white underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm";

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[17px] leading-[1.75] text-[#b4b4b4] md:text-lg md:leading-[1.75] text-pretty">{children}</p>;
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-white">{children}</strong>;
}

/** Kapitola: nadpis ve sloupci, shrnutí kapitoly na okraji, pod tím tělo příběhu. */
export function Chapter({
  id,
  title,
  summary,
  children,
}: {
  id: string;
  title: string;
  summary: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} data-chapter={title} aria-labelledby={`${id}-nadpis`} className="scroll-mt-24 pt-28 md:pt-40">
      <Row notes={<Note summary>{summary}</Note>}>
        <h2
          id={`${id}-nadpis`}
          className="text-[2.125rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white text-balance md:text-5xl"
        >
          {title}
        </h2>
      </Row>
      <div className="mt-8 space-y-7 md:mt-10">{children}</div>
    </section>
  );
}
