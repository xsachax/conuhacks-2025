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
import HashLoader from "react-spinners/HashLoader";

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

  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (!isGameEnded) return;
    const timer = setTimeout(() => {
      console.log("Timer finished");
      setShowResults(true);
    }, 5000); // Match the duration of the fade-in animation (2 seconds)

    return () => clearTimeout(timer);
  }, [isGameEnded]);

  if (isGameEnded) {
    return <div>{showResults ? <ResultsScreen /> : <EndGameWhiteScreen />}</div>;
  }

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
            <NoneGameScreenBackground />
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

function ResultsScreen() {
  const [page, setPage] = useState(1);

  const { gameResults, gameResultsAquired } = useGameStore();

  const handleFetchResults = () => {
    setPage(2);
    //TODO
  };

  useEffect(() => {
    if (!gameResultsAquired) {
      setPage(3);
    }
  }, [gameResultsAquired]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-950 overflow-auto md:flex md:items-center md:justify-center z-[99999999999] md:overflow-hidden">
      {/* 3D Background with darker overlay */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Canvas>
          <Suspense fallback={null}>
            <NoneGameScreenBackground />
          </Suspense>
        </Canvas>
      </div>

      {page === 1 ? (
        <>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={handleFetchResults}>
            See Results
          </button>
        </>
      ) : page === 2 ? (
        <div className="p-8 rounded-lg flex flex-col gap-8 items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-white">Fetching Results</h1>

          <HashLoader color="#ffffff" loading={true} size={50} />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-12 pb-8 border-b-2 border-gray-200">
            <div className="w-1/3">
              <CircularProgressBar percentage={gameResults.accuracy1} />
            </div>
            <div className="w-2/3 text-center">
              <h2 className="text-2xl font-bold mb-2">You're an aspiring</h2>
              <h1 className="text-5xl font-bold text-blue-600">{gameResults.job1}!</h1>
            </div>
          </div>

          <div className="flex justify-around mb-12 pb-8 border-b-2 border-gray-200">
            <div className="text-center flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{gameResults.job2}</h2>
              <CircularProgressBar percentage={gameResults.accuracy2} size="small" />
            </div>
            <div className="text-center flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{gameResults.job3}</h2>
              <CircularProgressBar percentage={gameResults.accuracy3} size="small" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Based on your responses, you value:</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 flex items-center justify-center">
              <h3 className="text-lg font-semibold text-green-700 text-center">{gameResults.criteria1}</h3>
            </div>
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 flex items-center justify-center">
              <h3 className="text-lg font-semibold text-blue-700 text-center">{gameResults.criteria2}</h3>
            </div>
            <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-50 flex items-center justify-center">
              <h3 className="text-lg font-semibold text-purple-700 text-center">{gameResults.criteria3}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getColorClass = (percentage: number): string => {
  if (percentage >= 80) return "text-green-500";
  if (percentage >= 60) return "text-yellow-500";
  return "text-red-500";
};

const CircularProgressBar: React.FC<{ percentage: number; size?: "large" | "small" }> = ({ percentage, size = "large" }) => {
  const colorClass = getColorClass(percentage);
  const dimensions = size === "large" ? "w-40 h-40" : "w-20 h-20";
  const strokeWidth = size === "large" ? 10 : 8;
  const radius = size === "large" ? 45 : 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${dimensions}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle className="text-gray-200" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
        <circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${size === "large" ? "text-2xl" : "text-sm"} font-bold`}>{percentage}%</span>
      </div>
    </div>
  );
};

function EndGameWhiteScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center fade-in">
      <h1 className="text-4xl font-bold">Your adventure is over!</h1>
    </div>
  );
}

function NoneGameScreenBackground() {
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
