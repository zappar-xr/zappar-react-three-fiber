import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { useFrame } from "@react-three/fiber";
import { Props } from "../spec";

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
