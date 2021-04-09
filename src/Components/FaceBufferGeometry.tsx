import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useState } from "react";
import mergeRefs from "react-merge-refs";
import { extend, useFrame } from "@react-three/fiber";
import { Props } from "../spec";

const { FaceBufferGeometry } = ZapparThree;
extend({ FaceBufferGeometry });

const ZapparFaceBufferGeometry = forwardRef((props: Props.FaceBufferGeometry, ref) => {
  const { fillMouth = false, fillEyeLeft = false, fillEyeRight = false, fillNeck = false, fullHead = false, children, trackerGroup } = props;

  const faceBufferGeometryRef = React.useRef<ZapparThree.FaceBufferGeometry>();
  const [faceMesh, setFaceMesh] = useState<ZapparThree.FaceMesh>();

  useEffect(() => {
    if (fullHead) {
      setFaceMesh(
        new ZapparThree.FaceMeshLoader().loadFullHeadSimplified({
          fillMouth,
          fillEyeLeft,
          fillEyeRight,
          fillNeck,
        })
      );
    } else {
      setFaceMesh(
        new ZapparThree.FaceMeshLoader().loadFace({
          fillMouth,
          fillEyeLeft,
          fillEyeRight,
        })
      );
    }
  }, [fillMouth, fillEyeLeft, fillEyeRight, fillNeck]);

  // TODO: Handle multiple anchors
  useFrame(() => {
    if (faceBufferGeometryRef.current && trackerGroup && trackerGroup.current) {
      faceBufferGeometryRef.current.updateFromFaceAnchorGroup(trackerGroup.current);
    }
  });

  if (!faceMesh) return null;
  return (
    <faceBufferGeometry args={[faceMesh]} ref={mergeRefs([faceBufferGeometryRef, ref])} {...props}>
      {children}
    </faceBufferGeometry>
  );
});

export default ZapparFaceBufferGeometry;
