import React from "react";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";

import CameraRig from "./CameraRig";
import Mask from "./Mask";

const CanvasModal = () => {
  return (
    <Canvas
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      shadows
      camera={{ position: [0, 5.5, 3], fov: 40 }}
    >
      <ambientLight intensity={1} />

      <group>
        <Center top>
          <Mask />
        </Center>
        <AccumulativeShadows>
          <RandomizedLight position={[2, 5, 5]} />
        </AccumulativeShadows>
      </group>

      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />

      <Environment preset="dawn" background blur={1} />
    </Canvas>
  );
};

export default CanvasModal;
8;
