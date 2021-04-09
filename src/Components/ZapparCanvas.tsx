import React from "react";
import { Canvas } from "@react-three/fiber";

const zapparCanvas = ({ ...props }) => {
  const { children } = props;

  return (
    <Canvas {...props} linear dpr={window.devicePixelRatio} id="zapparCanvas">
      {children}
    </Canvas>
  );
};

export default zapparCanvas;
