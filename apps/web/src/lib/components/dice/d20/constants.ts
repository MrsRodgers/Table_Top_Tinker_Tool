import { getFaces } from "./utils/common";

/**
 * Golden ratio used to generate icosahedron vertices.
 */
export const PHI = (1 + Math.sqrt(5)) / 2;

/**
 * Face labels shown on the d20.
 */
export const FACE_NUMS = [
  20, 8, 6, 17, 4, 10, 15, 9, 19, 7, 2, 16, 5, 11, 13, 3, 18, 1, 12, 14,
];

/**
 * Animation duration in milliseconds.
 */
export const DURATION = 1150;

/**
 * Number of full spins during roll.
 */
export const SPIN_ROUNDS = 3;

export const FACES = getFaces();