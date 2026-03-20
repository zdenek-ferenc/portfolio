"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Camera, FileText, ArrowUpRight, Heart, MessageSquare, Lock, Zap
} from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card-risehigh";
import { motion, AnimatePresence } from "framer-motion";

function ProofingSimulator() {
  const [selected, setSelected] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<string[]>([]);

  const handleSendComment = () => {
    if (comment.trim() === "") return;
    setCommentsList([...commentsList, comment]);
    setComment("");
  };

  return (
    <div className="w-full bg-neutral-900/40 border border-white/[0.05] rounded-3xl p-6 md:p-8 backdrop-blur-md relative group overflow-hidden mt-8 not-prose">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      <div className="grid md:grid-cols-12 gap-6 items-center">
         <div className="md:col-span-12 lg:col-span-7 aspect-4/3 bg-neutral-950 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 z-20">
               <motion.button 
                 onClick={() => setSelected(!selected)}
                 whileTap={{ scale: 0.85 }}
                 className={`p-2.5 rounded-xl border transition-all duration-300 ${selected ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'}`}
               >
                 <Heart className={`w-4 h-4 ${selected ? 'fill-red-500' : ''}`} />
               </motion.button>
            </div>

            <div className="absolute inset-0">
               <Image 
                 src="/marek.webp" 
                 alt="Klientský výběr fotky"
                 fill
                 className="object-cover"
                 sizes="(max-width: 1024px) 100vw, 600px"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
            </div>

            <AnimatePresence>
               {commentsList.length > 0 && (
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 border border-white/10 p-3 rounded-xl backdrop-blur-md text-xs z-20"
                   >
                      <p className="text-blue-400 font-bold mb-0.5">Komentář klienta:</p>
                      <p className="text-neutral-300">{commentsList[commentsList.length - 1]}</p>
                   </motion.div>
                )}
            </AnimatePresence>
         </div>

         <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-3">
            <h4 className="text-base font-bold text-white">Živé Klientské Rozhraní</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
               Zde je ukázka, jak funguje client-proofing pro Alexova klienta. Označ fotku srdíčkem nebo zanech poznámku k požadované úpravě.
            </p>

            <div className="space-y-2 mt-2">
               <input 
                 type="text" 
                 placeholder="Např. Trochu prosvětlit stíny..." 
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 className="w-full bg-neutral-950 border border-white/10 p-2.5 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-blue-500/50 transition-colors"
               />
               <button 
                 onClick={handleSendComment}
                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-blue-500/10"
               >
                 Odeslat poznámku
               </button>
            </div>

         </div>
      </div>
    </div>
  );
}

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

