"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  PlaygroundScene,
  GeometryType,
  ShaderVisualMode,
} from "@/three/playground/PlaygroundScene";
import { usePerformance } from "@/context/PerformanceContext";
import {
  Activity,
  RotateCw,
  Sliders,
  Palette,
  Box,
  Sparkles,
  Zap,
  RotateCcw,
  Volume2,
  Layers,
  Flame,
  Radio,
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
  const { quality, dpr } = usePerformance();
  const [geometryType, setGeometryType] = useState<GeometryType>("torus");
  const [shaderMode, setShaderMode] = useState<ShaderVisualMode>("holographic");
  const [particlesCount, setParticlesCount] = useState(quality === "eco" ? 250 : 500);
  const [pulseActive, setPulseActive] = useState(true);
  const [explodeAmount, setExplodeAmount] = useState(0.0);
  const [resetKey, setResetKey] = useState(0);

  const themes = [
    { name: "Cyan", color: "#00F0FF" },
    { name: "Purple", color: "#A855F7" },
    { name: "Rose", color: "#FF007A" },
    { name: "Amber", color: "#F59E0B" },
    { name: "Emerald", color: "#10B981" },
  ];

  const geometries: { id: GeometryType; label: string; desc: string }[] = [
    { id: "torus", label: "TORUS KNOT", desc: "Infinity 3D Knot" },
    { id: "icosahedron", label: "CYBER CRYSTAL", desc: "Faceted Jewel" },
    { id: "sphere", label: "ORGANIC FLUID", desc: "Deforming Sphere" },
    { id: "vortex", label: "QUANTUM VORTEX", desc: "Magnetic Ring" },
    { id: "saturn", label: "SATURN CORE", desc: "Planet & Halo Disk" },
  ];

  const shaderModes: { id: ShaderVisualMode; label: string; desc: string }[] = [
    { id: "holographic", label: "🔮 HOLOGRAPHIC", desc: "Iridescent Glowing Glass" },
    { id: "normals", label: "🌈 RGB NORMALS", desc: "Cyberpunk Surface Topography" },
    { id: "cyber", label: "⚡ CYBER SCANLINE", desc: "Pulsing Matrix Lines" },
    { id: "chrome", label: "💧 METALLIC CHROME", desc: "Liquid Metal Specular" },
  ];

  const presets = [
    {
      name: "NEO CYBERPUNK",
      apply: () => {
        setGeometryType("torus");
        setShaderMode("holographic");
        setPulseActive(true);
        setExplodeAmount(0.0);
        onChangeControls({
          ...controls,
          distortion: 1.4,
          speed: 1.2,
          wireframe: false,
          colorTheme: "#00F0FF",
        });
      },
    },
    {
      name: "SUPERNOVA",
      apply: () => {
        setGeometryType("sphere");
        setShaderMode("cyber");
        setPulseActive(true);
        setExplodeAmount(0.25);
        onChangeControls({
          ...controls,
          distortion: 2.2,
          speed: 1.6,
          wireframe: false,
          colorTheme: "#F59E0B",
        });
      },
    },
    {
      name: "CRYSTAL MATRIX",
      apply: () => {
        setGeometryType("icosahedron");
        setShaderMode("normals");
        setPulseActive(false);
        setExplodeAmount(0.15);
        onChangeControls({
          ...controls,
          distortion: 0.8,
          speed: 0.9,
          wireframe: false,
          colorTheme: "#10B981",
        });
      },
    },
    {
      name: "LIQUID CHROME",
      apply: () => {
        setGeometryType("vortex");
        setShaderMode("chrome");
        setPulseActive(true);
        setExplodeAmount(0.0);
        onChangeControls({
          ...controls,
          distortion: 1.6,
          speed: 1.4,
          wireframe: false,
          colorTheme: "#A855F7",
        });
      },
    },
    {
      name: "SATURN DREAMS",
      apply: () => {
        setGeometryType("saturn");
        setShaderMode("holographic");
        setPulseActive(true);
        setExplodeAmount(0.0);
        onChangeControls({
          ...controls,
          distortion: 0.6,
          speed: 0.8,
          wireframe: false,
          colorTheme: "#FF007A",
        });
      },
    },
  ];

  return (
    <section
      id="playground"
      className="relative w-full py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="05" label="INTERACTIVE 3D SHADER LAB" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-section-title text-white">
            Real-time <br />
            <span className="text-[#00F0FF]">3D Visual Studio.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mt-3">
            Tweak live GLSL shaders, switch between distinct 3D mathematical shapes, trigger mesh explosion, and rotate the scene freely.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-white/40 uppercase tracking-widest text-[11px] mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            PRESETS:
          </span>
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={p.apply}
              className="px-3 py-1.5 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white font-semibold transition-all active:scale-95 text-[11px]"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 3D Viewport Area */}
        <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[520px] bg-[#070709] border border-white/15 overflow-hidden flex flex-col justify-between p-4 shadow-2xl group">
          {/* Top HUD bar */}
          <div className="w-full flex items-center justify-between font-mono text-[11px] text-white/60 border-b border-white/10 pb-3 z-10 select-none pointer-events-none">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping inline-block"
                style={{ backgroundColor: controls.colorTheme }}
              />
              <span style={{ color: controls.colorTheme }} className="font-bold tracking-wider">
                {shaderMode.toUpperCase()} SHADER // ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <span>DRAG TO ROTATE 3D</span>
            </div>
          </div>

          {/* 3D Canvas Box */}
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              key={resetKey}
              camera={{ position: [0, 0, 5.2], fov: 45 }}
              dpr={dpr}
              gl={{
                antialias: quality !== "eco",
                alpha: true,
                powerPreference: quality === "eco" ? "low-power" : "high-performance",
              }}
            >
              <ambientLight intensity={0.7} />
              <pointLight
                position={[4, 4, 4]}
                intensity={2.8}
                color={controls.colorTheme}
              />
              <pointLight position={[-4, -4, -4]} intensity={1.5} color="#ffffff" />
              <directionalLight position={[0, 6, 2]} intensity={1.2} />

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
                  shaderMode={shaderMode}
                  particlesCount={particlesCount}
                  pulseActive={pulseActive}
                  explodeAmount={explodeAmount}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Bottom HUD bar & Controls */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-white/50 border-t border-white/10 pt-3 z-10 select-none">
            <div className="text-[11px] text-white/40 flex items-center gap-3">
              <span className="text-[#00F0FF]">{geometryType.toUpperCase()}</span>
              <span>•</span>
              <span>DISTORT: {controls.distortion.toFixed(1)}x</span>
              <span>•</span>
              <span>SPEED: {controls.speed.toFixed(1)}x</span>
            </div>

            <button
              onClick={() => setResetKey((k) => k + 1)}
              className="pointer-events-auto px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center gap-1.5 transition-colors text-[11px]"
              aria-label="Reset camera orientation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET ORIENTATION</span>
            </button>
          </div>
        </div>

        {/* Right: Rich Interactive Control Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5 p-6 bg-[#0a0a0d] border border-white/15">
          {/* 1. 3D Geometry Shape Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-white/80">
              <Box className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="uppercase font-semibold tracking-wider">3D Mathematical Shape</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {geometries.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGeometryType(g.id)}
                  className={`font-mono text-xs py-2 px-2.5 border transition-all text-left flex flex-col justify-center min-h-[46px] ${
                    geometryType === g.id
                      ? "bg-[#00F0FF] text-black font-bold border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span className="leading-tight text-[11px]">{g.label}</span>
                  <span className={`text-[9px] opacity-70 ${geometryType === g.id ? "text-black" : "text-white/40"}`}>
                    {g.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Shader Visual Mode Switcher */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="uppercase font-semibold tracking-wider">Shader Shading Mode</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {shaderModes.map((sm) => (
                <button
                  key={sm.id}
                  onClick={() => setShaderMode(sm.id)}
                  className={`font-mono text-xs py-2 px-3 border transition-all text-left flex flex-col justify-center min-h-[44px] ${
                    shaderMode === sm.id
                      ? "bg-white/20 text-[#00F0FF] font-bold border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span className="text-[11px] font-semibold">{sm.label}</span>
                  <span className="text-[9px] text-white/40">{sm.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Distortion & Explode Sliders */}
          <div className="flex flex-col gap-3 p-3.5 bg-white/[0.02] border border-white/10">
            {/* Vertex Noise Distortion Slider */}
            <div className="flex flex-col gap-1.5">
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

            {/* Mesh Explode / Dispersal Slider */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between font-mono text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  MESH DISPERSAL / EXPLODE
                </span>
                <span className="text-amber-400 font-bold">
                  {Math.round(explodeAmount * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={explodeAmount}
                onChange={(e) => setExplodeAmount(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-none"
                aria-label="Mesh dispersal"
              />
            </div>

            {/* Animation Speed Slider */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
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
          </div>

          {/* 4. Interactive Micro Toggles */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPulseActive(!pulseActive)}
              className={`font-mono text-[11px] uppercase tracking-wider py-2 px-2 border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                pulseActive
                  ? "bg-[#00F0FF] text-black font-bold border-[#00F0FF]"
                  : "bg-white/5 text-white/70 border-white/10"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{pulseActive ? "PULSE ON" : "PULSE OFF"}</span>
            </button>

            <button
              onClick={() =>
                onChangeControls({
                  ...controls,
                  wireframe: !controls.wireframe,
                })
              }
              className={`font-mono text-[11px] uppercase tracking-wider py-2 px-2 border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                controls.wireframe
                  ? "bg-[#00F0FF] text-black font-bold border-[#00F0FF]"
                  : "bg-white/5 text-white/70 border-white/10"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{controls.wireframe ? "WIREFRAME" : "SOLID"}</span>
            </button>

            <button
              onClick={() =>
                setParticlesCount((prev) => (prev >= 800 ? 200 : prev + 200))
              }
              className="font-mono text-[11px] uppercase tracking-wider py-2 px-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-all flex flex-col items-center justify-center gap-1 min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>PARTICLES: {particlesCount}</span>
            </button>
          </div>

          {/* 5. Color Palette Swatches */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between font-mono text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[#00F0FF]" />
                COLOR PALETTE EMISSION
              </span>
              <span className="text-white/40 text-[10px] uppercase font-mono">
                {controls.colorTheme}
              </span>
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
                  className={`w-10 h-10 border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    controls.colorTheme === theme.color
                      ? "border-white scale-110 shadow-[0_0_16px_currentColor]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Select ${theme.name} color`}
                >
                  {controls.colorTheme === theme.color && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
