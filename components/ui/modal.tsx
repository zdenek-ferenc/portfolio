"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, useDragControls, useReducedMotion, type PanInfo } from "framer-motion";
import { X } from "lucide-react";

// Rychlý nástup, plynulé dobrzdění. Odjezd je kratší než příjezd.
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;
// Křivka systémových sheetů v iOS
const EASE_SHEET = [0.32, 0.72, 0, 1] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusableIn(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0
  );
}

export function Modal({
  title,
  description,
  onClose,
  initialFocus,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  onClose: () => void;
  initialFocus?: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  // Na telefonu je z modalu spodní sheet, který jde stáhnout prstem dolů
  const [isSheet] = useState(() => window.matchMedia("(max-width: 639px)").matches);
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    // scrollbar-gutter v globals.css drží místo po scrollbaru, takže stránka neposkočí
    html.style.overflow = "hidden";

    // Na mobilu nefokusujeme input, klávesnice by zakryla půlku sheetu
    const target = !isSheet && initialFocus?.current ? initialFocus.current : panelRef.current;
    target?.focus({ preventScroll: true });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      // Tab zůstává uvnitř dialogu
      const items = focusableIn(panelRef.current);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
    // Jen při otevření
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  }

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : isSheet
      ? {
          initial: { y: "100%" },
          animate: { y: 0, transition: { duration: 0.5, ease: EASE_SHEET } },
          exit: { y: "100%", transition: { duration: 0.32, ease: EASE_SHEET } },
        }
      : {
          initial: { opacity: 0, y: 12, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
          exit: { opacity: 0, y: 6, scale: 0.985, transition: { duration: 0.18, ease: EASE_IN } },
        };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_IN } }}
        onClick={onClose}
        className="absolute inset-0 touch-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),rgba(0,0,0,0.82))]"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        {...panelMotion}
        drag={isSheet && !reduceMotion ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.9 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 45 }}
        onDragEnd={handleDragEnd}
        className="relative flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/[0.08] bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_-16px_48px_-12px_rgba(0,0,0,0.6)] outline-none sm:max-h-[min(46rem,calc(100dvh-3rem))] sm:max-w-[30rem] sm:rounded-[1.25rem] sm:border-b sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,0,0,0.5)]"
      >
        <div
          onPointerDown={(e) => {
            if (isSheet && !(e.target as HTMLElement).closest("button")) dragControls.start(e);
          }}
          className={isSheet ? "shrink-0 touch-none cursor-grab active:cursor-grabbing" : "shrink-0"}
        >
          {isSheet && <div aria-hidden className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-white/[0.16]" />}

          <div className="flex items-start justify-between gap-6 px-6 pt-5 sm:px-7 sm:pt-7">
            <div className="min-w-0">
              <h2
                id={titleId}
                className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em] text-white text-balance"
              >
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="mt-1.5 text-sm leading-relaxed text-neutral-400 text-pretty">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zavřít"
              className="-mr-2 -mt-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-500 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <X className="size-[18px]" />
            </button>
          </div>
        </div>

        <div className="custom-scrollbar min-h-0 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          {children}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
