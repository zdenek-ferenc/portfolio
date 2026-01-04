"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Layers, Zap, Lock } from "lucide-react";

export default function KovackaPage() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-blue-500/30">
      
      {/* 1. HERO - Vizuální */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
           <Link href="/#projects" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Zpět na portfolio
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Alexander <span className="text-kovacka">Kovačka</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
             <p className="text-xl text-neutral-300 leading-relaxed">
               Alexander nechtěl jen portfolio. Potřeboval <strong className="text-white">operační systém pro svůj byznys</strong>. 
               Místo placení za služby jako Pixieset nebo WeTransfer jsme postavili vlastní řešení na míru, které šetří desítky hodin měsíčně.
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                   <h3 className="text-3xl font-bold text-white mb-1">500ms</h3>
                   <p className="text-sm text-neutral-500">Načtení galerie</p>
                </div>
                <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                   <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                   <p className="text-sm text-neutral-500">Automatizace</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE SOLUTION - Feature Breakdown */}
      <section className="py-20 px-6">
         <div className="max-w-5xl mx-auto space-y-20">
            
            {/* Feature 1: Client Proofing */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6 order-2 md:order-1">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                     <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Client Proofing & Výběr fotek</h2>
                  <p className="text-neutral-400 leading-relaxed">
                     Klienti dostanou unikátní odkaz chráněný heslem. Mohou procházet náhledy, označovat favority (srdíčkem) a zanechávat komentáře.
                     <br/><br/>
                     Jakmile klient výběr potvrdí, Alexanderovi přijde notifikace a seznam souborů se automaticky vygeneruje pro import do Lightroomu.
                  </p>
                  <ul className="space-y-2">
                     <li className="flex gap-2 text-sm text-neutral-300"><Check className="w-4 h-4 text-blue-500"/> Privátní zóny</li>
                     <li className="flex gap-2 text-sm text-neutral-300"><Check className="w-4 h-4 text-blue-500"/> Real-time synchronizace</li>
                  </ul>
               </div>
               {/* Placeholder pro screenshot UI */}
               <div className="aspect-square bg-neutral-900 rounded-2xl border border-white/10 order-1 md:order-2 relative overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-sm">
                     [Screenshot: Client Selection UI]
                  </div>
               </div>
            </div>

            {/* Feature 2: Admin & Fakturace */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square bg-neutral-900 rounded-2xl border border-white/10 relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-sm">
                     [Screenshot: Admin Dashboard]
                  </div>
                </div>
               <div className="space-y-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                     <Layers className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">CMS & Generátor Faktur</h2>
                  <p className="text-neutral-400 leading-relaxed">
                     Drag & Drop rozhraní pro správu portfolia. Alexander může přeuspořádat fotky, vytvářet nové kategorie a blog posty bez jediného řádku kódu.
                     <br/><br/>
                     Systém navíc automaticky generuje PDF faktury na základě vybraného balíčku služeb a posílá je klientovi.
                  </p>
               </div>
            </div>

         </div>
      </section>

      {/* 3. TECH DEEP DIVE */}
      <section className="py-20 px-6 bg-neutral-900/30 border-y border-white/5">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Pod kapotou</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
               <div className="p-6 bg-neutral-950 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-blue-400 font-bold mb-2">React & Next.js</h3>
                  <p className="text-xs text-neutral-500">Frontend optimalizovaný pro rychlost a SEO.</p>
               </div>
               <div className="p-6 bg-neutral-950 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-blue-400 font-bold mb-2">Firebase</h3>
                  <p className="text-xs text-neutral-500">Auth, Database a Hosting v jednom balíčku.</p>
               </div>
               <div className="p-6 bg-neutral-950 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-blue-400 font-bold mb-2">Cloud Functions</h3>
                  <p className="text-xs text-neutral-500">Serverless funkce pro generování PDF a e-maily.</p>
               </div>
               <div className="p-6 bg-neutral-950 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-blue-400 font-bold mb-2">Framer Motion</h3>
                  <p className="text-xs text-neutral-500">Plynulé přechody mezi fotkami.</p>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}