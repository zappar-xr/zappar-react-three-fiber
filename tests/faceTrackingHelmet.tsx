/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { Suspense, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { FaceTracker, HeadMaskMesh, ZapparCamera, ZapparCanvas, Loader } from "../src/index";

function Model() {
  const [gltf, set] = useState<any>();
  useMemo(() => new GLTFLoader().load(require("file-loader!./assets/z_helmet.glb").default, set), [require("file-loader!./assets/z_helmet.glb").default]);

  if (gltf) {
    const { scene } = gltf;
    const Helmet = scene.getObjectByName("Helmet");
    return <primitive position={[0.25, -1.25, 0.1]} object={Helmet} />;
  }
  return null;
}
function Model2() {
  const [gltf, set] = useState<any>();
  useMemo(() => new GLTFLoader().load(require("file-loader!./assets/z_helmet.glb").default, set), [require("file-loader!./assets/z_helmet.glb").default]);

  if (gltf) {
    const { scene } = gltf;
    const Helmet = scene.getObjectByName("Helmet");
    return <primitive position={[0.25, -1.25, 0.1]} object={Helmet} />;
  }
  return null;
}

export default function App() {
  const zapparCamera = useRef();
  const faceTrackerGroup = useRef();
  const [useFirstHelmet, setUseFirstHelmet] = useState(true);
  return (
    <>
      <ZapparCanvas>
        <ZapparCamera rearCameraMirrorMode="css" ref={zapparCamera} />
        <FaceTracker camera={zapparCamera} ref={faceTrackerGroup}>
          <Suspense fallback={null}>
            <HeadMaskMesh trackerGroup={faceTrackerGroup} />
            {useFirstHelmet ? <Model /> : <Model2 />}
          </Suspense>
        </FaceTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <Loader />
      </ZapparCanvas>
      <button
        type="button"
        style={{ position: "absolute", marginLeft: "50%" }}
        onClick={() => {
          setUseFirstHelmet((current) => !current);
        }}
      >
        Toggle
      </button>
    </>
  );
}
render(<App />, document.getElementById("root"));
