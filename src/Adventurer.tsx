import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import Adventurer from "./models/Adventurer";
import { Vector3, type Group } from "three";
import { useConvoStore } from "./utils/convoHelper";
import boomSFX from "./assets/sfx/boom.mp3";

const boomAudio = new Audio(boomSFX);

type ActionName =
  | "CharacterArmature|Death"
  | "CharacterArmature|Gun_Shoot"
  | "CharacterArmature|HitRecieve"
  | "CharacterArmature|HitRecieve_2"
  | "CharacterArmature|Idle"
  | "CharacterArmature|Idle_Gun"
  | "CharacterArmature|Idle_Gun_Pointing"
  | "CharacterArmature|Idle_Gun_Shoot"
  | "CharacterArmature|Idle_Neutral"
  | "CharacterArmature|Idle_Sword"
  | "CharacterArmature|Interact"
  | "CharacterArmature|Kick_Left"
  | "CharacterArmature|Kick_Right"
  | "CharacterArmature|Punch_Left"
  | "CharacterArmature|Punch_Right"
  | "CharacterArmature|Roll"
  | "CharacterArmature|Run"
  | "CharacterArmature|Run_Back"
  | "CharacterArmature|Run_Left"
  | "CharacterArmature|Run_Right"
  | "CharacterArmature|Run_Shoot"
  | "CharacterArmature|Sword_Slash"
  | "CharacterArmature|Walk"
  | "CharacterArmature|Wave";

export default function GameCharacter() {
  const { convoActive } = useConvoStore();
  const characterRef = useRef<Group>(null);
  const [position, setPosition] = useState<Vector3>(new Vector3(-41.93, -11, -33.13));

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];
  const animationSet: Record<string, ActionName> = {
    idle: "CharacterArmature|Idle",
    walk: "CharacterArmature|Walk",
    run: "CharacterArmature|Run",
    jump: "CharacterArmature|HitRecieve",
    jumpIdle: "CharacterArmature|Run",
    jumpLand: "CharacterArmature|Roll",
    fall: "CharacterArmature|Run",
  };

  useFrame(() => {
    if (characterRef.current) {
      const worldPosition = new Vector3();
      characterRef.current.getWorldPosition(worldPosition);
      // console.log(worldPosition.y)
      if (worldPosition.y < -20) {
        setPosition(new Vector3(-41.93, -11, -33.13));
        boomAudio.play();
      }
    }
  });

  return (
    <KeyboardControls map={convoActive ? [] : keyboardMap}>
      <Ecctrl
  position={position}
  mode="FixedCamera"
  maxVelLimit={5}
  sprintMult={3.5}
  animated
  camInitDir={{
    x: Math.PI / 12, 
    y: Math.PI / 32,
  }}
  camTargetPos={{
    x: 0,
    y: 1,
    z: 2,
  }}
  userData={{
    name: "player",
  }}
>
        <EcctrlAnimation characterURL="/models/adventurer-transformed.glb" animationSet={animationSet}>
          <Adventurer ref={characterRef} position={[0, -0.85, 0]} scale={0.015} rotation={[1.5, 0, 0]} />
        </EcctrlAnimation>
      </Ecctrl>
    </KeyboardControls>
  );
}
