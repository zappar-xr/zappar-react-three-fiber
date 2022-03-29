# Zappar for React Three Fiber

![Build](https://github.com/zappar-xr/zappar-react-three-fiber/workflows/Build/badge.svg)

This library allows you use Zappar's best-in-class AR technology with content built using the 3D rendering platform React Three Fiber.

It provides high performance (30 frames-per-second) face, image and world tracking, in the browsers already installed on your users' mobile phones.

<img src="preview/preview.gif" width="450"/>k

You may also be interested in:

- Zappar for A-Frame ([website](https://zap.works/universal-ar/aframe/), [NPM](https://www.npmjs.com/package/@zappar/zappar-aframe))
- Zappar for ThreeJS ([website](https://zap.works/universal-ar/threejs/), [NPM](https://www.npmjs.com/package/@zappar/zappar-threejs))
- Zappar for Unity ([website](https://zap.works/universal-ar/unity/))
- Zappar for JavaScript ([website](https://zap.works/universal-ar/aframe/), [NPM](https://www.npmjs.com/package/@zappar/zappar)), if you'd like to build content with a different 3D rendering platform
- ZapWorks Studio ([website](https://zap.works/studio/)), a full 3D development environment built for AR, VR and MR

## Table Of Contents

<details>
<summary>Click to expand table of contents</summary>

<!--ts-->
   * [Zappar for React Three Fiber](#zappar-for-react-three-fiber)
      * [Table Of Contents](#table-of-contents)
      * [Getting Started](#getting-started)
         * [Bootstrap Projects](#bootstrap-projects)
            * [GitHub](#github)
            * [create-react-app](#create-react-app)
         * [Example Projects](#example-projects)
      * [Starting Development](#starting-development)
         * [NPM](#npm)
      * [Overview](#overview)
      * [Local Preview and Testing](#local-preview-and-testing)
      * [Compatibility and Browser Support](#compatibility-and-browser-support)
         * [Detecting Browser Compatibility](#detecting-browser-compatibility)
      * [Publishing and Hosting Content](#publishing-and-hosting-content)
         * [Licensing](#licensing)
      * [Setting up the Canvas](#setting-up-the-canvas)
      * [Setting up the Camera](#setting-up-the-camera)
      * [Advanced Usage](#advanced-usage)
         * [Custom Video Device](#custom-video-device)
         * [First Frame](#first-frame)
         * [Setting the default camera](#setting-the-default-camera)
         * [User Facing Camera](#user-facing-camera)
         * [Mirroring the Camera](#mirroring-the-camera)
         * [Realtime Camera-based Reflections](#realtime-camera-based-reflections)
         * [Camera Pose](#camera-pose)
      * [Tracking](#tracking)
         * [Image Tracking](#image-tracking)
            * [Target File](#target-file)
            * [Events](#events)
         * [Face Tracking](#face-tracking)
            * [Events](#events-1)
         * [Face Landmarks](#face-landmarks)
         * [Face Mesh](#face-mesh)
         * [Head Masking](#head-masking)
         * [Instant World Tracking](#instant-world-tracking)
            * [Default Placement UI](#default-placement-ui)
      * [Loading UI](#loading-ui)
      * [Usage with react-router-dom](#usage-with-react-router-dom)
      * [Integrating into an existing create-react-app project](#integrating-into-an-existing-create-react-app-project)
      * [Links and Resources](#links-and-resources)

<!-- Added by: zapparadmin, at: Tue Mar 29 20:36:12 BST 2022 -->

<!--te-->

</details>

## Getting Started

### Bootstrap Projects

You can get started super-quickly using one of our bootstrap projects. They contain the basics of an AR experience for the different tracking types - no more, no less.

#### GitHub

Check out these repositories that contain `webpack` and `babel` setups, which are optimized for development and deployment:

 Tracking Type | JavaScript | TypeScript
--- | --- | ---
Image Tracking   | [GitHub (JSX)](https://github.com/zappar-xr/zappar-react-three-fiber-image-tracking-webpack-bootstrap)   | [GitHub (TSX)](https://github.com/zappar-xr/zappar-react-three-fiber-image-tracking-webpack-bootstrap-typescript)
Face Tracking    | [GitHub (JSX)](https://github.com/zappar-xr/zappar-react-three-fiber-face-tracking-webpack-bootstrap)    | [GitHub (TSX)](https://github.com/zappar-xr/zappar-react-three-fiber-face-tracking-webpack-bootstrap-typescript)
Instant Tracking | [GitHub (JSX)](https://github.com/zappar-xr/zappar-react-three-fiber-instant-tracking-webpack-bootstrap) | [GitHub (TSX)](https://github.com/zappar-xr/zappar-react-three-fiber-instant-tracking-webpack-bootstrap-typescript)

#### create-react-app

Alternatively,you may get started via `npx create-react-app`:

```bash
npx create-react-app uar-app --template @zappar/r3f-face-tracking-typescript
```

<details>
  <summary>Click to expand available templates</summary>

- `@zappar/r3f-face-tracking`
- `@zappar/r3f-face-tracking-typescript`
- `@zappar/r3f-image-tracking`
- `@zappar/r3f-image-tracking-typescript`
- `@zappar/r3f-instant-tracking`
- `@zappar/r3f-instant-tracking-typescript`

</details>

### Example Projects

There's a repository of example projects for your delectation over here:

## Starting Development

You can use this library by installing from NPM for use in a webpack project.

### NPM

Run the following NPM command inside your project directory:

```bash
npm install --save @zappar/zappar-react-three-fiber
```

Then import the library into your JavaScript or TypeScript files:

```ts
import { ZapparCamera /* ... */ } from "@zappar/zappar-react-three-fiber";
```

The final step is to add this necessary entry to your webpack `rules`:

```ts
module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /zcv\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
      },
      //...
    ],
  },
};
```

## Overview

You can integrate the Zappar library with an existing React Three Fiber app. A typical project may look like this:

```tsx
import { render } from "react-dom";
import React from "react";
import {
  ZapparCamera,
  ImageTracker,
  ZapparCanvas,
} from "@zappar/zappar-react-three-fiber";

const App = () => {
  // Use Webpack to load in target file
  const targetFile = "example-tracking-image.zpt";
    .default;
  return (
    <ZapparCanvas>
      {/* Setup Zappar Camera*/}
      <ZapparCamera />
      {/* Setup Image Tracker, passing our target file */}
      <ImageTracker targetImage={targetFile}>
        {/* Create a normal pink sphere to be tracked to the target */}
        <mesh>
          <sphereBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </ImageTracker>
      {/* Normal directional light */}
      <directionalLight />
    </ZapparCanvas>
  );
}
render(<App />, document.getElementById("root"));
```

The remainder of this document goes into more detail about each of the component elements of the example above.

## Local Preview and Testing

For testing, you'll want to launch the project locally, without hosting it.

Due to browser restrictions surrounding use of the camera, you must use HTTPS to view or preview your site, even if doing so locally from your computer. If you're using `webpack`, consider using `webpack-dev-server` which has an `https` option to enable this.

Alternatively you can use the [ZapWorks command-line tool](https://www.npmjs.com/package/@zappar/zapworks-cli) to serve a folder over HTTPS for access on your local computer, like this:

```bash
zapworks serve .
```

The command also lets you serve the folder for access by other devices on your local network, like this:

```bash
zapworks serve . --lan
```

## Compatibility and Browser Support

This library works well on the browsers that enjoy the vast majority of mobile market-share. That said, there are a number of web browsers available across the mobile and desktop device landscape.

*Best support:*

- Safari for iOS (version 11.3 and later)
- Chrome for Android (versions from at least the last year)

*Functional but not our primary support target (support quality):*

- Most Webkit/Blink-based web browsers for Android, including Brave (good)
- Most third-party web browsers for iOS from iOS 14.3 and later (good)
- iOS in-app web views implemented with SFSafariViewController (good)
- iOS in-app web views implemented with WKWebView from iOS 14.3 (good)
- Firefox for Android (good, however performance may be lower than other browsers)
- Chrome for Mac/Windows (*)
- Firefox for Mac/Windows (*)
- Safari for Mac (*)

*Known to not work:*

- iOS in-app web views implemented with WKWebView prior to iOS 14.3 - this iOS technology do not support camera access at all and thus we’re unable to support it. Apple has rectified this issue in iOS 14.3.
- iOS in-app web views implemented with the deprecated UIWebView component - this iOS technology do not support camera access at all and thus we’re unable to support it.
- Non-Safari web browsers on iOS, including Chrome, Firefox and Brave, before iOS 14.3 - these browsers use WKWebView due to App Store restrictions and thus do not support camera access.

\* Browsers without motion sensor access (e.g desktop browsers) don't support instant world tracking or attitude-based camera poses.

### Detecting Browser Compatibility

To make it easy to detect if your page is running in a browser that's not supported, we've provided the `BrowserCompatibility` component.

```tsx
<>
   <BrowserCompatibility />
   <Canvas>
     {/* Content */}
   </Canvas>
</>
```

The `BrowserCompatibility` default fallback shows a full-page dialog that informs the user they're using an unsupported browser, and provides a button to 'copy' the current page URL so they can 'paste' it into the address bar of a compatible alternative.

You may also provide a custom fallback (`ReactElement`) UI to be displayed.

```tsx
<BrowserCompatibility fallback={<div>Sorry!</div>} />
```

For more custom implementations, consider using `browserIncompatible` function.

```tsx
const incompatible = browserIncompatible(); // true / false
```

## Publishing and Hosting Content

Once you've built your site, you have a number of options for hosting it. These include, **hosting with ZapWorks** and **self-hosting**. Head over to the [ZapWorks Publishing and Hosting article](https://docs.zap.works/universal-ar/publishing-and-hosting/) to learn more about these options.

### Licensing

This wrapper library is MIT licensed, but relies on our proprietary computer vision library, @zappar/zappar-cv, for which you must maintain an activate subscription at ZapWorks. To learn more about licensing, [click here](https://docs.zap.works/universal-ar/licensing/).

The source code for this wrapper library is available freely for your viewing pleasure over at GitHub:
<https://github.com/zappar-xr/zappar-react-three-fiber/>

## Setting up the Canvas

The first step when developing a React Three Fibre UAR project is replace any existing Canvas you have in your scene with the `ZapparCanvas`.

```tsx
import { ZapparCanvas /* ... */ } from "@zappar/zappar-react-three-fiber";
```

```tsx
<ZapparCanvas>{/** YOUR CONTENT HERE **/}</ZapparCanvas>;
```

You may alternatively use the default react-three-fiber `Canvas` component, with `colorManagement` toggled off.

```tsx
<Canvas colorManagement={false}>{/** YOUR CONTENT HERE **/}</Canvas>;
```

When using [@zappar/webgl-snapshot](https://www.npmjs.com/package/@zappar/webgl-snapshot) to take screenshots, construct the canvas with drawing buffer preservation enabled:

```tsx
<ZapparCanvas gl={{ preserveDrawingBuffer: true }}>
```

or

```tsx
<Canvas
  colorManagement={false}
  gl={{ preserveDrawingBuffer: true }
>
```

## Setting up the Camera

Add or replace any existing camera you have in your scene with the `ZapparCamera` component:

```tsx
import { ZapparCamera /* ... */  } from "@zappar/zappar-react-three-fiber";
```

```tsx
// ...
return (
  <ZapparCanvas>
    <ZapparCamera/>
  </ZapparCanvas>
);
```

You don't need to change the position or rotation of the camera yourself - the Zappar library will do this for you, automatically.

## Advanced Usage

### Custom Video Device

Custom video device IDs can be provided as options passed into `ZapparCamera` component:

```ts
<ZapparCamera
  sources={{
    userCamera:
      "csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=",
    rearCamera:
      "RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=",
  }}
/>
```

### First Frame

Use `onFirstFrame` callback prop to detect when the first frame has been processed:

```tsx
 <ZapparCamera
  onFirstFrame={() => {
    console.log("first frame");
  }}
/>
```

### Setting the default camera

When the camera component is mounted, it sets itself as the scene's main camera with render priority of 1. You may change this behavior with the following props:

```tsx
<ZapparCamera
  makeDefault={false} // default: true
  renderPriority={0} //  default: 1
/>
```

To set the camera as your main scene camera yourself, use `useThree`:

```tsx
const set = useThree(state => state.set)
const cameraRef = useRef()

useLayoutEffect(() => {
  set(() => ({ camera: cameraRef.current }))
}, [])


// ...
<ZapparCamera makeDefault={false} ref={ref}/>
// ...
```

### User Facing Camera

Some experiences, e.g. face tracked experiences, require the use of the user-facing camera on the device. To activate the user-facing camera, provide the `userFacing` prop to the `ZapparCamera` component:

```tsx
<ZapparCamera userFacing />
```

### Mirroring the Camera

Users expect user-facing cameras to be shown mirrored, so by default the `ZapparCamera` will mirror the camera view for the user-facing camera.

Configure this behavior with the following option:

```tsx
<ZapparCamera userCameraMirrorMode="poses" />
```

The values you can pass to `userCameraMirrorMode` are:

- `poses`: this option mirrors the camera view and makes sure your content aligns correctly with what you're tracking on screen. Your content itself is not mirrored - so text, for example, is readable. This option is the default.
- `css`: this option mirrors the entire canvas. With this mode selected, both the camera and your content appear mirrored.
- `none`: no mirroring of content or camera view is performed

There's also a `rearCameraMirrorMode` prop that takes the same values should you want to mirror the rear-facing camera. The default `rearCameraMirrorMode` is `none`.

### Realtime Camera-based Reflections

The SDK provides an automatically generated environment map that's useful if you're using materials that support reflections (e.g. `MeshStandardMaterial`, `MeshPhysicalMaterial`). The map uses the camera feed to create an approximate environment that can add some realism to your scene.

To apply the map to your scene, simply pass `environmentMap` prop to the `ZapparCamera` component:

```tsx
<ZapparCamera environmentMap />
```

### Camera Pose

The Zappar library provides multiple modes for the camera to move around in the scene. You can set this mode with the `poseMode` prop of the `ZapparCamera` component. There are the following options:

- `default`: in this mode the camera stays at the origin of the scene, pointing down the negative Z axis. Any tracked groups will move around in your scene as the user moves the physical camera and real-world tracked objects.
- `attitude`: the camera stays at the origin of the scene, but rotates as the user rotates the physical device. When the Zappar library initializes, the negative Z axis of world space points forward in front of the user.
- `anchor-origin`: the origin of the scene is the center of the group specified by the camera's `poseAnchorOrigin` prop. In this case the camera moves and rotates in world space around the group at the origin.

The correct choice of camera pose will depend on your given use case and content. Here are some examples you might like to consider when choosing which is best for you:

- To have a light that always shines down from above the user, regardless of the angle of the device or anchors, use `attitude` and place a light shining down the negative Y axis in world space.
- In an application with a physics simulation of stacked blocks, and with gravity pointing down the negative Y axis of world space, using `anchor-origin` would allow the blocks to rest on a tracked image regardless of how the image is held by the user, while using `attitude` would allow the user to tip the blocks off the image by tilting it.

## Tracking

The Zappar library offers three types of tracking for you to use to build augmented reality experiences:

- _Image Tracking_ can detect and track a flat image in 3D space. This is great for building content that's augmented onto business cards, posters, magazine pages, etc.
- _Face Tracking_ detects and tracks the user's face. You can attach 3D objects to the face itself, or render a 3D mesh that's fit to (and deforms with) the face as the user moves and changes their expression. You could build face-filter experiences to allow users to try on different virtual sunglasses, for example, or to simulate face paint.
- _Instant World Tracking_ lets you tracking 3D content to a point chosen by the user in the room or immediate environment around them. With this tracking type you could build a 3D model viewer that lets users walk around to view the model from different angles, or an experience that places an animated character in their room.

Importing trackers from the package:

```tsx
import {
  InstantTracker,
  ImageTracker,
  FaceTracker,
} from "@zappar/zappar-react-three-fiber";
```

### Image Tracking

To track content from a flat image in the camera view, use the `ImageTracker` component:

```tsx
<ImageTracker targetImage={targetFile} >
  {/*PLACE CONTENT TO APPEAR ON THE IMAGE HERE*/}
</ImageTracker>
```

The group provides a coordinate system that has its origin at the center of the image, with positive X axis to the right, the positive Y axis towards the top and the positive Z axis coming up out of the plane of the image. The scale of the coordinate system is such that a Y value of +1 corresponds to the top of the image, and a Y value of -1 corresponds to the bottom of the image. The X axis positions of the left and right edges of the target image therefore depend on the aspect ratio of the image.

#### Target File

`ImageTracker`s use a special 'target file' that's been generated from the source image you'd like to track. You can generate them using the [ZapWorks command-line utility](https://docs.zap.works/universal-ar/zapworks-cli/) like this:

```bash
zapworks train myImage.png
```

The resulting file can then be passed as a `targetFile` prop to be loaded:

```tsx
const App = () => {
  const targetFile = 'target.zpt';
  return (
    <ZapparCanvas>
      <ZapparCamera userCameraMirrorMode="css" />
      <ImageTracker targetImage={targetFile} >
        {/*PLACE CONTENT TO APPEAR ON THE IMAGE HERE*/}
      </ImageTracker>
    </ZapparCanvas>
  );
}
```

#### Events

The `ImageTracker` component will emit the following events on the element it's attached to:

- `onVisible` - emitted when the image appears in the camera view
- `onNotVisible` - emitted when the image is no longer visible in the camera view
- `onNewAnchor` - emitted when a a non-previously seen before anchor appears in the camera view.

Here's an example of using these events:

```tsx
<ZapparCanvas>
  <ZapparCamera />
  <ImageTracker
    onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
    onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
    onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
    targetImage={targetFile}
  >
    {/*PLACE CONTENT TO APPEAR ON THE IMAGE HERE*/}
  </ImageTracker>
</ZapparCanvas>
```

### Face Tracking

To place content on or around a user's face, create a new `FaceTracker` component:

```tsx
<ZapparCamera/>
<FaceTracker >
  {/*PLACE CONTENT TO APPEAR ON THE FACE HERE*/}
</FaceTracker>
```

The group provides a coordinate system that has its origin at the center of the head, with positive X axis to the right, the positive Y axis towards the top and the positive Z axis coming forward out of the user's head.

Note that users typically expect to see a mirrored view of any user-facing camera feed. Please see the section on mirroring the camera view earlier in this document.

#### Events

The `FaceTracker` component will emit the following events on the element it's attached to:

- `onVisible` - emitted when the face appears in the camera view
- `onNotVisible` - emitted when the face is no longer visible in the camera view

Here's an example of using these events:

```tsx
<ZapparCamera />
<FaceTracker
  onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
  onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
>
  {/*PLACE CONTENT TO APPEAR ON THE FACE HERE*/}
</FaceTracker>
```

### Face Landmarks

In addition to tracking the center of the head, you can use `Landmark` to track content from various points on the user's face. These landmarks will remain accurate, even as the user's expression changes.

To track a landmark, construct a new `Landmark` component, passing your camera, face tracker group, and the name of the landmark you'd like to track as props:

```tsx
const App = () => {
  return (
    <ZapparCanvas>
      <ZapparCamera  />
      <FaceTracker />
      <FaceLandmark
        target="nose-bridge"
      >
        {/*PLACE CONTENT TO APPEAR ON THE NOSE BRIDGE HERE*/}
      </FaceLandmark>
      <directionalLight />
    </ZapparCanvas>
  );
}
```

The following landmarks are available: `eye-left`, `eye-right`, `ear-left`, `ear-right`, `nose-bridge`, `nose-tip`, `nose-base`, `lip-top`, `lip-bottom`, `mouth-center`, `chin`, `eyebrow-left`, and `eyebrow-right`. Note that 'left' and 'right' here are from the user's perspective.

### Face Mesh

In addition to tracking the center of the face using `FaceTracker`, the Zappar library provides a number of meshes that will fit to the face/head and deform as the user's expression changes. These can be used to apply a texture to the user's skin, much like face paint, or to mask out the back of 3D models so the user's head is not occluded where it shouldn't be.

To use a face mesh, create a child mesh component, attaching `FaceBufferGeometry` within your `FaceTracker` component, like this:

```tsx
import { FaceBufferGeometry /* ... */ } from "@zappar/zappar-react-three-fiber";
```

```tsx
// ...
const App = () => {
  const faceTrackerGroup = useRef();
  return (
      <ZapparCanvas>
        <ZapparCamera />
        <FaceTracker ref={faceTrackerGroup}>
            <mesh>
              <FaceBufferGeometry trackerGroup={faceTrackerGroup} />
            </mesh>
        </FaceTracker>
        <directionalLight />
      </ZapparCanvas>
  );
};
```

At this time there are two meshes included with the library. The default mesh covers the user's face, from the chin at the bottom to the forehead, and from the sideburns on each side. There are optional parameters that determine if the mouth and eyes are filled or not:

```tsx
<FaceBufferGeometry
  fillEyeLeft
  fillEyeRight
  fillMouth
  fillNeck
/>
```

The full head simplified mesh covers the whole of the user's head, including some neck. It's ideal for drawing into the depth buffer in order to mask out the back of 3D models placed on the user's head (see Head Masking below). There are optional parameters that determine if the mouth, eyes and neck are filled or not:

```tsx
<FaceBufferGeometry fullHead  />
```

### Head Masking

If you're placing a 3D model around the user's head, such as a helmet, it's important to make sure the camera view of the user's real face is not hidden by the back of the model. To achieve this, the library provides `HeadMaskMesh`. It's an entity that fits the user's head and fills the depth buffer, ensuring that the camera image shows instead of any 3D elements behind it in the scene.

To use it, add the entity into your `HeadMaskMesh` entity, before any other 3D content:

```tsx
import { HeadMaskMesh /* ... */ } from "@zappar/zappar-react-three-fiber";
```

```tsx
// ...
<ZapparCamera />
<FaceTracker>
  <HeadMaskMesh  />
  {/*OTHER 3D CONTENT GOES HERE*/}
</FaceTracker>
```

### Instant World Tracking

To track content from a point on a surface in front of the user, use the `InstantTracker` component:

```tsx
<InstantTracker placementMode >
  {/*PLACE CONTENT TO APPEAR IN THE WORLD HERE*/}
</InstantTracker>
```

The group provides a coordinate system that has its origin at the point that's been set, with the positive Y coordinate pointing up out of the surface, and the X and Z coordinates in the plane of the surface.

You can use the `placementMode` prop to let the user choose a location for their content by moving their camera around the room. While the prop is set, the `InstantTracker`'s position will be updated every frame to be in front of the user at `[0, 0, -5]` relative to the camera. Once the prop is removed the tracker will keep the content anchored at that position in the user's environment, rather than directly in front of the camera. You can customize the camera-relative position that's set during placement mode using the `placementCameraOffset` prop.

In typical usage, the tracker starts with `placementMode` set, and an on-screen UI element enables to the user to 'place' and 'pick-up' the content by toggling that prop, like this:

```tsx
const [placementMode, setPlacementMode] = useState(true);
return (
  <>
    <ZapparCanvas>
      <ZapparCamera />
      <InstantTracker placementMode={placementMode} >
        <mesh>
          <sphereBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </InstantTracker>
      <directionalLight />
    </ZapparCanvas>
    <div
      id="zappar-placement-ui"
      onClick={() => {
        setPlacementMode((currentPlacementMode) => !currentPlacementMode);
      }}
    >
      Tap here to
      {placementMode ? " place " : " pick up "}
      the object
    </div>
  </>
);
```

#### Default Placement UI

For your convenience, a default placement UI is available. This can be used by simply passing in a `placementUI` prop with values `placement-only` or `toggle`.

A simple experience which uses `placementUI` may look like this:

```tsx
export default function App() {
  return (
    <ZapparCanvas>
      <ZapparCamera />
      <InstantTracker
        placementUI="placement-only"
        placementCameraOffset={[0, 0, -10]}
      >
        <mesh>
          <sphereBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </InstantTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}
```

## Loading UI

For your convenience, this package includes a `Loader` component that you can use to display a progress bar while your experience loads (should you wish to). It takes over the global instance of `THREE`'s `LoadingManager`. The `<Loader />` is used by adding it to the canvas like this:

```tsx
import {Loader, /*...*/ } from '@zappar/zappar-react-three-fiber'
// ....
return (
  <ZapparCanvas>
    <ZapparCamera rearCameraMirrorMode="css"  />
    <FaceTracker>
      <Suspense fallback={null}>
        <HeadMaskMesh  />
        <Model />
      </Suspense>
    </FaceTracker>
    <directionalLight />
    <Loader />
  </ZapparCanvas>
)
```

The `Loader` will automatically handle the showing and hiding of the screen during the loading process.

## Usage with react-router-dom

To ensure WebGL context is updated as routes are switched, a `pipeline` needs to be used:

```tsx
import {
  ZapparCanvas,
  ZapparCamera,
  FaceTracker,
  Pipeline
} from "@zappar/zappar-react-three-fiber";

const App = () => {
  const pipeline = new Pipeline();

  return (
    <ZapparCanvas>
      <ZapparCamera pipeline={pipeline} />
      <FaceTracker pipeline={pipeline}>
        {/* PLACE CONTENT HERE*/}
      </FaceTracker>
      <directionalLight/>
    </ZapparCanvas>
  );
};
```

*Note that removing and adding a canvas element is a relatively costly process which should be avoided, if possible.*

## Integrating into an existing create-react-app project

You will need to add react-app-rewired to your project:
<https://github.com/timarney/react-app-rewired>

Then create a `config-overrides.js` in the root of your project.

```js
module.exports = {
  webpack: function (config, env) {
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|zbin|jsx|ts|tsx)$/, /\.html$/, /\.json$/];
        return {
          ...rule,
          oneOf: [{
              test: /zcv\.wasm$/,
              type: "javascript/auto",
              loader: "file-loader",
              options: {
                outputPath: 'static/js',
                publicPath: '.',
                name: '[name].[ext]',
              },
            },
            ...rule.oneOf
          ]
        };
      }
      return rule;
    });

    config.resolve.extensions.push(".wasm")
    return config;
  },
  jest: function (config) {
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
  paths: function (paths, env) {
    return paths;
  },
}
```

You will also need to serve the dev server using `https`, refer to create-react-app and react-app rewired documentation for instructions.

## Links and Resources

- [Web site](https://zap.works/universal-ar/)
- [Documentation](https://docs.zap.works/universal-ar/web-libraries/react-threejs/)
- [Forum](https://forum.zap.works/)
- [Issue tracker](https://github.com/zappar-xr/zappar-react-three-fiber/issues)
- [Source code](https://github.com/zappar-xr/zappar-react-three-fiber)
