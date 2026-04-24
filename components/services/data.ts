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

export const colorConfig: Record<
  ServiceColor,
  {
    gradient: string;
    border: string;
    iconBg: string;
    iconText: string;
    tagBg: string;
    tagText: string;
    solid: string;
    solidHover: string;
    ring: string;
  }
> = {
  accent: {
    gradient: "rgba(207, 47, 49, 0.12)",
    border: "group-hover/svc:border-accent/30",
    iconBg: "bg-accent/[0.08]",
    iconText: "text-accent",
    tagBg: "bg-accent/[0.06]",
    tagText: "text-accent/80",
    solid: "bg-accent",
    solidHover: "hover:bg-accent/90",
    ring: "ring-accent/30",
  },
  purple: {
    gradient: "rgba(147, 51, 234, 0.12)",
    border: "group-hover/svc:border-purple-500/30",
    iconBg: "bg-purple-500/[0.08]",
    iconText: "text-purple-400",
    tagBg: "bg-purple-500/[0.06]",
    tagText: "text-purple-400/80",
    solid: "bg-purple-500",
    solidHover: "hover:bg-purple-500/90",
    ring: "ring-purple-500/30",
  },
  blue: {
    gradient: "rgba(59, 130, 246, 0.12)",
    border: "group-hover/svc:border-blue-500/30",
    iconBg: "bg-blue-500/[0.08]",
    iconText: "text-blue-400",
    tagBg: "bg-blue-500/[0.06]",
    tagText: "text-blue-400/80",
    solid: "bg-blue-500",
    solidHover: "hover:bg-blue-500/90",
    ring: "ring-blue-500/30",
  },
  orange: {
    gradient: "rgba(249, 115, 22, 0.12)",
    border: "group-hover/svc:border-orange-500/30",
    iconBg: "bg-orange-500/[0.08]",
    iconText: "text-orange-400",
    tagBg: "bg-orange-500/[0.06]",
    tagText: "text-orange-400/80",
    solid: "bg-orange-500",
    solidHover: "hover:bg-orange-500/90",
    ring: "ring-orange-500/30",
  },
};
