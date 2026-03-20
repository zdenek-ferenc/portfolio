"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Mail, Rocket, Github, ArrowRight } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "risehigh",
        label: "Go to RiseHigh",
        description: "risehigh.io",
        icon: <Rocket className="w-4 h-4" />,
        action: () => window.open("https://risehigh.io", "_blank"),
      },
      {
        id: "github",
        label: "View Github",
        description: "github.com/zdenek-ferenc",
        icon: <Github className="w-4 h-4" />,
        action: () => window.open("https://github.com/zdenekhynek", "_blank"),
      },
      {
        id: "email",
        label: "Copy Email",
        description: "zdenekk.ferenc@gmail.com",
        icon: <Mail className="w-4 h-4" />,
        action: () => {
          navigator.clipboard.writeText("zdenekk.ferenc@gmail.com");
          setIsOpen(false);
        },
      },
      {
        id: "lab",
        label: "Go to DevLog",
        description: "Archiv vývoje",
        icon: <ExternalLink className="w-4 h-4" />,
        action: () => {
          const labSection = document.getElementById("devlog");
          labSection?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      },
    ],
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        commands[selectedIndex].action();
        setIsOpen(false);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, commands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphic backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50"
          />

          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.22, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="w-full max-w-xl relative"
            >
              {/* Gradient border wrapper */}
              <div
                className="absolute -inset-[1px] rounded-2xl -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(207,47,49,0.5) 0%, rgba(255,140,66,0.3) 50%, rgba(255,255,255,0.06) 100%)",
                }}
              />

              <div className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                {/* Search bar */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]">
                  <Search className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent outline-none text-neutral-200 placeholder:text-neutral-600 text-sm"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-[10px] bg-white/[0.04] rounded border border-white/[0.08] text-neutral-600 font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Commands */}
                <div className="p-1.5">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-700">
                    Quick Actions
                  </p>
                  {commands.map((command, index) => (
                    <motion.button
                      key={command.id}
                      onClick={command.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${
                        selectedIndex === index
                          ? "bg-accent/[0.10] text-white"
                          : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg transition-colors duration-150 ${
                          selectedIndex === index
                            ? "bg-accent/15 text-accent"
                            : "bg-white/[0.04] text-neutral-600"
                        }`}
                      >
                        {command.icon}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium leading-none mb-0.5">{command.label}</p>
                        {command.description && (
                          <p className="text-[11px] text-neutral-600 truncate font-mono">
                            {command.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={`transition-all duration-150 ${
                          selectedIndex === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer hints */}
                <div className="px-4 py-3 border-t border-white/[0.05] flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                    <kbd className="px-1.5 py-0.5 bg-white/[0.04] rounded border border-white/[0.07] font-mono">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/[0.04] rounded border border-white/[0.07] font-mono">↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                    <kbd className="px-1.5 py-0.5 bg-white/[0.04] rounded border border-white/[0.07] font-mono">⏎</kbd>
                    Select
                  </span>
                  <span className="ml-auto text-[10px] text-neutral-700 font-mono">⌘K</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
