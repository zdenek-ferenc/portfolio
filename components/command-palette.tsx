"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Mail, Rocket, Github } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(() => [
    {
      id: "risehigh",
      label: "Go to RiseHigh",
      icon: <Rocket className="w-4 h-4" />,
      action: () => window.open("https://risehigh.app", "_blank"),
    },
    {
      id: "github",
      label: "View Github",
      icon: <Github className="w-4 h-4" />,
      action: () => window.open("https://github.com/zdenekhynek", "_blank"),
    },
    {
      id: "email",
      label: "Copy Email",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText("zdenek@example.com");
        setIsOpen(false);
      },
    },
    {
      id: "lab",
      label: "Go to Lab",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => {
        const labSection = document.getElementById("lab");
        labSection?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
  ], []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
      }

      // Enter to execute
      if (e.key === "Enter") {
        e.preventDefault();
        commands[selectedIndex].action();
        setIsOpen(false);
      }

      // Escape to close
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Command Palette Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#222222]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-[#A1A1A1]" />
                <input
                  type="text"
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent outline-none text-[#EDEDED] placeholder:text-[#A1A1A1]"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-white/5 rounded border border-white/10 text-[#A1A1A1]">
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <div className="p-2">
                {commands.map((command, index) => (
                  <motion.button
                    key={command.id}
                    onClick={command.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedIndex === index
                        ? "bg-[#CF2F31]/10 text-[#CF2F31]"
                        : "text-[#EDEDED] hover:bg-white/5"
                    }`}
                  >
                    {command.icon}
                    <span className="flex-1 text-left">{command.label}</span>
                    {selectedIndex === index && (
                      <kbd className="px-2 py-1 text-xs bg-white/5 rounded border border-white/10">
                        ⏎
                      </kbd>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer Hint */}
              <div className="px-4 py-3 border-t border-white/10 text-xs text-[#A1A1A1] flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">⏎</kbd>
                  Select
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
