import React, { useRef, ReactNode, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import { easing } from "maath";
import { Group } from "three";

const CameraRig = ({ children }) => {
  const group = useRef(null);

  // Use useDrag to handle the drag events
  const bind = useDrag(
    ({ movement: [dx, dy], down }) => {
      console.log("Drag Event:", dx, dy, down);

      if (group.current && down) {
        const sensitivity = 0.000001;
        const rotationSpeed = 500;

        // Rotate the model based on drag movement
        group.current.rotation.y += dx * sensitivity * rotationSpeed;
        group.current.rotation.x += dy * sensitivity * rotationSpeed;
      }
    },
    { dragDelay: true }
  );

  useEffect(() => {
    // Set the initial rotation when the component mounts
    if (group.current) {
      group.current.rotation.set(-4.8, 0, 0); // Set your desired initial rotation here
    }
  }, []);

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // SET THE INITIAL POSITION OF THE MODEL
    let targetPosition = [0, 0, 2.2];

    if (isBreakPoint) {
      targetPosition = [0, 0, 2];
    }
    if (isMobile) {
      targetPosition = [0, 0.2, 2.7];
    }

    // SET THE MODEL CAMERA POSITION
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
  });

  return (
    <group ref={group} {...bind()}>
      {children}
    </group>
  );
};

export default CameraRig;
