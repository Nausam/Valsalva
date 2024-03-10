import React from "react";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";

import Fin from "./Fin";

const CanvasModal = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        preserveDrawingBuffer: true,
      }}
      // shadows
      camera={{ position: [1.7, 5.5, 1.7], fov: 30 }}
    >
      <ambientLight intensity={1} />
      <directionalLight intensity={5} color="white" position={[0, 0, 5]} />

      <group>
        <Center top>
          <Fin />
          <OrbitControls />
        </Center>
        <AccumulativeShadows>
          <RandomizedLight position={[2, 5, 5]} />
        </AccumulativeShadows>
      </group>

      <Environment preset="forest" background blur={1} />
    </Canvas>
  );
};

export default CanvasModal;
