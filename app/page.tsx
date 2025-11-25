import CommandPalette from "@/components/command-palette";
import Hero from "@/components/hero";
import BentoGrid from "@/components/bento-grid";
import ProjectsSection from "@/components/projects-section";
import InteractivePlayground from "@/components/interactive-playground";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <CommandPalette />
      
      <main className="min-h-screen">
        <Hero />
        <ProjectsSection />
        {/* <InteractivePlayground />  */}
        <Timeline />
      </main>

      <Footer />
    </>
  );
}
