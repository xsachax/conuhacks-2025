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
        position={[0, 0, -15]} 
        intensity={3}
        color="#ffffff"
        shadow-mapSize={[4096, 4096]} 
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />

      <ambientLight intensity={0.3} color="#cceeff" /> 

      <hemisphereLight
        color="#bfe4ff" 
        groundColor="#a5d9ff" 
        intensity={0.7} 
      />

      <directionalLight
        position={[-20, 0, 10]}
        intensity={0.8}
        color="#99ccff"
      />
    </>
  );
}
