"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function DevLogMaintenance() {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
         initial={{ opacity: 0, y: 20, scale: 0.98 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
         className="flex flex-col items-center text-center max-w-sm"
      >
         <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6 shadow-2xl relative group">
            <div className="absolute inset-0 bg-accent/[0.08] blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
            <Terminal className="w-7 h-7 text-accent" />
         </div>

         <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Developer Notes</span>
         <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">DevLog</h1>
         
         <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed mb-10">
            Právě dávám dohromady první články a poznámky z vývoje. Brzy zde najdeš hlubší vhledy do mého workflow.
         </p>

         <Link href="/">
            <button className="cursor-pointer bg-white text-black font-semibold px-6 py-3 rounded-2xl text-sm hover:scale-95 transition-all flex items-center gap-2">
               <ArrowLeft className="w-3.5 h-3.5" />
               Zpět na úvod
            </button>
         </Link>
      </motion.div>
    </div>
  );
}
