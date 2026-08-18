"use client";

import React from "react";
import { Skill, SkillCategory } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface SkillFallbackGridProps {
  skills: Skill[];
  selectedCategory: SkillCategory | "all";
  onSelectSkill: (skill: Skill) => void;
}

export function SkillFallbackGrid({
  skills,
  selectedCategory,
  onSelectSkill,
}: SkillFallbackGridProps) {
  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {filteredSkills.map((skill) => (
        <button
          key={skill.id}
          onClick={() => onSelectSkill(skill)}
          className="text-left p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#00F0FF]/50 transition-all flex flex-col justify-between group min-h-[110px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          aria-label={`View details for ${skill.name}`}
        >
          <div className="flex items-start justify-between w-full mb-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#00F0FF]/80 block">
                {skill.category}
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                {skill.name}
              </h4>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          <p className="text-xs text-white/60 line-clamp-2 font-light">
            {skill.shortDescription}
          </p>
        </button>
      ))}
    </div>
  );
}
