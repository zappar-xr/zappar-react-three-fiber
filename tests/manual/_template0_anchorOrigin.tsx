/* eslint-disable no-undef */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Suspense, useEffect, useState } from "react";
import { render } from "react-dom";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { FaceTracker, ZapparCamera, ZapparCanvas, BrowserCompatibility } from "../../src/index";

function Plane(props: { type: "camera" | "scene" | "target"; poseMode?: string }): JSX.Element {
  const { type, poseMode } = props;

  const planeTextureSrc: string = require(`file-loader!../assets/planes/${type}.jpg`).default;
  const planeTexture = useLoader(TextureLoader, planeTextureSrc);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    switch (type) {
      case "camera":
        setPosition([0, 0, -5]);
        break;
      case "scene":
        if (poseMode === "anchor-origin") {
          setPosition([0, -0.5, 0]);
        } else {
          setPosition([0, -0.5, -5]);
        }
        break;
      case "target":
        setPosition([0, 0, 0]);
        break;
      default:
        break;
    }
  }, [type, poseMode]);

  return (
    <mesh scale={[1, 1, 1]} position={position}>
      <planeBufferGeometry attach="geometry" args={[1, 0.25]} />
      <meshBasicMaterial attach="material" map={planeTexture} />
    </mesh>
  );
}

export default function App() {
  const [imageAnchor, setFaceAnchor] = useState<ZapparThree.FaceAnchor>();
  const [cameraOption, setCameraOption] = useState<"default" | "userFacing">("default");
  const [cameraPose, setCameraPose] = useState<"default" | "anchor-origin" | "attitude">("default");
  const [mirror, setMirror] = useState<"none" | "poses" | "css">("none");
  return (
    <>
      <BrowserCompatibility fallback={<div>Sorry!</div>} />
      <ZapparCanvas>
        <axesHelper />
        <ZapparCamera
          userCameraMirrorMode={mirror}
          rearCameraMirrorMode={mirror}
          poseAnchorOrigin={imageAnchor}
          poseMode={cameraPose}
          userFacing={cameraOption === "userFacing"}
        >
          <Suspense fallback={null}>
            <Plane type="camera" />
          </Suspense>
        </ZapparCamera>
        <FaceTracker onNewAnchor={setFaceAnchor}>
          <Suspense fallback={null}>
            <Plane type="target" />
          </Suspense>
        </FaceTracker>
        <Suspense fallback={null}>
          <Plane type="scene" poseMode={cameraPose} />
        </Suspense>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>

      <div className="options">
        <select
          id="cameraSelect"
          value={cameraOption}
          onChange={(e) => setCameraOption(e.target.value as unknown as any)}
          onBlur={(e) => setCameraOption(e.target.value as unknown as any)}
        >
          <option value="default">Default Camera</option>
          <option value="userFacing">Use Facing Camera</option>
        </select>
        <select
          id="poseSelect"
          value={cameraPose}
          onChange={(e) => setCameraPose(e.target.value as unknown as any)}
          onBlur={(e) => setCameraPose(e.target.value as unknown as any)}
        >
          <option value="default">Camera Pose Default</option>
          <option value="attitude">Camera Pose With Device Attitude</option>
          <option value="anchor-origin">Camera Pose With Anchor Origin</option>
        </select>
        <select
          id="mirrorSelect"
          onChange={(e) => setMirror(e.target.value as unknown as any)}
          onBlur={(e) => setMirror(e.target.value as unknown as any)}
        >
          <option value="none">No Mirror</option>
          <option value="poses">Mirror Poses</option>
          <option value="css">CSS ScaleX</option>
        </select>
      </div>
    </>
  );
}
render(<App />, document.getElementById("root"));
