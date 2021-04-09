import React from "react";
import { render } from "react-dom";
import { FaceLandmark, FaceTracker, ZapparCamera, ZapparCanvas } from "../src/index";

export default function App() {
  const landmarks = [
    "eye-left",
    "eye-right",
    "ear-left",
    "ear-right",
    "nose-bridge",
    "nose-tip",
    "nose-base",
    "lip-top",
    "lip-bottom",
    "mouth-center",
    "chin",
    "eyebrow-left",
    "eyebrow-right",
  ].map((feature) => (
    <FaceLandmark key={feature} target={feature as any}>
      <mesh scale={[0.05, 0.05, 0.05]}>
        <sphereBufferGeometry />
        <meshStandardMaterial color={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
      </mesh>
    </FaceLandmark>
  ));

  return (
    <ZapparCanvas>
      <ZapparCamera rearCameraMirrorMode="css" />
      <FaceTracker />
      {landmarks}
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}
render(<App />, document.getElementById("root"));
