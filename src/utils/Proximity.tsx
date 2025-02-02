import { CuboidCollider } from "@react-three/rapier";

export default function Sensor({ children, onEnter, onLeave }: { children: React.ReactElement; onEnter: () => void; onLeave: () => void }) {
  return (
    <CuboidCollider
      args={[5, 7, 5]}
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
