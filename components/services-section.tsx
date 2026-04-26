"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { type Service, services } from "./services/data";
import { ServiceCard } from "./services/service-card";
import { ContactModal } from "./services/contact-modal";
import { GeneralContactModal } from "./services/general-contact-modal";

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState<Service | null>(null);
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);

  const handleCal = async () => {
    const cal = await getCalApi({
      embedJsUrl: "https://app.cal.eu/embed/embed.js",
    });
    cal("modal", {
      calLink: "zdenekferenc/intro",
      config: { theme: "dark" },
    });
  };

  return (
    <section
      className="relative py-16 sm:pt-12 pb-0 overflow-hidden"
      id="services"
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mobile-no-animate mb-10 sm:mb-14"
        >
          <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Služby
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[0.95]">
            S čím ti pomůžu<span className="text-neutral-600">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => setActiveModal(service)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mobile-no-animate mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={handleCal}
            className="group w-full sm:w-auto relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-xl sm:rounded-2xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <Calendar className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="relative z-10">Pojďme si zavolat</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </button>

          <button
            onClick={() => setIsGeneralModalOpen(true)}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-white/[0.08] text-neutral-400 rounded-xl sm:rounded-2xl font-medium text-sm hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
          >
            <span>Nebo napiš na mail</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <ContactModal
            service={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
        {isGeneralModalOpen && (
          <GeneralContactModal onClose={() => setIsGeneralModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
