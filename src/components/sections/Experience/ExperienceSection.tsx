"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { experiences } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Briefcase, CheckCircle2, MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="04" label="EXPERIENCE & JOURNEY" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-section-title text-white">
            Professional <br />
            <span className="text-white/40">Track Record.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            A chronological timeline of roles, creative engineering milestones, and high-impact web development contributions.
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l border-white/15 ml-3 sm:ml-6 space-y-12 sm:space-y-16"
      >
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className="relative pl-6 sm:pl-10 group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00F0FF] group-hover:scale-125 group-hover:bg-[#00F0FF] transition-all duration-300 shadow-[0_0_10px_#00F0FF]" />

            {/* Experience Card */}
            <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-white/10 group-hover:border-[#00F0FF]/40 transition-colors flex flex-col gap-4">
              {/* Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 font-mono text-xs">
                <div className="text-[#00F0FF] font-semibold tracking-wider">
                  {exp.period || exp.year}
                </div>
                {exp.location && (
                  <div className="text-white/40 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>

              {/* Role & Company */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors">
                  {exp.role}
                </h3>
                <div className="text-white/60 font-mono text-xs uppercase tracking-wider mt-1 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-white/40" />
                  <span>{exp.company}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-2 pt-2">
                  {exp.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack tags */}
              {exp.technologies && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
