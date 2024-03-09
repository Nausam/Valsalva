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

const Fin = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/assets/models/fin.glb");

  const [visible, setVisible] = useState(false);
  const meshRef = useRef();

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(physicalMaterial01.color, snap.footPocketColor, 0.25, delta);
    easing.dampC(physicalMaterial02.color, snap.finColor, 0.25, delta);
    easing.dampC(physicalMaterial03.color, snap.bezelColor, 0.25, delta);
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

  const colorMap = {
    Black: "#353535",
    White: "#A9A9A9",
  };

  const customColorNames = Object.keys(colorMap);

  const { Model_Color, isLogoTexture, isFullTexture } = useControls(
    "Color Settings",
    {
      footPocketColor: {
        label: "Foot Pocket Color",
        options: customColorNames,
        getValueToStore: (value) => colorMap[value], // Map the selected color name to its hex value
        onChange: (value) => (state.footPocketColor = colorMap[value]),
      },
      finColor: {
        label: "Fin Color",
        value: snap.finColor,
        onChange: (value) => (state.finColor = value),
      },
      bezelColor: {
        label: "Bezel Color",
        value: snap.bezelColor,
        onChange: (value) => (state.bezelColor = value),
      },
      // isLogoTexture: { label: "Logo Texture", value: state.isLogoTexture },
      // isFullTexture: { label: "Full Texture", value: state.isFullTexture },
    }
  );

  const {
    repeatU,
    repeatV,
    offsetX,
    offsetY,
    rotation,
    flipHorizontal,
    flipVertical,
  } = useControls("Texture Settings", {
    repeatU: { label: "Stretch X", value: 0.8, min: 0, max: 2 },
    repeatV: { label: "Stretch Y", value: 1, min: 0, max: 2 },
    offsetX: { label: "Move X", value: 0.1, min: 0, max: 2 },
    offsetY: { label: "Move Y", value: 1, min: 0, max: 2 },
    rotation: { label: "Rotation", value: 500, min: 0, max: 500 },
    flipHorizontal: { label: "Flip Horizontal", value: false },
    flipVertical: { label: "Flip Vertical", value: false },
  });

  let flipFactorX = flipHorizontal ? -1 : 1;
  let flipFactorY = flipVertical ? -1 : 1;

  fullTexture.wrapS = fullTexture.wrapT = THREE.RepeatWrapping;
  fullTexture.repeat.set(repeatU * flipFactorX, repeatV * flipFactorY);
  fullTexture.offset.set(offsetX * flipFactorX, offsetY * flipFactorY);
  fullTexture.rotation = Math.PI / rotation;

  const physicalMaterial02 = new MeshPhysicalMaterial({
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

  const physicalMaterial01 = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.02,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });

  const physicalMaterial03 = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.05,
    transmission: 0,
    reflectivity: 0,
    roughnessMap: null,
    metalnessMap: null,
  });

  return (
    <group ref={meshRef} key={stateString} dispose={null}>
      <group>
        <group rotation={[0, -0.4, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={physicalMaterial02}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={physicalMaterial03}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object004.geometry}
            material={physicalMaterial01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object006.geometry}
            material={physicalMaterial01}
          />
        </group>
        {/* <group position={[0, 0, -0.8]} rotation={[0, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={physicalMaterial02}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={physicalMaterial03}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object004.geometry}
            material={physicalMaterial01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object006.geometry}
            material={physicalMaterial01}
          />
        </group> */}
      </group>

      {/* <group position={[0, 0.3, -2.5]}>
        <group rotation={[0, 0.4, 3.15]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={physicalMaterial02}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={physicalMaterial03}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object004.geometry}
            material={physicalMaterial01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object006.geometry}
            material={physicalMaterial01}
          />
        </group>
        <group position={[0, 0, -0.8]} rotation={[0, 0, 3.15]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={physicalMaterial02}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={physicalMaterial03}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object004.geometry}
            material={physicalMaterial01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object006.geometry}
            material={physicalMaterial01}
          />
        </group>
      </group> */}
    </group>
  );
};

export default Fin;
