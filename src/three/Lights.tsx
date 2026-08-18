"use client";

import React from "react";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
      />
      <pointLight
        position={[-4, -3, -2]}
        intensity={2.0}
        color="#00F0FF"
        distance={15}
        decay={2}
      />
      <pointLight
        position={[4, -4, 3]}
        intensity={1.5}
        color="#7928CA"
        distance={15}
        decay={2}
      />
    </>
  );
}
