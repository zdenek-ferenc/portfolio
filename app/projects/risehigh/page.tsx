"use client";

import Link from "next/link";
import { 
  ArrowLeft, Users, AlertTriangle, Target, Globe, Layers, Zap, 
  GraduationCap, Building2, Lightbulb, Trophy, 
  ArrowUpRight, Star, Sparkles
} from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import SpotlightCard from "@/components/ui/spotlight-card";
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
      
      {/* BACKGROUND GLOBAL EFFECTS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-orange-500/[0.04] blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative flex flex-col pt-12 justify-end pb-32 px-6 md:px-12 border-b border-white/[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505] z-10 pointer-events-none" />
        
        <div className="relative z-20 max-w-6xl mx-auto w-full space-y-16">
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
             
             <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85]">
               RiseHigh
             </motion.h1>
             
             <motion.p variants={fadeUp} className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-3xl">
               Od studentské iniciativy k <span className="text-white font-medium">prvnímu startupu s majetkovým podílem VUT</span> v historii.
             </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        {/* CENTER TIMELINE LINE (Dotted and faint) */}
        <div className="absolute md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-neutral-800 to-transparent hidden md:block" />

        {/* CHAPTER 01: PODHOUBÍ ESBD */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-600 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
            <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">01</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Kapitola 01</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Podhoubí ESBD</h2>
          </div>

          <div className="md:col-span-8">
            <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
              <p>
                Studovat program <strong className="text-white">ESBD (Entrepreneurship and Small Business Development)</strong> na VUT není pouze o sezení na přednáškách. 
                Je to unikátní prostředí, kde nás hodnotí podle toho, jaký reálný projekt založíme a jak se mu daří.
                Potkali jsme tu spoustu schopných lidí, kteří místo řečí rovnou stavěli vlastní projekty.
              </p>
              
              <h3 className="text-white font-bold mt-12 text-2xl mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-accent" />
                Virtigo Digital
              </h3>
              
              <p>
                Se spolužáky jsme založili marketingovou agenturu Virtigo Digital. 
                Sice s <strong className="text-white">minimem zkušeností a praxe</strong>, ale s obrovským nasazením jsme vstoupili do extrémně saturovaného prostředí marketingu. 
              </p>
              <p>
                Nakonec to nebyl vůbec propadák. Dokázali jsme využít tehdejší AI boom, našli si spokojené klienty a dodávali slušnou práci. 
                Ale náš hlavní problém byl v <strong className="text-white">akvizici</strong>. Trávili jsme hodiny cold-callingem s mizernou konverzí. 
                Uvědomili jsme si, že klasický agenturní model nás dlouhodobě nebaví a limituje, chtěli jsme vybudovat něco vlastního. 
                Virtigo jsme se ctí ukončili a hledali něco s větším přesahem.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CHAPTER 02: MYŠLENKA VUT HUBU */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">02</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Kapitola 02</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Myšlenka VUT Hubu</h2>
          </div>

          <div className="md:col-span-8 flex flex-col gap-10">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                    Chtěli jsme řešit problém, který jsme sami pociťovali. Univerzity a fakulty často fungují jako izolované ostrovy.
                    Student z FITu (programátor) a student z FP (byznys) se fyzicky občas potkají v menze, ale profesně o sobě vůbec neví. 
                    Není tu snadný způsob, jak najít parťáka do startupu.
                </p>
                <p>
                    Napadlo nás proto vytvořit <strong className="text-white">VUT Hub</strong> – centrální aplikaci, která bariéry zboří a napřímo propojí studenty.
                    Dělali jsme rozhovory, validovali nápady a nadšení bylo obrovské. 
                    Jenže pak jsme narazili na neprostupnou zeď formálního školství.
                </p>
             </div>  
             
             <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group max-w-3xl">
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                         <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Byrokratická past</h4>
                   </div>
                   <p className="text-neutral-400 text-lg leading-relaxed">
                      Věděli jsme, že pro úspěch projektu musí být VUT nějak zapojené. Ale ze všech stran jsme dostávali varování – fakulta v těchto věcech funguje zkrátka jako klasický úřad. Všechno trvá dlouho, schvalování jde přes několik lidí a byrokracie má přednost před rychlostí.
                   </p>
                   <p className="text-neutral-400 text-lg leading-relaxed pt-2">
                      Pro nás studenty, kteří chtěli okamžitě tvořit a stavět, to v tu chvíli představovalo <strong>obrovský risk</strong>. S těžkým srdcem jsme VUT Hub raději zařízli dřív, než vůbec začal, abychom neztratili cenné momentum.
                   </p>
                </div>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 03: PIVOT VE FINSKU */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute z-10 left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="absolute -top-10 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">03</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Kapitola 03</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Pivot ve Finsku</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
               <p>
                  Zlomový moment přišel, když celý náš program odjel na <strong>EuroWeek</strong> do Finska. 
                  Dostali jsme za úkol řešit cizí zadání – expanzi pro finskou TIMI Academy. 
               </p>
               <p>
                  Měli jsme skvělý mezinárodní tým, ale naprosto tragické zadání od klienta plné komunikačního šumu. Frustrace rostla, nikdo přesně nevěděl, co má doručit. 
               </p>
             </div>

             <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] max-w-3xl my-6 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <p className="text-white text-xl md:text-2xl font-black leading-snug m-0">
                   &quot;Za jeden jediný týden řešení <span className="text-accent underline decoration-accent/20 underline-offset-4">opravdového problému</span> reálné firmy jsme se naučili stokrát více, než za celý semestr na přednáškách nad fiktivními případovkami.&quot;
                </p>
             </div>

             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
               <p>
                  Tam to vzniklo. Uvědomili jsme si krutou realitu vzdělávacího systému i trhu práce.
                  Našli jsme <strong>Unique Value Proposition (UVP)</strong>, které dává dokonalý smysl oběma stranám.
               </p>
               
               <div className="grid md:grid-cols-2 gap-5 mt-8 not-prose">
                  <SpotlightCard className="p-6 items-start text-left bg-neutral-900/20">
                     <Building2 className="w-6 h-6 text-accent/80 mb-3" />
                     <h4 className="text-lg font-bold text-white mb-2">Přínos pro Firmy</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">
                        Firmy prahnou po inovacích. Od studentů získají &quot;fresh&quot; nezatížený nadhled a hlavně možnost odchytit zajímavé mladé talenty přímo u zdroje.
                     </p>
                  </SpotlightCard>
                  <SpotlightCard className="p-6 items-start text-left bg-neutral-900/20">
                     <GraduationCap className="w-6 h-6 text-accent/80 mb-3" />
                     <h4 className="text-lg font-bold text-white mb-2">Přínos pro Studenty</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">
                        Končit školu s prázdným CV nestačí. Studenti nutně potřebují budovat reálnou praxi na ostro a vytvořit si špičkové portfolio.
                     </p>
                  </SpotlightCard>
               </div>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 04: THE CONCEPT */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-accent/80 rounded-full hidden md:block animate-pulse shadow-[0_0_12px_rgba(207,47,49,1)]" />

          <div className="space-y-12 text-center max-w-4xl mx-auto">
             <div className="space-y-4">
               <span className="text-9xl font-black text-white/[0.01] absolute top-12 left-1/2 -translate-x-1/2 tracking-tighter select-none pointer-events-none">04</span>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Kapitola 04</span>
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">Konečná myšlenka RiseHigh</h2>
               <p className="text-neutral-400 max-w-xl mx-auto text-base">
                 Koncept bez drahého schvalování. RiseHigh propojuje bez tření dva světy přes platformu, která funguje následovně:
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                {[
                  { icon: Target, title: "1. Zadání", p: "Firma vytvoří reálnou Challenge (logo, business plán, UX re-design).", color: "text-white" },
                  { icon: Lightbulb, title: "2. Tvorba", p: "Studenti (či celé týmy) zapracují na řešení a odešlou své nápady.", color: "text-white" },
                  { icon: Trophy, title: "3. Win-Win", p: "Nejlepší řešení vyhrává. Firma má nápad a talent, student má super referenci.", color: "text-accent" }
                ].map((step, i) => (
                  <SpotlightCard key={i} className={`p-8 bg-neutral-900/10 flex flex-col items-center text-center space-y-4 group h-full ${i === 2 ? 'border-accent/10 bg-accent/[0.01]' : ''}`}>
                     <div className={`w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center mb-2 border border-white/5 ${i === 2 ? 'bg-accent/10 border-accent/20' : ''}`}>
                        <step.icon className={`w-6 h-6 ${step.color}`} />
                     </div>
                     <h4 className={`text-lg font-bold ${step.color}`}>{step.title}</h4>
                     <p className="text-sm text-neutral-500 leading-relaxed">{step.p}</p>
                  </SpotlightCard>
                ))}
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 05: PROTOTYPE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">05</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Kapitola 05</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Prototyping & Validace</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Cestou z Finska jsme začali kreslit první drátěnky. Dva měsíce jsme strávili designováním aplikace ve Figmě a postupně vytvořili klikatelný prototyp. 
                  Běhali jsme s tím ze všech stran – nebyl to projekt k odevzdání dál, ale k testování.
                </p>
                <ul className="list-none space-y-4 pt-6 pl-0 not-prose">
                     <li className="flex items-start gap-4 p-5 bg-neutral-900/30 rounded-2xl border border-white/[0.03]">
                         <Users className="w-5 h-5 text-accent shrink-0 mt-1" />
                         <span className="text-sm text-neutral-400"><strong>HR Specialisté & Headhunteři:</strong> Potvrdili nám, že CVčka jsou mrtvá. Chtějí skills v akci. RiseHigh se tak posunul z „platformy na projekty“ i na krystalický Hiring Tool.</span>
                     </li>
                     <li className="flex items-start gap-4 p-5 bg-neutral-900/30 rounded-2xl border border-white/[0.03]">
                         <Target className="w-5 h-5 text-accent shrink-0 mt-1" />
                         <span className="text-sm text-neutral-400"><strong>CEOs & Manažeři:</strong> Testovali jsme formulář pro zadání. Přijít na balanc mezi „zadat detailně pro studenty“ a „nezabít tím hodinu vyplňování“ byl klíčový krotitel designu.</span>
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
               {/* Left Description Column */}
               <div className="md:col-span-5 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 block">Kapitola 06</span>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-none bg-linear-to-b from-white to-neutral-500 bg-clip-text">Vývojářské léto</h2>
                  <p className="text-neutral-400 font-light leading-relaxed">
                     Září byl fixed-deadline pro launch MVP. Bez rozpočtu, s nulovým týmem developerů. Volba robustního a agilního stacku byla čistá pragmatika pro doručení.
                  </p>
               </div>

               {/* Right Features Column */}
               <div className="md:col-span-7 grid gap-4">
                  {[
                    { icon: Globe, title: "Next.js nad React", desc: "Pure React SPA by selhalo na indexaci. Musíme mít SEO pro výzvy nahoře na Google. App router dodal i backend logiku pro solo-dev.", style: "hover:border-white/10" },
                    { icon: Layers, title: "Supabase Relational", desc: "NoSQL Firebase pro strukturu (Firma -> Challenge -> Řešení) je past na dotazy. Supabase a relační Postgres mi ušetřil tuny utrpení.", style: "hover:border-emerald-500/10" },
                    { icon: Zap, title: "AI pro Boilerplate", desc: "AI za mě nepsala architekturu, ale dělala nekonečný UI kód z nákresů. Reálně to urychlilo launch o dobrý měsíc práce.", style: "hover:border-orange-500/10" }
                  ].map((card, i) => (
                     <SpotlightCard key={i} className={`p-6 bg-neutral-900/20 border border-white/5 flex flex-row items-start gap-4 transition-all duration-300 ${card.style}`}>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                           <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                           <p className="text-xs text-neutral-500 leading-relaxed">{card.desc}</p>
                        </div>
                     </SpotlightCard>
                  ))}
               </div>
            </div>
         </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className="absolute md:left-12 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block" />

        {/* CHAPTER 07: 24H INPROF */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">07</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Kapitola 07</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Křest ohněm: 24h v Inprofu</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                   MVP jsme měli venku a přišel okamžik pravdy. Zorganizovali jsme naši obří <strong>24-hours challenge</strong> na půdě brněnského coworku INPROF pro reálného klienta, startup Sportrera, který žádal kompletní redesign identity.
                </p>
                <p>
                   Zavřeli jsme studenty na 24 hodin do jedné místnosti a nechali je makat. 
                   Byla to ta nejdrsnější a nejužitečnější focus group, jakou jsme mohli mít. 
                   Koukali jsme jim pod ruce a naživo viděli, kde aplikace drhne v UI, kde se naštvou nebo co jim chybí.
                </p>
                
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 p-6 md:p-8 rounded-2xl my-6">
                   <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-accent" />
                     Hořká pilulka na konec
                   </h4>
                   <p className="text-sm md:text-base leading-relaxed m-0 text-neutral-400">
                     Atmosféra byla neuvěřitelná, nápady lítaly, ale logo? <strong>Startup si nakonec nevybral.</strong> 
                     Vkus founderů se prostě netrefil do studentů. Pro někoho neúspěch, pro nás brutální lekce: 
                     Museli jsme donutit firmy přesněji, lépe a tvrději definovat vizuální obrysy a zadání.
                   </p>
                </div>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 08: OPEN CHALLENGE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start overflow-hidden pb-32"
        >
          <div className="absolute left-[-5px] top-[140px] w-4 h-4 bg-accent rounded-full animate-ping shadow-[0_0_12px_rgba(207,47,49,1)] hidden md:block" />
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-accent rounded-full hidden md:block" />

          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">08</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block">Kapitola 08</span>
             <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-none">První Open Challenge</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Sporteru jsme stát nenechali. Rozhodli jsme se výzvu vzít znova, líp, jasněji a tentokrát plně <strong>v otevřeném digitálním prostoru</strong> bez nutnosti být na stejném místě. 
                  Měli jsme pár týdnů na promotion napříč studentskými komunitami.
                </p>
                <p>
                  Výsledky nás posadily na zadek. Online se prihlásilo <strong>32 studentů</strong>. 
                  A nebyli to jen lidé odsud, ale tvořili pro nás napříč univerzitami z <strong>MUNI, VUT i ostravské VŠB</strong>. Hlad po opravdových referencích a příležitostech u studentů je zkrátka masivní.
                </p>
             </div>

             <div className="flex flex-col md:flex-row gap-5 items-stretch max-w-3xl">
                <SpotlightCard className="p-6 bg-accent/[0.03] border border-accent/10 flex flex-col justify-center text-left space-y-1 flex-1">
                   <p className="text-accent text-3xl font-black font-mono">32</p>
                   <p className="text-white font-bold text-sm">Registrovaných do výzvy</p>
                </SpotlightCard>
                
                <SpotlightCard className="p-6 bg-neutral-900/30 border border-white/[0.03] flex flex-col justify-center text-left flex-[2]">
                   <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                     <Star className="w-4 h-4 text-accent" /> 
                     Nádherné logo v praxi
                   </p>
                   <p className="text-xs text-neutral-400 leading-relaxed">
                     I přes to, že někteří odpadli, Sportrera získala naprosto parádní novou identitu. Spokojenost klienta s doručením byla skvělá a pro nás satisfakce, že model prostě funguje.
                   </p>
                </SpotlightCard>
             </div>
          </div>
        </motion.section>
      </div>

      <section className="py-28 bg-[#020202] border-t border-white/[0.02] text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_accent_0%,_transparent_70%) opacity-[0.03] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6">Mise teprve začíná.</h2>
            <p className="text-neutral-500 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
               RiseHigh roste každý den. Pokud máš dotaz ohledně tech space (Next.js, Supabase), byznysu nebo chceš postavit něco cool – dej vědět.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                 <MagneticButton 
                    onClick={() => window.open('https://risehigh.cz', '_blank')}
                    className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-[1.03] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 group"
                 >
                    Kouknout na web 
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                 </MagneticButton>
                 
                 <MagneticButton 
                    onClick={() => window.location.href = "mailto:zdenekk.ferenc@gmail.com"}
                    className="bg-neutral-900 border border-white/10 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                 >
                    Probrat projekt
                 </MagneticButton>
            </div>
         </div>
      </section>

    </main>
  );
}