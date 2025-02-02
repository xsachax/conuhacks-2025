import { RigidBody } from "@react-three/rapier";
import Horse from "./models/Horse";
import Island from "./models/Island";
import TranslationHelper from "./TranslationHelper";

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
    </>
  );
}
