import { Vec3 } from "../common";

export type FaceData = {
  i: number;
  f: number[];
  nN: Vec3;
  centroid: Vec3;
  dot: number;
};