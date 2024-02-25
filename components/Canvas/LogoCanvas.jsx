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
      <ambientLight intensity={10} />
      <directionalLight intensity={30} color="white" position={[0, 0, 5]} />

      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={2048}
        castShadow
      />
      <Logo scale={1.4} />

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
