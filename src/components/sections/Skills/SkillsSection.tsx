"use client";

import React, { useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Skill, SkillCategory } from "@/types";
import { skills as allSkills } from "@/data/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillCategoryFilters } from "./SkillCategoryFilters";
import { SkillFallbackGrid } from "./SkillFallbackGrid";
import { SkillDetailModal } from "./SkillDetailModal";
import { SkillsScene } from "@/three/skills/SkillsScene";
import { usePerformance } from "@/context/PerformanceContext";
import {
  Sparkles,
  MousePointerClick,
  Orbit,
  LayoutGrid,
  RotateCcw,
  MoveUp,
  MoveDown,
  ZoomIn,
  ZoomOut,
  Hand,
} from "lucide-react";

interface SkillsSectionProps {
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill | null) => void;
}

export function SkillsSection({
  selectedSkill,
  onSelectSkill,
}: SkillsSectionProps) {
  const { quality, dpr } = usePerformance();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");
  const [viewMode, setViewMode] = useState<"graph" | "grid">("graph");
  const [resetKey, setResetKey] = useState(0);
  const controlsRef = useRef<any>(null);

  const handlePanVertical = (deltaY: number) => {
    if (controlsRef.current) {
      controlsRef.current.target.y += deltaY;
      controlsRef.current.update();
    }
  };

  const handleZoom = (deltaDist: number) => {
    if (controlsRef.current) {
      const cam = controlsRef.current.object;
      cam.position.z = Math.min(Math.max(cam.position.z + deltaDist, 3.2), 7.5);
      controlsRef.current.update();
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="03" label="SKILLS & ARCHITECTURE" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-section-title text-white">
            Diamond <br />
            <span className="text-white/40">Constellation Graph.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            An interconnected topology of technical competencies across Creative 3D, Frontend Core, Fullstack Systems, and Tools. Drag to rotate/pan up and down, or click any node to inspect details.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setViewMode("graph")}
            className={`px-3 py-2 flex items-center gap-2 transition-colors ${
              viewMode === "graph"
                ? "bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_#00F0FF]"
                : "text-white/70 hover:text-white"
            }`}
            aria-label="Switch to 3D graph view"
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>3D GRAPH</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2 flex items-center gap-2 transition-colors ${
              viewMode === "grid"
                ? "bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_#00F0FF]"
                : "text-white/70 hover:text-white"
            }`}
            aria-label="Switch to grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>GRID VIEW</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <SkillCategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Viewport */}
      {viewMode === "graph" ? (
        <div className="relative w-full h-[500px] sm:h-[560px] md:h-[620px] bg-[#070709] border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between p-4 group">
          {/* Top HUD bar */}
          <div className="w-full flex items-center justify-between font-mono text-[11px] text-white/60 border-b border-white/10 pb-3 z-10 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping inline-block" />
              <span className="text-[#00F0FF] font-semibold">DIAMOND TOPOLOGY ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <span className="hidden sm:inline">DRAG / PAN / ROTATE</span>
              <span className="hidden sm:inline">•</span>
              <span>CLICK NODE TO EXPAND</span>
            </div>
          </div>

          {/* Dedicated 3D Canvas Box */}
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              key={resetKey}
              camera={{ position: [0, 0, 5.5], fov: 36 }}
              dpr={dpr}
              gl={{
                antialias: quality !== "eco",
                alpha: false,
                powerPreference: "low-power",
              }}
            >
              <color attach="background" args={["#070709"]} />
              <ambientLight intensity={0.9} />
              <pointLight position={[0, 3, 3]} intensity={2.2} color="#00F0FF" />
              <pointLight position={[-3, -2, 2]} intensity={1.5} color="#7928CA" />
              <pointLight position={[3, -2, 2]} intensity={1.5} color="#00F0FF" />

              <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                enablePan={true}
                panSpeed={0.8}
                zoomSpeed={0.8}
                rotateSpeed={0.5}
                dampingFactor={0.08}
                minDistance={3.0}
                maxDistance={7.5}
                screenSpacePanning={true}
                maxPolarAngle={Math.PI / 1.7}
                minPolarAngle={Math.PI / 2.3}
              />

              <Suspense fallback={null}>
                <SkillsScene
                  skills={allSkills}
                  selectedSkill={selectedSkill}
                  selectedCategory={selectedCategory}
                  onSelectSkill={(s) => onSelectSkill(s)}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Interactive Floating Quick Nav Pad (Pan & Zoom Controls) */}
          <div className="absolute top-16 right-4 z-20 flex flex-col gap-1.5 bg-[#0a0a0d]/90 border border-white/15 p-1.5 shadow-xl font-mono text-[10px]">
            <button
              onClick={() => handlePanVertical(0.3)}
              className="p-2 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white/80 transition-colors flex items-center justify-center"
              title="Geser Graf ke Atas (Pan Up)"
              aria-label="Pan graph up"
            >
              <MoveUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePanVertical(-0.3)}
              className="p-2 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white/80 transition-colors flex items-center justify-center"
              title="Geser Graf ke Bawah (Pan Down)"
              aria-label="Pan graph down"
            >
              <MoveDown className="w-3.5 h-3.5" />
            </button>
            <div className="w-full h-px bg-white/10 my-0.5" />
            <button
              onClick={() => handleZoom(-0.5)}
              className="p-2 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white/80 transition-colors flex items-center justify-center"
              title="Zoom In (+)"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(0.5)}
              className="p-2 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white/80 transition-colors flex items-center justify-center"
              title="Zoom Out (-)"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom HUD Bar & Controls */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-white/50 border-t border-white/10 pt-3 z-10 select-none">
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <span className="hidden sm:inline">E: Backend</span>
              <span className="hidden sm:inline">→</span>
              <span className="hidden sm:inline">A: React</span>
              <span className="hidden sm:inline">↔</span>
              <span>Top: Three.js</span>
              <span>↔</span>
              <span>B: Next.js</span>
              <span className="hidden sm:inline">→</span>
              <span className="hidden sm:inline">D: Tools</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setResetKey((k) => k + 1)}
                className="pointer-events-auto px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center gap-1.5 transition-colors text-[11px]"
                aria-label="Reset 3D camera orientation"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET VIEW</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Accessible Grid View */
        <div className="w-full">
          <SkillFallbackGrid
            skills={allSkills}
            selectedCategory={selectedCategory}
            onSelectSkill={(s) => onSelectSkill(s)}
          />
        </div>
      )}

      {/* Shared Skill Detail Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => onSelectSkill(null)}
        onSelectSkill={(s) => onSelectSkill(s)}
      />
    </section>
  );
}
