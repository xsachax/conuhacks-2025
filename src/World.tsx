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

  // to avoid annoying typescript linting errors, assign arrays as tuples with proper types
  const asTuple = <T extends [number, number, number]>(t: T) => t;

  const horseValues = [asTuple([-20.37, -12, 40.63]), asTuple([0, 4, 0])];
  const steveValues = [asTuple([-27.61, -13.4, -2.37]), asTuple([0, 3.9, 0])];
  const garfieldValues = [asTuple([1.5, -11.35, -20.89]), asTuple([0, 4.2, 0])];
  const krabsValues = [asTuple([-55, -11.9, -10]), asTuple([0, -4.3, 0])];
  const yodaValues = [asTuple([-78.6, -10.25, 35.0]), asTuple([0, -4.3, 0])];
  const glowValues = [asTuple([-45, -8, 50.0]), asTuple([0, 0, 0])];
  
  return (
    <>
      <group scale={4}>
        {/* Ground and static elements */}
        <RigidBody type="fixed" colliders="trimesh">
          <Island />
        </RigidBody>
      </group>
      {/* <TranslationHelper position={[0, 0, 0]} /> */}
      <Horse position={horseValues[0]} rotation={horseValues[1]} />
      <Steve position={steveValues[0]} rotation={steveValues[1]} />
      <Garfield position={garfieldValues[0]} rotation={garfieldValues[1]} />
      <Krabs position={krabsValues[0]} rotation={krabsValues[1]} />
      <Yoda position={yodaValues[0]} rotation={yodaValues[1]} />
      {isGameReadyToEnd && <Glow position={glowValues[0]} rotation={glowValues[1]} />}
    </>
  );
}
