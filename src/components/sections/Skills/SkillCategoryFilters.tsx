"use client";

import React from "react";
import { SkillCategory } from "@/types";

interface SkillCategoryFiltersProps {
  selectedCategory: SkillCategory | "all";
  onSelectCategory: (cat: SkillCategory | "all") => void;
}

const CATEGORIES: { id: SkillCategory | "all"; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "creative", label: "CREATIVE 3D" },
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "tools", label: "TOOLS & DEVOPS" },
];

export function SkillCategoryFilters({
  selectedCategory,
  onSelectCategory,
}: SkillCategoryFiltersProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none w-full max-w-full"
      role="tablist"
      aria-label="Filter skills by category"
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center select-none ${
              isSelected
                ? "bg-[#00F0FF] text-black font-semibold border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
