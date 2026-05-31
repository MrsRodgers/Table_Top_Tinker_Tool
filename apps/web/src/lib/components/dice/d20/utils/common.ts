import type { Vec3 } from "../../common";

import { PHI } from "../constants";

export function getVertices(): Vec3[] {
  const raw: Vec3[] = [
    [0, 1, PHI],
    [0, -1, PHI],
    [0, 1, -PHI],
    [0, -1, -PHI],

    [1, PHI, 0],
    [-1, PHI, 0],
    [1, -PHI, 0],
    [-1, -PHI, 0],

    [PHI, 0, 1],
    [PHI, 0, -1],
    [-PHI, 0, 1],
    [-PHI, 0, -1],
  ];

  return raw.map((p) => {
    const len = Math.hypot(...p);

    return [p[0] / len, p[1] / len, p[2] / len];
  });
}

export function getFaces(): number[][] {
  return [
    [0, 1, 8],
    [0, 8, 4],
    [0, 4, 5],
    [0, 5, 10],
    [0, 10, 1],

    [1, 6, 8],
    [8, 6, 9],
    [8, 9, 4],
    [4, 9, 2],
    [4, 2, 5],

    [5, 2, 11],
    [5, 11, 10],
    [10, 11, 7],
    [10, 7, 1],
    [1, 7, 6],

    [3, 9, 6],
    [3, 6, 7],
    [3, 7, 11],
    [3, 11, 2],
    [3, 2, 9],
  ];
}
