// Sloupec textu a okraj s poznámkami. Stejná mřížka pro hlavičku, kapitoly i závěr,
// aby levá hrana textu a okraj seděly přes celou stránku.
export const COLUMNS =
  "grid lg:grid-cols-[minmax(0,40rem)_minmax(14rem,1fr)] lg:gap-x-16 xl:gap-x-20";

export const chapters = [
  { id: "zacatky", title: "Dva projekty, které jsme zavřeli" },
  { id: "finsko", title: "Týden ve Finsku" },
  { id: "jak-funguje", title: "Jak RiseHigh funguje" },
  { id: "prototyp", title: "Prototyp za měsíc" },
  { id: "leto", title: "Léto, kdy jsem zbyl sám" },
  { id: "inprof", title: "24 hodin v INPROFu" },
  { id: "otevrena-vyzva", title: "První otevřená výzva" },
] as const;
