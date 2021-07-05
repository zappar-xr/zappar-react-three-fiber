import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import mergeRefs from "react-merge-refs";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Props } from "../spec";
import useStore from "../store";

class ZapparCameraAdditional extends ZapparThree.Camera {
  updateProjectionMatrix = () => {};
}
// First frame rendered R3f tries to update the projection matrix of the default camera.
// Zappar camera does not have this method, so we create a noop
extend({ ZapparCameraAdditional });

/**
 * Creates a camera that you can use instead of a perspective camera.
 *
 * @see https://docs.zap.works/universal-ar/web-libraries/react-threejs/camera-setup/
 */
const ZapparCamera = forwardRef((props: Props.Camera, ref) => {
  const {
    userFacing = false,
    rearCameraMirrorMode,
    userCameraMirrorMode,
    poseMode,
    poseAnchorOrigin,
    pipeline,
    sources,
    makeDefault = true,
    renderPriority = 1,
    permissionRequest = true,
    onFirstFrame,
    environmentMap,
    useEnvironmentMap,
  } = props;

  const { gl, scene, set } = useThree((state) => state);

  const [hadFirstFrame, setHadFirstFrame] = useState(false);

  const cameraRef = React.useRef<ZapparCameraAdditional>();

  const [envMap, setEnvMap] = useState<ZapparThree.CameraEnvironmentMap>();

  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const store = {
    camera: useStore.camera((state) => state),
  };

  useEffect(() => {
    const activePipeline = pipeline || ZapparThree;
    activePipeline.glContextSet(gl.getContext());
  }, [pipeline, gl]);

  // TODO: If not making default, scene's texture should not be changed, and camera should not tick.
  // TODO: Instead, it should be exposed to user to set when needed.

  useLayoutEffect(() => {
    if (makeDefault) {
      set(() => ({ camera: cameraRef.current as any }));
    }
  }, [makeDefault]);

  useEffect(() => {
    if (environmentMap || useEnvironmentMap) {
      const envMap = new ZapparThree.CameraEnvironmentMap();
      if (environmentMap) scene.environment = envMap.environmentMap;
      useEnvironmentMap?.(envMap.environmentMap); // Overlap with THREE.texture
      setEnvMap(envMap);
    }
  }, [environmentMap]);

  useEffect(() => {
    if (!cameraRef.current) return;
    store.camera.set(cameraRef.current);
    scene.background = cameraRef.current!.backgroundTexture;
    if (permissionGranted || !permissionRequest) {
      cameraRef.current!.start(userFacing);
    } else {
      ZapparThree.permissionRequestUI().then((granted) => {
        setPermissionGranted(granted);
        if (granted) cameraRef.current!.start(userFacing);
        else ZapparThree.permissionDeniedUI();
      });
    }
  }, [userFacing, permissionRequest]);

  useEffect(() => {
    if (!cameraRef.current) return;
    switch (rearCameraMirrorMode) {
      case "poses":
        cameraRef.current.rearCameraMirrorMode = ZapparThree.CameraMirrorMode.Poses;
        break;
      case "css":
        cameraRef.current.rearCameraMirrorMode = ZapparThree.CameraMirrorMode.CSS;
        break;
      case "none":
      default:
        cameraRef.current.rearCameraMirrorMode = ZapparThree.CameraMirrorMode.None;
        break;
    }
    switch (userCameraMirrorMode) {
      case "none":
        cameraRef.current.userCameraMirrorMode = ZapparThree.CameraMirrorMode.None;
        break;
      case "css":
        cameraRef.current.userCameraMirrorMode = ZapparThree.CameraMirrorMode.CSS;
        break;
      case "poses":
      default:
        cameraRef.current.userCameraMirrorMode = ZapparThree.CameraMirrorMode.Poses;
        break;
    }
    switch (poseMode) {
      case "anchor-origin":
        cameraRef.current.poseMode = ZapparThree.CameraPoseMode.AnchorOrigin;
        cameraRef.current.poseAnchorOrigin = poseAnchorOrigin;
        break;
      case "attitude":
        cameraRef.current.poseMode = ZapparThree.CameraPoseMode.Attitude;
        break;
      case "default":
      default:
        cameraRef.current.poseMode = ZapparThree.CameraPoseMode.Default;
        break;
    }
  }, [rearCameraMirrorMode, userCameraMirrorMode, poseMode, poseAnchorOrigin]);

  useFrame(({ gl, scene }) => {
    if (!cameraRef.current) return;

    if (onFirstFrame && !hadFirstFrame && cameraRef.current.pipeline.frameNumber() > 0) {
      setHadFirstFrame(true);
      onFirstFrame();
    }

    cameraRef.current.updateFrame(gl);

    envMap?.update(gl, cameraRef.current);

    gl.render(scene, cameraRef.current);
  }, renderPriority);

  return (
    <zapparCameraAdditional
      args={[{ pipeline, userCameraSource: sources?.userCamera, rearCameraSource: sources?.rearCamera }]}
      ref={mergeRefs([cameraRef, ref])}
      {...props}
    />
  );
});

export default ZapparCamera;
