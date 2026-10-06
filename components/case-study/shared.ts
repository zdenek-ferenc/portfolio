// Sloupec textu a okraj s poznámkami. Stejná mřížka pro hlavičku, kapitoly i závěr,
// aby levá hrana textu a okraj seděly přes celou stránku.
export const COLUMNS =
  "grid lg:grid-cols-[minmax(0,40rem)_minmax(14rem,1fr)] lg:gap-x-16 xl:gap-x-20";

export type ChapterMeta = { id: string; title: string };
