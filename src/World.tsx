import { RigidBody } from "@react-three/rapier";
import Horse from "./models/Horse";
import Steve from "./models/Steve";
import Wario from "./models/Wario";
import Island from "./models/Island";
import Yoda from "./models/Yoda";
import Garfield from "./models/Garfield";
import TranslationHelper from "./TranslationHelper";
import type { Convo } from "./utils/store";

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
      <Garfield position={[-23, -13.1, -9]} rotation={[0, 5, 0]} scale={2.5} dialog={{}} />
      <Wario position={[-55, -13.2, -10]} rotation={[0, -4.3, 0]} scale={1.5} dialog={{}} />
      <Yoda position={[-55, -12.3, -2]} rotation={[0, -4.3, 0]} scale={0.8} dialog={{}} />
    </>
  );
}

// Convos

const horseConvo: Convo = {
  stage: "stage1",
  character: "Horse1",
  text: "Hi there! Hello world!",
  options: [
    {
      text: "This is the text field",
      next: {
        stage: "stage1",
        character: "Horse1",
        text: "This is the next text field",
      },
    },
  ],
};
