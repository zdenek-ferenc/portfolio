import CommandPalette from "@/components/command-palette";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-section";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-me";

export default function Home() {
  return (
    <>
      <CommandPalette />
      
      <main className="min-h-screen">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <Timeline />
      </main>

      <Footer />
    </>
  );
}
