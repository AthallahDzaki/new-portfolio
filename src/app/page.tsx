"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { AboutSection } from "@/components/sections/About/AboutSection";
import { SkillsSection } from "@/components/sections/Skills/SkillsSection";
import { ProjectsSection } from "@/components/sections/Projects/ProjectsSection";
import { ExperienceSection } from "@/components/sections/Experience/ExperienceSection";
import { PlaygroundSection } from "@/components/sections/Playground/PlaygroundSection";
import { TerminalSection } from "@/components/sections/Terminal/TerminalSection";
import { ContactSection } from "@/components/sections/Contact/ContactSection";
import { Skill } from "@/types";

// Dynamic import of Three.js background canvas to guarantee client-side only execution and WebGL safety
const ThreeCanvas = dynamic(
  () => import("@/three/ThreeCanvas").then((mod) => mod.ThreeCanvas),
  { ssr: false }
);

const HeroObject = dynamic(
  () => import("@/three/hero/HeroObject").then((mod) => mod.HeroObject),
  { ssr: false }
);

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [playgroundControls, setPlaygroundControls] = useState({
    distortion: 1.0,
    wireframe: false,
    speed: 1.0,
    colorTheme: "#00F0FF",
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#00F0FF]/30 selection:text-white">
      {/* Real asset Preloader */}
      <Preloader />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Mobile-first Navigation */}
      <Navigation />

      {/* Global Background Three.js 3D Canvas */}
      <ThreeCanvas scrollProgress={scrollProgress}>
        <HeroObject distortion={playgroundControls.distortion} />
      </ThreeCanvas>

      {/* HTML Content Flow */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <HeroSection />
        <AboutSection />
        <SkillsSection
          selectedSkill={selectedSkill}
          onSelectSkill={setSelectedSkill}
        />
        <ProjectsSection />
        <ExperienceSection />
        <PlaygroundSection
          controls={playgroundControls}
          onChangeControls={setPlaygroundControls}
        />
        <TerminalSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
