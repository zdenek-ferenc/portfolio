import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroShot from "@/components/case-study/hero-shot";
import RunningHead from "@/components/case-study/running-head";
import { Note, Ref, Row } from "@/components/case-study/margin";
import { Chapter as BaseChapter, B, P, linkClass } from "@/components/case-study/prose";
import { COLUMNS } from "@/components/case-study/shared";
import Proofing from "./proofing";

export const metadata: Metadata = {
  title: "Alexander Kovačka - Zdenek Ferenc",
  description:
    "Minimalistický web pro fotografa a k němu systém na správu galerií, klientský výběr fotek a fakturaci. Jak jsme ho s Alexem postavili.",
};

const SITE = "https://www.alexanderkovacka.com/cs";

const chapters = [
  { id: "vize", title: "Společná vize" },
  { id: "cms", title: "CMS pro nahrávání" },
  { id: "proofing", title: "Client proofing" },
  { id: "struktura", title: "Chytřejší struktura" },
  { id: "faktury", title: "Generátor faktur" },
  { id: "pod-kapotou", title: "Pod kapotou" },
] as const;

const meta = [
  { label: "Klient", value: "Alexander Kovačka, fotograf" },
  { label: "Moje role", value: "Design a vývoj" },
  { label: "Stack", value: "Next.js, Supabase, Tailwind" },
];

const steps = [
  { title: "Nahrání", text: "Alex nahraje fotky z focení do privátní klientské galerie a pošle klientovi odkaz." },
  { title: "Výběr", text: "Klient prochází náhledy a jedním kliknutím označí favority." },
  { title: "Komentáře", text: "U vybraných fotek může zanechat poznámku k požadované úpravě." },
];

const kinds = [
  { title: "Projekty", text: "Malé samostatné jednotky, třeba konkrétní event nebo festival. Kliknutím se dostaneš rovnou do galerie." },
  { title: "Kolekce", text: "Zastřešující kategorie jako Festivaly, Eventy nebo Studio. Sdružují projekty, aby byl web přehledný." },
];

const decisions = [
  {
    term: "Sharp",
    lead: "Fotky se zmenší dřív, než se uloží.",
    text: "Alex nahrává fotky v tiskové kvalitě, 10 až 20 MB na kus. Server je nejdřív protáhne knihovnou Sharp, která je zkomprimuje a převede do .webp. Do cloudu tak jde jen zlomek původní velikosti, což šetří místo i měsíční náklady za úložiště.",
  },
  {
    term: "Hash v URL",
    lead: "Zabezpečení bez registrace.",
    text: "Klienti nechtějí zakládat účty a pamatovat si hesla. Klientská zóna proto běží na odkazu s dynamickým kryptografickým hashem. Je unikátní pro daného klienta, bezpečný a otevře se jedním klikem.",
  },
  {
    term: "Real-time",
    lead: "Alex vidí výběr živě.",
    text: "Když klient doma srdíčkuje fotky, Alex to v administraci vidí hned. Real-time spojení s databází místo neustálých REST dotazů výrazně ulevilo serveru a dalo klientské zóně plynulý pocit.",
  },
];

function Chapter({
  index,
  summary,
  children,
}: {
  index: number;
  summary: React.ReactNode;
  children: React.ReactNode;
}) {
  const { id, title } = chapters[index];
  return (
    <BaseChapter id={id} title={title} summary={summary}>
      {children}
    </BaseChapter>
  );
}

