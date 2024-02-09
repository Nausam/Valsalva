"use client";

import React from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  ContactShadows,
  PresentationControls,
  useEnvironment,
} from "@react-three/drei";

import Logo from "./Logo";

const LogoCanvas = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={10} />
      <directionalLight intensity={10} color="grey" position={[0, 0, 5]} />

      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={2048}
        castShadow
      />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Logo
          rotation={[-Math.PI / -6, 0.5, 0]}
          position={[-0.7, -0.2, 0]}
          scale={0.15}
        />
      </PresentationControls>
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.75}
        scale={10}
        blur={3}
        far={4}
      />
      <Environment preset="forest" />
    </Canvas>
  );
};

export default LogoCanvas;
