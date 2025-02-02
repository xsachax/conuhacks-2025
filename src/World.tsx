import { RigidBody } from "@react-three/rapier";
import Horse from "./characters/Horse";
import Steve from "./characters/Steve";
import Wario from "./characters/Wario";
import Island from "./models/Island";
import Yoda from "./characters/Yoda";
import Garfield from "./characters/Garfield";
import TranslationHelper from "./TranslationHelper";
import type { Convo } from "./utils/store";
import { useConvoStore } from "./utils/convoHelper";

export default function World() {
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Island />
        </RigidBody>
      </group>
      <TranslationHelper position={[0, 0, 0]} />
      <Horse position={[-22, -12.7, 10]} rotation={[0, 4, 0]} scale={2.5} />
      <Steve position={[-22, -13.1, 0]} rotation={[0, 4, 0]} scale={2.5} />
      <Garfield position={[-23, -13.1, -9]} rotation={[0, 5, 0]} scale={2.5} />
      <Wario position={[-55, -13.2, -10]} rotation={[0, -4.3, 0]} scale={1.5} />
      <Yoda position={[-55, -12.3, -2]} rotation={[0, -4.3, 0]} scale={0.8} />
    </>
  );
}
