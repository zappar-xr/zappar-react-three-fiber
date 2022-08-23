/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import * as ZapparThree from "@zappar/zappar-threejs";
import * as THREE from "three";
import DynamicTimeWarping from "dynamic-time-warping-ts";
import { useFrame } from "@react-three/fiber";
import { ZapparCamera, ZapparCanvas, LogLevel, setLogLevel, InstantTracker } from "../../../src/index";

setLogLevel(LogLevel.LOG_LEVEL_VERBOSE);

const expectedPositions = [
  [-2.7755575615628914e-16, 6.938893903907228e-16, -5],
  [2.5493081168133294e-32, 1.3877787807814457e-16, -5],
  [1.2746540584066647e-32, 6.938893903907228e-17, -5],
  [-1.3877787807814457e-16, -3.469446951953614e-16, -5],
  [-1.0197232467253317e-31, -5.551115123125783e-16, -5],
  [-1.3877787807814457e-16, 3.469446951953614e-16, -5],
  [-0.05292928218841553, -0.022677872329950333, -4.724452495574951],
  [-0.07578721642494202, -0.08104576915502548, -4.335854530334473],
  [-0.16328337788581848, -0.12942877411842346, -4.058575630187988],
  [-0.20532681047916412, -0.2180759310722351, -3.800262928009033],
  [-0.16959123313426971, -0.3195580542087555, -3.6421000957489014],
  [-0.09990151971578598, -0.3589215874671936, -3.667670249938965],
  [0.05219292640686035, -0.3202897906303406, -3.759150505065918],
  [0.22777673602104187, -0.24612268805503845, -3.906726360321045],
  [0.41696789860725403, -0.16152086853981018, -4.0322160720825195],
  [0.5003142356872559, -0.10546170175075531, -4.158051490783691],
  [0.5858730673789978, -0.028150036931037903, -4.311360836029053],
  [0.6682076454162598, 0.08474548161029816, -4.467261791229248],
  [0.6907133460044861, 0.22231054306030273, -4.604936122894287],
  [0.5768030285835266, 0.38665086030960083, -4.791666030883789],
  [0.4840632379055023, 0.45514151453971863, -4.90498685836792],
  [0.33104515075683594, 0.5319470167160034, -5.054035663604736],
  [0.1698853075504303, 0.5953159928321838, -5.180690765380859],
  [0.016266679391264915, 0.6277474164962769, -5.310156345367432],
  [-0.16181084513664246, 0.6190881729125977, -5.390704154968262],
  [-0.2809217572212219, 0.5984033346176147, -5.417774677276611],
  [-0.376767098903656, 0.5773396492004395, -5.4175825119018555],
  [-0.5640522241592407, 0.5283351540565491, -5.39555549621582],
  [-0.6644982099533081, 0.4781344532966614, -5.350150108337402],
  [-0.7083213925361633, 0.442756712436676, -5.316919803619385],
  [-0.7486733198165894, 0.377977579832077, -5.218589782714844],
  [-0.7580865621566772, 0.3090710937976837, -5.087276935577393],
  [-0.7416569590568542, 0.2462989091873169, -4.9328813552856445],
  [-0.6911581158638, 0.22184880077838898, -4.8093461990356445],
  [-0.6235256791114807, 0.17899154126644135, -4.628822326660156],
  [-0.5392056703567505, 0.10864604264497757, -4.408992290496826],
  [-0.5005232691764832, 0.052530813962221146, -4.276485443115234],
  [-0.4778139293193817, -0.008608612231910229, -4.1591315269470215],
  [-0.4487411677837372, -0.05789940059185028, -4.094956874847412],
  [-0.4072890877723694, -0.11562083661556244, -4.0244293212890625],
].map((pos) => new THREE.Vector3(...pos));

function ZapparCameraExt(props: { onReady: () => void; onSample: () => void; onFinish: () => void }) {
  const { onReady, onSample, onFinish } = props;
  const [frameN, setFrameN] = useState(-1);
  const [finished, setFinished] = useState(false);
  const cameraRef = useRef<ZapparThree.Camera>(null);
  useEffect(() => {
    if (!cameraRef.current) return;

    const sequenceSource = new ZapparThree.SequenceSource(cameraRef.current.pipeline);
    const sourceUrl = require("file-loader!../../assets/sources/instant-tracking.uar").default;
    fetch(sourceUrl).then(async (resp) => {
      sequenceSource.load(await resp.arrayBuffer());
      sequenceSource.start();
    });
  }, []);
  let readyCalled = false;

  // Total number of frames in the sequence.
  const sequenceNframes = 82;

  useFrame(() => {
    if (!cameraRef.current) return;

    const frameNumber = cameraRef.current.pipeline.frameNumber();
    // Avoid sampling the same frame twice
    if (frameN === frameNumber) return;

    // Sample every second frame
    if (frameNumber % 2 === 0 && !finished) {
      onSample();
    }

    // Callback onFinish when we've reached the last sequence frame.
    if (frameNumber === sequenceNframes && !finished) {
      setFinished(true);
      onFinish();
    }
    // Set placement mode on frame 10.
    if (frameNumber > 10 && !readyCalled) {
      onReady();
      readyCalled = true;
    }
    setFrameN(frameNumber);
  });

  return <ZapparCamera start={false} ref={cameraRef} permissionRequest={false} />;
}

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  const [positions, setPositions] = useState<THREE.Vector3[]>([]);
  const [distance, setDistance] = useState(1000);
  const trackerRef = useRef<ZapparThree.InstantWorldAnchorGroup>();
  return (
    <>
      <div id="divergence" style={{ position: "absolute", zIndex: 1000, color: "white", margin: "5%", fontSize: "30px" }}>
        {distance}
      </div>
      <ZapparCanvas>
        <ZapparCameraExt
          onFinish={() => {
            const pos = positions.map((pos) => pos.toArray());
            console.log(JSON.stringify(pos));
            console.log("sequence finished");
          }}
          onSample={() => {
            if (!trackerRef.current) return;
            const { position } = trackerRef.current;
            setPositions((oldPos) => {
              const newPositions = [...oldPos, position.clone()];
              const distanceFunc = (vec1: THREE.Vector3, vec2: THREE.Vector3) => vec1.distanceTo(vec2);
              const dtw = new DynamicTimeWarping(expectedPositions, newPositions, distanceFunc);
              const dist = dtw.getDistance();
              setDistance(dist);
              return newPositions;
            });
          }}
          onReady={() => {
            setPlacementMode(false);
          }}
        />
        <InstantTracker ref={trackerRef} placementMode={placementMode} placementCameraOffset={-5}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </>
  );
}
render(<App />, document.getElementById("root"));
