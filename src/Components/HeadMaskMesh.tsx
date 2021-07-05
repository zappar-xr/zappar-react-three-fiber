import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { useFrame } from "@react-three/fiber";
import { Props } from "../spec";

/**
 * A THREE.Mesh that fits the user's head and fills the depth buffer,
 * ensuring that the camera image of the head shows instead of any 3D elements behind it in the scene.
 *
 * Works using a full-head ZapparThree.FaceMesh with the mouth, eyes and neck filled in.
 * Its renderOrder is set to Number.MIN_SAFE_INTEGER to ensure it's rendered before any other objects in the scene,
 * and its material has the colorWrite property set to false so it fills the depth buffer but not the color buffer.
 * @see https://docs.zap.works/universal-ar/web-libraries/react-threejs/face-tracking/
 */
const zapparHeadMaskMesh = forwardRef((props: Props.headMaskMesh, ref) => {
  const { children, trackerGroup } = props;
  const headMaskMeshRef = React.useRef<ZapparThree.HeadMaskMesh>();
  const [faceMesh] = useState<ZapparThree.HeadMaskMesh>(new ZapparThree.HeadMaskMeshLoader().load());

  useFrame(() => {
    if (headMaskMeshRef.current && trackerGroup && trackerGroup.current) {
      headMaskMeshRef.current.updateFromFaceAnchorGroup(trackerGroup.current);
    }
  });

  if (!faceMesh) return null;
  return (
    <primitive object={faceMesh} ref={mergeRefs([headMaskMeshRef, ref])} {...props}>
      {children}
    </primitive>
  );
});

export default zapparHeadMaskMesh;
