/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useMemo, useState } from "react";
import { render } from "react-dom";

import { ImageTracker, ZapparCamera, ZapparCanvas, BrowserCompatibility, LogLevel, setLogLevel, Types, TargetImagePreviewMesh } from "../../../src/index";

setLogLevel(LogLevel.LOG_LEVEL_VERBOSE);

function App() {
  const imgSrc = require("file-loader!../../assets/sources/image-target.png").default;
  const target = require("file-loader!../../assets/target.zpt").default;
  const [loading, setLoading] = useState(true);
  const ref = React.useRef<Types.ImageAnchorGroup>();
  // eslint-disable-next-line no-undef
  const [targetImagePreviewMesh, setTargetImagePreviewMesh] = useState<JSX.Element>();

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
        <ZapparCamera permissionRequest={false} sources={{ rearCamera: img }} />
        <ImageTracker
          ref={ref}
          targetImage={target}
          onNewAnchor={() => {
            const element = <TargetImagePreviewMesh imageTarget={ref.current!.imageTracker.targets[0]} />;
            setTargetImagePreviewMesh(element);
            console.log("Anchor is visible");
          }}
        >
          {targetImagePreviewMesh}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </ImageTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </>
  );
}
render(<App />, document.getElementById("root"));
