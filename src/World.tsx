import { RigidBody } from "@react-three/rapier";
import Horse from "./models/Horse";
import Steve from "./models/Steve";
import Bender from "./models/Bender";
import Wario from "./models/Wario";
import Peter from "./models/Peter";
import Island from "./models/Island";
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
      <Horse position={[-22, -12.7, 10]} rotation={[0, 4, 0]} scale={2.5} dialog={{}} />
      <Steve position={[-22, -13.1, 0]} rotation={[0, 4, 0]} scale={2.5} dialog={{}} />
      <Bender position={[-22, -13.3, -10]} rotation={[0, 5, 0]} scale={2.5} dialog={{}} />
      <Wario position={[-57, -15.2, -10]} rotation={[0, -4.3, 0]} scale={2.5} dialog={{}} />
      <Peter position={[-55, -13.3, -2]} rotation={[0, -4.5, 0]} scale={150} dialog={{}} />
    </>
  );
}
