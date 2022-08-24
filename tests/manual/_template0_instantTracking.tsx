import { createRoot } from "react-dom/client";
import React from "react";
import { ZapparCamera, InstantTracker, ZapparCanvas } from "../../src/index";

export default function App() {
  return (
    <ZapparCanvas>
      <ZapparCamera />
      <InstantTracker placementUI="placement-only" placementCameraOffset={[0, 0, -10]}>
        <mesh>
          <sphereBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </InstantTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

