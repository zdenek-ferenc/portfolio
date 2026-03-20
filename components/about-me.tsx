"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, ArrowUpRight, Calendar, Code2, Handshake } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

function ProfileCard() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col bg-neutral-900/50 backdrop-blur-sm border border-white/[0.06] rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
        {/* Hover glow border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-accent/25 via-transparent to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />

        <div className="relative aspect-4/5 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent z-10" />
          <Image
            src="/me.png"
            alt="Zdeněk Ferenc"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority
          />
          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.22em] mb-1.5">
              Developer & Founder
            </p>
            <h3 className="text-2xl font-bold text-white">Zdeněk Ferenc</h3>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent w-full" />

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-neutral-400 text-sm">
            <div className="p-1.5 rounded-lg bg-accent/[0.08] border border-accent/[0.12]">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <span>Brno, Česká republika</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400 text-sm">
            <div className="p-1.5 rounded-lg bg-accent/[0.08] border border-accent/[0.12]">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <a
              href="mailto:zdenekk.ferenc@gmail.com"
              className="hover:text-white transition-colors duration-300"
            >
              zdenekk.ferenc@gmail.com
            </a>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent w-full" />

          <CalButton />
        </div>
      </div>
    </div>
  );
}

function CalButton() {
  const CAL_LINK = "zdenekferenc/intro";

  return (
    <button
      onClick={async () => {
        const cal = await getCalApi({ embedJsUrl: "https://app.cal.eu/embed/embed.js" });
        cal("modal", {
          calLink: CAL_LINK,
          config: { theme: "dark" },
        });
      }}
      className="group/cal relative flex items-center justify-center gap-2.5 w-full bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] font-bold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-sm overflow-hidden"
    >
      <Calendar className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/cal:-translate-y-0.5" />
      <span className="relative z-10">Rezervovat Call</span>
      <div className="absolute inset-0 -translate-x-full group-hover/cal:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </button>
  );
}

export default function AboutSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ embedJsUrl: "https://app.cal.eu/embed/embed.js" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);

  return (
    <section className="px-6 sm:py-12 relative overflow-hidden" id="about-me">
      {/* Background glows */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-[250px] w-[500px] h-[500px] bg-accent/[0.05] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 -left-[200px] w-[400px] h-[400px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-10 items-start relative z-10">
        
        {/* Profile card — sticky on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const }}
          className="md:col-span-5 hidden md:flex sticky top-24"
        >
          <ProfileCard />
        </motion.div>

        {/* Content side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="md:col-span-7 flex flex-col justify-center h-full space-y-4 md:space-y-8 md:pl-6"
        >
          {/* Mobile name */}
          <motion.div variants={itemVariants} className="md:hidden">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">O mně</p>
            <h1 className="text-5xl font-bold text-white leading-[0.95]">
              Zdenek <br />
              <span className="text-neutral-600">Ferenc.</span>
            </h1>
          </motion.div>

          {/* Desktop heading */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3">
              O mně
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              Zdenek
              <br />
              <span className="text-neutral-700">Ferenc.</span>
            </h1>
            <motion.div
              className="h-[3px] w-0 bg-gradient-to-r from-accent to-orange-500 mt-5 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed"
          >
            Jsem vývojář a Founder. Momentálně věnuju většinu času budování{" "}
            <Link
              href="/projects/risehigh"
              className="inline-flex items-baseline gap-1 font-bold text-white hover:text-accent transition-all duration-300 group/rh cursor-pointer"
            >
              <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-no-repeat bg-left-bottom group-hover/rh:bg-[length:100%_1.5px] transition-all duration-500">
                RiseHigh
              </span>
              <ArrowUpRight className="w-4 h-4 self-center text-accent transform transition-transform duration-300 group-hover/rh:-translate-y-0.5 group-hover/rh:translate-x-0.5" />
            </Link>
          </motion.p>

          <div className="space-y-3">
            {/* Card: Co dělám */}
            <motion.div
              variants={itemVariants}
              className="group/card rounded-2xl p-5 sm:p-6 bg-neutral-900/30 border border-white/[0.05] hover:border-white/[0.09] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-accent rounded-r-full opacity-60 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent" />
              <div className="flex items-center gap-3 mb-3 relative z-10 pl-4">
                <div className="p-2 rounded-xl bg-accent/[0.07] border border-accent/10">
                  <Code2 className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg">Co dělám?</h3>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed relative z-10 pl-4">
                Tvořím kompletní webové aplikace. Navrhuju UI, vymýšlím features a píšu kód. Vše stavím na moderním stacku (Next.js, TypeScript, Supabase).
              </p>
            </motion.div>

            {/* Card: Networking */}
            <motion.div
              variants={itemVariants}
              className="group/card rounded-2xl p-5 sm:p-6 bg-neutral-900/30 border border-white/[0.05] hover:border-white/[0.09] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-orange-500/70 rounded-r-full opacity-60 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-orange-500/[0.03] via-transparent to-transparent" />
              <div className="flex items-center gap-3 mb-3 relative z-10 pl-4">
                <div className="p-2 rounded-xl bg-orange-500/[0.07] border border-orange-500/10">
                  <Handshake className="w-4 h-4 text-orange-400" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg">Networking & Spolupráce</h3>
              </div>
              <p className="hidden md:block text-neutral-400 text-sm sm:text-base leading-relaxed relative z-10 pl-4">
                Nehledám klasický full-time job. Věnuju se primárně svému startupu, ale jsem otevřený zajímavým spolupracím na projektech, konzultacím a discovery fázím. Pokud máš nápad, technický zásek nebo chceš probrat koncept, klidně se ozvi.
              </p>
              <p className="md:hidden text-neutral-400 text-sm sm:text-base leading-relaxed relative z-10 pl-4">
                Nehledám full-time, věnuju se startupu. Jsem ale otevřený zajímavým spolupracím, konzultacím a nápadům. Ozvi se!
              </p>
            </motion.div>
          </div>

          {/* Mobile sidebar */}
          <motion.div variants={itemVariants} className="md:hidden">
            <MobileSidebar />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileSidebar() {
  return (
    <div className="bg-neutral-900/40 backdrop-blur-sm border border-white/[0.04] rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3 text-neutral-400 text-sm">
        <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/15">
          <MapPin className="w-4 h-4 text-accent" />
        </div>
        <span>Brno, Česká republika</span>
      </div>

      <div className="flex items-center gap-3 text-neutral-400 text-sm">
        <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/15">
          <Mail className="w-4 h-4 text-accent" />
        </div>
        <a
          href="mailto:zdenekk.ferenc@gmail.com"
          className="hover:text-white transition-colors duration-300"
        >
          zdenekk.ferenc@gmail.com
        </a>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent w-full" />

      <CalButton />
    </div>
  );
}