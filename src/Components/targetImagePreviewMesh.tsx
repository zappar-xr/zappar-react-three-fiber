import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef } from "react";
import mergeRefs from "react-merge-refs";
import { Props } from "../spec";

/**
 * A THREE.Mesh which will fit to the target image and use it's texture as a material.
 *  @param imageTarget The target image to use.
 * @see https://docs.zap.works/universal-ar/web-libraries/react-threejs/image-tracking/
 */
const targetImagePreviewMesh = forwardRef((props: Props.TargetImagePreviewMesh, ref) => {
  const { children, imageTarget } = props;

  const mesh = React.useMemo(() => new ZapparThree.TargetImagePreviewMesh(imageTarget), [imageTarget]);
  const meshRef = React.useRef<ZapparThree.TargetImagePreviewMesh>();

  return (
    <primitive object={mesh} ref={mergeRefs([meshRef, ref])} {...props}>
      {children}
    </primitive>
  );
});

export default targetImagePreviewMesh;
