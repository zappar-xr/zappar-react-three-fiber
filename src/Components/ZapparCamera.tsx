/* eslint-disable react/prop-types */
import * as ZapparThree from "@zappar/zappar-threejs";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { CameraTexture } from "@zappar/zappar-threejs/lib/cameraTexture";
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
    renderPriority = 2,
    environmentMap = false,
    permissionRequest = true,
    onFirstFrame,
    start = true,
    backgroundImageProps,
  } = props;

  const { gl, set } = useThree((state) => state);

  const hadFirstFrame = React.useRef(false);

  const [cameraTexture] = useState(new CameraTexture());
  const cameraEnvMap = useMemo(() => {
    return environmentMap ? new ZapparThree.CameraEnvironmentMap() : undefined;
  }, [environmentMap]);

  useEffect(() => {
    if (backgroundImageProps && cameraTexture) Object.assign(cameraTexture, backgroundImageProps);
  }, [backgroundImageProps, cameraTexture]);

  const cameraRef = React.useRef<ZapparCameraAdditional>();

  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const store = {
    camera: useStore.camera((state) => state),
    // cameraEnvironmentMap: useStore.cameraEnvironmentMap((state) => state),
  };

  useEffect(() => {
    const activePipeline = pipeline || ZapparThree;
    activePipeline.glContextSet(gl.getContext());
  }, [pipeline, gl]);

  // TODO: If not making default, scene's texture should not be changed, and camera should not tick.
  // TODO: Instead, it should be exposed to user to set when needed.

  useEffect(() => {
    if (makeDefault) {
      set(() => ({ camera: cameraRef.current as any }));
    }
  }, [makeDefault]);

  useEffect(() => {
    if (!cameraRef.current) return;
    store.camera.set(cameraRef.current);
    if (!start) return;
    if (permissionGranted || !permissionRequest) {
      cameraRef.current!.start(userFacing);
    } else {
      ZapparThree.permissionRequestUI().then((granted) => {
        setPermissionGranted(granted);
        if (granted) cameraRef.current!.start(userFacing);
        else ZapparThree.permissionDeniedUI();
      });
    }
  }, [userFacing, permissionRequest, start]);

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
    if (onFirstFrame && !hadFirstFrame.current && cameraRef.current.pipeline.frameNumber() > 0) {
      hadFirstFrame.current = true;
      onFirstFrame();
    }

    cameraEnvMap?.update(gl, cameraRef.current);

    cameraRef.current.updateFrame(gl);

    gl.render(scene, cameraRef.current);
  }, renderPriority);

  return (
    <>
      <primitive dispose={null} object={cameraTexture} attach="background" />
      {environmentMap && <primitive dispose={null} object={cameraEnvMap!.environmentMap} attach="environment" />}
      <zapparCameraAdditional
        dispose={null}
        args={[{ pipeline, userCameraSource: sources?.userCamera, rearCameraSource: sources?.rearCamera, backgroundTexture: cameraTexture }]}
        ref={mergeRefs([cameraRef, ref])}
        {...props}
      />
    </>
  );
});

export default ZapparCamera;
