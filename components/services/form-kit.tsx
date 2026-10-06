"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

// Společné stavební kameny formulářů v modalech (audit, poptávka, obecný kontakt)

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_EMAIL = "zdenekk.ferenc@gmail.com";

export const inputClass =
  "block w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 text-base sm:text-[15px] text-white placeholder:text-neutral-500 caret-accent outline-none transition-[border-color,background-color,box-shadow] duration-150 hover:border-white/[0.16] focus:border-accent/70 focus:bg-white/[0.04] focus:shadow-[0_0_0_4px_rgba(207,47,49,0.14)] aria-[invalid=true]:border-accent/70";

// Obal pro input s prefixem (https://), focus se kreslí na celém rámečku
export const inputShellClass =
  "flex items-center rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 transition-[border-color,background-color,box-shadow] duration-150 hover:border-white/[0.16] focus-within:border-accent/70 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_0_4px_rgba(207,47,49,0.14)] has-[[aria-invalid=true]]:border-accent/70";

type Status = "idle" | "sending" | "sent" | "error";

// Odeslání s minimální délkou, aby spinner jen neproblikl
export function useSend(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function send(payload: Record<string, unknown>) {
    setStatus("sending");
    try {
      const [res] = await Promise.all([
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        new Promise((r) => setTimeout(r, 700)),
      ]);
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { status, send };
}

export function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-neutral-300">
          {label}
        </label>
        {hint && <span className="text-xs text-neutral-500">{hint}</span>}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p id={`${id}-error`} className="pt-2 text-[13px] text-[#f07173]">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SendError({ show }: { show: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <p role="alert" className="mt-5 rounded-xl bg-accent/[0.08] px-4 py-3 text-[13px] leading-relaxed text-neutral-300">
            Odeslání se nepovedlo. Zkus to prosím znovu, nebo mi napiš rovnou na{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white underline decoration-accent decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      aria-busy={sending}
      className="group relative mt-6 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-accent text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#b82a2c] active:scale-[0.985] disabled:cursor-progress disabled:hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={sending ? "sending" : "idle"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="flex items-center gap-2"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Odesílám
            </>
          ) : (
            <>
              {children}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// Formulář a potvrzení leží ve stejné buňce gridu: po odeslání se nic nepřeskládá,
// formulář se rozplyne a na jeho místě se objeví potvrzení.
export function FormStage({
  done,
  success,
  children,
}: {
  done: boolean;
  success: ReactNode;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid">
      <motion.div
        inert={done}
        aria-hidden={done}
        animate={
          done
            ? { opacity: 0, scale: reduceMotion ? 1 : 0.98, filter: reduceMotion ? "none" : "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="[grid-area:1/1]"
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {done && <div className="[grid-area:1/1]">{success}</div>}
      </AnimatePresence>
    </div>
  );
}

export function Success({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: EASE_OUT },
  });

  return (
    <div role="status" className="flex h-full flex-col items-center justify-center px-6 pb-8 pt-4 text-center sm:px-7">
      <svg viewBox="0 0 56 56" className="size-14" aria-hidden>
        <circle cx="28" cy="28" r="27" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <motion.circle
          cx="28"
          cy="28"
          r="27"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        />
        <motion.path
          d="M19 28.5l6 6 12-13"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: EASE_OUT }}
        />
      </svg>
      <motion.h3 {...rise(0.25)} className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </motion.h3>
      <motion.p {...rise(0.32)} className="mt-2 max-w-[30ch] text-sm leading-relaxed text-neutral-400 text-pretty">
        {children}
      </motion.p>
      <motion.button
        {...rise(0.4)}
        type="button"
        autoFocus
        onClick={onClose}
        className="mt-7 h-10 cursor-pointer rounded-full border border-white/[0.1] px-5 text-sm font-medium text-neutral-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        Zavřít
      </motion.button>
    </div>
  );
}

// ⌘/Ctrl + Enter v textovém poli odešle formulář
export function submitOnModEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
  }
}
