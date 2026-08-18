"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaygroundScene, GeometryType } from "@/three/playground/PlaygroundScene";
import {
  Activity,
  RotateCw,
  Sliders,
  Palette,
  Box,
  Sparkles,
  Zap,
  RotateCcw,
} from "lucide-react";

interface PlaygroundControlsState {
  distortion: number;
  speed: number;
  wireframe: boolean;
  colorTheme: string;
}

interface PlaygroundSectionProps {
  controls: PlaygroundControlsState;
  onChangeControls: (controls: PlaygroundControlsState) => void;
}

export function PlaygroundSection({
  controls,
  onChangeControls,
}: PlaygroundSectionProps) {
  const [geometryType, setGeometryType] = useState<GeometryType>("sphere");
  const [particlesCount, setParticlesCount] = useState(600);
  const [resetKey, setResetKey] = useState(0);

  const themes = [
    { name: "Cyan", color: "#00F0FF" },
    { name: "Purple", color: "#A855F7" },
    { name: "Emerald", color: "#10B981" },
    { name: "Amber", color: "#F59E0B" },
    { name: "Rose", color: "#FF007A" },
  ];

  const geometries: { id: GeometryType; label: string }[] = [
    { id: "sphere", label: "ORGANIC SPHERE" },
    { id: "torus", label: "TORUS KNOT" },
    { id: "icosahedron", label: "CYBER ICOSA" },
    { id: "cylinder", label: "VORTEX CYLINDER" },
  ];

  const presets = [
    {
      name: "NEO TOKYO",
      apply: () => {
        setGeometryType("torus");
        onChangeControls({
          ...controls,
          distortion: 1.8,
          speed: 1.5,
          wireframe: false,
          colorTheme: "#00F0FF",
        });
      },
    },
    {
      name: "SUPERNOVA",
      apply: () => {
        setGeometryType("sphere");
        onChangeControls({
          ...controls,
          distortion: 2.4,
          speed: 1.8,
          wireframe: false,
          colorTheme: "#F59E0B",
        });
      },
    },
    {
      name: "MATRIX WIRE",
      apply: () => {
        setGeometryType("icosahedron");
        onChangeControls({
          ...controls,
          distortion: 1.2,
          speed: 1.0,
          wireframe: true,
          colorTheme: "#10B981",
        });
      },
    },
    {
      name: "COSMIC VOID",
      apply: () => {
        setGeometryType("sphere");
        onChangeControls({
          ...controls,
          distortion: 0.8,
          speed: 0.6,
          wireframe: false,
          colorTheme: "#A855F7",
        });
      },
    },
  ];

  return (
    <section
      id="playground"
      className="relative w-full py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="05" label="INTERACTIVE SHADER LAB" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-section-title text-white">
            Real-time <br />
            <span className="text-white/40">Shader Laboratory.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            Interact with live procedural GLSL noise shaders, switch 3D geometries, control particle densities, and rotate the scene in real time.
          </p>
        </div>

        {/* Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-white/40 uppercase tracking-widest text-[11px] mr-1">
            PRESETS:
          </span>
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={p.apply}
              className="px-3 py-1.5 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white transition-all active:scale-95"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 3D Viewport Area */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] bg-[#07070a] border border-white/15 overflow-hidden flex flex-col justify-between p-4 shadow-2xl group">
          {/* Top HUD */}
          <div className="w-full flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/10 pb-3 z-10 select-none pointer-events-none">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping inline-block"
                style={{ backgroundColor: controls.colorTheme }}
              />
              <span style={{ color: controls.colorTheme }} className="font-semibold">
                WEBGL SHADER ENGINE LIVE
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <span>DRAG TO ROTATE 3D</span>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              key={resetKey}
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <pointLight
                position={[5, 5, 5]}
                intensity={2.5}
                color={controls.colorTheme}
              />
              <pointLight position={[-5, -5, -5]} intensity={1.5} color="#ffffff" />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.7}
                dampingFactor={0.08}
              />

              <Suspense fallback={null}>
                <PlaygroundScene
                  distortion={controls.distortion}
                  speed={controls.speed}
                  wireframe={controls.wireframe}
                  colorTheme={controls.colorTheme}
                  geometryType={geometryType}
                  particlesCount={particlesCount}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Bottom HUD */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-white/50 border-t border-white/10 pt-3 z-10 select-none">
            <div className="text-[11px] text-white/40 flex items-center gap-3">
              <span>GEOM: {geometryType.toUpperCase()}</span>
              <span>•</span>
              <span>DISTORT: {controls.distortion.toFixed(1)}x</span>
            </div>

            <button
              onClick={() => setResetKey((k) => k + 1)}
              className="pointer-events-auto px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center gap-1.5 transition-colors text-[11px]"
              aria-label="Reset camera orientation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET CAMERA</span>
            </button>
          </div>
        </div>

        {/* Right: Live Control Sliders Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 p-6 bg-[#0a0a0d] border border-white/15">
          {/* Geometry Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-white/70">
              <Box className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="uppercase font-semibold">3D Geometry Shape</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {geometries.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGeometryType(g.id)}
                  className={`font-mono text-xs py-2 px-3 border transition-all text-left ${
                    geometryType === g.id
                      ? "bg-[#00F0FF] text-black font-semibold border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distortion Slider */}
          <div className="flex flex-col gap-2 p-3 bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between font-mono text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                VERTEX NOISE DISTORTION
              </span>
              <span className="text-[#00F0FF] font-bold">
                {controls.distortion.toFixed(1)}x
              </span>
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
              className="w-full accent-[#00F0FF] cursor-pointer h-2 bg-white/10 rounded-none"
              aria-label="Vertex noise distortion"
            />
          </div>

          {/* Speed Slider */}
          <div className="flex flex-col gap-2 p-3 bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between font-mono text-xs text-white/70">
              <span className="flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 text-[#00F0FF]" />
                ANIMATION SPEED
              </span>
              <span className="text-[#00F0FF] font-bold">
                {controls.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={controls.speed}
              onChange={(e) =>
                onChangeControls({
                  ...controls,
                  speed: parseFloat(e.target.value),
                })
              }
              className="w-full accent-[#00F0FF] cursor-pointer h-2 bg-white/10 rounded-none"
              aria-label="Animation speed"
            />
          </div>

          {/* Wireframe & Particle Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                onChangeControls({
                  ...controls,
                  wireframe: !controls.wireframe,
                })
              }
              className={`font-mono text-xs uppercase tracking-wider py-3 px-4 border transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                controls.wireframe
                  ? "bg-[#00F0FF] text-black font-semibold border-[#00F0FF]"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{controls.wireframe ? "WIREFRAME ON" : "SOLID SHADING"}</span>
            </button>

            <button
              onClick={() =>
                setParticlesCount((prev) => (prev >= 1200 ? 300 : prev + 300))
              }
              className="font-mono text-xs uppercase tracking-wider py-3 px-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>PARTICLES: {particlesCount}</span>
            </button>
          </div>

          {/* Color Palette Selector */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-white/70">
              <Palette className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="uppercase font-semibold">Emission Color Palette</span>
            </div>
            <div className="flex items-center gap-3">
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
                      ? "border-white scale-110 shadow-[0_0_12px_currentColor]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Select ${theme.name} color palette`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
