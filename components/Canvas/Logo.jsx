"use client";

import * as THREE from "three";

import React, { useEffect, useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF } from "@react-three/drei";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

import { MeshPhysicalMaterial } from "three";

const Logo = (props) => {
  const group = useRef();
  const group2 = useRef();
  const [visible, setVisible] = useState(false);
  const meshRef = useRef();
  const { theme } = useTheme();
  const { nodes, materials } = useGLTF("/assets/models/fin2.glb");

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      open ? Math.cos(t / 10) / 2 + 0.25 : 0,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      open ? Math.sin(t / 10) / 3 : 0,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      open ? Math.sin(t / 10) / 10 : 0,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      open ? (-2 + Math.sin(t)) / 10 : -4.3,
      0.1
    );
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group2.current.rotation.x = THREE.MathUtils.lerp(
      group2.current.rotation.x,
      open ? Math.cos(t / 10) / 10 + 0.25 : 0,
      0.1
    );
    group2.current.rotation.y = THREE.MathUtils.lerp(
      group2.current.rotation.y,
      open ? Math.sin(t / 10) / 4 : 0,
      0.1
    );
    group2.current.rotation.z = THREE.MathUtils.lerp(
      group2.current.rotation.z,
      open ? Math.sin(t / 10) / 10 : 0,
      0.1
    );
    group2.current.position.y = THREE.MathUtils.lerp(
      group2.current.position.y,
      open ? (-2 + Math.sin(t)) / 10 : -4.3,
      0.1
    );
  });

  const physicalMaterial26 = new MeshPhysicalMaterial({
    color: "#111",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.02,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });
  const physicalMaterial28 = new MeshPhysicalMaterial({
    color: "#151515",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.02,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });
  const physicalMaterial29 = new MeshPhysicalMaterial({
    color: "#151515",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.05,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });

  return (
    <group {...props} dispose={null} ref={meshRef} rotation={[0, 0, 0]}>
      <group position={[-0.5, 0, -1]} rotation={[0.5, 1, 1.4]}>
        <group ref={group}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={physicalMaterial26}
            position={[-0.429, 0.009, -0.103]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box002.geometry}
            material={physicalMaterial28}
            position={[-0.969, 0.006, -0.09]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={physicalMaterial29}
            position={[0.409, 0.008, 0.184]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object003.geometry}
            material={physicalMaterial26}
            position={[-0.429, 0.009, -0.103]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object004.geometry}
            material={physicalMaterial28}
            position={[0.349, 0.026, -0.102]}
            scale={0.025}
          />
        </group>
      </group>

      <group position={[0, 0.3, -1]} rotation={[0.5, 0.9, 0.5]}>
        <group ref={group2}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box003.geometry}
            material={physicalMaterial28}
            position={[-0.969, 0.006, 0.598]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object005.geometry}
            material={physicalMaterial26}
            position={[-0.429, 0.009, 0.611]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object006.geometry}
            material={physicalMaterial28}
            position={[0.349, 0.026, 0.61]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane009.geometry}
            material={physicalMaterial26}
            position={[-0.429, 0.009, 0.611]}
            scale={0.025}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane010.geometry}
            material={physicalMaterial29}
            position={[0.409, 0.008, 0.324]}
            scale={0.025}
          />
        </group>
      </group>
    </group>
  );
};

export default Logo;
