"use client";

import React, { use, useEffect, useRef, useState } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import state from "@/store";
import { useSnapshot } from "valtio";
import { gsap } from "gsap";

import { MeshPhysicalMaterial } from "three";
import { useControls } from "leva";

const Mask = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/assets/models/fin.glb");

  const [visible, setVisible] = useState(false);
  const meshRef = useRef();

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(physicalMaterial26.color, snap.footPocketColor, 0.25, delta);
    easing.dampC(physicalMaterial28.color, snap.finColor, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

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

  const { repeatU, repeatV, offsetX, offsetY } = useControls(
    "Texture Settings",
    {
      repeatU: { label: "Stretch X", value: 0.04, min: 0, max: 0.1 },
      repeatV: { label: "Stretch Y", value: 0.01, min: 0, max: 0.1 },
      offsetX: { label: "Move X", value: 0.46, min: 0, max: 1 },
      offsetY: { label: "Move Y", value: 0.9, min: 0, max: 1 },
    }
  );

  fullTexture.wrapS = fullTexture.wrapT = THREE.RepeatWrapping;
  fullTexture.repeat.set(repeatU, repeatV);
  fullTexture.offset.set(offsetX, offsetY);
  // fullTexture.repeat.set(0.04, 0.01);
  // fullTexture.offset.set(0.46, 0.9);
  fullTexture.rotation = Math.PI / 2;

  const physicalMaterial26 = new MeshPhysicalMaterial({
    color: "#454545",
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    lights: true,
  });

  const physicalMaterial27 = new MeshPhysicalMaterial({
    color: "#454545",
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    lights: true,
  });

  // const physicalMaterial28 = new MeshPhysicalMaterial({
  //   color: "#454545",
  //   roughness: 0.5,
  //   metalness: 0.5,
  //   reflectivity: 0.5,
  //   clearCoat: 0.5,
  //   clearCoatRoughness: 0.5,
  //   lights: true,
  // });

  const physicalMaterial28 = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.02,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
    map: fullTexture,
  });

  return (
    <group ref={meshRef} key={stateString} dispose={null}>
      <group position={[0.258, 0, -0.845]} scale={0.02}>
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
        ></mesh>
      </group>
      <group
        position={[-0.02, 0, -0.826]}
        rotation={[Math.PI, Math.PI / 9, 0]}
        scale={-0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001.geometry}
          material={physicalMaterial26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_1.geometry}
          material={physicalMaterial27}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_2.geometry}
          material={physicalMaterial28}
        />
      </group>
    </group>
  );
};

export default Mask;

{
  /* <group ref={meshRef} key={stateString} dispose={null}>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.defaultMaterial.geometry}
  material={materials.M_Goatee}
></mesh>

<mesh
  castShadow
  receiveShadow
  geometry={nodes.defaultMaterial_1.geometry}
  material={materials.M_Mask}
>
  {snap.isFullTexture && (
    <Decal
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={2}
      map={fullTexture}
      // map-anisotropy={16}
    />
  )}

  {snap.isLogoTexture && (
    <Decal
      position={[0, 0, 0.15]}
      rotation={[0, 0, 0]}
      scale={0.5}
      map={logoTexture}
      // map-anisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  )}
</mesh>
</group> */
}
