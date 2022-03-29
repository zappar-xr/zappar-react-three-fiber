import VERSION from "./version";

// eslint-disable-next-line no-console
console.log(`Zappar for React Three v${VERSION}`);

export { browserIncompatible, Pipeline, LogLevel, setLogLevel } from "@zappar/zappar-threejs";
export { Types } from "./spec";
export { default as FaceBufferGeometry } from "./Components/FaceBufferGeometry";
export { default as FaceLandmark } from "./Components/trackers/FaceLandmarkGroup";
export { default as FaceTracker } from "./Components/trackers/FaceTrackerGroup";
export { default as HeadMaskMesh } from "./Components/HeadMaskMesh";
export { default as ImageTracker } from "./Components/trackers/ImageTrackerGroup";
export { default as InstantTracker } from "./Components/trackers/InstantTrackerGroup";
export { default as ZapparCamera } from "./Components/ZapparCamera";
export { default as ZapparCanvas } from "./Components/ZapparCanvas";
export { default as Loader } from "./Components/util/Loader";
export { default as BrowserCompatibility } from "./Components/util/Compatibility";
// export { default as CameraEnvironmentMap } from "./Components/CameraEnvironmentMap";
