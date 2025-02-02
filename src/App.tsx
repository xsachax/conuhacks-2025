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
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 80 }}>
      <Perf position="top-left" />
      <Physics
        timeStep="vary"
        // debug
      >
        <Lights />
        <Sky distance={0} sunPosition={[-10, 1, 0]} inclination={0.5} azimuth={0.25} />
        <Suspense fallback={null}>
          {/* <Character /> */}
          <Adventurer />
          <World />
        </Suspense>
      </Physics>
    </Canvas>
  );
}
