import React from "react";
import { Canvas } from "@react-three/fiber";

/**
 * A canvas with linear encoding and auto-updating dpr.
 */
const zapparCanvas = ({ ...props }) => {
  const { children } = props;

  return (
    <Canvas {...props} linear dpr={window.devicePixelRatio} id="zapparCanvas">
      {children}
    </Canvas>
  );
};

export default zapparCanvas;
