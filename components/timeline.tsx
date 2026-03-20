"use client";

import { useEffect, useState } from "react";
import { GitCommit, Database, Layout, Terminal, ArrowRight } from "lucide-react";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";

interface DevLogEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  slug: string;
}

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  backend: { bg: "bg-blue-500/[0.08]", text: "text-blue-400", dot: "bg-blue-500" },
  database: { bg: "bg-blue-500/[0.08]", text: "text-blue-400", dot: "bg-blue-500" },
  design: { bg: "bg-purple-500/[0.08]", text: "text-purple-400", dot: "bg-purple-500" },
  ui: { bg: "bg-purple-500/[0.08]", text: "text-purple-400", dot: "bg-purple-500" },
  feature: { bg: "bg-accent/[0.08]", text: "text-accent", dot: "bg-accent" },
  default: { bg: "bg-neutral-800/60", text: "text-neutral-400", dot: "bg-neutral-500" },
};

export default function Timeline() {
  const [entries, setEntries] = useState<DevLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (category: string) => {
    const nc = category.toLowerCase();
    if (nc.includes("backend") || nc.includes("database")) return Database;
    if (nc.includes("design") || nc.includes("ui")) return Layout;
    if (nc.includes("feature")) return GitCommit;
    return Terminal;
  };

  const getCategoryStyle = (category: string) => {
    const nc = category.toLowerCase();
    for (const key of Object.keys(categoryColors)) {
      if (nc.includes(key)) return categoryColors[key];
    }
    return categoryColors.default;
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
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
    <section className="px-6 py-6 sm:py-12" id="devlog">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Dev Journal
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">DevLog</h2>
              <p className="text-neutral-500 max-w-lg text-sm leading-relaxed">
                Osobní archiv vývoje RiseHigh — chronologický přehled změn, oprav a myšlenek přesně tak, jak přicházely v čase.
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-700 tracking-widest">v1.0.0</span>
          </div>
          <motion.div
            className="h-[3px] w-0 bg-gradient-to-r from-accent to-orange-500 mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connector line */}
          {!loading && entries.length > 0 && (
            <motion.div
              className="absolute left-[19px] top-0 w-[1px] bg-gradient-to-b from-accent/40 via-white/[0.06] to-transparent"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "100%", opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 }}
            />
          )}

          <div className="space-y-2 pl-12">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.04]"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))
              : entries.map((entry, index) => {
                  const Icon = getIcon(entry.category);
                  const style = getCategoryStyle(entry.category);
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.07,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                      className="relative"
                    >
                      {/* Timeline dot — positioned in the left gutter */}
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-neutral-700 border border-neutral-600 relative">
                          <div className={`absolute inset-0 rounded-full ${style.dot} opacity-80 scale-75`} />
                        </div>
                      </div>

                      <Link
                        href={`/devlog/${entry.slug}`}
                        className="group flex items-center justify-between gap-4 bg-neutral-900/30 border border-white/[0.04] rounded-2xl px-6 py-4 hover:bg-neutral-900/60 hover:border-white/[0.08] transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-2 rounded-xl ${style.bg} flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${style.text}`} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm md:text-base font-semibold text-neutral-300 group-hover:text-white transition-colors line-clamp-1 mb-1">
                              {entry.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${style.bg} ${style.text}`}
                              >
                                <span className={`w-1 h-1 rounded-full ${style.dot}`} />
                                {entry.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs font-mono text-neutral-600 hidden sm:block">
                            {entry.date}
                          </span>
                          <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
          </div>

          {/* Archive link */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6"
            >
              <Link
                href="/devlog"
                className="group flex items-center justify-center gap-2 py-4 border border-dashed border-white/[0.08] rounded-2xl text-neutral-600 hover:text-neutral-300 hover:border-white/[0.16] hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="text-sm font-medium">Zobrazit celý archiv</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}