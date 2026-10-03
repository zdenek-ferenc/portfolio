import { Globe, Zap, PaintBucket, Layers, type LucideIcon } from "lucide-react";

export type ServiceColor = "accent" | "purple" | "blue" | "orange";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: ServiceColor;
  features: string[];
  needsUrl: boolean;
};

export const services: Service[] = [
  {
    id: "firemni-weby",
    icon: Globe,
    title: "Firemní weby",
    description: "Landing page, vícejazyčný web s CMS nebo kompletní firemní prezentace na moderním stacku.",
    color: "accent",
    features: ["Responzivní design", "SEO", "CMS"],
    needsUrl: false,
  },
  {
    id: "redesign",
    icon: PaintBucket,
    title: "Redesign",
    description: "Kompletní vizuální a technická modernizace existujícího webu. Nový design, lepší UX, rychlejší kód.",
    color: "purple",
    features: ["UI/UX", "Migrace", "Moderní stack"],
    needsUrl: true,
  },
  {
    id: "optimalizace",
    icon: Zap,
    title: "Optimalizace",
    description: "Audit výkonu, oprava Core Web Vitals a technické SEO. Rychlejší web = lepší konverze.",
    color: "blue",
    features: ["Core Web Vitals", "SEO", "Performance"],
    needsUrl: true,
  },
  {
    id: "web-aplikace",
    icon: Layers,
    title: "Web aplikace",
    description: "Dashboardy, SaaS, interní nástroje. Kompletní vývoj od návrhu po deployment.",
    color: "orange",
    features: ["Next.js", "API", "Databáze"],
    needsUrl: false,
  },
];

const accentStyle = {
  gradient: "rgba(255, 255, 255, 0.05)",
  border: "group-hover/svc:border-white/[0.16]",
  iconBg: "bg-white/[0.04]",
  iconText: "text-neutral-300",
  tagBg: "bg-white/[0.03]",
  tagText: "text-neutral-400",
  solid: "bg-accent",
  solidHover: "hover:bg-[#b82a2c]",
  ring: "ring-accent/30",
};

// Jeden akcent pro celý web: barevné varianty služeb jsou sjednocené.
export const colorConfig: Record<ServiceColor, typeof accentStyle> = {
  accent: accentStyle,
  purple: accentStyle,
  blue: accentStyle,
  orange: accentStyle,
};
