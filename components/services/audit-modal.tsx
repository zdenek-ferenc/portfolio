"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Send, Check, Loader2, Link2 } from "lucide-react";

// "https://www.mojefirma.cz/kontakt" -> "mojefirma.cz"
export function prettyDomain(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0];
}

export function AuditModal({
  initialUrl = "",
  onClose,
}: {
  initialUrl?: string;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const urlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // Adresa už je vyplněná z věty v sekci, takže stačí doplnit e-mail
    const focusTarget = initialUrl ? emailRef.current : urlRef.current;
    if (!isMobile) focusTarget?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
      window.removeEventListener("keydown", onKey);
    };
    // Jen při otevření, ne při každé změně vstupů
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !url.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url: url.trim() }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const domain = prettyDomain(url);

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4 overflow-hidden">
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

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-lg bg-neutral-950 border-t md:border border-white/[0.08] rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh] z-10"
      >
        <button
          onClick={onClose}
          aria-label="Zavřít"
          className="cursor-pointer absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-500 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "sent" ? (
          <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="p-4 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <Check className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Mám to!</h3>
            <p className="text-sm text-neutral-400 max-w-xs">
              Projdu <span className="text-white font-medium">{domain}</span> a výsledek ti pošlu na{" "}
              <span className="text-white font-medium">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="cursor-pointer mt-4 px-6 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/[0.1] transition-colors"
            >
              Zavřít
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <div className="pr-10">
                <h3 id="audit-modal-title" className="text-lg sm:text-xl font-bold text-white mb-1">
                  Audit webu zdarma
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Projdu design i rychlost a pošlu ti, co bych zlepšil jako první. Bez závazků.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="audit-url"
                  className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Link2 className="w-3 h-3" />
                  Tvůj web
                </label>
                <input
                  id="audit-url"
                  ref={urlRef}
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="mojefirma.cz"
                  className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-500 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="audit-email"
                  className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Kam poslat výsledek
                </label>
                <input
                  id="audit-email"
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvuj@email.cz"
                  className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-500 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-xs sm:text-sm text-red-400">
                  Něco se pokazilo. Zkus to znovu, nebo mi napiš přímo na mail.
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || !email || !url.trim()}
                  className="cursor-pointer w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-accent hover:bg-[#b82a2c] text-white"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Odesílám...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Chci audit</span>
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
