import CommandPalette from "@/components/command-palette";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-section";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <CommandPalette />
      
      <main className="min-h-screen">
        <Hero />
        <ProjectsSection />
        <Timeline />
      </main>

      <Footer />
    </>
  );
}
