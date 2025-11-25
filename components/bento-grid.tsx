"use client";

import { MapPin, Github, Twitter, Linkedin, Mail, X } from "lucide-react";
import Image from "next/image";

export default function BentoGrid() {
  const techStack = [
    { name: "Next.js", icon: "/nextjs-icon.svg", className: "invert" },
    { name: "React", icon: "/React-icon.svg.png" },
    { name: "TypeScript", icon: "/919832.png" },
    { name: "Tailwind", icon: "/tailwind.svg" },
    { name: "Supabase", icon: "/supabase-icon-5uqgeeqeknngv9las8zeef.webp" },
    { name: "Stripe", icon: "/stripe-v2.svg" },
  ];

  const socialLinks = [
    {
      name: "Github",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/zdenek-ferenc",
      color: "hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/zdenek-ferenc-92a64b2ba/",
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:zdenekk.ferenc@gmail.com",
      color: "hover:text-emerald-400",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 sm:py-12" id="about">
      <div className="max-w-6xl w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div 
  className="flex h-full flex-col items-center justify-center md:col-span-2 overflow-hidden rounded-3xl sm:bg-neutral-900/50 sm:border border-white/5 p-4 backdrop-blur-xl transition-colors group animate-fade-in-up"
>
  <h3 className="text-base sm:text-xl pl-4 font-bold text-neutral-200">TechStack</h3>
  <div className="flex flex-col inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity" />

  <div className="grid grid-cols-6 sm:grid-cols-6 gap-4 items-center justify-items-center relative z-10">
    {techStack.map((tech, index) => (
      <div 
        key={index} 
        className="flex flex-col items-center justify-end gap-2 group/icon duration-300 ease-in-out duration-200 relative h-18 sm:h-24 smw-24"
      >
        <div className="p-4 cursor-pointer rounded-2xl sm:bg-white/5 sm:border border-white/5 group-hover/icon:bg-white/10 transition-all duration-200 ease-in-out duration-200 shadow-2xl relative h-16 w-16 sm:w-16 sm:h-16 flex items-center justify-center group-hover/icon:-translate-y-2">
          <Image
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            className={`object-contain ${tech.className || ""}`}
          />
        </div>
        <span className="absolute bottom-0 text-xs font-semibold text-white opacity-0 group-hover/icon:opacity-100 transition-all ease-in-out duration-300 transform translate-y-2 group-hover/icon:translate-y-0">
          {tech.name}
        </span>
      </div>
    ))}
  </div>
</div>
          <div 
            className="relative hidden md:flex overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/5 !p-8 backdrop-blur-xl transition-colors flex flex-col items-center justify-center text-center gap-6 group animate-fade-in-up delay-100"
          >
            <div className="w-16 h-16 bg-[#CF2F31]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-8 h-8 text-[#CF2F31]" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-2">Lokace</p>
              <p className="text-xl font-bold text-neutral-200">Brno, Česko</p>
            </div>
          </div>

          <div 
            className="md:col-span-3 relative overflow-hidden rounded-3xl sm:bg-neutral-900/50 sm:border border-white/5 sm:p-4 backdrop-blur-xl transition-colors flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 group animate-fade-in-up delay-200"
          >
            <div className="text-center flex items-center justify-center md:text-left">
              <h3 className="text-base sm:text-xl pl-4 font-bold text-neutral-200">Spojme se</h3>
            </div>
            
            <div className="flex flex-wrap !gap-2 sm:gap-4 justify-center md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white/5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-neutral-400 ${social.color}`}
                >
                  {social.icon}
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
