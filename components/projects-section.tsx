"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ProjectsSection() {
  const projects = [
    {
      title: "RiseHigh",
      description:
        "RiseHigh propojuje startupy se studenty skrze reálné výzvy, které firmám umožňují ověřit si talenty v akci a studentům získat klíčovou praxi.",
      tags: ["Next.js", "Supabase", "Stripe" , "Full-Stack", "UX"],
      href: "https://risehigh.io",
      color: "from-emerald-500/20 to-emerald-900/20",
      image: "/risehigh.png",
    },
    {
      title: "Alexander Kovačka",
      description:
        "Kompletní portfolio web s integrovaným admin dashboardem. Obsahuje vlastní CMS pro správu galerií a klientský portál pro výběr fotek.",
      tags: ["React", "Admin Panel", "UX", "Full-Stack"],
      href: "https://www.alexanderkovacka.com/cs",
      color: "from-blue-500/20 to-blue-900/20",
      image: "/kovacka.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center px-6 sm:py-28" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Vybrané projekty</h2>
          <div className="h-1 w-20 bg-accent" />
        </div>

        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative grid md:grid-cols-2 bg-neutral-900/50 md:bg-transparent border md:border-none border-white/5 p-8 md:p-0 rounded-3xl gap-8 md:gap-10 items-center animate-fade-in-up ${index === 1 ? 'delay-200' : ''}`}
            >
              <div className="aspect-video rounded-xl border border-white/5 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-neutral-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out"
                />
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-400 border border-white/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-100">{project.title}</h3>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {project.href && (
                  <a 
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent font-semibold group/link hover:text-white transition-colors"
                  >
                    Navštívit web
                    <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
