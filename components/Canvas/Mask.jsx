"use client";

import React, { use } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "@/store";
import { useSnapshot } from "valtio";

const Mask = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/assets/models/Mask.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    easing.dampC(materials.M_Mask.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.M_Goatee}
        dispose={null}
      ></mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.M_Mask}
        dispose={null}
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
