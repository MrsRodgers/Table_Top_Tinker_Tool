import type { Vec2, Vec3 } from "../common";

export type FaceDefinition = {
  idxs: [number, number, number, number];
  num: number;
}

export type D6FaceData = {
  f: FaceDefinition;
  n: Vec3;
  centroid: Vec3;
  r: number;
  g: number;
  b: number;
  v2: Vec2[];
  visible: boolean;
}

export type Angles = {
  rx: number;
  ry: number;
}
