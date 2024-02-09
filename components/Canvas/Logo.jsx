"use client";

import React, { useEffect, useRef, useState } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

import { MeshPhysicalMaterial } from "three";

const Logo = (props) => {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const { theme } = useTheme();
  const { nodes, materials } = useGLTF("/assets/models/fin.glb");

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

  const physicalMaterial26 = new MeshPhysicalMaterial({
    color: "#111111",
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    lights: true,
  });

  const physicalMaterial27 = new MeshPhysicalMaterial({
    color: "#111111",
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    lights: true,
  });

  // const physicalMaterial28 = new MeshPhysicalMaterial({
  //   color: "#111111",
  //   roughness: 0.5,
  //   metalness: 0.5,
  //   reflectivity: 0.5,
  //   clearCoat: 0.5,
  //   clearCoatRoughness: 0.5,
  //   lights: true,
  // });

  const physicalMaterial28 = new MeshPhysicalMaterial({
    color: "#111111",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.02,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });

  return (
    <group {...props} ref={meshRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh.geometry}
        material={physicalMaterial26}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_1.geometry}
        material={physicalMaterial27}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_2.geometry}
        material={physicalMaterial28}
      />
    </group>
  );
};

export default Logo;
