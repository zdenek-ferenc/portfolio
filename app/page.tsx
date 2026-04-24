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

        {/* Ambient background layer */}
        <div className="relative" style={{ contain: "layout style" }}>
          {/* Dot grid texture — visible but not dominant */}
          <div className="absolute inset-0 bg-dot-grid opacity-100 pointer-events-none z-0 will-change-transform" />

          {/* Large ambient orbs — positioned along the page flow */}
          <div
            className="absolute top-[200px] -left-[200px] w-[800px] h-[800px] rounded-full pointer-events-none z-0 will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(207,47,49,0.12) 0%, transparent 60%)",
              filter: "blur(100px)",
              animation: "float-slow 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[900px] -right-[200px] w-[700px] h-[700px] rounded-full pointer-events-none z-0 will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)",
              filter: "blur(100px)",
              animation: "float-slow-reverse 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[1800px] left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)",
              filter: "blur(100px)",
              animation: "float-slow 30s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[2800px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0 will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(207,47,49,0.08) 0%, transparent 60%)",
              filter: "blur(80px)",
              animation: "float-slow-reverse 22s ease-in-out infinite",
            }}
          />

          {/* Content sections */}
          <div className="relative z-10">
            <AboutSection />
            <ServicesSection />
            {/* Divider: About → Services */}
            <div className="relative h-px w-full max-w-4xl mx-auto my-12 sm:my-20">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 5%, rgba(207,47,49,0.3) 30%, rgba(255,140,66,0.2) 50%, rgba(207,47,49,0.3) 70%, transparent 95%)",
                }}
              />
              <div
                className="absolute -top-4 left-[10%] right-[10%] h-8"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(207,47,49,0.06), rgba(255,140,66,0.04), transparent)",
                  filter: "blur(8px)",
                }}
              />
            </div>

            <ProjectsSection />

            <div className="relative h-px w-full max-w-4xl mx-auto my-12 sm:my-20">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 90%)",
                }}
              />
            </div>

            <Timeline />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
