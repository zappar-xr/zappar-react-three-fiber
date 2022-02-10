/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as ZapparThree from "@zappar/zappar-threejs";
import React from "react";

import { ReactThreeFiber } from "@react-three/fiber";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from "three";

/**
 * The pose modes that determine how the camera moves around in the scene.
 *
 * default - The camera sits, stationary, at the origin of world space, and points down the negative Z axis.
 * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
 *
 * Attitude - The camera sits at the origin of world space, but rotates as the user rotates the physical device.
 * When the Zappar library initializes, the negative Z axis of world space points forward in front of the user.
 * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
 *
 * anchor-origin - In this case the camera moves and rotates in world space around the anchor at the origin.
 *
 * {@link ZapparThree.CameraPoseMode}
 */
type PoseMode = "anchor-origin" | "attitude" | "default";



/**
 * The mirror modes that may be used.
 *
 * none - No mirroring.
 *
 * css - In this mode, the Zappar camera applies a scaleX(-1) CSS transform to your whole canvas.
 * This way both the camera and your content appear mirrored.
 *
 * poses - This mode mirrors the background camera texture and ensures content still appears correctly tracked.
 * In this mode your content itself isn't flipped, so any text in your tracked content doesn't appear mirrored.
 * This is the default mode for the user-facing camera.
 */
