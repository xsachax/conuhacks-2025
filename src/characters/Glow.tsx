import { useState } from "react";
import Proximity from "../utils/Proximity";
import Glow from "../models/Glow";
import { Html } from "@react-three/drei";
import type { Convo } from "../utils/convoHelper";
import { useConvoStore } from "../utils/convoHelper";
import voiceline from "../assets/sfx/glow.mp3";
import { useGameStore } from "../utils/gameStore";

const voicelineAudio = new Audio(voiceline);

type Action =
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

export default function Character({ position, rotation, action }: { position: [number, number, number]; rotation: [number, number, number]; action?: Action; convo: Convo }) {
  const [currentAction, setCurrentAction] = useState<Action>(action || "CharacterArmature|HitReact");
  const CHARACTER_NAME = "Glow";
  const { isGameEnded, setGameEnded } = useGameStore();

  const handleCharacterClicked = () => {
    voicelineAudio.volume = 1;
    voicelineAudio.play();
    console.log("Character clicked");
    // dont allow convo to be opened if it has already been seen
    if (seenCharacters.includes(CHARACTER_NAME)) return;
    setConvoActive(true);
    setCurrentCharacterName(CHARACTER_NAME);
  };

  const { setConvoActive, seenCharacters, setCurrentCharacterName } = useConvoStore();

  return (
    console.log("Character rendered"),
    (
      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      <group position={position} rotation={rotation} onClick={handleCharacterClicked}>
        <Proximity
          onEnter={() => {
            if (isGameEnded) return;
            setGameEnded(true);
          }}
          endgame={true}
        >
          <Glow action={currentAction} />
        </Proximity>
      </group>
    )
  );
}
