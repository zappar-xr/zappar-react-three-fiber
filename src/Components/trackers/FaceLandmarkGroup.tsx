import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useRef } from "react";
import { extend } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { Props } from "../../spec";
import useStore from "../../store";

const { FaceLandmarkGroup } = ZapparThree;
extend({ FaceLandmarkGroup });

/**
 * A `THREE.Group` which attaches content to a known point (landmark) on a face as it moves around in the camera view.
 * Landmarks will remain accurate, even as the user's expression changes.
 * @see https://docs.zap.works/universal-ar/web-libraries/react-threejs/face-tracking/
 */
const zapparFaceLandmark = forwardRef((props: Props.FaceLandmark, ref) => {
  const { children, trackerGroup, camera, target } = props;
  const faceLandmarkGroupRef = useRef();

  const store = {
    camera: useStore.camera((state) => state),
    faceTracker: useStore.faceTracker((state) => state),
  };

  const faceTracker = trackerGroup?.current?.faceTracker ? trackerGroup.current.faceTracker : store.faceTracker.object;
  const zapparCamera = camera?.current ? camera.current : store.camera.object;

  if (!faceTracker || !zapparCamera) return null;
  return (
    <faceLandmarkGroup
      args={[zapparCamera, faceTracker, ZapparThree.FaceLandmarkName[(target as any).toUpperCase().replace("-", "_")] as any]}
      ref={mergeRefs([faceLandmarkGroupRef, ref])}
      {...props}
    >
      {children}
    </faceLandmarkGroup>
  );
});

export default zapparFaceLandmark;
