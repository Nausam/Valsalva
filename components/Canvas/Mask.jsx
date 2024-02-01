"use client";

import React, { use, useEffect, useRef, useState } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "@/store";
import { useSnapshot } from "valtio";
import { gsap } from "gsap";

const Mask = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/assets/models/mask.glb");
  const [visible, setVisible] = useState(false);
  const meshRef = useRef();

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.M_Mask.color, snap.color, 0.25, delta);
    easing.dampC(materials.M_Goatee.color, snap.goateeColor, 0.25, delta);
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

  return (
    <group ref={meshRef} key={stateString} dispose={null}>
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
    </group>
  );
};

export default Mask;
