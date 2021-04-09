/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { Props } from "../../spec";
import useStore from "../../store";
import PlacementUI from "../util/PlacementUI";

const { InstantWorldAnchorGroup } = ZapparThree;
extend({ InstantWorldAnchorGroup });

const ZapparInstantTracker = forwardRef((props: Props.InstantWorldAnchorGroup, ref) => {
  const { camera, placementMode, children, placementCameraOffset, pipeline, placementUI } = props;
  const InstantTrackerGroupRef = useRef();
  const [_placementMode, set_placementMode] = useState(placementMode);

  useEffect(() => {
    set_placementMode(placementMode);
  }, [placementMode, placementUI]);

  const [instantWorldTracker, setInstantWorldTracker] = useState<ZapparThree.InstantWorldTracker>();

  useEffect(() => {
    setInstantWorldTracker(new ZapparThree.InstantWorldTracker(pipeline));
  }, [pipeline]);

  const store = useStore.camera((state) => state);
  const zapparCamera = camera?.current ? camera.current : store.object;
  const placementOffset = placementCameraOffset || { x: 0, y: 0, z: -5 };

  useFrame(() => {
    if (_placementMode && instantWorldTracker) {
      if (Array.isArray(placementOffset)) {
        instantWorldTracker.setAnchorPoseFromCameraOffset(...placementOffset);
      } else if (typeof placementOffset === "number") {
        instantWorldTracker.setAnchorPoseFromCameraOffset(0, 0, placementOffset);
      } else if (placementOffset.x) {
        instantWorldTracker.setAnchorPoseFromCameraOffset(placementOffset.x, placementOffset.y, placementOffset.z);
      }
    }
  });

  if (!zapparCamera || !instantWorldTracker) return null;

  const _placementUI = placementUI ? <PlacementUI placementType={placementUI} onInteract={async (placed) => set_placementMode(placed)} /> : undefined;
  // If a user provides a placement UI type, render that component.

  return (
    <>
      {_placementUI}
      <instantWorldAnchorGroup ref={mergeRefs([InstantTrackerGroupRef, ref])} args={[zapparCamera, instantWorldTracker]} {...props}>
        {children}
      </instantWorldAnchorGroup>
    </>
  );
});

export default ZapparInstantTracker;
