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
import Island from "./models/Island";
import { requestNextCareerPathQuestions, submitAnswers } from "./ai/conversationStore";

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
            position: "absolute",
            marginLeft: "10px",
            color: "#fff",
            fontWeight: "bold",
            right: 0,
            paddingRight: "10px",
          }}
        >
          {`${progress * 20}%`}
        </span>
      </div>
    </>
  );
}

function StartScreen({ setGameStarted }: { setGameStarted: (value: boolean) => void }) {
  const [page, setPage] = useState(1);
  const [age, setAge] = useState("18");
  const [status, setStatus] = useState("Undergrad Student");
  const [goal, setGoal] = useState("goal");

  const handleGameStart = () => {
    submitAnswers({ a1: age, a2: status, a3: goal });
    requestNextCareerPathQuestions();
    setGameStarted(true);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-950 overflow-auto md:flex md:items-center md:justify-center z-[99999999999] md:overflow-hidden">
      {/* 3D Background with darker overlay */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Canvas>
          <Suspense fallback={null}>
            <StartScreenBackground />
          </Suspense>
        </Canvas>
      </div>
      {page === 1 ? (
        <div className="p-8 rounded-lg flex flex-col gap-4 justify-center items-center">
          <div
            className=" text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            style={{ textShadow: "4px 4px 0 #fff, 8px 8px 0 #000" }}
          >
            PATHFINDER
          </div>
          <button className="mt-4 w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => setPage(2)}>
            Start
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-center">Welcome to the Adventure!</h1>
          <form className="space-y-4 mt-8">
            <label className="block text-gray-600">Age</label>
            <div>
              <input
                type="range"
                className="mt-1 block w-full border-2 border-gray-300 rounded-md p-0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="100"
                step="1"
                style={{ width: "100%" }}
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>{age}</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Current Professional Status</label>
              <select className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Undergrad Student" disabled>
                  Select status
                </option>
                <option value="student">High School Student</option>
                <option value="student">Undergraduate Student</option>
                <option value="student">Graduate Student</option>
                <option value="teacher">New-Grad</option>
                <option value="admin">Professional</option>
                <option value="admin">Senior Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Career Goal</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3"
                placeholder="Find Happiness!"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
          </form>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={handleGameStart}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}

function StartScreenBackground() {
  const { scene } = useThree();

  useFrame(() => {
    scene.rotation.y += 0.001; // Slow auto-rotation
  });

  return (
    <>
      <Sky distance={1000} sunPosition={[-100, -1, -10]} inclination={0.5} azimuth={0.25} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Island scale={10} position={[35, -10, 0]} rotation={[0, 0, 0]} />
    </>
  );
}
