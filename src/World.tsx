import { RigidBody } from "@react-three/rapier";
import Horse from "./models/Horse";
import Heaven from "./models/Heaven";

export default function World() {
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Heaven />
        </RigidBody>
      </group>
      <Horse position={[0, 0, 0]} rotation={[0, 0, 0]} dialog={{}} />
    </>
  );
}
