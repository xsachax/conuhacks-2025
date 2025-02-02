import { RigidBody } from "@react-three/rapier";
import Horse from "./characters/Horse";
import Island from "./models/Island";
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
      <Horse position={[-22, -12.7, 10]} rotation={[0, 4, 0]} scale={2.5} convo={horseConvo} />
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
