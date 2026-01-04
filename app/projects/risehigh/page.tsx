"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Code2, Users, Rocket, AlertTriangle, Terminal, Target, Globe, Layers, Zap, GraduationCap } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";

export default function RiseHighPage() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-accent/30 overflow-x-hidden text-neutral-200 font-sans">
      
      <section className="relative flex flex-col pt-12 justify-end pb-24 px-6 md:px-12 border-b border-white/5">
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/0 via-neutral-950/80 to-neutral-950 z-10 pointer-events-none" />
        
        <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('/placeholder-hero.jpg')] bg-cover bg-center grayscale mix-blend-screen" /> 
        </div>

        <div className="relative z-20 max-w-6xl mx-auto w-full space-y-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Zpět na portfolio
          </Link>
          
          <div className="space-y-6">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-bold text-accent uppercase tracking-wide">VUT Startup</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9]">
               RiseHigh
             </h1>
             
             <p className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-4xl">
               Od studentské iniciativy k <span className="text-white font-medium">prvnímu startupu s majetkovým podílem VUT</span> v historii.
             </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l bg-neutral-950 border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5 bg-neutral-700 rounded-full" />
         
         <div className="space-y-8">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Kapitola 01</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">Podhoubí ESBD</h2>
            
            <div className="prose prose-xl prose-invert text-neutral-400 leading-relaxed">
               <p>
                  Studovat program <strong>ESBD (Entrepreneurship and Small Business Development)</strong> na VUT není pouze o sezení na přednáškách. 
                  Je to unikátní prostředí, kde nás jsme hodnoceni podle toho, jakou reálnou projekt založíme a jak se mu daří.
                  Potkali jsme tu neuvěřitelné množství talentovaných lidí, kteří všichni chtěli budovat a tvořit.
               </p>
               <h3 className="text-white font-bold mt-8 text-xl mb-4">Virtigo Digital</h3>
               <p>
                  Se spolužáky jsme založili marketingovou agenturu Virtigo Digital. Nebyl to úplný propadák, měli jsme pár úspěšných projektů a spokojené klienty. 
                  Dokázali jsme využít AI boom a rychle doručovat kvalitní práci a rychle škálovat.
               </p>
               <p>
                  Náš hlavní problém byl ale v <strong>akvizici klientů</strong>. Trávili jsme hodiny cold-callingem s mizernou konverzí. 
                  Když už jsme sehnali lead, byl to boj. Uvědomili jsme si, že agenturní model "honění klientů" nás brzdí a nebaví. 
                  Chtěli jsme tvořit produkt, ne jen prodávat hodiny. A tak jsme Virtigo se ctí ukončili.
               </p>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5 bg-neutral-700 rounded-full" />
         
         <div className="space-y-12">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Kapitola 02</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">Myšlenka VUT Hubu</h2>
            
            <div className="flex flex-col gap-8">
               <div className="prose prose-lg prose-invert text-neutral-400 leading-relaxed">
                    <p>
                        Viděli jsme kolem sebe spoustu talentů. Marketer hledal grafika, vývojář měl nápad, ale nerozuměl podnikání.
                        Potenciál byl obrovský, ale <strong>realita byla frustrující</strong>.
                    </p>
                    <p className="pt-2">
                        Problém je v tom, že univerzita funguje v bublinách. Fakulty jsou často jako izolované ostrovy. 
                        Není to tak, že bychom se nepotkávali vůbec – občas máte přednášku v jiné budově nebo se minete v kampusu. 
                    </p>
                    <p className="pt-2">
                        Ale ta <strong>reálná interakce je skoro nulový</strong>. Student z FITu a student z FP se sice fyzicky potkají, ale profesně se míjí. 
                        Neví o sobě. Neví, že ten člověk vedle nich má přesně ten skill, který jim chybí do týmu.
                    </p>
                    <p className="pt-2">
                        Napadlo nás to změnit. Vytvořit <strong>VUT Hub</strong> ,centrální aplikaci, která tyto bariéry zboří a propojí studenty napříč všemi fakultami pro zakládání startupů.
                    </p>
                    <p className="pt-2">
                     Začali jsme validovat, dělali rozhovory a nadšení bylo velké. Ale pak jsme narazili na realitu.
                     Zjistili jsme, že univerzita už něco podobného sama chystá.
                  </p>
                </div>  
               
               <div className="bg-neutral-900/50 p-8 rounded-3xl border border-white/5 space-y-3">
                  <AlertTriangle className="w-10 h-10 text-orange-500" />
                  <h3 className="text-xl font-bold text-white">Byrokratická past</h3>
                  <p className="text-neutral-400">
                     Naše první myšlenka byla se s VUT spojit a vytvořit tuto aplikaci společně.
                  </p>
                  <p className="text-neutral-400">
                     Ale ze všech stran,od mentorů i starších studentů,jsme slyšeli vždy to samé: 
                     <em>"Je to běh na dlouhou trať. Utopíte se v papírech. Schvalování trvá měsíce."</em>
                  </p>
                  <p className="text-neutral-400">
                     Jako studenti jsme potřebovali rychlost, ne razítka. S těžkým srdcem jsme VUT Hub zabili, abychom neztratili momentum.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5 bg-neutral-700 rounded-full" />
         
         <div className="space-y-8">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Kapitola 03</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">Lekce z Finska</h2>
            
            <div className="prose prose-xl prose-invert text-neutral-400 leading-relaxed">
               <p>
                  Celý náš program odjel na <strong>EuroWeek</strong> do Finska. Je to každoroční akce, kde se sjíždí partnerské fakulty z celé Evropy. 
                  Byla to obrovská příležitost networkovat s neuvěřitelně šikovnými studenty z celého světa a potkat spoustu inspirativních lidí na jednom místě.               </p>
               <p className="pt-2">
                  Dostali jsme za úkol řešit mezinárodní expanzi pro finskou <em>TIMI Academy</em>. Tým jsme měli skvělý, ale proces byl peklo. 
                  Ne kvůli byrokracii, ale kvůli <strong>komunikačnímu šumu</strong>.
               </p>
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10 my-8">
                  <h4 className="text-white font-bold mb-2">Problém zadání</h4>
                  <p className="text-sm">
                     Bylo tam několik zástupců klienta a každý říkal něco jiného. Zadání bylo vágní. Když jsme se ptali na detaily, dostávali jsme protichůdné odpovědi. 
                     Výsledek? Frustrace. Nevěděli jsme, co vlastně máme doručit.
                  </p>
               </div>
               <p>
                  Tam se zrodila myšlenka pro RiseHigh. Vzpomněli jsme si na akce kterých jsme se jako studenti ESBD účastnili (Panoris, MOUKA), kde firmy přišly s jasným problémem přímo za studenty. 
                  Chtěli jsme vytvořit platformu, která tento proces standardizuje. Kde je zadání jasné, strukturované,bez šumu a hlavně dostupné pro všechny.
               </p>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto bg-linear-to-b from-neutral-950 to-neutral-900/20 border-l border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5  rounded-full" />
         
         <div className="space-y-8">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Kapitola 04</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">Protoyp</h2>
            
            <div className="prose prose-xl prose-invert text-neutral-400 leading-relaxed">
               <p>
                  Po návratu z Finska jsme nezačali hned kódovat. Věděli jsme, že musíme náš nápad vyzkoušet. 
                  Dva měsíce jsme strávili designováním aplikace ve Figmě a postupně jsme vytvořili klikatelný prototyp.
               </p>
               <p>
                  Validovali jsme to ze všech stran:
               </p>
               <ul className="list-none space-y-4 pt-8 pl-0">
                    <li className="flex items-start gap-3">
                        <Users className="w-6 h-6 text-accent shrink-0 mt-1" />
                        <span><strong>HR Specialisté & Headhunteři:</strong> Potvrdili nám, že CVčka jsou mrtvá. Chtějí vidět skills v akci. RiseHigh se tak posunul z "platformy na projekty" na "Hiring Tool".</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Target className="w-6 h-6 text-accent shrink-0 mt-1" />
                        <span><strong>CEOs & Manažeři:</strong> S nimi jsme ladili formuláře pro zadání výzvy. Hledali jsme balanc mezi "chceme detailní zadání pro studenty" a "nechceme strávit hodinu vyplňováním".</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <GraduationCap className="w-6 h-6 text-accent shrink-0 mt-1" />
                        <span><strong>Studenti:</strong> Sledovali jsme, jak reálně prochází onboardingem a kde se zasekávají. Zjišťovali jsme, jaké funkce jim v aplikaci chybí, aby se cítili komfortně při odevzdávání řešení.</span>
                    </li>
                </ul>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-neutral-900/20">
         <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-6 text-center max-w-3xl mx-auto">
               <span className="text-sm font-bold uppercase tracking-widest text-accent">Kapitola 05</span>
               <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">Vývojářské léto</h2>
               <p className="text-lg text-neutral-400">
                  Přišly prázdniny. Zatímco ostatní řešili dovolené, já měl před sebou jasný cíl: Do září musíme mít MVP.
                  Jako jediný developer jsem musel volit technologie chytře.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
               <div className="space-y-8">
                  <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-neutral-400" /> Next.js vs. Čistý React
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                    React byl základ, ale pro veřejnou platformu čisté SPA (Single Page App) nestačilo.
                    Zvolil jsem <strong>Next.js</strong> kvůli <strong>Server-Side Renderingu (SSR)</strong>. Bylo kritické, aby Google indexoval jednotlivé výzvy a studenti je našli organicky – to u klasického Reactu drhne.
                    <p className="pt-2">Navíc mi <strong>App Router</strong> umožnil psát backend logiku přímo vedle frontendu, což mi jako solo vývojáři ušetřilo týdny nastavování infrastruktury.</p>
                    </p>
                </div>

                  <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-neutral-400" /> Supabase vs. Firebase
                    </h3>
                    <div className="text-neutral-400 text-sm leading-relaxed space-y-3">
                    <p>
                        Jako primárně <strong>Frontend vývojář</strong> jsem nechtěl trávit týdny stavěním vlastního serveru. Hledal jsem "Backend-as-a-Service", abych neztratil rychlost.
                        Firebase byla první volba, ale pro tento typ projektu to byla past.
                    </p>
                    <p>
                        Firebase je NoSQL, což je skvělé pro chaty, ale peklo pro naše strukturovaná data (Firma {'->'} Výzva {'->'} Řešení {'->'} Hodnocení).
                        Musel bych data duplikovat nebo dělat složité dotazy.
                        <strong>Supabase</strong> byla jasná volba – dala mi sílu relačního <strong>PostgreSQL</strong> (Foreign Keys, Joins) zabalenou do jednoduchého API, které jsem ovládl za odpoledne.
                    </p>
                    </div>
                </div>

                  <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-colors">
                     <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" /> AI jako Tool, ne autor
                     </h3>
                     <p className="text-neutral-400 text-sm leading-relaxed">
                        Nebýt AI, dělám to doteď. Ale nebyl to "Vibe coding". 
                        AI mi psalo boilerplate kód, ale logiku a architekturu jsem držel pevně v rukou. 
                        Díky tomu jsem stihl celou appku za měsíc čistého času.
                     </p>
                  </div>
               </div>

               <div className="space-y-6 text-neutral-400 leading-relaxed">
                  <p>
                     Vývoj nebyl jen o psaní kódu. Bylo to neustálé testování. Hned jak něco fungovalo, šlo to na test uživatelům.
                  </p>
                  <p>
                     Například registrace. Já jako dev jsem ji projel za 10 sekund. 
                     Ale když jsem viděl reálného uživatele, jak překlikl do jiného okna pro heslo a celý formulář se mu vymazal (protože jsem neřešil persistenci state), věděl jsem, že mám co opravovat.
                  </p>
                  <div className="aspect-video bg-neutral-950 rounded-xl border border-white/5 relative overflow-hidden mt-8">
                      <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-neutral-600 font-mono text-sm">
                        [FOTO: Ideálně screenshot z VS Code nebo Git commit graf z léta]
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5 bg-neutral-700 rounded-full" />
         
         <div className="space-y-8">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Kapitola 06</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">24 hodin v Inprofu</h2>
            
            <div className="prose prose-xl prose-invert text-neutral-400 leading-relaxed">
               <p>
                  První ostrý test. Zorganizovali jsme <strong>24-hours challenge</strong> na půdě školy.
                  Reálný klient: startup <em>Sportrera</em>. Zadání: Kompletní rebrand.
               </p>
               <p>
                  Studenti byli zavření 24 hodin v našem coworku (Inprof) a makali. Pro nás to byla ta nejintenzivnější focus group.
                  Viděli jsme naživo, jak bojují s UI, kde se ztrácí v zadání, co jim chybí. Tyhle insighty byly k nezaplacení.
               </p>
               <p>
                  <strong>Výsledek?</strong> Energie byla skvělá, Sportrera dostala spoustu nápadů, ale... co se týče loga, nevybrali si. 
                  Styl studentů jim nesedl. Pro někoho neúspěch, pro nás příležitost.
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
               {[1, 2, 3].map((i) => (
                   <div key={i} className="aspect-video bg-neutral-900 rounded-xl border border-white/5 relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-neutral-600 font-mono text-xs">
                           [FOTO: 24h Challenge - Studenti/Prezentace]
                       </div>
                   </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l border-white/10 ml-6 md:ml-auto md:mr-auto pl-8 md:pl-12 relative">
         <span className="absolute -left-[5px] top-32 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
         
         <div className="space-y-12">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">Kapitola 07</span>
            <h2 className="text-4xl md:text-6xl pt-2 font-bold text-white">První Open Challenge & Vstup VUT</h2>
            
            <div className="prose prose-xl prose-invert text-neutral-400 leading-relaxed">
               <p>
                  Sporteru jsme nenechali ve štychu. Domluvili jsme se že výzu výtvoříme znova a tentokrát ve velkém.
                  Otevřeli jsme výzvu plošně pro všechny studenty online. Měli jsme 3 týdny na to, abychom výzvu dostali do povědomí studentů.
               </p>
               <p className="pt-2">
                  V tu chvíli přišel klíčový moment. Šli jsme za vedením VUT (přesněji za Contributem). 
                  Už ne jako studenti s nápadem, ale jako startup s funkční platformou a trakcí.
               </p>
               <div className="bg-neutral-900/80 p-8 rounded-3xl border border-white/10 shadow-2xl my-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Partnerství, ne boj</h3>
                  <p>
                     Dohodli jsme se. <strong>VUT se stalo naším společníkem s majetkovým podílem.</strong>
                     To nám okamžitě rozvázalo ruce. Mohli jsme sdílet výzvu Sportrery na oficiálních kanálech fakulty.
                  </p>
                  <p className="mt-4 text-white font-medium">
                     Výsledek? 30 odevzdaných designů během pár dní. Kvalita šla strmě nahoru.
                  </p>
               </div>
               <p>
                  Teď jsme ve fázi hodnocení. Ale už teď víme, že model funguje. Studenti mají praxi, firmy mají řešení a my máme platformu, která to celé pohání.
               </p>
            </div>
         </div>
      </section>

      <section className="py-24 bg-accent text-white text-center px-6">
         <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Tohle je teprve začátek</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
               RiseHigh teď jede na plné obrátky. Pokud tě zajímá technické pozadí, byznys model, nebo chceš vidět kód – napiš mi.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                 <MagneticButton 
                    onClick={() => window.open('https://risehigh.io', '_blank')}
                    className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                 >
                    Kouknout na web
                 </MagneticButton>
                 <MagneticButton 
                    onClick={() => window.location.href = "mailto:zdenekk.ferenc@gmail.com"}
                    className="bg-black/20 border border-black/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-black/30 transition-colors"
                 >
                    Pokecat o projektu
                 </MagneticButton>
            </div>
         </div>
      </section>

    </main>
  );
}