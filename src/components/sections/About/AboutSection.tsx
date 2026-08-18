"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Code, Compass, Layers, Zap } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PILLARS = [
  {
    icon: Code,
    title: "Creative Coding",
    description:
      "Crafting bespoke WebGL shaders, interactive 3D physics, and procedural particle systems with Three.js.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Targeting 60 FPS across low-power mobile devices and high-end screens with adaptive DPR and memory management.",
  },
  {
    icon: Layers,
    title: "Modern Architecture",
    description:
      "Engineering type-safe Next.js systems, server components, and responsive design tokens.",
  },
  {
    icon: Compass,
    title: "Accessible Interaction",
    description:
      "Bridging rich 3D graphics with standard WAI-ARIA keyboard navigation and full screen-reader fallbacks.",
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto"
    >
      <SectionLabel number="01" label="ABOUT" />

      {/* Main Heading Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-section-title text-white">
            I&apos;m Athallah Dzaki <br />
            <span className="text-white/40">Anggoro Seputro.</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed">
            A Creative Developer and Frontend Engineer based in Jakarta, Indonesia. I specialize in merging technical engineering with design aesthetics to build immersive, performant, and memorable digital experiences.
          </p>

          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            With a strong foundation in modern React and Three.js, I treat the web canvas as a creative playground—engineering custom shaders, spatial interactions, and fluid typography that work seamlessly on both mobile smartphones and ultra-wide desktop monitors.
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <div className="text-white/40 uppercase mb-1">LOCATION</div>
              <div className="text-white font-medium">Jakarta, ID</div>
            </div>
            <div>
              <div className="text-white/40 uppercase mb-1">FOCUS</div>
              <div className="text-[#00F0FF] font-medium">Three.js & Next.js</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-white/40 uppercase mb-1">STATUS</div>
              <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Available 2026
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Competency Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
        >
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="p-5 bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-[#00F0FF] group-hover:bg-[#00F0FF]/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold uppercase text-white tracking-wider">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light pl-11">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
