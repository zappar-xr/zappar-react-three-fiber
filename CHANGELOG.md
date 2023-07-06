# Changelog

## [2.2.1 - 2.4.1] - 2023-06-23

### Changed

- `TargetImagePreviewMesh` returns `sRGB` material by default.
- Fixed an issue with washed out camera feed r152+

### Fixed

- Fixed a curved image tracking performance issue.

## [2.2.1] - 2023-03-27

### Fixed

- Fixed degenerate case for `ImageTargetPreview`.
- Fixed an issue where the wrong camera would be used in `iOS 16.4`.

## [2.3.0-beta.1] - 2023-02-08

### Added

- Spanish, Portuguese and German translations for permissions screen

### Changed

- Improvements to curved tracking

## [2.2.0] - 2023-02-03

## Changed

- Updated dependencies.
- Module is now built as `ESNext`.

## [2.1.3] - 2023-01-13

## Fixed

- Children props are once again passed into `ZapparCamera`.

## [2.1.2] - 2022-11-14

## Changed

- Updated dependencies.

## [2.1.1] - 2022-09-14

## Changed

- `ZapparCamera` component's `useFrame` priority from `2` to `-1`.
- Wrapped `ZapparCamera` inside of a `<primitive>` component.
- Updated dependencies.

## [2.1.0] - 2022-08-24

## Changed

- Updated to react 18

## [2.0.0] - 2022-08-23

### Added

- Greatly improved instant tracking.
- Introduced `SequenceSource` and pipeline functions to record and playback sequences of camera+motion data.
- Added support for curved tracking.
- Added support for fetching image element containing target image's embedded preview image.
- Improved GL state management.

### Changed

- Migrated to Webpack 5 workers.

### **Breaking:**

- Dropped support for webpack 4.

## [1.2.7] - 2022-08-16

### Fixed

- An issue where `ZapparCamera` would get disposed between renders.

## [1.2.6] - 2022-07-21

### Fixed

- An issue where `troika-text` would corrupt gl state on some devices.

## [1.2.5] - 2022-06-24

### Fixed

- Multiple re-renders of `ZapparCamera` which caused the front camera to behave in unexpected ways.

## [1.2.4] - 2022-03-31

### Changed

- Disabled `antiAlias` on the `ZapparCanvas` component. This is a temp fix for ios 15.4.

## [1.2.3] - 2022-03-29

### Changed

- set peerDependencies `"@react-three/fiber"` to  `">= 6.0.0"`

## [1.2.2] - 2022-03-29

### Removed

- `three` peer dependency locked to `<= 0.128.0`
- `node` 16 engine requirement.

### Fixed

- Addressed texture encoding issues for the camera background texture with recent three.js versions.

## [1.2.1] - 2022-03-25

### Added

- `.npmrc` - `engine-strict=true` to enforce node >= 16.

## [1.2.0] - 2022-03-25

### Breaking Changes

- `three` peer dependency locked to `<= 0.128.0`
- Temporarily Removed `CameraEnvironmentMap` component, please use `<ZapparCamera environmentMap />` instead.
- Package now requires `node 16+` and `npm 8.3+`. This will be reverted once `ios 15.4` `webgl2` is stable.

### Changed

- Cleaned up `ZapparCanvas`.
- Updated `README.md`
- Updated dependencies.

## [1.1.0] - 2022-02-15

### Changed

- Updated dependencies.

### Removed

- `useEnvironmentMap` prop from `ZapparCamera` component.

### Added

- `CameraEnvironmentMap` component. This can be used across the scene: `<CameraEnvironmentMap attach="environment" />` or be attached selectively across materials:

```ts
<mesh>
  <sphereBufferGeometry />
  <meshStandardMaterial metalness={1} roughness={0}>
    <CameraEnvironmentMap attach="envMap" />
  </meshStandardMaterial>
</mesh>
```

- Additional tests added for `CameraEnvironmentMap`.

## [1.0.11] - 2022-02-10

### Added

- `enabled` prop to the tracker group components. This can be used to disable/enable the underling tracker.

## [1.0.10] - 2022-02-09

- Introduced `SequenceSource` and pipeline functions to record and playback sequences of camera+motion data.
- Added instant tracker jest test.
- Added `start` prop to `ZapparCamera`, passing false will not automatically start the camera.

## [1.0.11] - 2022-02-10

### Added

- `enabled` prop to the tracker group components. This can be used to disable/enable the underling tracker.

## [1.0.10] - 2022-02-09

## [1.1.0-beta.6] - 2022-02-09

### Fixed

- Issue where `useInstantTracker` never gets called.

## [1.0.9] - 2021-11-01

- Updated dependencies.

## [1.0.6] - 2021-07-15

- Updated dependencies.

### Added

- Typings to the props of `ZapparCanvas` component.

### Fixed

- `ZapparCanvas` `resize` polyfill added.

## [1.0.5] - 2021-07-12

### Fixed

