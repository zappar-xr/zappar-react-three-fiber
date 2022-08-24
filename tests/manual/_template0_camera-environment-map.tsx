/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import { createRoot } from "react-dom/client";
import { ZapparCamera, ZapparCanvas } from "../../src/index";

function App() {
  return (
    <ZapparCanvas>
      <ZapparCamera environmentMap />
      {/* <CameraEnvironmentMap attach="environment" /> */}
      <mesh position={[0, 0, -5]}>
        <sphereBufferGeometry />
        <meshStandardMaterial metalness={1} roughness={0} />
      </mesh>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}
const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
