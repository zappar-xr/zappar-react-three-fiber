/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { ImageTracker, ZapparCamera, ZapparCanvas } from "../../src/index";

export default function App() {
  const zapparCamera = useRef();
  const targetFile = require("file-loader!../assets/example-tracking-image.zpt").default;

  return (
    <ZapparCanvas>
      <ZapparCamera ref={zapparCamera} rearCameraMirrorMode="css" />
      <ImageTracker
        onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
        targetImage={targetFile}
        camera={zapparCamera}
      >
        <mesh position={[0, 0, -5]}>
          <sphereBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </ImageTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

