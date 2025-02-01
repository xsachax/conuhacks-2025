import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState, useRef } from "react";
import Lights from "./Lights";
import World from "./World";
import Character from "./Character";
import Adventurer from "./Adventurer";

export default function App() {
  //const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
      <Perf position="top-left" />
      <Physics
        timeStep="vary"
        // debug
      >
        <Lights />
        <Suspense fallback={null}>
          <Character />
          {/*<Adventurer />*/}
          {/* <PerspectiveCamera makeDefault position={[10, 200, 30]} rotation={[-Math.PI/2, 0, Math.PI]} /> */}
          {/* <OrbitControls makeDefault /> */}
          <World />
        </Suspense>
      </Physics>
    </Canvas>
  );
}
