import React from "react";

import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import Mask from "./Mask";

const CanvasModal = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Environment preset="city" />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Mask />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModal;
8;
