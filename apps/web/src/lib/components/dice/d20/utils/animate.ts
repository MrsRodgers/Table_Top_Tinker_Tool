import type { Sparkle, Vec2, Vec3 } from "../../common";

import { DURATION, FACE_NUMS, FACES, SPIN_ROUNDS } from "../constants";

import { sparkle } from "../../common";
import { getVertices } from "./common";
import { drawDice } from "./drawing";

export function rotateY(verts: Vec3[], angle: number): Vec3[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return verts.map(([x, y, z]) => [x * c + z * s, y, -x * s + z * c]);
}

export function rotateX(verts: Vec3[], angle: number): Vec3[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return verts.map(([x, y, z]) => [x, y * c - z * s, y * s + z * c]);
}

export function rotateZ(verts: Vec3[], angle: number): Vec3[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return verts.map(([x, y, z]) => [x * c - y * s, x * s + y * c, z]);
}

/**
 * Converts 3d to 2d
 */
export function project(
  verts: Vec3[],
  cx: number,
  cy: number,
  scale: number,
): Vec2[] {
  return verts.map(([x, y]) => [cx + x * scale, cy - y * scale]);
}

export function getNormalFace(pts: Vec3[]): Vec3 {
  const [a, b, c] = pts;

  const ab: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];

  const ac: Vec3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];

  return [
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ];
}

export function getCenterFace(pts: Vec3[]): Vec3 {
  return [
    (pts[0][0] + pts[1][0] + pts[2][0]) / 3,
    (pts[0][1] + pts[1][1] + pts[2][1]) / 3,
    (pts[0][2] + pts[1][2] + pts[2][2]) / 3,
  ];
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Finds rotation required for the dice number to facr forwards
 */
export function getRotationForFace(faceIdx: number): {
  rx: number;
  ry: number;
} {
  const verts = getVertices();

  const f = FACES[faceIdx];

  const pts3: Vec3[] = [verts[f[0]], verts[f[1]], verts[f[2]]];

  const n = getNormalFace(pts3);

  const len = Math.hypot(...n);

  const nN: Vec3 = [n[0] / len, n[1] / len, n[2] / len];
  const rx = Math.atan2(nN[1], nN[2]);

  const ry = -Math.atan2(nN[0], Math.sqrt(nN[1] * nN[1] + nN[2] * nN[2]));

  return { rx, ry };
}

/**
 * Starts dice rolling animation.
 */
export const rollDice = ({
  diceNum,
  animRef,
  diceCanvasRef,
  sparklesRef,
}: {
  diceNum: number;
  animRef: React.RefObject<number | null>;
  diceCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  sparklesRef: React.RefObject<Sparkle[]>;
}): void => {
  /**
   * Clamp value between 1 and 20.
   */
  const val = diceNum;

  /**
   * Stop previous animation if running.
   */
  if (animRef.current !== null) {
    cancelAnimationFrame(animRef.current);
  }

  const faceIdx = FACE_NUMS.indexOf(val);

  const rot = getRotationForFace(faceIdx);

  const targetRx = rot.rx;
  const targetRy = rot.ry;

  /**
   * Randomized start rotation.
   */
  const startRx = (Math.random() - 0.5) * Math.PI;

  const startRy = (Math.random() - 0.5) * Math.PI;

  let startTime: number | null = null;

  /**
   * Main animation loop.
   */
  const animate = (ts: number): void => {
    if (startTime === null) {
      startTime = ts;
    }

    const elapsed = ts - startTime;

    const raw = Math.min(elapsed / DURATION, 1);

    const t = easeOut(raw);

    const ry =
      startRy + SPIN_ROUNDS * 2 * Math.PI * (1 - t) + (targetRy - startRy) * t;

    const rx = startRx + (targetRx - startRx) * t;

    const rz = Math.random() * 0.05 * (1 - t);


    drawDice(ry, rx, rz, Math.min(1, raw * 6), diceCanvasRef, sparklesRef);

    if (raw < 1) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      drawDice(targetRy, targetRx, 0, 1, diceCanvasRef, sparklesRef);

      sparkle(sparklesRef);

      const sparkleLoop = (): void => {
        drawDice(targetRy, targetRx, 0, 1, diceCanvasRef, sparklesRef);


        if (sparklesRef.current.length > 0) {
          animRef.current = requestAnimationFrame(sparkleLoop);
        } else {
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(sparkleLoop);
    }
  };

  animRef.current = requestAnimationFrame(animate);
  sparkle(sparklesRef);
};
