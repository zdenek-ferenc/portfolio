import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroShot from "./hero-shot";
import RunningHead from "./running-head";
import { Note, Ref, Row } from "./margin";
import { COLUMNS, chapters } from "./shared";

export const metadata: Metadata = {
  title: "RiseHigh - Zdenek Ferenc",
  description:
    "Jak vznikl RiseHigh, platforma, kde studenti řeší zadání skutečných firem: od dvou zavřených projektů přes týden ve Finsku až po léto, kdy jsem ji postavil sám.",
};

const meta = [
  { label: "Role", value: "Founder, vývoj platformy" },
  { label: "Vznik", value: "Program ESBD na VUT v Brně" },
  { label: "Stack", value: "Next.js, Supabase, Tailwind" },
];

const steps = [
  { title: "Zadání", text: "Firma vytvoří skutečnou výzvu: logo, business plán nebo redesign UX." },
  { title: "Řešení", text: "Studenti sami nebo v týmech zpracují řešení a odešlou ho." },
  { title: "Výsledek", text: "Nejlepší řešení vyhraje. Firma dostane nápad i talent, student referenci." },
];

const linkClass =
  "text-white underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm";

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[17px] leading-[1.75] text-[#b4b4b4] md:text-lg md:leading-[1.75] text-pretty">{children}</p>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-white">{children}</strong>;
}

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

