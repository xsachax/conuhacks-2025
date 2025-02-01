import { useRef } from "react";
import { DirectionalLight } from "three";
import { useFrame } from "@react-three/fiber";

export default function Lights() {
  const lightRef = useRef<DirectionalLight>(null);

  return (
    <>
      {/* Main directional light (sun-like) */}
      <directionalLight
        ref={lightRef}
        castShadow
        position={[-10, 4, 1]}
        intensity={1}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />

      {/* Hemisphere light for better sky/ground contrast */}
      <hemisphereLight color="#ffffff" groundColor="#8d7c7c" intensity={0.75} />

      {/* Fill light from the opposite side */}
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#b5d6ff" />
    </>
  );
}