- Incorrect `main` and `types` paths in `package.json`.

## [1.0.4] - 2021-07-05

- Updated compatibility section in `README.md`
- Updated dependencies.

### Added

- Realtime Camera-based environment map to the `ZapparCamera` component.
- `Realtime Camera-based Reflections` section to `README.md`
- `CameraEnvironmentMap` tests.
- Added TypeDoc.

## [1.0.3] - 2021-05-04

### Fixed

- GitHub badge line-break in `README.md`
- Issue where camera source could not be a string.

### Changed

- Minor ESLint formatting changes in tests.

### Added

- `onFirstFrame` callback prop to `ZapparCamera` component. This gets called when the first camera frame is processed.
- `First Frame` section to `README.MD`

## [1.0.2] - 2021-04-09

- Open-sourced on GitHub.
- Updated Dependencies.
- Eslint fixes.

### Added

- Ability to use img/video elements as camera sources.
- Face and Image tracking tests.
- Exposed `LogLevel`, `setLogLevel`.
- `permissionRequest`(true) prop to `ZapparCamera`.
- `LICENCE.MD`.
- issues/repo urls to `package.json`
- Build badge to `README.md`

### Removed

- `skipVersionLog`.

### Changed

- Licencing copy in `README.MD`
- Changed licence to `MIT` in package.json

## [1.0.1] - 2021-04-01

- Cleaned up internal usage of forwardRef

### Added

- `makeDefault` prop to ZapparCamera.
- `renderPriority` prop to ZapparCamera.
- `README.MD:` Added `makeDefault` and `renderPriority` documentation to Camera section.

### Fixed

- `PlacementUI` styling.

## [1.0.0] - 2021-03-31

- Updated dependencies
- Switched to yarn

### ⚠️ Breaking

- react-three-fiber updated to 6.0.1
- You will now need to set `ZapparCamera` as your main camera using `useThree(state => state.set)`

### Fixed

- `Prettier` `printWidth` now matches `eslint` `max-len`

### Changed

- Minor refactor of all components.
- Tracker Components:
  - Removed `useUpdate` in favor of `useRef` as `@react-three/fiber` discontinued the hook.
  - Tracker Components which make use of forwardRef, now have correct ref types.

### Added

- An easy to use placement UI for Instant Trackers. (`placementUI` prop for `InstantTracker` component)
- `@react-three/drei` dependency

### Removed

- makeDefault prop from `ZapparCamera` component. This should now be handled by users.
- `README.MD`: Camera's `makeDefault` documentation.

## [0.1.27] - 2021-03-09

- Updated dependencies

### Added

- sources prop to `Camera` component, allowing custom video devices to be used.

## [0.1.26] - 2021-02-24

### Fixed

- Missing `forwardRef` parameters

## [0.1.25] - 2021-02-19

### Changed

- `README.MD`
  - Temporally removed preview gif

## [0.1.24] - 2021-02-19

### Changed

- `README.MD`
  - Tidied up code snippets
  - Added `create-react-app` instructions
  - Added `snapshot` guide to `Camera` section
  - Added preview gif

### Fixed

- Issue where `<Loader>` component would not dispose of itself.

### Added

- React router test
- `skipVersionLog` for silencing version logs

### Fixed

- `<Loader>` now honours `style` and `onLoad` changes (added to `useEffect`'s dependency list)

## [0.1.22] - 2021-02-08

### Added

- `Pipeline` object to be used when removing and adding canvas (`react-router-dom` support)
- `react-router-dom` section to README.MD
- `pipeline?` prop to `ZapparCamera`,  `InstantTracker`, `ImageTracker`, `FaceTracker` components.
- `model?` prop to `FaceTracker` component

### Fixed

- Tracker's callbacks are now cleaned up when dismounted

## [0.1.20] - 2020-12-08

### Added

- Exposed `Types` interface containing types for primitive three tracker objects.

### Fixed

- `ZapparCamera` component now correctly supports `poseMode="anchor-origin`

## [0.1.6-0.1.19] - 2020-12-08

### Added

- Keywords to `package.json`
- `zapparCanvas` id to `ZapparCanvas` component
- `create-react-app` templates will follow versioning of this package.

## [0.1.5] - 2020-12-11

### Changed

- Updated dependencies.
- `README.md` removed some incorrect info.

### Added

- Keywords to `package.json`

## [0.1.4] - 2020-12-03

### Changed

- Camera prop is now optional when constructing trackers.
- Tidied up internal interfaces.
- `README.md` updated to reflect this patch.

## [0.1.3] - 2020-12-02

### Added

- `animations` props to tracker components (needed for three 0.123.0)

### Changed

- React Three Fiber peer dependency to ">= 5.2.1"

## [0.1.2] - 2020-12-01

### Added

- `npx create-react-app` instructions to README.md

### Changed

- `README.md` bootstrap project markdown formatting.

## [0.1.1] - 2020-12-01

Initial release
