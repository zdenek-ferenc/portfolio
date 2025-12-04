"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Home, Briefcase, User, FileText, Mail, LayoutGrid, X } from "lucide-react";

const links = [
  { label: "Domů", icon: <Home className="h-5 w-5" />, href: "/" },
  { label: "O mně", icon: <User className="h-5 w-5" />, href: "/#about-me" },
  { label: "Projekty", icon: <Briefcase className="h-5 w-5" />, href: "/#projects" },
  { label: "DevLog", icon: <FileText className="h-5 w-5" />, href: "/#devlog" },
  { label: "Kontakt", icon: <Mail className="h-5 w-5" />, href: "mailto:zdenekk.ferenc@gmail.com" },
];

export default function FloatingDock() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopDock />
      </div>
      <div className="block md:hidden">
        <MobileDock />
      </div>
    </>
  );
}

function DesktopDock() {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      // OPRAVA: Všechny třídy jsou spojené do jednoho bezpečného stringu.
      // Používám pole a .join(" "), aby to zůstalo čitelné v kódu, ale React dostal čistý string.
      className={[
        "fixed z-50 hidden gap-6 rounded-2xl border border-white/10 bg-neutral-900/40 p-3 backdrop-blur-md shadow-2xl md:flex items-center justify-center",
        "bottom-8 left-1/2 -translate-x-1/2 flex-row", // Pozice pro menší monitory
        "xl:bottom-auto xl:left-4 xl:top-1/2 xl:-translate-y-1/2 xl:flex-col xl:translate-x-0" // Pozice pro XL monitory
      ].join(" ")}
    >
      {links.map((link) => (
        <AppIcon mouseX={mouseX} mouseY={mouseY} key={link.label} {...link} />
      ))}
    </motion.div>
  );
}

function AppIcon({
  mouseX,
  mouseY,
  label,
  icon,
  href,
}: {
  mouseX: MotionValue;
  mouseY: MotionValue;
  label: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // OPRAVA: Přidán typ (val: number[])
  const distance = useTransform([mouseX, mouseY], (val: number[]) => {
    const x = val[0];
    const y = val[1];
    
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  });

  const scaleSync = useTransform(distance, [0, 100], [1.5, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href} className="relative">
      <div 
        ref={ref} 
        className="h-10 w-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          style={{ scale }}
          className="relative h-full w-full rounded-full border border-white/10 bg-white/5 shadow-sm transition-colors hover:bg-white/10 flex items-center justify-center group"
        >
          <div className="text-neutral-300 transition-colors group-hover:text-white">
            {icon}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="
              absolute whitespace-nowrap rounded-md border border-white/10 bg-neutral-900/90 px-2 py-1 text-xs text-white backdrop-blur-md z-50 pointer-events-none
              
              -top-12 left-1/2 -translate-x-1/2
              
              xl:top-1/2 xl:left-full xl:ml-4 xl:-translate-y-1/2 xl:translate-x-0
            "
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

function MobileDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 min-w-40"
          >
            {links.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-neutral-900/90 p-3 shadow-lg backdrop-blur-md active:bg-neutral-800"
                >
                  <span className="text-sm font-medium text-neutral-200">{link.label}</span>
                  <div className="text-neutral-400">{link.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-neutral-900/90 shadow-2xl backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <LayoutGrid className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}