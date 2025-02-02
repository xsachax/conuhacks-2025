import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState } from "react";
import Lights from "./Lights";
import World from "./World";
import Adventurer from "./Adventurer";
import { useConvoStore } from "./utils/convoHelper";
import Convo from "./ui/Convo";
import global from "./assets/sfx/global.mp3";
import { useGameStore } from "./utils/gameStore";

export default function App() {
  const { convoActive } = useConvoStore();
  const [audioPlayed, setAudioPlayed] = useState(false);
  const { isGameStarted, setGameStarted, isGameEnded, setGameEnded, progress } = useGameStore();

  const handleUserInteraction = () => {
    if (!audioPlayed) {
      const audio = new Audio(global);
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().catch((error) => {
        console.error("Audio play error:", error);
      });
      setAudioPlayed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [audioPlayed]);

  if (!isGameStarted) {
    return <StartScreen setGameStarted={setGameStarted} />;
  }

  return (
    <>
      {convoActive && <Convo />}
      <Canvas shadows camera={{ position: [0, 5, 120], fov: 80 }}>
        {/* <Perf position="top-left" /> */}
        <Physics timeStep="vary">
          <Lights />
          <Sky distance={1000} sunPosition={[-100, -1, -10]} inclination={0.5} azimuth={0.25} />
          <Suspense fallback={null}>
            <Adventurer />
            <World />
          </Suspense>
        </Physics>
      </Canvas>
      <div
  style={{
    position: "absolute",
    top: 1,
    right: 1,
    marginRight: "1%",
    marginTop: "1%",
    borderRadius: "8px",
    width: "30%",
    height: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
  }}
>
  <div
    style={{
      borderRadius: "8px",
      width: `${progress * 20}%`,
      height: "100%",
      backgroundColor: "#3cc85a",
      transition: "width 0.3s ease-in-out",
    }}
  />
  <span
    style={{
      position: "absolute",  // Make it float above the bar
      marginLeft: "10px",
      color: "#fff",
      fontWeight: "bold",
      right: 0, // Position it to the right of the bar
      paddingRight: "10px", // Optional, to avoid overlap
    }}
  >
    {`${progress * 20}%`}
  </span>
</div>

    </>
  );
}

function StartScreen({ setGameStarted }: { setGameStarted: (value: boolean) => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-center">Welcome to the Adventure</h1>
        <p className="text-center">Click anywhere to start the game</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setGameStarted(true)}>
          Start
        </button>
      </div>
    </div>
  );
}
