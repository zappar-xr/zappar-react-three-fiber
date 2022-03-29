/* eslint-disable no-unused-vars */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useMemo, useState } from "react";
import { render } from "react-dom";
import { ZapparCamera, ZapparCanvas, BrowserCompatibility, LogLevel, setLogLevel } from "../../../src/index";

setLogLevel(LogLevel.LOG_LEVEL_VERBOSE);

function App() {
  const imgSrc = require("file-loader!../../assets/sources/face.png").default;
  const [loading, setLoading] = useState(true);

  const img = useMemo(() => {
    const element = document.createElement("img");
    element.src = imgSrc;
    element.onload = () => {
      setLoading(false);
    };
    return element;
  }, [imgSrc]);

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <BrowserCompatibility fallback={<div>Sorry!</div>} />
      <ZapparCanvas>
        <ZapparCamera environmentMap permissionRequest={false} sources={{ rearCamera: img }} />
        <mesh scale={0.1} position={[0, 0, -2]}>
          <sphereBufferGeometry />
          <meshStandardMaterial metalness={1} roughness={0} />
        </mesh>

        <mesh scale={0.1} position={[0, -0.5, -2]}>
          <sphereBufferGeometry />
          <meshStandardMaterial metalness={1} roughness={0} />
        </mesh>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </>
  );
}
render(<App />, document.getElementById("root"));