type MirrorMode = "poses" | "css" | "none";


 /**
  * The list of available landmarks to which the landmark group can be anchored.
 */
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

  /**
   * Generic visibility event.
  */
  type anchorVisibilityEvent<T> = (anchor: T) => void;

  type anchorVisibilityEvents<T> = {
    /**
     * Emitted when the anchor becomes visible in a camera frame.
    */
    onVisible?: anchorVisibilityEvent<T>;
    /**
     * Emitted when the anchor goes from being visible in the previous camera frame, to not being visible in the current frame.
    */
    onNotVisible?: anchorVisibilityEvent<T>;
    /**
     * Emitted when a new anchor is created by the tracker.
    */
    onNewAnchor?: anchorVisibilityEvent<T>;
  }

  /**
   * The source of frames.
   */
  type Source = HTMLVideoElement | HTMLImageElement | string;

  /**
   * Rear and user camera source options.
   * @property rearCameraSource? - The camera source which will be used for the rear camera.
   * @property userCameraSource? - The camera source which will be used for the user camera.
   */
  type VideoSource = {rearCamera? : Source, userCamera? : Source};

  /**
   * The props of the Camera component.
   */
  export type Camera = JSX.IntrinsicElements["zapparCameraAdditional"] & {
    /** The mirror mode that is going to be used for the user camera. */
    userCameraMirrorMode?: MirrorMode;

    /** The mirror mode that is going to be used for the rear camera. */
    rearCameraMirrorMode?: MirrorMode;

    /** The pipeline that this component will operate within. */
    pipeline?: ZapparThree.Pipeline,

    /** The pose modes that determine how the camera moves around in the scene. */
    poseMode?: PoseMode;

    /** If true, starts the user facing camera. (i.e selfie). */
    userFacing?: boolean;

    /** @ignore */
    animations?: any;

    /** The source of frames. */
    sources? :  VideoSource;

    /** Sets the camera as the default scene camera. */
    makeDefault?: boolean;

    /** Sets the render priority. */
    renderPriority?: number;

    /** Show Zappar's built-in UI to request camera permissions if enabled. */
    permissionRequest?: boolean;

    /** Emitted after the first frame is processed. */
    onFirstFrame? : () => void;

    /**
     * Applies an automatically generated environment map to the scene that's useful if you're using materials that support reflections.
     * The map uses the camera feed to create an approximate environment that can add some realism to your scene.
     * */
    environmentMap?: boolean,

    /**
     * Returns an automatically generated environment map that's useful if you're using materials that support reflections.
     * The map uses the camera feed to create an approximate environment that can add some realism to your scene.
     * */
    // Omit update as it's called internally.
    useEnvironmentMap?: (map :  THREE.Texture) => void,
  };

  /**
   * The props of the Image Tracker Group component.
   */
  export type ImageTrackerGroup = JSX.IntrinsicElements["imageAnchorGroup"] & {
    /** */
    targetImage: string;

    /** A refference to a Zappar camera. */
    camera?: ZapparCamera;

    /**
     * A callback to get the tracker
     * @returns a callback containing the tracker.
    */
    useImageTracker?: (imageTracker: ZapparThree.ImageTracker) => void;

    /** @ignore */
    animations?: any;

    /** The pipeline that this component will operate within. */
    pipeline?: ZapparThree.Pipeline;

    /** Disables tracking if set to `false`. Default is `true`. */
    enabled?: boolean;

  } & anchorVisibilityEvents<ZapparThree.ImageAnchor>;



  export type InstantWorldAnchorGroup = JSX.IntrinsicElements["instantWorldAnchorGroup"] & {
    /** A refference to a Zappar camera. */
    camera?: ZapparCamera;

    /** Confirm if the object is placed, anchoring it in place. */
    placementMode?: boolean;

    /**
     * Sets the point in the user's environment that the anchor tracks from.
     *
     * The vector assigned to this property correspond to the X, Y and Z coordinates (in camera space) of the point to track.
     * Choosing a position with X and Y coordinates of zero, and a negative Z coordinate,
     * will select a point on a surface directly in front of the center of the screen.
     */
    placementCameraOffset?: ReactThreeFiber.Vector3;

    /**
     * A callback to get the tracker
     * @returns a callback containing the tracker.
    */
    useInstantTracker?: (instantTracker: ZapparThree.InstantWorldTracker) => void;

    /** @ignore */
    animations?: any;

    /** The pipeline that this component will operate within. */
    pipeline?: ZapparThree.Pipeline;

    /** Renders a button which toggles the current placementMode.  */
    placementUI?: placementUIType

    /** Disables tracking if set to `false`. Default is `true`. */
    enabled?: boolean;
  };

  export type FaceTrackerAnchorGroup = JSX.IntrinsicElements["faceAnchorGroup"] & {
    /** A refference to a Zappar camera. */
    camera?: ZapparCamera;

    /**
     * A callback to get the tracker
     * @returns a callback containing the tracker.
    */
    useFaceTracker?: (faceTracker: ZapparThree.FaceTracker) => void;

    /** @ignore */
    animations?: any;

    /** Sets and loads the face tracking model data. */
    model?: string | ArrayBuffer;

    /** The pipeline that this component will operate within. */
    pipeline?: ZapparThree.Pipeline;

    /** Disables tracking if set to `false`. Default is `true`. */
    enabled?: boolean;

  } & anchorVisibilityEvents<ZapparThree.FaceAnchor>;;


  export type FaceBufferGeometry = JSX.IntrinsicElements["faceBufferGeometry"] & {
    /** Provide a reference to the FaceAnchorGroup component. */
    trackerGroup: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;

    /** If true, fills this face feature with polygons. */
    fillMouth?: boolean;

    /** If true, fills this face feature with polygons. */
    fillEyeLeft?: boolean;

    /** If true, fills this face feature with polygons. */
    fillEyeRight?: boolean;

    /** If true, fills this face feature with polygons. */
    fillNeck?: boolean;

    /** If true, fills this face feature with polygons. */
    fullHead?: boolean;

    /** @ignore */
    animations?: any;
  };

  export type FaceLandmark = JSX.IntrinsicElements["faceLandmarkGroup"] & {
    /** A refference to a Zappar camera. */
    camera?: ZapparCamera;

    /** Provide a reference to the FaceAnchorGroup component. */
    trackerGroup?: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;

    /** The name of the landmark to track. */
    target: Landmark;

    /** @ignore */
    animations?: any;
  };

  export type headMaskMesh = JSX.IntrinsicElements["headMaskMesh"] & {
    // TODO: Grab this form Zustand
    /** Provide a reference to the FaceAnchorGroup component. */
    trackerGroup: React.MutableRefObject<ZapparThree.FaceAnchorGroup | undefined>;

    /** @ignore */
    animations?: any;
  };

  export type Loader = JSX.IntrinsicElements["loader"] & {
    /** */
    style?: LoaderStyle;

    /** */
    onLoad?: () => void;
  };

  export type browserCompatibility = JSX.IntrinsicElements["BrowserCompatibility"] & {
    /** You may provide a fallback UI to be used. */
    fallback?: React.ReactElement;
  };

  export type PlacementUI = {
    /** */
    onInteract: (placed: boolean) => {};

    /** */
    placementType: placementUIType;
  };

}

/** */
type ZapparCamera = React.MutableRefObject<ZapparThree.Camera | undefined>;

/** Elements available for styling. */
type LoaderStyle = {
  /** The base container of the loader. */
  container?: Partial<CSSStyleDeclaration>;

  /** The inner container of the loader. */
  inner?: Partial<CSSStyleDeclaration>;

  /** The title of the loader. */
  title?: Partial<CSSStyleDeclaration>;

  /** The progress bar of the loader. */
  progress?: Partial<CSSStyleDeclaration>;

  /** The value of the progress bar. */
  progressValue?: Partial<CSSStyleDeclaration>;

  /** @ignore */
  animations?: any;
};

/** Zustand store responsible for sharing pipeline data cross the components. */
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

/** Types of various underling component objects. */
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
