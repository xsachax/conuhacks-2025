import { RigidBody } from "@react-three/rapier";
import Map from "./models/Map";
import Horse from "./models/Horse";
import ChillGuy from "./models/Chill_guy";

export default function World() {
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Map />
        </RigidBody>
      </group>
      <Horse position={[0, 0, 0]} rotation={[0, 0, 0]} dialog={{}} />
    </>
  );
}
