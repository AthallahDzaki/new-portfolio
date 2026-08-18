"use client";

import React, { Suspense } from "react";
import { Lights } from "./Lights";
import { CameraRig } from "./CameraRig";

interface ExperienceProps {
  scrollProgress?: number;
  children?: React.ReactNode;
}

export function Experience({ scrollProgress = 0, children }: ExperienceProps) {
  return (
    <Suspense fallback={null}>
      <Lights />
      <CameraRig scrollProgress={scrollProgress} />
      {children}
    </Suspense>
  );
}