export default function KovackaPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] text-neutral-200">
      <RunningHead name="Alexander Kovačka" chapters={chapters} href={SITE} hrefLabel="alexanderkovacka.com" />

      {/* Úvod */}
      <header id="uvod" className="px-6 pt-8 md:px-10 md:pt-12">
        <div className="mx-auto max-w-[64rem]">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2.5 rounded-md text-sm text-text-tertiary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Zpět na portfolio</span>
          </Link>

          <div className={`mt-14 md:mt-20 ${COLUMNS}`}>
            <div className="animate-fade-in-up">
              <h1 className="text-[clamp(3rem,12vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Alexander Kovačka<span className="text-accent">.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-xl leading-snug text-neutral-300 text-pretty md:mt-9 md:text-[1.625rem] md:leading-[1.3]">
                Minimalistický web pro fotografa a k němu operační systém pro jeho byznys: správa galerií, klientský
                výběr fotek a fakturace na jednom místě. Postavil jsem ho pro kamaráda Alexe.
              </p>
            </div>

            <nav aria-label="Kapitoly" className="hidden animate-fade-in-up delay-100 lg:mt-3 lg:block">
              <p className="border-b border-white/[0.08] pb-3 text-sm text-text-tertiary">V příběhu</p>
              <ol className="mt-2">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="group flex items-center justify-between gap-4 rounded-sm py-[7px] text-[15px] text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      {c.title}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.08] pt-6 animate-fade-in-up delay-200 md:mt-16 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-sm text-text-tertiary">{m.label}</dt>
                <dd className="mt-1 text-[15px] leading-snug text-neutral-200">{m.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-sm text-text-tertiary">Stav</dt>
              <dd className="mt-1 text-[15px] leading-snug text-neutral-200">
                Běží na{" "}
                <a href={SITE} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  alexanderkovacka.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <figure className="mt-12 px-4 md:mt-16 md:px-10">
        <div className="mx-auto max-w-[76rem]">
          <HeroShot
            src="/kovacka.webp"
            alt="Úvodní stránka alexanderkovacka.com: bílý panel s logem a menu vlevo, vpravo fotka zarostlé zdi s dveřmi"
            width={1615}
            height={959}
            background="#ffffff"
          />
        </div>
        <figcaption className="mx-auto mt-4 max-w-[64rem] px-2 md:px-0">
          <div className={COLUMNS}>
            <span aria-hidden className="hidden lg:block" />
            <span className="text-sm leading-relaxed text-text-tertiary">
              Úvodní stránka alexanderkovacka.com. Fotka má celé místo, web kolem ní je schválně prázdný.
            </span>
          </div>
        </figcaption>
      </figure>

      <article className="px-6 pb-32 md:px-10 md:pb-44">
        <div className="mx-auto max-w-[64rem]">
          <Chapter index={0} summary="Čistý minimalismus: whitespace, jednoduchá typografie, všechna pozornost na fotkách.">
            <Row
              notes={
                <Note n={1}>
                  Sedli jsme si nad prázdným plátnem a řešili, jak by měl web vypadat. Alexova představa byla jasná
                  od první minuty.
                </Note>
              }
            >
              <P>
                Alex je můj dobrý kamarád a zároveň velmi šikovný fotograf. Společně jsme začali řešit, jak by měl
                jeho web vypadat
                <Ref n={1} />. Chtěl <B>čistokrevný minimalismus</B>.
              </P>
            </Row>
            <Row>
              <P>
                Žádné rušivé prvky, žádné zbytečnosti. Web musel dýchat: hodně <B>prázdného místa</B>, jednoduchá
                typografie a veškerá pozornost na to nejdůležitější, jeho fotky.
              </P>
            </Row>
          </Chapter>

          <Chapter index={1} summary="Vlastní administrace, aby Alex nahrával a publikoval sám, bez učení složitých editorů.">
            <Row
              notes={
                <Note n={2}>Cíl byl, aby Alex nemusel řešit kód ani učit se složité editory.</Note>
              }
            >
              <P>
                S přibývajícími projekty rostla potřeba obsah snadno spravovat. Složité úpravy přes kód nepřipadaly v
                úvahu
                <Ref n={2} />, proto jsme jako první krok postavili <B>vlastní administrační panel</B>.
              </P>
            </Row>
            <Row>
              <P>
                Alex si teď sám nahrává celé sady fotek, zakládá projekty a během pár vteřin je pouští k divákům.
              </P>
            </Row>
          </Chapter>

          <Chapter index={2} summary="Klient vybírá a komentuje fotky pod Alexovou značkou, bez účtu a bez hesla.">
            <Row>
              <P>
                Skutečný gamechanger přišel s klientskou zónou. Posílání fotek přes cizí služby bylo krkolomné a
                Alex chtěl, aby klient dostal zážitek přímo pod jeho značkou.
              </P>
              <dl className="mt-10 border-t border-white/[0.08]">
                {steps.map((s) => (
                  <div
                    key={s.title}
                    className="grid gap-1 border-b border-white/[0.08] py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                  >
                    <dt className="font-medium text-white">{s.title}</dt>
                    <dd className="text-[16px] leading-relaxed text-[#a8a8a8]">{s.text}</dd>
                  </div>
                ))}
              </dl>
            </Row>

            <Row
              notes={
                <Note label="Zkus to">
                  Je to živá ukázka klientské zóny. Nic se neukládá, po obnovení stránky začneš znovu.
                </Note>
              }
            >
              <div className="mt-6">
                <Proofing />
              </div>
            </Row>

            <Row
              notes={
                <Note n={3}>
                  Lightroom umí hledat podle názvů souborů, a právě to Alexovi ušetří ruční procházení.
                </Note>
              }
            >
              <P>
                <B>Most do Lightroomu.</B> Každá nahraná fotka drží svůj původní název, třeba <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-200">DSC_1234</code>.
                Jakmile klient dokončí výběr, Alex si vygeneruje seznam zvolených názvů a vloží ho do hledání v
                Lightroomu
                <Ref n={3} />. Program pak ze stovek fotek na SD kartě vytáhne jen ty k úpravě.
              </P>
            </Row>
          </Chapter>

          <Chapter index={3} summary="Projekty drží galerie, kolekce je shlukují, aby se úvodní strana nezměnila v seznam.">
            <Row>
              <P>
                S hromadou zakázek hrozilo, že se úvodní strana stane seznamem o stovce položek. Nad fotky jsme
                proto přidali další organizační vrstvu.
              </P>
              <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {kinds.map((k) => (
                  <div key={k.title} className="border-t border-white/[0.1] pt-4">
                    <dt className="font-medium text-white">{k.title}</dt>
                    <dd className="mt-1.5 text-[16px] leading-relaxed text-[#a8a8a8]">{k.text}</dd>
                  </div>
                ))}
              </dl>
            </Row>
            <Row>
              <P>
                V administraci má Alex plnou kontrolu nad tím, které <B>kolekce</B> se na úvodní straně ukážou,
                které skryje a v jakém pořadí.
              </P>
            </Row>
          </Chapter>

          <Chapter index={4} summary="Faktura vznikne z dat zákazníka a balíčku a rovnou odejde klientovi.">
            <Row
              notes={
                <Note n={4}>
                  Přepisování údajů z e-mailů do účetních šablon stálo spoustu času, který chtěl Alex trávit focením.
                </Note>
              }
            >
              <P>
                Posledním dílkem byla fakturace. Přepisování údajů z e-mailů do šablon
                <Ref n={4} /> stálo drahocenný čas, a tak jsme do administrace přidali <B>generátor faktur</B>.
              </P>
            </Row>
            <Row>
              <P>
                Systém si z dat zákazníka a vybraného balíčku sám načte všechny informace, vytvoří formálně správný
                doklad a pošle ho klientovi. Nudná administrativa tak ubývá na úkor samotného focení.
              </P>
            </Row>
          </Chapter>

          <Chapter index={5} summary="Rychlost a gigabyty dat: komprese fotek, odkaz bez registrace a živá synchronizace.">
            <Row>
              <P>
                Stavět systém pro fotografa znamenalo myslet hlavně na <B>rychlost a bezproblémové načítání
                gigabytů dat</B>. Tři věci, které mě tahle zakázka naučila:
              </P>
            </Row>

            <div>
              {decisions.map((d, i) => (
                <Row key={d.term}>
                  <div
                    className={`grid gap-2 border-b border-white/[0.08] py-7 sm:grid-cols-[7.5rem_1fr] sm:gap-6 ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    <p className="font-medium text-white">{d.term}</p>
                    <div>
                      <p className="text-[17px] text-white">{d.lead}</p>
                      <p className="mt-2 text-[16px] leading-relaxed text-[#a8a8a8]">{d.text}</p>
                    </div>
                  </div>
                </Row>
              ))}
            </div>
          </Chapter>

          {/* Závěr */}
          <section aria-labelledby="zaver-nadpis" className="mt-32 border-t border-white/[0.08] pt-16 md:mt-44 md:pt-24">
            <Row
              notes={
                <Note label="Víc o mně">
                  Navrhuju a kóduju webové aplikace od UI po backend. Podívej se i na{" "}
                  <Link href="/projects/risehigh" className={`${linkClass} whitespace-nowrap`}>
                    příběh RiseHighu
                  </Link>
                  .
                </Note>
              }
            >
              <h2
                id="zaver-nadpis"
                className="text-[2.5rem] font-semibold leading-[1] tracking-[-0.04em] text-white text-balance md:text-6xl"
              >
                Potřebuješ vlastní systém<span className="text-accent">?</span>
              </h2>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#b4b4b4] text-pretty">
                Jestli řešíš podobný custom systém pro svůj byznys nebo tě zajímá, jak platforma funguje pod
                pokličkou, napiš mi pár vět a probereme to.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/?contact=true#about-me"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                >
                  Probrat projekt
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  Kouknout na web
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Row>
          </section>
        </div>
      </article>
    </main>
  );
}
