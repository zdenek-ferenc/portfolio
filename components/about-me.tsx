"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, MapPin, Mail, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      className="py-12 px-6 md:px-12 relative overflow-hidden"
      id="about-me"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 hidden md:flex sticky top-24"
        >
          <div className="w-full flex flex-col bg-surface border border-white/10 rounded-3xl overflow-hidden">
            <div className="relative aspect-4/5 w-full overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src="/me.png"
                alt="Zdeněk Ferenc"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="h-px bg-white/10 w-full" />
            <Sidebar noCard />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-7 flex flex-col justify-center h-full space-y-4 lg:space-y-10 md:pl-10"
        >
          <div className="flex items-center gap-6 md:hidden mb-10">
            <div>
              <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-1">O mně</h2>
              <h1 className="text-6xl font-bold text-white leading-none">
                Zdenek <br />
                <span className="text-neutral-600">Ferenc.</span>
              </h1>
            </div>
          </div>

          <div className="hidden md:block">
            <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">O mně</h2>
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-2">
              Zdenek<br />
              <span className="text-neutral-600">Ferenc.</span>
            </h1>
          </div>

          <div className="space-y-6 lg:space-y-8 text-lg text-neutral-400 leading-relaxed">
            <p className="text-xl lg:text-2xl text-white font-light">
              Jsem <span className="text-accent font-medium">Product Engineer</span> a designér, který věří, že kód je jen nástroj k řešení skutečných problémů.
            </p>

            <div className="space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-accent" /> Co dělám?
              </h3>
              <p className="text-base lg:text-lg">
                Nestavím jen weby, stavím digitální produkty. Můj přístup kombinuje technickou preciznost (Next.js, TypeScript, Backend) s citem pro uživatelskou zkušenost (UI/UX). Aktuálně se plně věnuji projektu <strong className="text-white">RiseHigh</strong>, kde propojujeme studenty se startupy.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-accent" /> Kam směřuji?
              </h3>
              <p className="text-base lg:text-lg">
                Baví mě <strong className="text-white">building in public</strong> a podnikání. Nehledám jen job, hledám zajímavé problémy k řešení a chytré lidi k diskuzi. Pokud máš nápad, který potřebuje technického partnera nebo konzultaci, jsem jedno ucho.
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <Sidebar />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function Sidebar({ noCard = false }: { noCard?: boolean }) {
  const content = (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-neutral-400">
        <MapPin className="w-5 h-5 text-accent" />
        <span>Brno, Česká republika</span>
      </div>

      <div className="flex items-center gap-3 text-neutral-400">
        <Mail className="w-5 h-5 text-accent" />
        <a
          href="mailto:zdenekk.ferenc@gmail.com"
          className="hover:text-white transition-colors"
        >
          zdenekk.ferenc@gmail.com
        </a>
      </div>

      <div className="h-px bg-white/5 w-full my-2 mb-5" />

      <a
        href="/cv.pdf"
        target="_blank"
        className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/5 text-white py-3 rounded-2xl transition-all group"
      >
        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        Stáhnout CV
      </a>
    </div>
  );

  if (noCard) {
    return <div className="p-6">{content}</div>;
  }

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 space-y-4 mt-4">
      {content}
    </div>
  );
}
