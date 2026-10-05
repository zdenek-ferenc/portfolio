import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HeroShot from "./hero-shot";
import BriefExplorer from "./brief-explorer";

export const metadata: Metadata = {
  title: "Hravé slovíčka - Zdenek Ferenc",
  description:
    "Jak vznikl web pro soukromé centrum rozvoje řeči dětí: od dotazníku od klientky přes ceník a pokyny pro rodiče až po Astro, rezervace a mapu.",
};

const meta = [
  { label: "Klientka", value: "Henrieta Košťálová, centrum rozvoje řeči v Topoľčanech" },
  { label: "Moje role", value: "Struktura obsahu, design a vývoj" },
  { label: "Stack", value: "Astro, TypeScript, Tailwind" },
  { label: "Stav", value: "Hotovo, čeká na spuštění" },
];

const palette = [
  { name: "Mátová", role: "Hlavička a plochy, z loga", hex: "#8FCCC3" },
  { name: "Tmavá mátová", role: "Zvýraznění a odkazy", hex: "#5EA89E" },
  { name: "Terakotová", role: "Jen rezervace", hex: "#E07A5F" },
  { name: "Medová", role: "Štítky a drobnosti", hex: "#F4C56C" },
  { name: "Krémová", role: "Pozadí stránky", hex: "#FAF8F5" },
];

const decisions = [
  {
    title: "Obrázky se zmenší při buildu",
    text: "Fotky jdou přes astro:assets. Při buildu se převedou do WebP a vygenerují se jen ve velikostech, které stránka opravdu zobrazí.",
  },
  {
    title: "Mapa se načte, až je potřeba",
    text: "Leaflet se stáhne teprve ve chvíli, kdy se návštěvník blíží ke kontaktům. Kolečko myši mapu přiblíží až po kliknutí do ní a na mobilu jde přes mapu normálně scrollovat.",
  },
  {
    title: "Strukturovaná data pro vyhledávače",
    text: "Strukturovaná data popisují centrum jako místní podnik s adresou, otevírací dobou a katalogem služeb s cenami. K tomu sitemap a náhled pro sdílení.",
  },
  {
    title: "Rezervace online",
    text: "Klientka chtěla mít online rezervaci u všech služeb, takže každé tlačítko na rezervaci vede rovnou do Reservia. Storno pravidla rodič vidí ještě před objednáním.",
  },
];

const code = `export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  targetAge: string;
  duration: string;
  price: string;
  packagePrice?: string;
  category: 'consultation' | 'individual' | 'group';
}

// Layout.astro: stejné služby pro Google
hasOfferCatalog: {
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    name: s.title,
    priceCurrency: "EUR",
  })),
}`;

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[65ch] space-y-5 text-lg text-neutral-400 leading-relaxed">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-[1.05] text-balance">
      {children}
    </h2>
  );
}