export default function RiseHighPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] text-neutral-200">
      <RunningHead />

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
              <h1 className="text-[clamp(3.75rem,13vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
                RiseHigh<span className="text-accent">.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-xl leading-snug text-neutral-300 text-pretty md:mt-9 md:text-[1.625rem] md:leading-[1.3]">
                Platforma, kde studenti řeší zadání skutečných firem. Tohle je příběh, jak vznikla: dva zavřené
                projekty, týden ve Finsku a léto, kdy jsem ji postavil sám.
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
                <a href="https://risehigh.io" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  risehigh.io
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <figure className="mt-12 px-4 md:mt-16 md:px-10">
        <div className="mx-auto max-w-[76rem]">
          <HeroShot />
        </div>
        <figcaption className="mx-auto mt-4 max-w-[64rem] px-2 md:px-0">
          <div className={COLUMNS}>
            <span aria-hidden className="hidden lg:block" />
            <span className="text-sm leading-relaxed text-text-tertiary">
              Úvodní stránka risehigh.io. Ukázka vpravo je klikací simulace výzvy, kterou si návštěvník projde sám.
            </span>
          </div>
        </figcaption>
      </figure>

      <article className="px-6 pb-32 md:px-10 md:pb-44">
        <div className="mx-auto max-w-[64rem]">
          <Chapter
            index={0}
            summary="Agentura, která uměla práci, ale ne obchod. A aplikace, která by roky čekala na univerzitu."
          >
            <Row notes={<Note n={1}>Entrepreneurship and Small Business Development. Místo zkoušek se hodnotí skutečná firma.</Note>}>
              <P>
                Na VUT studujeme program <B>ESBD</B>
                <Ref n={1} />. Hodnotí nás podle toho, jaký skutečný projekt založíme a jak se mu daří. Se spolužáky
                jsme proto rozjeli marketingovou agenturu <B>Virtigo Digital</B>.
              </P>
            </Row>
            <Row
              notes={
                <Note n={2}>Logo Virtigo Digital dnes visí na risehigh.io mezi firmami v řádku Důvěřují nám.</Note>
              }
            >
              <P>
                Zkušeností jsme měli málo, ale svezli jsme se na tehdejším AI boomu, našli spokojené klienty
                a dodávali slušnou práci
                <Ref n={2} />. Nejhůř nám šlo shánět zakázky. Hodiny cold-callingu, mizerná konverze. Agenturní
                model nás nebavil, a tak jsme Virtigo ukončili.
              </P>
            </Row>
            <Row notes={<Note n={3}>FIT je Fakulta informačních technologií, FP Fakulta podnikatelská. Obě na VUT.</Note>}>
              <P>
                Pak jsme chtěli řešit něco, co jsme sami zažívali. Student z FIT a student z FP
                <Ref n={3} /> se potkají nanejvýš v menze a o sobě nevědí. Nápad na <B>VUT Hub</B>, aplikaci,
                která by je propojila, lidi nadchl. Zapojit univerzitu by ale znamenalo čekat na schvalování a my
                jsme chtěli testovat hned. Koncept jsme zastavili ještě před startem.
              </P>
            </Row>
          </Chapter>

          <Chapter index={1} summary="Chaotické zadání od skutečné firmy nás naučilo víc než semestr případovek.">
            <Row
              notes={
                <Note n={4}>
                  Skutečná firma, skutečný problém a pevný termín. Stejné tři věci má dnes každá výzva na RiseHighu.
                </Note>
              }
            >
              <P>
                Celý náš program odjel na <B>EuroWeek</B> do Finska. Dostali jsme zadání od finské{" "}
                <B>TIMI Academy</B>, která chtěla expandovat
                <Ref n={4} />. Tým byl skvělý a mezinárodní, jenže zadání bylo chaotické a nikdo přesně nevěděl, co
                má doručit.
              </P>
            </Row>

            <figure className="relative !my-16 md:!my-24">
            <blockquote className="max-w-[54rem] text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-pretty md:text-[2.75rem]">
              <span aria-hidden className="text-accent lg:absolute lg:-translate-x-[0.6em]">
                „
              </span>
              Za jeden týden se skutečným problémem skutečné firmy jsme se naučili víc než za celý semestr nad
              vymyšlenými případovkami.“
            </blockquote>
            <figcaption className="mt-5 text-sm text-text-tertiary">Co jsme si odvezli z Finska</figcaption>
            </figure>

            <Row>
              <P>
                Tam nám došlo, kde je mezera. Firmy chtějí pohled zvenku a nové talenty, studenti praxi. A obojí
                se dá propojit.
              </P>
              <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <div className="border-t border-white/[0.1] pt-4">
                  <dt className="font-medium text-white">Co z toho mají firmy</dt>
                  <dd className="mt-1.5 text-[16px] leading-relaxed text-[#a8a8a8]">
                    Pohled zvenku a šanci najít talenty ještě před koncem školy.
                  </dd>
                </div>
                <div className="border-t border-white/[0.1] pt-4">
                  <dt className="font-medium text-white">Co z toho mají studenti</dt>
                  <dd className="mt-1.5 text-[16px] leading-relaxed text-[#a8a8a8]">
                    Praxi na skutečném zadání a práci do portfolia místo prázdného CV.
                  </dd>
                </div>
              </dl>
            </Row>
          </Chapter>

          <Chapter index={2} summary="Firma zadá, studenti řeší, nejlepší řešení vyhraje.">
            <Row
              notes={
                <Note n={5}>
                  Ukázková výzva na úvodní stránce: Junior Data Analyst pro Kvarta Labs hledá, proč noví uživatelé
                  odcházejí. Termín do 8 hodin, pět kroků od kickoffu po obhajobu a za odevzdanou práci se do profilu
                  přičtou dovednosti.
                </Note>
              }
            >
              <P>
                Žádné schvalování a žádný prostředník. Výzva má jasné zadání, termín a vítěze
                <Ref n={5} />.
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
          </Chapter>

          <Chapter index={3} summary="Wireframy cestou domů, klikací prototyp ve Figmě a první testy s lidmi z praxe.">
            <Row>
              <P>
                Cestou z Finska jsme začali kreslit wireframy. Za měsíc z nich byl ve Figmě klikací prototyp a hned
                jsme ho nosili lidem testovat.
              </P>
            </Row>
            <Row notes={<Note n={6}>Na risehigh.io to dnes říká hned první věta: Zahodili jsme nudné životopisy.</Note>}>
              <P>
                <B>HR specialisté a headhunteři</B> nám řekli, že CV jsou mrtvá a chtějí vidět dovednosti v akci.
                RiseHigh se tak posunul i směrem k náboru
                <Ref n={6} />.
              </P>
            </Row>
            <Row>
              <P>
                <B>Ředitelé a manažeři</B> testovali formulář pro zadání. Musel být dost podrobný pro studenty, ale
                nesměl zabrat hodinu vyplňování.
              </P>
            </Row>
          </Chapter>

          <Chapter index={4} summary="Měsíc a půl na to, aby z návrhů ve Figmě byla platforma, která vydrží první nápor.">
            <Row>
              <P>
                V srpnu zbyl z týmu na programování jen jeden člověk: já. Do semestru jsem měl měsíc a půl, abych
                z návrhů postavil platformu, kterou budou firmy plnit zadáními a která studentům nespadne při prvním
                náporu. Tři rozhodnutí, na kterých to stojí:
              </P>
            </Row>

            <div>
              <Row>
                <div className="grid gap-2 border-y border-white/[0.08] py-7 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <p className="font-medium text-white">Next.js</p>
                  <div>
                    <p className="text-[17px] text-white">Aby web našly vyhledávače.</p>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#a8a8a8]">
                      Čistý React vyhledávače často neprohledají, Next.js posílá hotové HTML. Frontend i API jsou
                      navíc v jedné codebase, takže odpadl samostatný server i řešení CORS.
                    </p>
                  </div>
                </div>
              </Row>
              <Row
                notes={
                  <Note n={7} label="Postgres, ne Firebase">
                    Data na sebe navazují:
                    <span className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[12px] text-neutral-300">
                      firma <ArrowRight className="h-3 w-3 text-neutral-500" /> výzva{" "}
                      <ArrowRight className="h-3 w-3 text-neutral-500" /> řešení{" "}
                      <ArrowLeft className="h-3 w-3 text-neutral-500" /> student
                    </span>
                  </Note>
                }
              >
                <div className="grid gap-2 border-b border-white/[0.08] py-7 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <p className="font-medium text-white">Supabase</p>
                  <div>
                    <p className="text-[17px] text-white">Relační data a práva přímo v databázi.</p>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#a8a8a8]">
                      Přihlášení i databáze jsou na jednom místě. Data jsou provázaná, proto relační Postgres
                      <Ref n={7} />. Kdo co smí vidět, hlídá sama databáze přes Row Level Security.
                    </p>
                  </div>
                </div>
              </Row>
              <Row>
                <div className="grid gap-2 border-b border-white/[0.08] py-7 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <p className="font-medium text-white">Tailwind</p>
                  <div>
                    <p className="text-[17px] text-white">Úpravy za chodu, bez rozbíjení.</p>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#a8a8a8]">
                      Sám si nemůžu dovolit přeskakovat mezi soubory se styly. Komponentu upravím na místě a nebojím
                      se, že rozbiju něco jinde.
                    </p>
                  </div>
                </div>
              </Row>
            </div>
          </Chapter>

          <Chapter index={5} summary="Studenti dodali, firma si nevybrala. Chyba nebyla v nich, ale v zadání.">
            <Row>
              <P>
                Jakmile byla venku první verze, uspořádali jsme <B>24hodinovou výzvu</B> v brněnském coworku
                INPROF. Zadání: nová identita pro startup <B>Sportrera</B>. Zavřeli jsme studenty na den do jedné
                místnosti a dívali se jim pod ruce, kde appka drhne a co jim chybí.
              </P>
            </Row>
            <Row
              notes={
                <Note n={8} label="Poučení">
                  Firma musí zadání promyslet a vymezit hranice dřív, než se začne tvořit. Zadání rozhoduje víc
                  než talent.
                </Note>
              }
            >
              <P>
                Studenti odvedli za 24 hodin skvělou práci, ale startup si nakonec žádný návrh nevybral. Zadání mělo
                slepá místa, která se pod časovým tlakem ukázala jako důležitá
                <Ref n={8} />.
              </P>
            </Row>
          </Chapter>

          <Chapter index={6} summary="Druhý pokus, tentokrát otevřeně a online. Sportrera má novou identitu.">
            <Row
              notes={
                <Note n={9}>
                  Mezi 32 přihlášenými byli studenti z VUT, MUNI i ostravské VŠB.
                </Note>
              }
            >
              <P>
                Sportreru jsme nevzdali. Výzvu jsme zopakovali, tentokrát otevřeně online: přes fakultní Instagramy,
                LinkedIn a Facebook a s promem přímo na fakultě. Přihlásilo se <B>32 studentů</B>
                <Ref n={9} /> a nebyli jen z VUT.
              </P>
            </Row>
            <Row>
              <P>
                Část studentů cestou odpadla, ale klient je s výsledkem spokojený a Sportrera má novou identitu. Pro
                nás je to potvrzení, že model funguje.
              </P>
            </Row>
          </Chapter>

          {/* Závěr */}
          <section aria-labelledby="zaver-nadpis" className="mt-32 border-t border-white/[0.08] pt-16 md:mt-44 md:pt-24">
            <Row
              notes={
                <Note label="DevLog">
                  Technické rozvahy, postupy a prototypy funkcí sdílím ještě předtím, než jdou do produkce.{" "}
                  <Link href="/devlog" className={`${linkClass} whitespace-nowrap`}>
                    Otevřít DevLog
                  </Link>
                </Note>
              }
            >
              <h2
                id="zaver-nadpis"
                className="text-[2.5rem] font-semibold leading-[1] tracking-[-0.04em] text-white text-balance md:text-6xl"
              >
                Stavíš vlastní produkt<span className="text-accent">?</span>
              </h2>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#b4b4b4] text-pretty">
                RiseHigh jsem vzal od návrhů ve Figmě až po platformu, na které běží skutečné výzvy. Jestli máš
                nápad, který potřebuje totéž, napiš mi pár vět a probereme ho.
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
                  href="https://risehigh.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  Otevřít risehigh.io
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
