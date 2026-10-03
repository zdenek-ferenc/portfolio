"use client";

import Link from "next/link";
import { 
  ArrowLeft, Users, Target, Globe, Layers, Zap, 
  GraduationCap, Building2, Lightbulb, Trophy, 
  ArrowUpRight, Star, Terminal, ArrowRight
} from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card-risehigh";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function RiseHighPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-accent/30 overflow-x-hidden text-neutral-200 font-sans">
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-orange-500/[0.04] blur-[180px] rounded-full pointer-events-none -z-10" />

      <section className="relative flex flex-col pt-6 md:pt-12 justify-end pb-12 md:pb-22 px-6 md:px-12 border-b border-white/[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505] z-10 pointer-events-none" />
        
        <div className="relative z-20 max-w-6xl mx-auto w-full space-y-8 md:space-y-16">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#projects" className="inline-flex items-center gap-2.5 text-neutral-500 hover:text-white transition-all group w-fit text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium tracking-wide">Zpět na portfolio</span>
            </Link>
          </motion.div>
          
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
             <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-accent/5 border border-accent/15 backdrop-blur-md rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">VUT Startup</span>
             </motion.div>
             
             <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.85]">
               RiseHigh
             </motion.h1>
             
             <motion.p variants={fadeUp} className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-4xl">
               Od studentského nápadu k platformě, kde studenti řeší <span className="text-white font-medium">zadání skutečných firem.</span>
             </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className="absolute md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-neutral-800 to-transparent hidden md:block" />
        {/* 1: PŘED RISEHIGHEM */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-600 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Než vznikl RiseHigh</h2>
          </div>

          <div className="md:col-span-8">
            <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
              <p>
                Na VUT studujeme program <strong className="text-white">ESBD</strong> (Entrepreneurship and Small Business Development), kde nás hodnotí podle toho, jaký reálný projekt založíme a jak se mu daří.
                Se spolužáky jsme proto rozjeli marketingovou agenturu <strong className="text-white">Virtigo Digital</strong>.
                Zkušeností jsme měli málo, ale využili jsme tehdejší AI boom, našli si spokojené klienty a dodávali slušnou práci.
              </p>
              <p>
                Nejhůř nám šlo shánění zakázek. Trávili jsme hodiny cold-callingem a konverze byla mizerná. Došlo nám, že nás klasický agenturní model nebaví, a Virtigo jsme ukončili.
              </p>
              <p>
                Pak jsme chtěli řešit něco, co jsme zažívali sami. Student z FIT a student z FP se potkají maximálně v menze a o sobě nevědí. 
                Nápad na <strong className="text-white">VUT Hub</strong>, aplikaci, která by je propojila, nadchl lidi, se kterými jsme mluvili. 
                Zapojit univerzitu ale znamenalo čekat na schvalování, a my jsme chtěli hned testovat. Koncept jsme proto zastavili ještě před startem.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 2: FINSKO */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute z-10 left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="absolute -top-10 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="md:col-span-4 space-y-4 relative">
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Zlom ve Finsku</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
               <p>
                  Celý náš program odjel na <strong>EuroWeek</strong> do Finska. Dostali jsme zadání od finské TIMI Academy, která chtěla expandovat. 
                  Tým byl skvělý a mezinárodní, jenže zadání bylo chaotické a nikdo přesně nevěděl, co má doručit.
               </p>
             </div>

             <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] max-w-3xl my-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <p className="text-white text-base md:text-2xl font-semibold leading-snug m-0">
                   „Za jeden týden se skutečným problémem skutečné firmy jsme se naučili víc než za celý semestr nad vymyšlenými případovkami.“
                </p>
             </div>

             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
               <p>
                  Tam nám došlo, kde je mezera. Firmy chtějí nový pohled a talenty, studenti praxi, a oboje se dá propojit.
               </p>
               
               <div className="grid md:grid-cols-2 gap-5 mt-8 not-prose">
                  <SpotlightCard className="p-5 md:p-6 items-start text-left bg-neutral-900/20">
                     <Building2 className="w-6 h-6 text-accent/80 mb-1 md:mb-3" />
                     <h4 className="text-lg font-bold text-white mb-1 md:mb-2">Co z toho mají firmy</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">
                        Nový pohled zvenku a možnost najít zajímavé talenty ještě před koncem školy.
                     </p>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 md:p-6 items-start text-left bg-neutral-900/20">
                     <GraduationCap className="w-6 h-6 text-accent/80 mb-1 md:mb-3" />
                     <h4 className="text-lg font-bold text-white mb-1 md:mb-2">Co z toho mají studenti</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">
                        Praxi na skutečném zadání a práci do portfolia, ne jen prázdné CV.
                     </p>
                  </SpotlightCard>
               </div>
             </div>
          </div>
        </motion.section>

        {/* 3: JAK FUNGUJE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-accent/80 rounded-full hidden md:block" />

          <div className="space-y-12 text-center max-w-4xl mx-auto">
             <div className="space-y-4">
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">Jak RiseHigh funguje</h2>
               <p className="text-neutral-400 max-w-xl mx-auto text-base">
                 Žádné schvalování a žádný prostředník. Firma zadá, studenti řeší, nejlepší řešení vyhraje.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-16 text-left">
                {[
                  { icon: Target, title: "Zadání", p: "Firma vytvoří skutečnou výzvu, třeba logo, business plán nebo redesign UX.", color: "text-white" },
                  { icon: Lightbulb, title: "Řešení", p: "Studenti nebo celé týmy zpracují řešení a odešlou ho.", color: "text-white" },
                  { icon: Trophy, title: "Výsledek", p: "Vyhraje nejlepší řešení. Firma dostane nápad i talent, student referenci.", color: "text-accent" }
                ].map((step, i) => (
                  <SpotlightCard key={i} className={`p-4 md:p-8 bg-neutral-900/10 flex flex-col items-center text-left md:text-center !gap-2 space-y-4 group h-full ${i === 2 ? 'border-accent/10 bg-accent/[0.01]' : ''}`}>
                     <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-2 border border-white/5 ${i === 2 ? 'bg-accent/10 border-accent/20' : ''}`}>
                        <step.icon className={`w-6 h-6 ${step.color}`} />
                     </div>
                     <h4 className={`text-lg font-bold ${step.color}`}>{step.title}</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">{step.p}</p>
                  </SpotlightCard>
                ))}
             </div>
          </div>
        </motion.section>

        {/* 4: PROTOTYP */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Prototyp a první testy</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Cestou z Finska jsme začali kreslit wireframy. Za měsíc ve Figmě z nich byl klikací prototyp, který jsme hned nosili lidem k testování.
                </p>
                <ul className="list-none space-y-4 pt-6 pl-0 not-prose">
                     <li className="flex items-start gap-4 p-5 bg-neutral-900/30 rounded-2xl border border-white/[0.03]">
                         <Users className="w-5 h-5 text-accent shrink-0 mt-1" />
                         <span className="text-sm text-neutral-400"><strong>HR specialisté a headhunteři</strong> nám řekli, že CV jsou mrtvá a chtějí vidět dovednosti v akci. RiseHigh se tak posunul i směrem k nástroji pro nábor.</span>
                     </li>
                     <li className="flex items-start gap-4 p-5 bg-neutral-900/30 rounded-2xl border border-white/[0.03]">
                         <Target className="w-5 h-5 text-accent shrink-0 mt-1" />
                         <span className="text-sm text-neutral-400"><strong>Ředitelé a manažeři</strong> testovali zadávací formulář. Musel být dost podrobný pro studenty, a přitom nesměl zabrat hodinu vyplňování.</span>
                     </li>
                </ul>
             </div>
          </div>
        </motion.section>

      </div>

      {/* CHAPTER 06: DEV SUMMER - FULL WIDTH HIGHLIGHT */}
      <section className="py-12 px-6 md:px-12 bg-[#080808] border-y border-white/[0.02] relative overflow-hidden">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />
         
         <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="max-w-6xl mx-auto space-y-12 relative z-10">
            <div className="grid md:grid-cols-12 gap-10 items-start">
               <div className="md:col-span-5 space-y-5">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">Léto s kódem</h2>
                  <div className="space-y-4">
                    <p className="text-neutral-400 leading-relaxed">
                      V srpnu zbyl z týmu na programování jen jeden člověk, já. Do dalšího semestru jsem měl za měsíc a půl postavit z návrhů ve Figmě platformu, kterou budou firmy plnit zadáními a která studentům nespadne při prvním náporu.
                    </p>
                  </div>
               </div>

               <div className="md:col-span-7 grid gap-5">
                  {[
                    { 
                      icon: Globe, 
                      title: "Next.js: aby web našly vyhledávače", 
                      desc: "Klasický React by vyhledávače často neprohledaly, Next.js posílá hotové HTML. Frontend i API navíc leží v jedné codebase, takže jsem nemusel řešit samostatný server ani CORS.", 
                      style: "hover:border-white/10" 
                    },
                    { 
                      icon: Layers, 
                      title: "Supabase: relační data a práva v databázi", 
                      desc: "Jako frontend vývojář jsem ocenil, že Auth i databáze jsou na jednom místě. Data jsou provázaná (firma, výzva, student), proto jsem zvolil relační Postgres místo Firebase. Práva hlídá přímo databáze přes Row Level Security.", 
                      style: "hover:border-white/10" 
                    },
                    { 
                      icon: Zap, 
                      title: "Tailwind: úpravy bez rozbíjení", 
                      desc: "Sám si nemůžu dovolit přepínat mezi soubory se styly. S Tailwindem upravuju komponenty za chodu a nemusím se bát, že rozbiju něco jinde.", 
                      style: "hover:border-white/10" 
                    }
                  ].map((card, i) => (
                     <SpotlightCard key={i} className={`p-6 bg-neutral-900/20 border border-white/5 flex flex-row items-start gap-4 transition-all duration-300 ${card.style}`}>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                           <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                           <p className="text-sm text-neutral-400 leading-relaxed">{card.desc}</p>
                        </div>
                     </SpotlightCard>
                  ))}
               </div>
            </div>
         </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className="absolute md:left-12 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block" />

        {/* 6: 24H INPROF */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">24 hodin v Inprofu</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                   Jakmile byla venku první verze, uspořádali jsme <strong>24hodinovou výzvu</strong> v brněnském coworku INPROF. Zadání: redesign identity pro startup Sportrera.
                   Zavřeli jsme studenty na den do jedné místnosti a koukali jim pod ruce, kde appka drhne a co jim chybí.
                </p>
                
                <div className="bg-neutral-900/40 border border-white/5 p-6 md:p-8 rounded-2xl my-6">
                   <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                     <Lightbulb className="w-4 h-4 text-accent" />
                     Co jsme se naučili: zadání rozhoduje
                   </h4>
                   <p className="text-sm md:text-base leading-relaxed m-0 text-neutral-400">
                     Studenti odvedli za 24 hodin skvělou práci, ale startup si návrh nakonec nevybral. Zadání mělo slepá místa, která se v časovém tlaku ukázala jako důležitá. Firmy proto musí zadání promyslet a vymezit hranice dřív, než se začne tvořit.
                   </p>
                </div>
             </div>
          </div>
        </motion.section>

        {/* 7: OPEN CHALLENGE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start pb-32"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-accent rounded-full hidden md:block" />

          <div className="md:col-span-4 space-y-4 relative">
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">První otevřená výzva</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Sportreru jsme to nenechali. Výzvu jsme zopakovali, tentokrát otevřeně online, přes fakultní Instagramy, LinkedIn a Facebook, a přidali promo přímo na fakultě.
                  Přihlásilo se <strong>32 studentů</strong> a nebyli jen z VUT, od <strong>MUNI</strong> až po ostravskou <strong>VŠB</strong>.
                </p>
             </div>

             <div className="flex flex-col md:flex-row gap-5 items-stretch max-w-3xl">
                <SpotlightCard className="p-6 bg-accent/[0.03] border border-accent/10 flex flex-col justify-center text-left space-y-1 flex-1">
                   <p className="text-accent text-3xl font-black font-mono">32</p>
                   <p className="text-white font-bold text-sm">přihlášených do výzvy</p>
                </SpotlightCard>
                
                <SpotlightCard className="p-6 bg-neutral-900/30 border border-white/[0.03] flex flex-col justify-center text-left flex-[2]">
                   <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                     <Star className="w-4 h-4 text-accent" /> 
                     Sportrera má novou identitu
                   </p>
                   <p className="text-xs text-neutral-400 leading-relaxed">
                     Část studentů sice odpadla, ale klient je s výsledkem spokojený. Pro nás je to potvrzení, že model funguje.
                   </p>
                </SpotlightCard>
             </div>
          </div>
        </motion.section>
      </div>

      {/* DEVLOG CTA BANNER */}
      <div className="max-w-4xl mx-auto px-6 pb-12 relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 30, scale: 0.98 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="relative group p-8 md:p-12 rounded-3xl bg-linear-to-b from-neutral-950 to-[#030303] border border-white/[0.04] backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
         >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/[0.06] blur-3xl rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.03] blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="space-y-4 max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
               <div className="p-2 w-fit bg-accent/[0.08] rounded-xl border border-accent/20 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-accent" />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Zákulisí a plány</h3>
               <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                  Na <strong className="text-white">DevLogu</strong> sdílím technické rozvahy, postupy a prototypy funkcí ještě předtím, než se dostanou do produkce.
               </p>
            </div>

            <div className="shrink-0">
               <Link href="/devlog" className="group/btn relative px-6 py-3.5 bg-white text-black rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-lg hover:shadow-white/[0.12] hover:scale-[1.02]">
                  <span className="relative z-10">Otevřít DevLog</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
               </Link>
            </div>
         </motion.div>
      </div>

      <section className="py-28 bg-[#020202] border-t border-white/[0.02] text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_accent_0%,_transparent_70%) opacity-[0.03] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">Chceš to probrat?</h2>
            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
               Ozvi se, pokud tě zajímá vývoj platformy, byznys kolem ní, nebo chceš probrat vlastní nápad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                 <button 
                    onClick={() => window.open('https://risehigh.io', '_blank')}
                    className="cursor-pointer bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-95 active:scale-90 transition-all shadow-xl flex items-center justify-center gap-2 group"
                 >
                    Web RiseHigh 
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                 </button>
                 
                 <button 
                    onClick={() => window.location.href = "/?contact=true#about-me"}
                    className="cursor-pointer bg-neutral-900 border border-white/10 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                 >
                    Probrat projekt
                 </button>
            </div>
         </div>
      </section>

    </main>
  );
}