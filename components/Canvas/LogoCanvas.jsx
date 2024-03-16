"use client";

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
  PerspectiveCamera,
} from "@react-three/drei";
import Logo from "./Logo";

const LogoCanvas = () => {
  const handleSize = (scale) => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;

      if (width > 768) {
        return (scale = 2);
      }

      if (width < 768) {
        return (scale = 1);
      }
    }
  };
  return (
    <Canvas className="w-full h-full" shadows>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={10} position={[-50, 50, -20]} />
      <directionalLight intensity={20} position={[-50, -50, 100]} />

      <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={25} />

      <Logo scale={handleSize()} />

      <ContactShadows
        position={[0, -2, 0]}
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
