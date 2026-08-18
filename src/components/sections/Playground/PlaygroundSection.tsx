"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Sliders, RotateCw, Activity, Palette } from "lucide-react";

interface PlaygroundControls {
  distortion: number;
  wireframe: boolean;
  speed: number;
  colorTheme: string;
}

interface PlaygroundSectionProps {
  controls: PlaygroundControls;
  onChangeControls: (controls: PlaygroundControls) => void;
}

export function PlaygroundSection({
  controls,
  onChangeControls,
}: PlaygroundSectionProps) {
  const themes = [
    { name: "Cyan", color: "#00F0FF" },
    { name: "Purple", color: "#A855F7" },
    { name: "Emerald", color: "#10B981" },
    { name: "Amber", color: "#F59E0B" },
  ];

  return (
    <section
      id="playground"
      className="relative w-full py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="05" label="PLAYGROUND & SHADER LAB" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-section-title text-white">
            Shader & <br />
            <span className="text-white/40">Scene Playground.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            Directly manipulate the Three.js GLSL vertex noise parameters, wireframe rendering modes, rotation dynamics, and color palettes in real-time.
          </p>
        </div>
      </div>

      {/* Playground Control Panel Card */}
      <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Distortion Slider */}
        <div className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-white/70">
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              DISTORTION
            </span>
            <span className="text-[#00F0FF]">{controls.distortion.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={controls.distortion}
            onChange={(e) =>
              onChangeControls({
                ...controls,
                distortion: parseFloat(e.target.value),
              })
            }
            className="w-full accent-[#00F0FF] cursor-pointer h-2 bg-white/10 rounded-none min-h-[44px]"
            aria-label="Vertex distortion amplitude"
          />
          <span className="text-[10px] text-white/40 font-mono">
            Adjusts Perlin GPU displacement
          </span>
        </div>

        {/* Speed Slider */}
        <div className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-white/70">
            <span className="flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[#00F0FF]" />
              ROTATION SPEED
            </span>
            <span className="text-[#00F0FF]">{controls.speed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.2"
            value={controls.speed}
            onChange={(e) =>
              onChangeControls({
                ...controls,
                speed: parseFloat(e.target.value),
              })
            }
            className="w-full accent-[#00F0FF] cursor-pointer h-2 bg-white/10 rounded-none min-h-[44px]"
            aria-label="Scene rotation speed"
          />
          <span className="text-[10px] text-white/40 font-mono">
            Simulates delta rotation physics
          </span>
        </div>

        {/* Wireframe Toggle */}
        <div className="flex flex-col justify-between gap-3 p-4 bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-white/70">
            <span className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
              WIREFRAME
            </span>
            <span className={controls.wireframe ? "text-[#00F0FF]" : "text-white/40"}>
              {controls.wireframe ? "ACTIVE" : "OFF"}
            </span>
          </div>
          <button
            onClick={() =>
              onChangeControls({
                ...controls,
                wireframe: !controls.wireframe,
              })
            }
            className={`font-mono text-xs uppercase tracking-wider py-2.5 px-4 border transition-all min-h-[44px] flex items-center justify-center ${
              controls.wireframe
                ? "bg-[#00F0FF] text-black font-semibold border-[#00F0FF]"
                : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
            }`}
          >
            {controls.wireframe ? "Disable Wireframe" : "Enable Wireframe"}
          </button>
          <span className="text-[10px] text-white/40 font-mono">
            Exposes geometry tessellation
          </span>
        </div>

        {/* Color Palette */}
        <div className="flex flex-col justify-between gap-3 p-4 bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-white/70">
            <span className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-[#00F0FF]" />
              THEME ACCENT
            </span>
          </div>
          <div className="flex items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() =>
                  onChangeControls({
                    ...controls,
                    colorTheme: theme.color,
                  })
                }
                style={{ backgroundColor: theme.color }}
                className={`w-10 h-10 border transition-all min-h-[44px] min-w-[44px] ${
                  controls.colorTheme === theme.color
                    ? "border-white scale-110 shadow-[0_0_10px_currentColor]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Select ${theme.name} color theme`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/40 font-mono">
            Updates Fresnel emission color
          </span>
        </div>
      </div>
    </section>
  );
}
