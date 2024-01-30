"use client";

import React, { useEffect, useRef, useState } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

const Logo = (props) => {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const { theme } = useTheme();
  const { nodes, materials } = useGLTF("/assets/models/logo.glb");

  // Dynamically determine the color based on the theme
  const color = theme === "dark" ? 0xffffff : "#252525"; // White in dark mode, black in light mode

  // Update the material's color directly
  if (materials.Main001) {
    materials.Main001.color.set(color);
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.3),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group {...props} ref={meshRef} dispose={null}>
      <mesh
        name="Object_4"
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.SILVER_metal}
      />
    </group>
  );
};

export default Logo;
