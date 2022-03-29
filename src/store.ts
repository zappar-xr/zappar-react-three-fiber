import create from "zustand";
import { Store } from "./spec";

const camera = create<Store.camera>((set) => ({
  object: undefined,
  set: (camera) => set({ object: camera }),
}));

const imageTracker = create<Store.imageTracker>((set) => ({
  object: undefined,
  set: (tracker) => set({ object: tracker }),
}));

const instantTracker = create<Store.instantTracker>((set) => ({
  object: undefined,
  set: (tracker) => set({ object: tracker }),
}));

const faceTracker = create<Store.faceTracker>((set) => ({
  object: undefined,
  set: (tracker) => set({ object: tracker }),
}));

// const cameraEnvironmentMap = create<Store.cameraEnvironmentMap>((set) => ({
//   object: undefined,
//   set: (tracker) => set({ object: tracker }),
// }));

export default {
  camera,
  imageTracker,
  instantTracker,
  faceTracker,
  // cameraEnvironmentMap,
};
