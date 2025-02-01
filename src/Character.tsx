import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import Character from "./models/Character";
import { Vector3, type Group } from "three";

type ActionName =
  | "CharacterArmature|Death"
  | "CharacterArmature|Duck"
  | "CharacterArmature|HitReact"
  | "CharacterArmature|Idle"
  | "CharacterArmature|Idle_Gun"
  | "CharacterArmature|Jump"
  | "CharacterArmature|Jump_Idle"
  | "CharacterArmature|Jump_Land"
  | "CharacterArmature|No"
  | "CharacterArmature|Punch"
  | "CharacterArmature|Run"
  | "CharacterArmature|Run_Gun"
  | "CharacterArmature|Run_Gun_Shoot"
  | "CharacterArmature|Walk"
  | "CharacterArmature|Walk_Gun"
  | "CharacterArmature|Wave"
  | "CharacterArmature|Weapon"
  | "CharacterArmature|Yes";

export default function GameCharacter() {
  const characterRef = useRef<Group>(null);
  const [position, setPosition] = useState<Vector3>(new Vector3(-42, -2, -21));
  const { currentDialog } = useDialogStore();
  const { isOpen } = usePhoneStore();

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  const animationSet: Record<string, ActionName> = {
    idle: "CharacterArmature|HitReact",
    walk: "CharacterArmature|Walk",
    run: "CharacterArmature|Run",
    jump: "CharacterArmature|Jump",
    jumpIdle: "CharacterArmature|Jump_Idle",
    jumpLand: "CharacterArmature|Jump_Land",
    fall: "CharacterArmature|Jump_Land",
  };

  useFrame(() => {
    if (characterRef.current) {
      const worldPosition = new Vector3();
      characterRef.current.getWorldPosition(worldPosition);
      // console.log(worldPosition.y)
      if (worldPosition.y < -15) {
        setPosition(new Vector3(-42, -2, -21));
      }
    }
  });

  return (
    <KeyboardControls map={currentDialog ? [] : isOpen ? [] : keyboardMap}>
      <Ecctrl
        position={position}
        mode="FixedCamera"
        maxVelLimit={5}
        sprintMult={3}
        animated
        camInitDir={{
          x: Math.PI / 12,
          y: Math.PI / 2,
        }}
        userData={{
          name: "player",
        }}
      >
        <EcctrlAnimation characterURL="/models/character-transformed.glb" animationSet={animationSet}>
          <Character ref={characterRef} position={[0, -0.85, 0]} scale={0.5} />
        </EcctrlAnimation>
      </Ecctrl>
    </KeyboardControls>
  );
}
