"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDownRight, Sparkles, Terminal, Activity, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSectionProps {
  onDistortChange?: (val: number) => void;
}

export function HeroSection({ onDistortChange }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-8 safe-top safe-bottom select-none overflow-hidden"
    >
      {/* Main Editorial Content - Positioned naturally in the upper-middle area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto flex flex-col items-start justify-start pt-2 sm:pt-4 pb-4"
      >
        {/* Status & Tech Pill */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2.5 mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-[#00F0FF]/30 text-white font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping inline-block" />
            <span>Creative Fullstack & Three.js Engineer</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 text-white/50 font-mono text-xs uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>GPU Shaders Active</span>
          </div>
        </motion.div>

        {/* Dynamic Massive Editorial Typography */}
        <motion.h1
          variants={itemVariants}
          className="text-hero-title tracking-tight text-white uppercase max-w-5xl leading-[0.95]"
        >
          ATHALLAH DZAKI
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 font-medium tracking-tight mt-1 text-[0.8em]">
            ANGGORO SEPUTRO
          </span>
        </motion.h1>

        {/* Core Statement */}
        <motion.p
          variants={itemVariants}
          className="text-subtitle text-white/70 max-w-2xl mt-5 md:mt-6 font-light leading-relaxed"
        >
          Engineering the next generation of web applications through{" "}
          <span className="text-[#00F0FF] font-semibold underline decoration-[#00F0FF]/40 underline-offset-4">
            Three.js
          </span>
          , procedural{" "}
          <span className="text-white font-semibold">GLSL shaders</span>, and{" "}
          <span className="text-white font-semibold">Next.js fullstack systems</span>.
        </motion.p>

        {/* Live Metrics Strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 sm:gap-6 mt-5 pt-5 border-t border-white/10 font-mono text-[11px] text-white/60"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>60 FPS IMMERSIVE CANVAS</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>DIAMOND CONSTELLATION GRAPH</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mt-7 md:mt-8 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection("work")}
            className="w-full sm:w-auto group shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]"
          >
            <span>Explore Selected Work</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("skills")}
            className="w-full sm:w-auto"
          >
            <span>Inspect 3D Diamond Graph</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Status Bar */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs text-white/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF]">{"// SCROLL TO EXPLORE EXPERIENCE"}</span>
          <span className="w-8 h-px bg-white/20 inline-block" />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("playground")}
            className="hover:text-[#00F0FF] transition-colors flex items-center gap-2 min-h-[44px] min-w-[44px]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>OPEN 3D SHADER LAB</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
