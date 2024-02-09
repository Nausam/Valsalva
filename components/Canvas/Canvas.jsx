import React from "react";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";

import Mask from "./Mask";

const CanvasModal = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        preserveDrawingBuffer: true,
      }}
      shadows
      camera={{ position: [3.5, 2, 1.3], fov: 30 }}
    >
      <ambientLight intensity={1} />
      <directionalLight intensity={5} color="white" position={[0, 0, 5]} />

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

      <Environment preset="forest" background blur={1} />
    </Canvas>
  );
};

export default CanvasModal;

<OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
