"use client";

import React, { useState } from "react";
import { Skill, SkillCategory } from "@/types";
import { skills as allSkills } from "@/data/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillCategoryFilters } from "./SkillCategoryFilters";
import { SkillFallbackGrid } from "./SkillFallbackGrid";
import { SkillDetailModal } from "./SkillDetailModal";
import { Sparkles, MousePointerClick } from "lucide-react";

interface SkillsSectionProps {
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill | null) => void;
}

export function SkillsSection({
  selectedSkill,
  onSelectSkill,
}: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="03" label="SKILLS & CAPABILITIES" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-section-title text-white">
            Interactive <br />
            <span className="text-white/40">Knowledge Graph.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            Explore technologies across Creative WebGL, Modern Frontend, Backend services, and DevOps tools. Tap or click any node to inspect detailed use cases.
          </p>
        </div>

        {/* Tip Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 font-mono text-xs text-[#00F0FF] self-start md:self-auto">
          <MousePointerClick className="w-4 h-4 animate-bounce" />
          <span>Interactive 3D Nodes Active</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <SkillCategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Accessible Skill Grid Fallback & Keyboard Navigation */}
      <div className="w-full">
        <SkillFallbackGrid
          skills={allSkills}
          selectedCategory={selectedCategory}
          onSelectSkill={(s) => onSelectSkill(s)}
        />
      </div>

      {/* Shared Skill Detail Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => onSelectSkill(null)}
        onSelectSkill={(s) => onSelectSkill(s)}
      />
    </section>
  );
}
