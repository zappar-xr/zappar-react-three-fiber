import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useState } from "react";
import { extend } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { Props } from "../../spec";
import useStore from "../../store";

const { FaceAnchorGroup } = ZapparThree;
extend({ FaceAnchorGroup });

const ZapparFaceAnchorGroup = forwardRef((props: Props.FaceTrackerAnchorGroup, ref) => {
  const { camera, children, useFaceTracker, onNotVisible, onVisible, onNewAnchor, pipeline, model } = props;

  const [faceTracker, setFaceTracker] = useState<ZapparThree.FaceTracker>();
  const faceAnchorGroupRef = React.useRef<ZapparThree.FaceAnchorGroup>();

  const store = {
    camera: useStore.camera((state) => state),
    faceTracker: useStore.faceTracker((state) => state),
  };
  useEffect(() => {
    const ft = new ZapparThree.FaceTracker(pipeline);
    if (model) {
      ft.loadModel(model);
    } else {
      ft.loadDefaultModel();
    }
    setFaceTracker(ft);
    store.faceTracker.set(ft);
  }, [model, pipeline]);

  const zapparCamera = camera?.current ? camera.current : store.camera.object;

  useEffect(() => {
    if (faceTracker) {
      if (useFaceTracker) useFaceTracker(faceTracker);
      if (onNotVisible) faceTracker.onNotVisible.bind(onNotVisible);
      if (onVisible) faceTracker.onVisible.bind(onVisible);
      if (onNewAnchor) faceTracker.onVisible.bind(onNewAnchor);
    }

    return () => {
      if (faceTracker) {
        if (onNotVisible) faceTracker.onNotVisible.unbind(onNotVisible);
        if (onVisible) faceTracker.onVisible.unbind(onVisible);
        if (onNewAnchor) faceTracker.onVisible.unbind(onNewAnchor);
      }
    };
  }, [useFaceTracker, onVisible, onNotVisible, faceAnchorGroupRef, faceTracker]);

  if (!faceTracker || !zapparCamera) return null;
  return (
    <faceAnchorGroup ref={mergeRefs([faceAnchorGroupRef, ref])} args={[zapparCamera, faceTracker]} {...props}>
      {children}
    </faceAnchorGroup>
  );
});

export default ZapparFaceAnchorGroup;
