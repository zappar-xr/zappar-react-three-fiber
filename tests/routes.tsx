/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { Suspense, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { FaceTracker, ZapparCamera, ZapparCanvas, HeadMaskMesh, Loader } from "../src/index";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/routes">experience</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/routes">
            <Experience />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return (
    <div>
      <h2>Click on Experience to open canvas route</h2>
    </div>
  );
}

function Model() {
  const [gltf, set] = useState<GLTF>();
  const url = require("file-loader!./assets/z_helmet.glb").default;
  useMemo(() => new GLTFLoader().load(url, set), [url]);

  if (gltf) {
    const { scene } = gltf;
    const Helmet = scene.getObjectByName("Helmet");
    return <primitive position={[0.25, -1.25, 0.1]} object={Helmet} />;
  }
  return null;
}

function Experience() {
  const faceTrackerGroup = useRef();
  const pipeline = new ZapparThree.Pipeline();

  return (
    <div style={{ width: "800px", height: "500px" }}>
      <ZapparCanvas>
        <ZapparCamera pipeline={pipeline} />
        <FaceTracker ref={faceTrackerGroup} pipeline={pipeline}>
          <Suspense fallback={null}>
            <HeadMaskMesh trackerGroup={faceTrackerGroup} />
            <Model />
          </Suspense>
        </FaceTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <Loader />
      </ZapparCanvas>
    </div>
  );
}
render(<App />, document.getElementById("root"));
