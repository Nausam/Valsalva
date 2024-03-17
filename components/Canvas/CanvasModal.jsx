import React from "react";

import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";

import Fin from "./Fin";

const handleSize = (size) => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;

    if (width > 768) {
      return (size = 8);
    }

    if (width < 768) {
      return (size = 4);
    }
  }
};

const CanvasModal = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        preserveDrawingBuffer: true,
      }}
      camera={{ position: [4, 3, handleSize()], fov: 25 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight intensity={4} position={[0, 50, -20]} />
      <directionalLight intensity={10} position={[-50, -50, 100]} />

      <group>
        <Center top>
          <Fin />
          <OrbitControls />
        </Center>
      </group>

      <Environment preset="forest" background blur={1} />
    </Canvas>
  );
};

export default CanvasModal;
