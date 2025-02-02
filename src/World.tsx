import { RigidBody } from "@react-three/rapier";
import Horse from "./characters/Horse";
import Steve from "./characters/Steve";
import Island from "./models/Island";
import Yoda from "./characters/Yoda";
import Garfield from "./characters/Garfield";
import Krabs from "./characters/Krabs";
import Glow from "./characters/Glow";
// import TranslationHelper from "./TranslationHelper";
import { useGameStore } from "./utils/gameStore";

export default function World() {
  const { isGameReadyToEnd } = useGameStore();
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Island />
        </RigidBody>
      </group>
      {/* <TranslationHelper position={[0, 0, 0]} /> */}
      <Horse position={[-20.37, -12.14, 40.63]} rotation={[0, 4, 0]} />
      <Steve position={[-27.61, -13.4, -2.37]} rotation={[0, 3.5, 0]} />
      <Garfield position={[1.5, -10.1, -20.89]} rotation={[0, 4.2, 0]} />
      <Krabs position={[-55, -11.9, -10]} rotation={[0, -4.3, 0]} />
      <Yoda position={[-78.6, -11.87, 35.0]} rotation={[0, -4.3, 0]} />
      <Glow position={[-45, -8, 50.0]} rotation={[0, 0, 0]} />
    </>
  );
}
