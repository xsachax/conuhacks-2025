import { useRef } from "react";
import { DirectionalLight } from "three";
import { useFrame } from "@react-three/fiber";

export default function Lights() {
  const lightRef = useRef<DirectionalLight>(null);

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[-10, 0, 5]} 
        intensity={2.5}
        color="#ffffff"
        shadow-mapSize={[4096, 4096]} 
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />

      {/* Ambient light for indirect reflections */}
      <ambientLight intensity={0.4} color="#cceeff" /> {/* Light blue tint for water glow */}

      {/* Hemisphere light - Boost sky reflections */}
      <hemisphereLight
        color="#bfe4ff" 
        groundColor="#a5d9ff" 
        intensity={1.2} 
      />

      {/* Soft blue fill light for enhancing water reflections */}
      <directionalLight
        position={[5, 5, -5]}
        intensity={0.8}
        color="#99ccff"
      />
    </>
  );
}
