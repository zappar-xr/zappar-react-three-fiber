import { render } from "react-dom";
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

render(<App />, document.getElementById("root"));
