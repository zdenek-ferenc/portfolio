"use client";

import { GitCommit, Database, Layout } from "lucide-react";

interface DevLogEntry {
  title: string;
  date: string;
  category: "Feature" | "Design" | "Backend";
  icon: React.ElementType;
}

export default function Timeline() {
  const entries: DevLogEntry[] = [
    {
      title: "Integrace Stripe Webhooks pro platby",
      date: "Nov 2024",
      category: "Backend",
      icon: GitCommit,
    },
    {
      title: "Redesign studentského dashboardu",
      date: "Oct 2024",
      category: "Design",
      icon: Layout,
    },
    {
      title: "Návrh databázového schématu v Supabase",
      date: "Sep 2024",
      category: "Backend",
      icon: Database,
    },
  ];

  return (
    <section className="px-6 py-32 bg-neutral-900/30" id="devlog">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16 animate-fade-in-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">DevLog</h2>
            <div className="hidden md:block mb-4 text-sm font-mono text-neutral-500">
            v1.0.0
          </div>
            <h1 className="text-neutral-400">Tohle je můj osobní archiv vývoje RiseHigh. Píšu si ho hlavně proto, abych nezapomněl, čím vším jsem si při stavbě projektu prošel. Níže najdete chronologický přehled změn, oprav a myšlenek přesně tak, jak přicházely v čase</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <div
              key={index}
              className={`group relative bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:bg-neutral-800/50 transition-colors animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <entry.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-neutral-500">{entry.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-200 mb-2 group-hover:text-white transition-colors">
                {entry.title}
              </h3>
              
              <span className="inline-block px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400">
                {entry.category}
              </span>
            </div>
          ))}
          
          {/* "More" Card */}
          <div
            className="flex items-center justify-center p-6 border border-dashed border-white/10 rounded-2xl text-neutral-500 hover:text-neutral-300 hover:border-white/20 transition-all cursor-pointer animate-fade-in-up delay-400"
          >
            <span className="text-sm font-medium">Zobrazit archiv</span>
          </div>
        </div>
      </div>
    </section>
  );
}
