"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { type Service, services } from "./services/data";
import { ServiceCard } from "./services/service-card";
import { ContactModal } from "./services/contact-modal";
import { GeneralContactModal } from "./services/general-contact-modal";
import { AuditModal } from "./services/audit-modal";
import { AuditCard } from "./services/audit-card";

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState<Service | null>(null);
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);
  const [auditUrl, setAuditUrl] = useState<string | null>(null);

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
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter leading-[1]">
            S čím ti pomůžu<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <AuditCard onOpen={setAuditUrl} />
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
            className="group w-full sm:w-auto relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 bg-white text-neutral-950 rounded-xl font-medium text-sm hover:bg-neutral-200 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Pojďme si zavolat</span>
          </button>

          <button
            onClick={() => setIsGeneralModalOpen(true)}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 border border-white/[0.12] text-neutral-300 rounded-xl font-medium text-sm hover:text-white hover:border-white/25 hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-300 cursor-pointer"
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
        {auditUrl !== null && (
          <AuditModal initialUrl={auditUrl} onClose={() => setAuditUrl(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
