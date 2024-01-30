"use client";

import React from "react";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";

import Logo from "./Logo";

const CanvasModal = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
      <ambientLight intensity={1} />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0.2, -0.1, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Logo
          rotation={[-Math.PI / 40, 3.1, 0]}
          position={[0, 0.25, 0]}
          scale={[1.6, 1.6, 2.7]}
        />
      </PresentationControls>

      <Environment preset="city" />
    </Canvas>
  );
};

export default CanvasModal;
8;
