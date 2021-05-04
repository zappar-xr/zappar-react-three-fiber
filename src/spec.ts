/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as ZapparThree from "@zappar/zappar-threejs";
import React from "react";

import { ReactThreeFiber } from "@react-three/fiber";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from "three";

type PoseMode = "anchor-origin" | "attitude" | "default";
type MirrorMode = "poses" | "css" | "none";
type Landmark =
  | "eye-left"
  | "eye-right"
  | "ear-left"
  | "ear-right"
  | "nose-bridge"
  | "nose-tip"
  | "nose-base"
  | "lip-top"
  | "lip-bottom"
  | "mouth-center"
  | "chin"
  | "eyebrow-left"
  | "eyebrow-right";

declare global {
  namespace JSX {
    type DetailedHTMLProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>,T>;
    interface IntrinsicElements {
      // Omit some properties as we use custom implementations for them
      zapparCameraAdditional: ReactThreeFiber.Object3DNode<Omit<ZapparThree.Camera,"userCameraMirrorMode" | "rearCameraMirrorMode" | "poseMode">,typeof ZapparThree.Camera>;
      imageAnchorGroup: ReactThreeFiber.Object3DNode<Omit<ZapparThree.ImageAnchorGroup, "imageTracker">,typeof ZapparThree.ImageAnchorGroup>;
      faceAnchorGroup: ReactThreeFiber.Object3DNode<Omit<ZapparThree.FaceAnchorGroup, "faceTracker">,typeof ZapparThree.FaceAnchorGroup>;
      instantWorldAnchorGroup: ReactThreeFiber.Object3DNode<Omit<ZapparThree.InstantWorldAnchorGroup, "instantTracker">,typeof ZapparThree.InstantWorldAnchorGroup>;
      faceBufferGeometry: ReactThreeFiber.Object3DNode<ZapparThree.FaceBufferGeometry,typeof ZapparThree.FaceBufferGeometry>;
      faceLandmarkGroup: ReactThreeFiber.Object3DNode<ZapparThree.FaceLandmarkGroup,typeof ZapparThree.FaceLandmarkGroup>;
      headMaskMesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;

      loader: DetailedHTMLProps<HTMLDivElement>;
      BrowserCompatibility: DetailedHTMLProps<HTMLDivElement>;
    }
  }
}


export namespace Props {
  type placementUIType =  "toggle" | "placement-only";
  type Source = HTMLVideoElement | HTMLImageElement | string;
  type VideoSource = {rearCamera? : Source, userCamera? : Source};

  export type Camera = JSX.IntrinsicElements["zapparCameraAdditional"] & {
    userCameraMirrorMode?: MirrorMode;
    rearCameraMirrorMode?: MirrorMode;
    pipeline?: ZapparThree.Pipeline,
    poseMode?: PoseMode;
    userFacing?: boolean;
    animations?: any;
    sources? :  VideoSource;
    makeDefault?: boolean;
    renderPriority?: number;
    permissionRequest?: boolean;
    onFirstFrame? : () => void;
  };

  export type ImageTrackerGroup = JSX.IntrinsicElements["imageAnchorGroup"] & {
    targetImage: string;
    camera?: ZapparCamera;
    useImageTracker?: (imageTracker: ZapparThree.ImageTracker) => void;
    onVisible?: (imageAnchor: ZapparThree.ImageAnchor) => void;
    onNotVisible?: (imageAnchor: ZapparThree.ImageAnchor) => void;
    onNewAnchor?: (imageAnchor: ZapparThree.ImageAnchor) => void;
    animations?: any;
    pipeline?: ZapparThree.Pipeline;
  };



  export type InstantWorldAnchorGroup = JSX.IntrinsicElements["instantWorldAnchorGroup"] & {
    camera?: ZapparCamera;
    placementMode?: boolean;
    placementCameraOffset?: ReactThreeFiber.Vector3;
    useInstantTracker?: (instantTracker: ZapparThree.InstantWorldTracker) => void;
    animations?: any;
    pipeline?: ZapparThree.Pipeline;
    placementUI?: placementUIType
  };

  export type FaceTrackerAnchorGroup = JSX.IntrinsicElements["faceAnchorGroup"] & {
    camera?: ZapparCamera;
    useFaceTracker?: (faceTracker: ZapparThree.FaceTracker) => void;
    onVisible?: (faceAnchor: ZapparThree.FaceAnchor) => void;
    onNotVisible?: (faceAnchor: ZapparThree.FaceAnchor) => void;
    animations?: any;
    onNewAnchor?: (faceAnchor: ZapparThree.FaceAnchor) => void;
    model?: string | ArrayBuffer;
    pipeline?: ZapparThree.Pipeline;
  };
  export type FaceBufferGeometry = JSX.IntrinsicElements["faceBufferGeometry"] & {
    trackerGroup: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;
    fillMouth?: boolean;
    fillEyeLeft?: boolean;
    fillEyeRight?: boolean;
    fillNeck?: boolean;
    fullHead?: boolean;
    animations?: any;
  };

  export type FaceLandmark = JSX.IntrinsicElements["faceLandmarkGroup"] & {
    camera?: ZapparCamera;
    trackerGroup?: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;
    target: Landmark;
    animations?: any;
  };

  export type headMaskMesh = JSX.IntrinsicElements["headMaskMesh"] & {
    // TODO: Grab this form Zustand
    trackerGroup: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;
    animations?: any;
  };

  export type Loader = JSX.IntrinsicElements["loader"] & {
    style?: LoaderStyle;
    onLoad?: () => void;
  };

  export type browserCompatibility = JSX.IntrinsicElements["BrowserCompatibility"] & {
    fallback?: React.ReactElement;
  };

  export type PlacementUI = {
    onInteract: (placed: boolean) => {};
    placementType: placementUIType;
  };

}

type ZapparCamera = React.MutableRefObject<ZapparThree.Camera | undefined>;

type LoaderStyle = {
  container?: Partial<CSSStyleDeclaration>;
  inner?: Partial<CSSStyleDeclaration>;
  title?: Partial<CSSStyleDeclaration>;
  progress?: Partial<CSSStyleDeclaration>;
  progressValue?: Partial<CSSStyleDeclaration>;
  animations?: any;
};

export namespace Store {
  type Callback<T> = (tracker : T) => void;
  type StoreType<T> = {
    object ?: T,
    set: Callback<T>
  }

  export type camera = StoreType<ZapparThree.Camera>;
  export type imageTracker = StoreType<ZapparThree.ImageTracker>;
  export type faceTracker = StoreType<ZapparThree.FaceTracker>;
  export type instantTracker = StoreType<ZapparThree.InstantWorldTracker>;
}

export namespace Types {
  export type Camera = ZapparThree.Camera
  export type FaceAnchorGroup = ZapparThree.FaceAnchorGroup
  export type ImageAnchorGroup = ZapparThree.ImageAnchorGroup
  export type FaceLandmarkGroup = ZapparThree.FaceLandmarkGroup
  export type InstantWorldAnchorGroup = ZapparThree.InstantWorldAnchorGroup
  export type FaceTracker = ZapparThree.FaceTracker
  export type ImageTracker = ZapparThree.ImageTracker
  export type InstantWorldTracker = ZapparThree.InstantWorldTracker
  export type FaceMesh = ZapparThree.FaceMesh
  export type HeadMaskMesh = ZapparThree.HeadMaskMesh
  export type FaceLandmark = ZapparThree.FaceLandmark
}


