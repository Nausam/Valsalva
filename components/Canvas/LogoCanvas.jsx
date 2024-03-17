"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import Logo from "./Logo";

const handleSize = (size) => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;

    if (width > 768) {
      return (size = 2);
    }

    if (width < 768) {
      return (size = 1.5);
    }
  }
};

const handleShadow = (shadow) => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;

    if (width > 768) {
      return (shadow = -1.65);
    }

    if (width < 768) {
      return (shadow = -1.2);
    }
  }
};

const LogoCanvas = () => {
  return (
    <Canvas className="w-full h-full" shadows>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={10} position={[-50, 50, -20]} />
      <directionalLight intensity={20} position={[-50, -50, 100]} />

      <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={25} />

      <Logo scale={handleSize()} />

      <ContactShadows
        position={[0, handleShadow(), 0]}
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
