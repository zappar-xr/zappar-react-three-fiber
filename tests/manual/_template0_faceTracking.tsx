/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { Suspense, useRef } from "react";
import { createRoot } from "react-dom/client";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { FaceBufferGeometry, FaceTracker, ZapparCamera, ZapparCanvas, BrowserCompatibility, Types } from "../../src/index";

const FaceMeshMaterial = () => {
  const faceMapSrc: string = require("file-loader!../assets/faceMeshTemplate.png").default;
  const faceMapTexture = useLoader(TextureLoader, faceMapSrc);
  return <meshStandardMaterial transparent map={faceMapTexture} color="red" />;
};

const App = () => {
  const faceTrackerGroup = useRef<Types.FaceAnchorGroup>();
  return (
    <>
      <BrowserCompatibility fallback={<div>Sorry!</div>} />
      <ZapparCanvas>
        <ZapparCamera
          onUpdate={() => {
            console.log("update");
          }}
          onFirstFrame={() => {
            console.log("first");
          }}
          // makeDefault={false}
          // renderPriority={0}
          sources={{
            userCamera: "ff237f94e69bf794a40f862cd1b431e7b8e2231fc11b624b94d40d6ab32c6b16",
            rearCamera: "ff237f94e69bf794a40f862cd1b431e7b8e2231fc11b624b94d40d6ab32c6b16",
          }}
        />
        <FaceTracker ref={faceTrackerGroup}>
          <Suspense fallback={null}>
            <mesh>
              <FaceMeshMaterial />
              <FaceBufferGeometry trackerGroup={faceTrackerGroup} />
            </mesh>
          </Suspense>
        </FaceTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </>
  );
};
const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

