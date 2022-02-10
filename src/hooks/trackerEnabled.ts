/* eslint-disable no-param-reassign */
import { useEffect } from "react";
import { Types } from "../spec";

type Tracker = Types.InstantWorldTracker | Types.FaceTracker | Types.ImageTracker;

const ToggleTrackerEnabledState = (tracker?: Tracker, enabled?: boolean) => {
  useEffect(() => {
    if (tracker && enabled !== undefined) {
      tracker.enabled = enabled;
    }
  }, [tracker, enabled]);
};

export default ToggleTrackerEnabledState;
