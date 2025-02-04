import { CuboidCollider } from "@react-three/rapier";

export default function Sensor({ children, onEnter, onLeave, endgame = false }: { children: React.ReactElement; onEnter: () => void; onLeave: () => void; endgame?: boolean }) {
  return (
    <CuboidCollider
      args={endgame ? [10, 14, 10] : [5, 7, 5]}
      onIntersectionEnter={() => {
        onEnter();
      }}
      onIntersectionExit={() => {
        onLeave();
      }}
      sensor
    >
      {children}
    </CuboidCollider>
  );
}
