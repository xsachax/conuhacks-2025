import { useState } from "react";
import Proximity from "../utils/Proximity";
import Wario from "../models/Wario";
import { Html } from "@react-three/drei";
import type { Convo } from "../utils/convoHelper";
import { useConvoStore } from "../utils/convoHelper";
import voiceline from "../assets/sfx/wario.mp3";

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

export default function RealEstate({ position, rotation, action }: { position: [number, number, number]; rotation: [number, number, number]; action?: Action; convo: Convo }) {
  const [currentAction, setCurrentAction] = useState<Action>(action || "CharacterArmature|HitReact");
  const CHARACTER_NAME = "Wario";

  const handleCharacterClicked = () => {
    voicelineAudio.play();
    console.log("Character clicked");
    // dont allow convo to be opened if it has already been seen
    if (seenCharacters.includes(CHARACTER_NAME)) return;
    setConvoActive(true);
    setCurrentCharacterName(CHARACTER_NAME);
  };

  const { setConvoActive, seenCharacters, setCurrentCharacterName } = useConvoStore();

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <group position={position} rotation={rotation} onClick={handleCharacterClicked}>
      <Html position={[-0.25, 4, 0]} center scale={0.05}>
        <div className="relative select-none">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-xl relative text-center border-2 border-gray-200">
            <div
              className={`px-4 py-2 rounded-2xl shadow-xl relative text-center border-2 border-gray-200 ${seenCharacters.includes(CHARACTER_NAME) ? "bg-green-500" : "bg-red-500"}`}
            >
              {seenCharacters.includes(CHARACTER_NAME) ? (
                <div className="text-2xl font-black text-white">✔</div>
              ) : (
                <div className="text-2xl font-black text-white animate-bounce">!</div>
              )}
            </div>

            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 
                            border-l-[10px] border-l-transparent
                            border-t-[12px] border-t-white 
                            border-r-[10px] border-r-transparent
                            after:absolute after:top-[-14px] after:left-[-10px]
                            after:border-l-[10px] after:border-l-transparent
                            after:border-t-[12px] after:border-t-gray-200
                            after:border-r-[10px] after:border-r-transparent"
            ></div>
          </div>
        </div>
      </Html>
      <Proximity
        onEnter={() => {
          //console.log("In");
          setCurrentAction("CharacterArmature|Wave");
        }}
        onLeave={() => {
          //console.log("Out");
          setCurrentAction("CharacterArmature|HitReact");
        }}
      >
        <Wario action={currentAction} />
      </Proximity>
    </group>
  );
}
