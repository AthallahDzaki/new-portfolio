"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Code, Compass, Layers, Zap, GraduationCap, Briefcase, MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PILLARS = [
  {
    icon: Code,
    title: "Creative Coding & 3D WebGL",
    description:
      "Crafting bespoke WebGL shaders, Three.js 3D web applications, MMD motion loaders, and real-time interactive canvases.",
  },
  {
    icon: Zap,
    title: "High-Performance Systems",
    description:
      "Targeting 60 FPS across low-power mobile smartphones and high-end workstations with adaptive DPR and memory management.",
  },
  {
    icon: Layers,
    title: "Fullstack Web & Servers",
    description:
      "Architecting scalable Next.js & React architectures, PHP backend services, MySQL databases, Linux servers, and real-time WebSockets.",
  },
  {
    icon: Compass,
    title: "Proven Production Engineering",
    description:
      "Demonstrated track record engineering production platforms: SA-Chaos.id ecosystem, enterprise client solutions at SIDIGI.asia, and arthabonsai.com.",
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
            A Creative Fullstack Developer & WebGL Engineer based in <span className="text-white font-medium">Malang, Indonesia</span>. Currently pursuing Computer Science at <span className="text-[#00F0FF] font-medium">ITN Malang</span> and working as a Fullstack Web Developer at <span className="text-[#00F0FF] font-medium">SIDIGI.asia</span>.
          </p>

          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Specializing in bridging modern fullstack web engineering (<span className="text-white font-medium">Next.js, React, PHP, MySQL, Linux Server Management</span>) with immersive 3D graphics (<span className="text-white font-medium">Three.js, WebGL & GLSL Shaders</span>). I am also the founder and lead developer of <a href="https://sa-chaos.id" target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] underline hover:text-white transition-colors">SA-Chaos.id</a>—a real-time interactive GTA San Andreas livestreaming mod platform.
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <div className="text-white/40 uppercase mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#00F0FF]" />
                LOCATION
              </div>
              <div className="text-white font-medium">Malang, Indonesia</div>
            </div>
            <div>
              <div className="text-white/40 uppercase mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-[#00F0FF]" />
                WORKPLACE
              </div>
              <div className="text-[#00F0FF] font-medium">SIDIGI.asia (Fullstack)</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-white/40 uppercase mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3 text-[#00F0FF]" />
                EDUCATION
              </div>
              <div className="text-white font-medium">ITN Malang</div>
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
          {PILLARS.map((pillar) => {
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
