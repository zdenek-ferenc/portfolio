"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import MagneticButton from "@/components/ui/magnetic-button";

// Tady si zatím "natvrdo" definujeme data pro ty příběhy. 
// V budoucnu to můžeš tahat z nějakého CMS nebo JSONu.
const projectsData: Record<string, any> = {
  "risehigh": {
    title: "RiseHigh",
    subtitle: "Budoucnost studentských stáží",
    heroImage: "/risehigh.png", // Ujisti se, že máš obrázek
    overview: "RiseHigh vznikl z frustrace studentů i firem. Firmy nevěděly, koho nabírají, a studenti neměli kde získat praxi. Vytvořil jsem platformu, kde studenti řeší reálné case-studies a firmy si vybírají ty nejlepší.",
    challenge: "Největší výzvou bylo vytvořit systém, který je fér pro obě strany. Potřebovali jsme robustní systém hodnocení, bezpečné platby přes Stripe a real-time notifikace, aby nikdo nečekal na feedback týdny.",
    solution: [
      "Next.js 14 App Router pro maximální SEO a rychlost.",
      "Supabase pro realtime databázi a autentifikaci.",
      "Vlastní Stripe Connect integrace pro vyplácení odměn studentům.",
      "Automatizovaný e-mailový systém pro notifikace."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "Resend"]
  },
  "alexander-kovacka": {
    title: "Alexander Kovačka",
    subtitle: "Fotografické portfolio bez kompromisů",
    heroImage: "/kovacka.png", 
    overview: "Alexander potřeboval web, který nebude jen 'další galerií'. Chtěl nástroj, kde může klientům nasdílet privátní odkaz, oni si vyberou fotky srdíčkem a jemu se vygeneruje seznam k úpravě.",
    challenge: "Výzvou byla rychlost načítání stovek fotek ve vysoké kvalitě a vytvoření intuitivního admin rozhraní, které zvládne ovládat i netechnický člověk.",
    solution: [
      "Vlastní Image Optimization pipeline pro bleskové načítání.",
      "Privátní klientské zóny chráněné heslem.",
      "Drag & Drop admin rozhraní pro správu galerií.",
      "Minimalistický design, který nechává vyniknout fotky."
    ],
    stack: ["React", "Firebase", "Framer Motion", "Tailwind"]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">Projekt nenalezen 404</h1>
          <Link href="/" className="text-accent hover:underline">Zpět na domů</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Navigace zpět */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zpět na přehled
        </Link>

        {/* Hero Sekce Projektu */}
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl">
            {project.subtitle}
          </p>
        </div>

        {/* Hlavní obrázek */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up delay-100">
          <Image 
            src={project.heroImage} 
            alt={project.title} 
            fill 
            className="object-cover"
          />
        </div>

        {/* Obsah - Story */}
        <div className="grid md:grid-cols-3 gap-12 animate-fade-in-up delay-200">
          
          {/* Levý sloupec - Detaily */}
          <div className="md:col-span-2 space-y-12">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">O projektu</h2>
              <p className="text-lg text-neutral-300 leading-relaxed">
                {project.overview}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Výzva & Problém</h2>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-lg text-neutral-300 leading-relaxed italic">
                  "{project.challenge}"
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Technické řešení</h2>
              <ul className="space-y-4">
                {project.solution.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Pravý sloupec - Stack & Info */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/50 sticky top-24">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="h-px w-full bg-white/10 my-6" />

              <MagneticButton className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                Chci podobný web
              </MagneticButton>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}