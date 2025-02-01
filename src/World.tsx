// The world... import ./models/[model].tsx to construct the world

import { RigidBody } from "@react-three/rapier";
import Map from "./models/Map";

// type Action = 'CharacterArmature|Death' | 'CharacterArmature|Duck' | 'CharacterArmature|HitReact' | 'CharacterArmature|Idle' | 'CharacterArmature|Idle_Gun' | 'CharacterArmature|Jump' | 'CharacterArmature|Jump_Idle' | 'CharacterArmature|Jump_Land' | 'CharacterArmature|No' | 'CharacterArmature|Punch' | 'CharacterArmature|Run' | 'CharacterArmature|Run_Gun' | 'CharacterArmature|Run_Gun_Shoot' | 'CharacterArmature|Walk' | 'CharacterArmature|Walk_Gun' | 'CharacterArmature|Wave' | 'CharacterArmature|Weapon' | 'CharacterArmature|Yes'

export default function World() {
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Map />
        </RigidBody>
      </group>
    </>
  );
}
