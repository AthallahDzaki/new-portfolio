"use client";

import React, { useState } from "react";
import { usePerformance, QualityLevel } from "@/context/PerformanceContext";
import { Zap, ShieldCheck, Flame, SlidersHorizontal } from "lucide-react";

export function QualitySettingsSwitcher() {
  const { quality, setQuality } = usePerformance();
  const [isOpen, setIsOpen] = useState(false);

  const levels: { id: QualityLevel; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "eco",
      label: "ECO (60 FPS)",
      icon: <Zap className="w-3 h-3 text-emerald-400" />,
      desc: "Ultra lightweight, minimal battery & GPU overhead.",
    },
    {
      id: "balanced",
      label: "BALANCED",
      icon: <ShieldCheck className="w-3 h-3 text-[#00F0FF]" />,
      desc: "Optimal balance between visual fidelity and performance.",
    },
    {
      id: "ultra",
      label: "ULTRA FX",
      icon: <Flame className="w-3 h-3 text-amber-400" />,
      desc: "Maximum visual fidelity, high particle density & FX.",
    },
  ];

  return (
    <div className="relative font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white transition-colors"
        title="Graphics Quality Settings"
        aria-label="Graphics quality settings"
      >
        <SlidersHorizontal className="w-3 h-3 text-[#00F0FF]" />
        <span className="uppercase text-[10px] tracking-wider">
          {quality === "eco" ? "⚡ ECO" : quality === "balanced" ? "BALANCED" : "ULTRA"}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 p-3 bg-[#0a0a0d] border border-white/20 shadow-2xl z-50 flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-wider text-white/40 border-b border-white/10 pb-1.5 flex items-center justify-between">
              <span>GRAPHICS QUALITY</span>
              <span className="text-[#00F0FF]">GPU MODE</span>
            </div>

            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => {
                  setQuality(lvl.id);
                  setIsOpen(false);
                }}
                className={`flex flex-col text-left p-2 border transition-all ${
                  quality === lvl.id
                    ? "bg-[#00F0FF]/15 border-[#00F0FF] text-white"
                    : "bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span className="flex items-center gap-1.5">
                    {lvl.icon}
                    {lvl.label}
                  </span>
                  {quality === lvl.id && (
                    <span className="text-[9px] text-[#00F0FF]">ACTIVE</span>
                  )}
                </div>
                <span className="text-[9px] text-white/40 mt-1 font-sans">
                  {lvl.desc}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
