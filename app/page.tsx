import CommandPalette from "@/components/command-palette";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-me";

export default function Home() {
  return (
    <>
      <CommandPalette />

      <main className="min-h-screen relative overflow-x-hidden">
        <Hero />

        <div className="relative space-y-24 sm:space-y-32 pt-12 sm:pt-20">
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <Timeline />
        </div>
      </main>

      <Footer />
    </>
  );
}
