// import * as ZapparThree from "@zappar/zappar-threejs";
// import React, { forwardRef, useEffect, useRef } from "react";
// import { extend } from "@react-three/fiber";
// import mergeRefs from "react-merge-refs";
// import { Props } from "../spec";
// import useStore from "../store";

// const { CameraEnvironmentMap } = ZapparThree;
// extend({ CameraEnvironmentMap });

// /**
//  * Returns an automatically generated environment map that's useful if you're using materials that support reflections.
//  * The map uses the camera feed to create an approximate environment that can add some realism to your scene.
//  * */
// const zapparCameraEnvironmentMap = forwardRef((props: Props.CameraEnvironmentMap, ref) => {
//   const cameraEnvRef = useRef();

//   const store = {
//     cameraEnvironmentMap: useStore.cameraEnvironmentMap((state) => state),
//   };

//   useEffect(() => {
//     if (cameraEnvRef?.current) store.cameraEnvironmentMap.set(cameraEnvRef?.current);
//   }, [cameraEnvRef]);

//   return <cameraEnvironmentMap ref={mergeRefs([cameraEnvRef, ref])} {...props} />;
// });

// export default zapparCameraEnvironmentMap;
