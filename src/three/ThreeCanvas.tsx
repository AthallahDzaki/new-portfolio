"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { usePerformance } from "@/context/PerformanceContext";

interface ThreeCanvasProps {
  scrollProgress?: number;
  children?: React.ReactNode;
}

export function ThreeCanvas({ scrollProgress = 0, children }: ThreeCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { dpr, quality } = usePerformance();

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        dpr={dpr}
        gl={{
          powerPreference: quality === "eco" ? "low-power" : "high-performance",
          antialias: quality !== "eco",
          alpha: true,
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("WebGL context lost");
          });
        }}
        style={{ pointerEvents: "auto" }}
      >
        <Experience scrollProgress={scrollProgress}>
          {children}
        </Experience>
      </Canvas>
    </div>
  );
}
