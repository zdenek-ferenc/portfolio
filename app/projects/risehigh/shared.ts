import type { ChapterMeta } from "@/components/case-study/shared";

export const chapters = [
  { id: "zacatky", title: "Dva projekty, které jsme zavřeli" },
  { id: "finsko", title: "Týden ve Finsku" },
  { id: "jak-funguje", title: "Jak RiseHigh funguje" },
  { id: "prototyp", title: "Prototyp za měsíc" },
  { id: "leto", title: "Léto, kdy jsem zbyl sám" },
  { id: "inprof", title: "24 hodin v INPROFu" },
  { id: "otevrena-vyzva", title: "První otevřená výzva" },
] as const satisfies readonly ChapterMeta[];
