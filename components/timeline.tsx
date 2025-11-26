"use client";

import { useEffect, useState } from "react";
import { GitCommit, Database, Layout, Terminal } from "lucide-react";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface DevLogEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  slug: string;
}

export default function Timeline() {
  const [entries, setEntries] = useState<DevLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    if (normalizedCategory.includes("backend") || normalizedCategory.includes("database")) return Database;
    if (normalizedCategory.includes("design") || normalizedCategory.includes("ui")) return Layout;
    if (normalizedCategory.includes("feature")) return GitCommit;
    return Terminal; 
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const q = query(
          collection(db, "devlog"), 
          orderBy("createdAt", "desc"), 
          limit(6)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedEntries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as DevLogEntry[];
        
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Chyba při načítání DevLogu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <section className="px-6 py-32 bg-neutral-900/30" id="devlog">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16 animate-fade-in-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">DevLog</h2>
            <div className="hidden md:block mb-4 text-sm font-mono text-neutral-500">
              v1.0.0
            </div>
            <p className="text-neutral-400 max-w-2xl">
              Tohle je můj osobní archiv vývoje RiseHigh. Píšu si ho hlavně proto, abych nezapomněl, 
              čím vším jsem si při stavbě projektu prošel. Níže najdete chronologický přehled změn, 
              oprav a myšlenek přesně tak, jak přicházely v čase.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            ))
          ) : (
            entries.map((entry, index) => {
              const Icon = getIcon(entry.category);
              
              return (
                <Link 
                  href={`/devlog/${entry.slug}`} 
                  key={entry.id}
                  className={`group relative bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:bg-neutral-800/50 transition-colors animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white/5 rounded-lg text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500">{entry.date}</span>
                  </div>
                  
                  <h3 className="text-sm md:text-lg font-semibold text-neutral-200 mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {entry.title}
                  </h3>
                  
                  <span className="inline-block px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 border border-white/5">
                    {entry.category}
                  </span>
                </Link>
              );
            })
          )}
          
          {!loading && (
            <Link
              href="/devlog"
              className="flex items-center justify-center p-6 border border-dashed border-white/10 rounded-2xl text-neutral-500 hover:text-neutral-300 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${entries.length * 100}ms` }}
            >
              <span className="text-sm font-medium">Zobrazit archiv</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}