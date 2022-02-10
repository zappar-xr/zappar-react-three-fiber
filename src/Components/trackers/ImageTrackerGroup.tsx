import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { extend } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { Props } from "../../spec";
import useStore from "../../store";
import ToggleTrackerEnabledState from "../../hooks/trackerEnabled";

const { ImageAnchorGroup } = ZapparThree;
extend({ ImageAnchorGroup });

/**
 * A THREE.Group that attaches content to a known image as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/react-threejs/image-tracking/
 */
const ZapparImageTracker = forwardRef((props: Props.ImageTrackerGroup, ref) => {
  const { useImageTracker, onNotVisible, onNewAnchor, onVisible, targetImage, camera, children, pipeline, enabled } = props;
  const imageTrackerGroupRef = useRef();

  const store = useStore.camera((state) => state);
  const zapparCamera = camera?.current ? camera.current : store.object;
  const [imageTracker, setImageTracker] = useState<ZapparThree.ImageTracker>();

  useEffect(() => {
    setImageTracker(new ZapparThree.ImageTracker(targetImage, pipeline));
  }, [targetImage, pipeline]);

  useEffect(() => {
    if (imageTracker) {
      if (useImageTracker) useImageTracker(imageTracker);
      if (onNotVisible) imageTracker.onNotVisible.bind(onNotVisible);
      if (onNewAnchor) imageTracker.onNewAnchor.bind(onNewAnchor);
      if (onVisible) imageTracker.onVisible.bind(onVisible);
    }
    return () => {
      if (onNotVisible) imageTracker?.onNotVisible.unbind(onNotVisible);
      if (onNewAnchor) imageTracker?.onNewAnchor.unbind(onNewAnchor);
      if (onVisible) imageTracker?.onVisible.unbind(onVisible);
    };
  }, [useImageTracker, onVisible, onNewAnchor, onNotVisible, imageTracker]);

  ToggleTrackerEnabledState(imageTracker, enabled);

  if (!zapparCamera || !imageTracker) return null;
  return (
    <imageAnchorGroup ref={mergeRefs([imageTrackerGroupRef, ref])} args={[zapparCamera, imageTracker]} {...props}>
      {children}
    </imageAnchorGroup>
  );
});

export default ZapparImageTracker;
