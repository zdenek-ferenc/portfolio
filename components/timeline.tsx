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

// Jen neutrál a jeden akcent: kategorie rozlišuje ikona a text, ne barva.
const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  feature: { bg: "bg-accent/[0.08]", text: "text-accent", dot: "bg-accent" },
  default: { bg: "bg-white/[0.04]", text: "text-neutral-400", dot: "bg-neutral-500" },
};

export default function Timeline() {
  const [entries, setEntries] = useState<DevLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <section className="px-6" id="devlog">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mobile-no-animate mb-4 md:mb-8"
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tighter text-white">DevLog</h2>
              <p className="text-neutral-500 max-w-lg text-sm leading-relaxed">
                Osobní archiv vývoje RiseHigh: chronologický přehled změn, oprav a myšlenek přesně tak, jak přicházely v čase.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connector line */}
          {!loading && entries.length > 0 && (
            <motion.div
              className="mobile-no-animate absolute left-[19px] top-0 w-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-transparent"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "100%", opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 }}
            />
          )}

          <div className="space-y-2">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[74px] bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.05]"
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
                      className="mobile-no-animate relative"
                    >
                      <Link
                        href={`/devlog/${entry.slug}`}
                        data-glow
                        className="group flex items-center justify-between gap-4 bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 hover:border-white/[0.14] transition-colors duration-300"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-2 rounded-xl ${style.bg} flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${style.text}`} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm md:text-base font-medium text-neutral-200 group-hover:text-white transition-colors line-clamp-1 mb-1">
                              {entry.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center font-mono text-xs px-2 py-0.5 rounded-md ${style.bg} ${style.text}`}
                              >
                                {entry.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs font-mono text-neutral-600 hidden sm:block">
                            {entry.date}
                          </span>
                          <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
          </div>

          {!loading && (error || entries.length === 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8"
            >
              <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 text-center">
                <Terminal className="w-8 h-8 text-neutral-700 mx-auto mb-3 opacity-50" />
                <p className="text-neutral-500 text-sm">
                  {error 
                    ? "DevLog je momentálně nedostupný (pravděpodobně kvůli AdBlocku)." 
                    : "Zatím tu nejsou žádné záznamy."}
                </p>
              </div>
            </motion.div>
          )}

          {!loading && entries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mobile-no-animate mt-6"
            >
              <Link
                href="/devlog"
                className="group flex items-center justify-center gap-2 py-4 border border-white/[0.07] rounded-2xl text-neutral-500 hover:text-white hover:border-white/[0.14] transition-all duration-300"
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