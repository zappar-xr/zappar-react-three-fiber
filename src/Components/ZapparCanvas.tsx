import React from "react";
import { Canvas } from "@react-three/fiber";
import { Props } from "@react-three/fiber/dist/declarations/src/web/Canvas";
import { ResizeObserver } from "@juggle/resize-observer";
/**
 * A canvas with linear encoding and auto-updating dpr.
 */
const zapparCanvas = (props: Props) => {
  const { children } = props;
  return (
    <Canvas resize={{ polyfill: ResizeObserver }} {...props} linear dpr={window.devicePixelRatio} id="zapparCanvas">
      {children}
    </Canvas>
  );
};

export default zapparCanvas;
