import { Html, TransformControls } from "@react-three/drei";
import { useState } from "react";

export default function TranslationHelper({ children }: { children: React.ReactElement }) {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  return (
    <>
      <Html position={position}>
        <div className="bg-white p-2 rounded-md">
          <p>
            {position[0].toFixed(2)}, {position[1].toFixed(2)}, {position[2].toFixed(2)}
          </p>
        </div>
      </Html>
      <TransformControls
        mode="translate"
        // @ts-expect-error I hate three.js
        onObjectChange={(e?: Event<string, Object3D>) => {
          if (e?.target?.object.position) {
            // console.log('e.target.object.position', e.target.object.position)
            setPosition(e.target.object.position.toArray());
          }
        }}
      >
        {children}
      </TransformControls>
    </>
  );
}