export default function HraveSlovickaPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-neutral-200 overflow-x-hidden selection:bg-accent/30">
      {/* Úvod */}
      <header className="px-6 md:px-12 pt-8 md:pt-14">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2.5 text-sm text-neutral-500 hover:text-white transition-colors group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Zpět na portfolio</span>
          </Link>

          <div className="mt-10 md:mt-14 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-[0.95]">
              Hravé slovíčka<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-2xl text-xl md:text-2xl text-neutral-400 leading-snug text-pretty">
              Web pro centrum rozvoje řeči dětí, ze kterého rodič hned pozná, co dítě čeká, kolik to stojí a jak se
              objednat.
            </p>
          </div>

          <dl className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/[0.07] pt-6 animate-fade-in-up delay-100">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-sm text-neutral-500">{m.label}</dt>
                <dd className="mt-1 text-[15px] text-neutral-200 leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="px-4 md:px-12 mt-10 md:mt-12">
        <div className="max-w-6xl mx-auto">
          <HeroShot />
        </div>
      </div>

      {/* Zadání */}
      <section className="px-6 md:px-12 pt-24 md:pt-36">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <SectionTitle>Zadání v dotazníku</SectionTitle>
          </div>
          <div className="md:col-span-8">
            <Prose>
              <p>
                Henrieta je vystudovaná logopedka a otevírala vlastní centrum v Topoľčanech pro děti od tří do osmi let.
                Měla logo, barvy a hodně programů. Neměla web, hotový ceník ani vlastní fotky.
              </p>
              <p>
                Základem byl dotazník o šesti okruzích: praxe, služby, rezervace, vzhled, obsah a praktické
                informace. Z jejích odpovědí jsem pak skládal celý web, sekci po sekci.
              </p>
            </Prose>

            <figure className="mt-12 max-w-[62ch]">
              <blockquote className="text-xl md:text-2xl font-medium text-white tracking-tight leading-snug text-pretty">
                „Pomáham detským klientom rozvíjať jazýček, pripraviť sa na vstup do školy a zvládnuť správnu výslovnosť
                hravou a rešpektujúcou formou.“
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-500">
                Henrieta Košťálová, odpověď na první otázku dotazníku
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Od dotazníku k webu */}
      <section className="px-6 md:px-12 pt-24 md:pt-36">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12 md:mb-16">
            <SectionTitle>Od odpovědi k sekci</SectionTitle>
            <p className="mt-5 text-lg text-neutral-400 leading-relaxed">
              Čtyři otázky z dotazníku a co se z nich na webu stalo. Vyber otázku a uvidíš výsledek.
            </p>
          </div>
          <BriefExplorer />
        </div>
      </section>

      {/* Design */}
      <section className="pt-24 md:pt-36">
        <div className="px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-4">
              <SectionTitle>Hravý, ale ne dětský</SectionTitle>
            </div>
            <div className="md:col-span-8">
              <Prose>
                <p>
                  Web nečtou děti, ale jejich rodiče. Ti potřebují vědět dvě věci: že tu bude dítě v dobrých rukou a co
                  mají udělat dál. Proto je hravost jen v detailech a všechno ostatní je klidné a čitelné.
                </p>
                <p>
                  Nadpisy jsou v zaobleném písmu Grandstander, text ve Figtree. Barvy vycházejí z loga a každá má jednu
                  práci. Terakotovou rodič uvidí jen tam, kde se dá objednat.
                </p>
              </Prose>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 mt-12 md:mt-16">
          <ul className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {palette.map((c, i) => (
              <li
                key={c.hex}
                className={`rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 ${
                  i === palette.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="h-20 md:h-28 rounded-xl" style={{ backgroundColor: c.hex }} />
                <p className="mt-3 text-sm font-medium text-white">{c.name}</p>
                <p className="text-sm text-neutral-500 leading-snug">{c.role}</p>
                <p className="mt-2 font-mono text-xs text-neutral-500 tabular-nums">{c.hex}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 md:px-12 mt-12 md:mt-16">
          <figure className="max-w-6xl mx-auto">
            <div className="relative w-full aspect-[2592/1200] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#FAF8F5]">
              <Image
                src="/hraveslovicka/about.webp"
                alt="Sekce O mně s fotkou prostředí centra a představením Henriety Košťálové"
                fill
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 px-2 md:px-0 text-sm text-neutral-500">
              Představení lektorky s jejím vzděláním a metodikami, se kterými pracuje.
            </figcaption>
          </figure>
        </div>

        <div className="px-6 md:px-12 mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-8 md:col-start-5">
              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Rada lektorky</h3>
              <div className="mt-4">
                <Prose>
                  <p>
                    Sedm služeb je pro rodiče hodně a nejtěžší je vybrat tu správnou. Když se rodič zastaví v ceníku
                    déle než tři sekundy, vyjede v rohu malé okno s fotkou Henriety a vzkazem, že se rozhodovat nemusí:
                    všechno spolu probrají na úvodní konzultaci. Pod vzkazem je rovnou tlačítko na rezervaci.
                  </p>
                  <p>Po zavření se okno během návštěvy už neukáže, aby neotravovalo.</p>
                </Prose>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technika */}
      <section className="px-6 md:px-12 pt-24 md:pt-36">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <SectionTitle>Proč Astro, a ne Next.js</SectionTitle>
            <div className="mt-6">
              <Prose>
                <p>
                  Jinak dělám hlavně v Next.js. Tady je ale jedna stránka, kterou rodič projde shora dolů, bez
                  přihlášení a bez databáze. Astro ji vygeneruje do čistého HTML a JavaScript dostane jen pár míst,
                  kde je opravdu potřeba: menu na mobilu, zmenšení hlavičky při scrollu, okno s radou a mapa.
                </p>
              </Prose>
            </div>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <figure className="lg:col-span-7 min-w-0">
              <pre className="rounded-2xl border border-white/[0.07] bg-[#0b0b0b] p-5 md:p-7 overflow-x-auto custom-scrollbar text-[13px] md:text-sm leading-relaxed font-mono text-neutral-300">
                <code>{code}</code>
              </pre>
              <figcaption className="mt-4 text-sm text-neutral-500">src/data/content.ts a Layout.astro, zkráceno</figcaption>
            </figure>
            <div className="lg:col-span-5 lg:pt-2">
              <p className="text-lg text-neutral-300 leading-relaxed">
                Všechny texty, služby a ceny jsou v jednom typovaném souboru. Z něj se skládá ceník na stránce i
                strukturovaná data pro Google.
              </p>
              <p className="mt-5 text-lg text-neutral-400 leading-relaxed">
                Když se změní cena, upraví se na jednom místě a ceník na webu i data pro vyhledávače se změní
                spolu.
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {decisions.map((d) => (
              <div key={d.title} className="border-t border-white/[0.07] pt-6">
                <h3 className="text-lg font-semibold text-white tracking-tight">{d.title}</h3>
                <p className="mt-2 text-neutral-400 leading-relaxed max-w-[52ch]">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co zbývá */}
      <section className="px-6 md:px-12 pt-24 md:pt-36">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <SectionTitle>Před spuštěním</SectionTitle>
          </div>
          <div className="md:col-span-8">
            <Prose>
              <p>
                Kód je hotový. Web teď čeká na věci, které se nedají naprogramovat: doménu hraveslovicka.sk, vlastní
                fotky od fotografky a finální telefon a e-mail. Až budou, stačí je doplnit do jednoho souboru s
                obsahem a web jde ven.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="px-6 md:px-12 pt-24 md:pt-36 pb-32 md:pb-40">
        <div className="max-w-6xl mx-auto border-t border-white/[0.07] pt-14 md:pt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-[1.05]">
              Potřebuješ web pro svou praxi?
            </h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              Pošli mi pár vět o tom, co děláš. Dotazník pak připravím na míru.
            </p>
          </div>
          <Link
            href="/?contact=true#about-me"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-950 rounded-xl font-medium text-sm hover:bg-neutral-200 active:scale-[0.98] transition-all duration-300 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            <span>Probrat projekt</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
