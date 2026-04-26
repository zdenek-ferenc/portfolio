"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Send, Check, Loader2, Link2 } from "lucide-react";
import { type Service, services, colorConfig } from "./data";

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = services.find((s) => s.title === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white hover:border-white/[0.15] transition-colors focus:outline-none focus:ring-1 focus:ring-white/20"
      >
        <div className="flex items-center gap-3">
          {selected &&
            (() => {
              const Icon = selected.icon;
              const config = colorConfig[selected.color];
              return (
                <>
                  <div className={`p-1.5 rounded-lg ${config.iconBg}`}>
                    <Icon className={`w-3.5 h-3.5 ${config.iconText}`} />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">
                    {selected.title}
                  </span>
                </>
              );
            })()}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-neutral-950 border border-white/[0.08] rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/60"
          >
            {services.map((s) => {
              const Icon = s.icon;
              const config = colorConfig[s.color];
              const isActive = s.title === value;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onChange(s.title);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm transition-colors text-left ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${config.iconBg}`}>
                    <Icon className={`w-3.5 h-3.5 ${config.iconText}`} />
                  </div>
                  <span className="font-medium flex-1 text-xs sm:text-sm">
                    {s.title}
                  </span>
                  {isActive && <Check className="w-3.5 h-3.5 text-green-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactModal({
  service: initialService,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const [selectedService, setSelectedService] = useState(initialService.title);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const activeService =
    services.find((s) => s.title === selectedService) || initialService;
  const showUrlField = activeService.needsUrl;
  const config = colorConfig[activeService.color];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          service: selectedService,
          message,
          currentUrl: showUrlField ? currentUrl : undefined,
        }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4 overflow-hidden">
      {/* Enhanced Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-accent/5 opacity-50" />
      </motion.div>

      {/* Modal / Bottom Sheet */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          mass: 1
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-neutral-950 border-t md:border border-white/[0.08] rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh] z-10"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-500 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "sent" ? (
          <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.1,
              }}
              className="p-4 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <Check className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Odesláno!</h3>
            <p className="text-sm text-neutral-400 max-w-xs">
              Díky za zprávu. Ozvu se ti co nejdřív na{" "}
              <span className="text-white font-medium">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/[0.1] transition-colors"
            >
              Zavřít
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  S čím ti můžu pomoct?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Napiš mi a ozvu se ti do 24 hodin.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Typ služby
                </label>
                <ServiceSelect
                  value={selectedService}
                  onChange={setSelectedService}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Tvůj email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvuj@email.cz"
                  className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-600 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>

              <AnimatePresence>
                {showUrlField && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Link2 className="w-3 h-3" />
                        URL aktuálního webu
                      </label>
                      <input
                        type="text"
                        inputMode="url"
                        value={currentUrl}
                        onChange={(e) => setCurrentUrl(e.target.value)}
                        placeholder="mojefirma.cz"
                        className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-600 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Popis projektu
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Popiš mi krátce, co potřebuješ..."
                  rows={4}
                  className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-600 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs sm:text-sm text-red-400">
                  Něco se pokazilo. Zkus to znovu nebo napiš přímo na mail.
                </p>
              )}
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || !email || !message}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${config.solid} ${config.solidHover} text-white`}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Odesílám...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Odeslat poptávku</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
