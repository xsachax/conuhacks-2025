/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Adventurer.glb --transform --types --out-dir ../src/models 
Files: Adventurer.glb [1.94MB] > /Users/sacha/Developer/Hackathons/ConUHacks2025/conuhacks-2025/public/Adventurer-transformed.glb [451.99KB] (77%)
*/

import * as THREE from "three";
import React, { forwardRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { SkeletonUtils } from "three-stdlib";

type ActionName =
  | "CharacterArmature|Death"
  | "CharacterArmature|Gun_Shoot"
  | "CharacterArmature|HitRecieve"
  | "CharacterArmature|HitRecieve_2"
  | "CharacterArmature|Idle"
  | "CharacterArmature|Idle_Gun"
  | "CharacterArmature|Idle_Gun_Pointing"
  | "CharacterArmature|Idle_Gun_Shoot"
  | "CharacterArmature|Idle_Neutral"
  | "CharacterArmature|Idle_Sword"
  | "CharacterArmature|Interact"
  | "CharacterArmature|Kick_Left"
  | "CharacterArmature|Kick_Right"
  | "CharacterArmature|Punch_Left"
  | "CharacterArmature|Punch_Right"
  | "CharacterArmature|Roll"
  | "CharacterArmature|Run"
  | "CharacterArmature|Run_Back"
  | "CharacterArmature|Run_Left"
  | "CharacterArmature|Run_Right"
  | "CharacterArmature|Run_Shoot"
  | "CharacterArmature|Sword_Slash"
  | "CharacterArmature|Walk"
  | "CharacterArmature|Wave";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Adventurer_Feet_1: THREE.SkinnedMesh;
    Adventurer_Feet_2: THREE.SkinnedMesh;
    Adventurer_Legs_1: THREE.SkinnedMesh;
    Adventurer_Legs_2: THREE.SkinnedMesh;
    Adventurer_Body_1: THREE.SkinnedMesh;
    Adventurer_Body_2: THREE.SkinnedMesh;
    Adventurer_Body_3: THREE.SkinnedMesh;
    Adventurer_Head_1: THREE.SkinnedMesh;
    Adventurer_Head_2: THREE.SkinnedMesh;
    Adventurer_Head_3: THREE.SkinnedMesh;
    Adventurer_Head_4: THREE.SkinnedMesh;
    Backpack_1: THREE.SkinnedMesh;
    Backpack_2: THREE.SkinnedMesh;
    Backpack_3: THREE.SkinnedMesh;
    Backpack_4: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export default forwardRef(function Model(props: JSX.IntrinsicElements["group"] & { action?: ActionName }, ref: React.Ref<THREE.Group>) {
  const { scene, animations } = useGLTF("/models/adventurer-transformed.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  useAnimations(animations, ref as React.MutableRefObject<THREE.Group>);

  Object.values(materials).forEach((material) => {
    material.roughness = 0.7; 
    material.metalness = 0.3; 
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <primitive object={nodes.Root} />
          <group name="Adventurer_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Adventurer_Feet_1" geometry={nodes.Adventurer_Feet_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Feet_1.skeleton} />
            <skinnedMesh name="Adventurer_Feet_2" geometry={nodes.Adventurer_Feet_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Feet_2.skeleton} />
          </group>
          <group name="Adventurer_Legs" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Adventurer_Legs_1" geometry={nodes.Adventurer_Legs_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Legs_1.skeleton} />
            <skinnedMesh name="Adventurer_Legs_2" geometry={nodes.Adventurer_Legs_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Legs_2.skeleton} />
          </group>
          <group name="Adventurer_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Adventurer_Body_1" geometry={nodes.Adventurer_Body_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Body_1.skeleton} />
            <skinnedMesh name="Adventurer_Body_2" geometry={nodes.Adventurer_Body_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Body_2.skeleton} />
            <skinnedMesh name="Adventurer_Body_3" geometry={nodes.Adventurer_Body_3.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Body_3.skeleton} />
          </group>
          <group name="Adventurer_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Adventurer_Head_1" geometry={nodes.Adventurer_Head_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Head_1.skeleton} />
            <skinnedMesh name="Adventurer_Head_2" geometry={nodes.Adventurer_Head_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Head_2.skeleton} />
            <skinnedMesh name="Adventurer_Head_3" geometry={nodes.Adventurer_Head_3.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Head_3.skeleton} />
            <skinnedMesh name="Adventurer_Head_4" geometry={nodes.Adventurer_Head_4.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Adventurer_Head_4.skeleton} />
          </group>
          <group name="Backpack" position={[0, 1.373, -0.117]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={26.077}>
            <skinnedMesh name="Backpack_1" geometry={nodes.Backpack_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Backpack_1.skeleton} />
            <skinnedMesh name="Backpack_2" geometry={nodes.Backpack_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Backpack_2.skeleton} />
            <skinnedMesh name="Backpack_3" geometry={nodes.Backpack_3.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Backpack_3.skeleton} />
            <skinnedMesh name="Backpack_4" geometry={nodes.Backpack_4.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Backpack_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("/models/adventurer-transformed.glb");
