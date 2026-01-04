"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  const projects = [
    {
      title: "RiseHigh",
      description: "Platforma propojující studenty s firmami skrze reálné challenge.",
      tags: ["Next.js", "Supabase", "Stripe", "VUT Spin-off"],
      href: "https://risehigh.io",
      // Tady natvrdo definujeme cestu
      link: "/projects/risehigh", 
      image: "/risehigh.png",
      impact: "První studentský startup s podílem VUT"
    },
    {
      title: "Alexander Kovačka",
      description: "Fotografické portfolio s komplexním CMS a klientskou zónou.",
      tags: ["React", "Admin Panel", "Automation"],
      href: "https://www.alexanderkovacka.com/cs",
      // Cesta pro druhý projekt
      link: "/projects/alexander-kovacka", 
      image: "/kovacka.png",
      impact: "Automatizace faktur & Client proofing"
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center px-6 sm:py-28" id="projects">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6 sm:mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Vybrané projekty</h2>
          <div className="h-1 w-20 bg-accent" />
        </div>

        <div className="space-y-5 sm:space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative grid md:grid-cols-2 bg-neutral-900/50 md:bg-transparent border md:border-none border-white/5 p-5 md:p-0 rounded-3xl gap-5 md:gap-10 items-center animate-fade-in-up ${index === 1 ? 'delay-200' : ''}`}
            >
              {/* ... Obrázek zůstává stejný ... */}
              <div className="aspect-video rounded-xl border border-white/5 relative overflow-hidden shadow-2xl">
                 <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              
              <div className="space-y-5 md:space-y-6">
                 {/* Impact Badge */}
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-bold text-accent uppercase tracking-wide">{project.impact}</span>
                 </div>

                <h3 className="text-3xl md:text-4xl font-bold text-neutral-100">{project.title}</h3>
                <p className="md:text-lg text-neutral-400 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Odkaz na detailní stránku */}
                  <Link 
                    href={project.link}
                    className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform duration-200 flex items-center gap-2"
                  >
                    Příběh projektu
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {project.href && (
                    <a 
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-medium text-sm md:text-base hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                    >
                      Live Web
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}