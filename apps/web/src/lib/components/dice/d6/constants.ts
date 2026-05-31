import type { Vec3 } from "../common";
import type { Angles, FaceDefinition } from "./types";

import { norm } from "./utils/animate";

export const H = 1; 

export const BASE_VERTS: Vec3[] = [
  [-H, -H, H],
  [H, -H, H],
  [H, H, H],
  [-H, H, H],
  [-H, -H, -H],
  [H, -H, -H],
  [H, H, -H],
  [-H, H, -H],
];

export const CUBE_FACES: FaceDefinition[] = [
  { idxs: [0, 1, 2, 3], num: 1 }, // +Z front
  { idxs: [5, 4, 7, 6], num: 2 }, // -Z back
  { idxs: [1, 5, 6, 2], num: 3 }, // +X right
  { idxs: [4, 0, 3, 7], num: 4 }, // -X left
  { idxs: [3, 2, 6, 7], num: 5 }, // +Y top
  { idxs: [4, 5, 1, 0], num: 6 }, // -Y bottom
];

// Key + fill lights
export const KEY = norm([0.5, 0.8, 1.0]);
export const FILL = norm([-0.4, -0.2, 0.6]);
export const LO: Vec3 = [125, 63, 12];
export const HI: Vec3 = [201, 134, 79];

// Target rx/ry angles that bring each face toward the viewer (+Z)
export const FACE_ANGLES: Record<number, Angles> = {
  1: { rx: 0, ry: 0 },
  2: { rx: 0, ry: Math.PI },
  3: { rx: 0, ry: -Math.PI / 2 },
  4: { rx: 0, ry: Math.PI / 2 },
  5: { rx: Math.PI / 2, ry: 0 },
  6: { rx: -Math.PI / 2, ry: 0 },
};

export const CX = 160;
export const CY = 160;
export const SCALE = 70;
export const DURATION = 1150;
export const SPINS = 2;