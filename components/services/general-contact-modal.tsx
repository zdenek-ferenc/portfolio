"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Check, Loader2 } from "lucide-react";

export function GeneralContactModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
          service: "Obecný dotaz",
          message,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-neutral-950 border-t sm:border border-white/[0.08] rounded-t-[2rem] sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]"
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
                  Napiš mi
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Ať už máš otázku, nebo chceš jen tak pozdravit.
                </p>
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

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Zpráva
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Co mi chceš napsat?"
                  rows={5}
                  className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-neutral-950 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-neutral-600 hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs sm:text-sm text-red-400">
                  Něco se pokazilo. Zkus to znovu nebo mi napiš napřímo.
                </p>
              )}
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || !email || !message}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-white/90"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Odesílám...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Odeslat zprávu</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
