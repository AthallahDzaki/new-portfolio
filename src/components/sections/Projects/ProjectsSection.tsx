"use client";

import React from "react";
import { projects } from "@/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="02" label="SELECTED WORK" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-section-title text-white">
            Engineered <br />
            <span className="text-white/40">Digital Experiences.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            A curated selection of interactive web applications, real-time 3D environments, custom shader experiments, and design systems.
          </p>
        </div>
      </div>

      {/* Projects Grid: 1 col on mobile, 2 cols on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* GitHub Repository Link Callout */}
      <div className="mt-12 p-6 sm:p-8 bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-1">
            OPEN SOURCE & EXPERIMENTS
          </div>
          <p className="text-white/70 text-sm font-light">
            More WebGL experiments, GLSL shaders, and creative prototypes are available on GitHub.
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          href="https://github.com/AthallahDzaki"
          external
          className="shrink-0"
        >
          <span>View GitHub Repositories</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
