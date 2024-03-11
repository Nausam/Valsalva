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
} from "@react-three/drei";
import Logo from "./Logo";

const LogoCanvas = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0} />
      <directionalLight intensity={10} position={[-50, 50, -20]} />
      <directionalLight intensity={20} position={[-50, -50, 100]} />

      <Logo scale={2.5} />

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
