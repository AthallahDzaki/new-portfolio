"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDownRight, Sparkles, Terminal } from "lucide-react";
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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-28 pb-12 safe-top safe-bottom select-none overflow-hidden"
    >
      {/* Top Metadata Badge */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-[11px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse inline-block" />
          <span>CREATIVE DEVELOPER & WEBGL ENGINEER</span>
        </div>
        <div className="flex items-center gap-4 text-white/40">
          <span>JAKARTA, INDONESIA</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">2026 PORTFOLIO</span>
        </div>
      </motion.div>

      {/* Main Center Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto my-auto py-12 flex flex-col items-start justify-center"
      >
        {/* Subtitle tag */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/80 font-mono text-xs uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Crafting Digital Realities</span>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-hero-title tracking-tight text-white uppercase max-w-5xl"
        >
          ATHALLAH DZAKI
          <span className="block text-white/40 font-medium tracking-tight mt-1 text-[0.8em]">
            ANGGORO SEPUTRO
          </span>
        </motion.h1>

        {/* Core Description Statement */}
        <motion.p
          variants={itemVariants}
          className="text-subtitle text-white/70 max-w-2xl mt-6 md:mt-8 font-light leading-relaxed"
        >
          Specialized in bridging creative design and technical engineering through{" "}
          <span className="text-white font-medium">Three.js</span>,{" "}
          <span className="text-[#00F0FF] font-medium">custom GLSL shaders</span>, and{" "}
          <span className="text-white font-medium">modern Next.js</span> architectures.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mt-8 md:mt-10 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection("work")}
            className="w-full sm:w-auto group"
          >
            <span>Explore Selected Work</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("skills")}
            className="w-full sm:w-auto"
          >
            <span>Inspect 3D Skills</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Status Bar */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white/10 font-mono text-xs text-white/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF]">// SCROLL TO EXPLORE</span>
          <span className="w-8 h-px bg-white/20 inline-block" />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("playground")}
            className="hover:text-[#00F0FF] transition-colors flex items-center gap-2 min-h-[44px] min-w-[44px]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>OPEN PLAYGROUND</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