export default function KovackaPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-blue-500/30 overflow-x-hidden text-neutral-200 font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-neutral-800/[0.04] blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
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
             <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-500/5 border border-blue-500/15 backdrop-blur-md rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.15em]">Portfolio & Admin</span>
             </motion.div>
             
             <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.85]">
               Alexander Kovačka
             </motion.h1>
             
             <motion.p variants={fadeUp} className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-3xl">
               Minimalistický web a komplexní <span className="text-white font-medium">operační systém pro fotografický byznys</span>.
             </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className="absolute md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-neutral-800 to-transparent hidden md:block" />

        {/* CHAPTER 01: SPOLEČNÁ VIZE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[120px] w-2.5 h-2.5 bg-neutral-600 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
            <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">01</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Kapitola 01</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Společná Vize</h2>
          </div>

          <div className="md:col-span-8">
            <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
              <p>
                Alex je můj dobrý kamarád a současně velmi šikovný fotograf. Sedli jsme si společně nad prázdným plátnem a začali řešit, jak by měl jeho web vypadat. 
                Alexova představa byla od začátku jasná: <strong className="text-white">čistokrevný minimalismus</strong>.
              </p>
              <p>
                Žádné rušivé elementy, žádné zbytečnosti. Web musel dýchat. Velké množství <strong className="text-white">whitespace</strong>, jednoduchá typografie a veškerá pozornost upřená na to nejdůležitější – jeho fotky.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CHAPTER 02: CMS PRO JEDNODUCHOST */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">02</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Kapitola 02</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">CMS pro nahrávání</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  S přibývajícími projekty rostla potřeba obsah efektivně spravovat. 
                  Složité úpravy přes kód nepřipadaly v úvahu, proto jsme jako první krok postavili <strong className="text-white">custom administrační panel</strong>.
                </p>
                <p>
                  Alex si nyní může sám nahrávat celé sady fotek, vytvářet projekty a během pár vteřin je pouštět ven k divákům, aniž by se musel učit složité editory.
                </p>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 03: CLIENT-PROOFING */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-blue-500 rounded-full hidden md:block animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">03</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Kapitola 03</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Client Proofing</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Skutečný gamechanger přišel s klientskou zónou. Posílání fotek přes třetistranné služby bylo krkolomné. Chtěli jsme, aby klient dostal zážitek přímo pod Alexovou značkou.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-16 !text-left not-prose">
                {[
                  { icon: Camera, title: "1. Nahrání", p: "Alex nahraje fotky z focení do privátní klientské galerie a odešle klientovi odkaz." },
                  { icon: Heart, title: "2. Výběr", p: "Klient prochází náhledy a jednoduchým kliknutím označuje favority." },
                  { icon: MessageSquare, title: "3. Komentáře", p: "U vybraných fotek může klient zanechat poznámku k požadované úpravě." }
                ].map((step, i) => (
                  <SpotlightCard key={i} className="p-4 md:p-6 bg-neutral-900/10 flex flex-col items-center md:items-center text-left !gap-2 space-y-2 group h-full">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center mb-1 border border-white/5">
                        <step.icon className="w-5 h-5 text-blue-400" />
                     </div>
                     <h4 className="text-base font-bold text-white">{step.title}</h4>
                     <p className="text-xs text-gray-400 leading-relaxed">{step.p}</p>
                  </SpotlightCard>
                ))}
             </div>
             <ProofingSimulator />
             <div className="w-full bg-neutral-900/10 border border-white/[0.03] rounded-2xl p-4 flex items-center gap-3 not-prose">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                   <FileText className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed m-0">
                   <strong className="text-white">Adobe Lightroom Bridge:</strong> Každá nahraná fotka si drží svůj původní název (např. <code>DSC_1234</code>). Jakmile klient dokončí výběr, Alex si vygeneruje seznam zvolených názvů, který stačí vložit do vyhledávání v Lightroomu. Program pak ze stovek fotek na SD kartě automaticky vytáhne jen ty k úpravě.
                </p>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 04: STRUKTURA PROJEKTŮ */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">04</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Kapitola 04</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Chytřejší Struktura</h2>
          </div>

          <div className="md:col-span-8">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  S hromadou zakázek hrozilo, že se úvodní strana stane 100-položkovým seznamem. 
                  Potřebovali jsme nad fotky přidat další organizační vrstvu.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl not-prose">
                <SpotlightCard className="p-5 bg-neutral-900/10 border border-white/[0.03] flex flex-col gap-1.5">
                   <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Projekty
                   </h4>
                   <p className="text-xs text-neutral-500 leading-relaxed">
                      Malé, samostatné jednotky (konkrétní event, festival). Kliknutím se dostaneš přímo k oné galerii fotek.
                   </p>
                </SpotlightCard>

                <SpotlightCard className="p-5 bg-neutral-900/10 border border-white/[0.03] flex flex-col gap-1.5">
                   <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      Kolekce
                   </h4>
                   <p className="text-xs text-neutral-500 leading-relaxed">
                      Zastřešující kategorie (např. Festivaly, Eventy, Studio). Sdružují několik projektů dohromady pro přehlednost.
                   </p>
                </SpotlightCard>
             </div>

             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl mt-6">
                <p>
                  Alex má v administraci kompletní kontrolu nad tím, jaké <strong className="text-white">Kolekce</strong> se zrovna na homepage zobrazí, jaké skryje, nebo v jakém přijdou pořadí.
                </p>
             </div>
          </div>
        </motion.section>

        {/* CHAPTER 05: BILLING AUTOMATIZACE */}
        <motion.section 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="py-12 relative md:pl-16 grid md:grid-cols-12 gap-10 items-start pb-32"
        >
          <div className="absolute left-[-5px] top-[140px] w-2.5 h-2.5 bg-neutral-700 rounded-full hidden md:block" />
          
          <div className="md:col-span-4 space-y-4 relative">
             <span className="text-9xl font-black text-white/[0.02] absolute -top-12 left-0 tracking-tighter select-none pointer-events-none">05</span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Kapitola 05</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">Generátor Faktur</h2>
          </div>

          <div className="md:col-span-8 space-y-6">
             <div className="prose prose-lg md:prose-xl prose-invert text-neutral-400 leading-relaxed max-w-3xl">
                <p>
                  Posledním střípkem do funkční skládačky byznysu byla fakturace. Přepisování údajů z e-mailů do účetních šablon stálo dost drahocenného času.
                </p>
                <p>
                  Přímo do administrativy jsme integrovali <strong className="text-white">generátor faktur</strong>. Systém z dat zákazníka a vybraného balíčku sám načte veškeré informace, vygeneruje formálně správný doklad a rovnou jej pošle klientovi. Šetří se tak nudná administrativa na úkor samotného focení.
                </p>
             </div>

             <div className="max-w-3xl">
                <SpotlightCard className="p-6 bg-neutral-900/10 border border-white/[0.03] flex flex-row items-center gap-4 text-left">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                     <FileText className="w-5 h-5 text-blue-400" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-white mb-0.5">Billing přímo v Client Zóně</p>
                     <p className="text-xs text-neutral-500 leading-relaxed">Rychlá a čistá fakturace bez nutnosti otevírat externí účetní software.</p>
                   </div>
                </SpotlightCard>
             </div>
          </div>
        </motion.section>
        {/* EDUCATIONAL SECTION: TECHNICKÉ CHALLENGES */}
        <motion.div 
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} 
          className="max-w-6xl mx-auto space-y-12 relative z-10 pb-20 mt-20"
        >
          <div className="pl-4 grid md:grid-cols-12 gap-10 items-start">
             <div className="md:col-span-5 space-y-5">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-none bg-linear-to-b from-white to-neutral-500 bg-clip-text">Pod kapotou</h2>
                <div className="space-dash-none">
                  <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base">
                    Stavět systém pro fotografa znamenalo myslet na jediné: <strong className="text-white">rychlost a bezproblémové načítání gigabytů dat</strong>. Zde jsou klíčové věci, které mě tato case study naučila.
                  </p>
                </div>
             </div>

             <div className="md:col-span-7 space-y-4">
                {[
                  { 
                    icon: Camera, 
                    title: "Úspora místa s knihovnou Sharp", 
                    desc: "Alex nahrává fotky v tiskové kvalitě (10-20MB/kus). Místo nákladného ukládání originálů fotky nejprve projdou serverem přes knihovnu Sharp, která je automaticky zkomprimuje a převede do formátu .webp. Do cloudu se tak ukládají pouze zlomky původní velikosti. Tím šetříme úložný prostor a měsíční náklady za drahý cloud storage.", 
                    style: "hover:border-blue-500/10" 
                  },
                  { 
                    icon: Lock, 
                    title: "Zabezpečení bez nucené registrace", 
                    desc: "Klienti nechtějí vytvářet účty, pamatovat si hesla a logovat se. Pro Client Proofing jsem vytvořil systém s dynamickým kryptografickým hashem v URL. Odkaz je unikátní pro daného klienta, zcela bezpečný a nahrává se 0-friction způsobem (jedním klikem).", 
                    style: "hover:border-purple-500/10" 
                  },
                  { 
                    icon: Zap, 
                    title: "Real-time sync s Database", 
                    desc: "Když klient sedí doma a srdíčkuje fotky, Alex to v administraci u sebe vidí živě. Použití Real-time Websocketu v databázi místo neustálých REST API dotazů ušetřilo obrovské zatížení serveru a dodalo té klientské zóně ten pravý 'smooth' plynulý pocit.", 
                    style: "hover:border-emerald-500/10" 
                  }
                ].map((card, i) => (
                   <SpotlightCard key={i} className={`p-6 bg-neutral-900/20 border border-white/5 flex flex-row items-start gap-4 transition-all duration-300 ${card.style}`}>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                         <card.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-lg font-bold text-white">{card.title}</h4>
                         <p className="text-sm text-neutral-500 leading-relaxed">{card.desc}</p>
                      </div>
                   </SpotlightCard>
                ))}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Call to Action */}
      <section className="py-28 bg-[#020202] border-t border-white/[0.02] text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_blue-500_0%,_transparent_70%) opacity-[0.02] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">Máš dotaz nebo nápad?</h2>
            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
               Pokud tě zajímá, jak platforma funguje pod pokličkou, nebo řešíš podobný custom systém pro svůj byznys, neváhej se ozvat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                 <button 
                    onClick={() => window.open('https://www.alexanderkovacka.com/cs', '_blank')}
                    className="cursor-pointer bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-95 active:scale-90 transition-all shadow-xl flex items-center justify-center gap-2 group"
                 >
                    Kouknout na web 
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