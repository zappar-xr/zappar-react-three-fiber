import React from "react";
import { Canvas } from "@react-three/fiber";
import { Props } from "@react-three/fiber/dist/declarations/src/web/Canvas";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ResizeObserver } from "@juggle/resize-observer";
/**
 * A canvas with linear encoding, auto-updating dpr as well as tone mapping disabled.
 */
const zapparCanvas = (props: Props) => {
  const { children } = props;
  return (
    <Canvas flat resize={{ polyfill: ResizeObserver }} linear dpr={window.devicePixelRatio} id="zapparCanvas" {...props}>
      {children}
    </Canvas>
  );
};
export default zapparCanvas;
