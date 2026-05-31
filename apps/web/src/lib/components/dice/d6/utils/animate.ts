import type { Vec3, Vec2, Sparkle } from '../../common';
import type { Angles } from '../types';

import { sparkle } from '../../common';
import { drawDice } from './drawing';

import { DURATION, FACE_ANGLES, SPINS } from '../constants';

export function rotateX(pts: Vec3[], a: number): Vec3[] {
  const c = Math.cos(a),
    s = Math.sin(a);
  return pts.map(([x, y, z]) => [x, y * c - z * s, y * s + z * c]);
}

export function rotateY(pts: Vec3[], a: number): Vec3[] {
  const c = Math.cos(a),
    s = Math.sin(a);
  return pts.map(([x, y, z]) => [x * c + z * s, y, -x * s + z * c]);
}

export function project(
  pts: Vec3[],
  cx: number,
  cy: number,
  scale: number,
): Vec2[] {
  return pts.map(([x, y]) => [cx + x * scale, cy - y * scale]);
}

export function norm(v: Vec3): Vec3 {
  const l = Math.hypot(...v);
  return l ? (v.map((x) => x / l) as Vec3) : [0, 0, 1];
}

export function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function faceNormal(a: Vec3, b: Vec3, c: Vec3): Vec3 {
  const ab: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ac: Vec3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  return norm([
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ]);
}

export function faceCentroid(verts: Vec3[]): Vec3 {
  const sum = verts.reduce<Vec3>(
    (s, v) => [s[0] + v[0], s[1] + v[1], s[2] + v[2]],
    [0, 0, 0],
  );
  return sum.map((x) => x / verts.length) as Vec3;
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 2);
}

export function shortestAngle(from: number, to: number): number {
  let diff = (to - from) % (Math.PI * 2);

  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;

  return diff;
}

export const rollDice = ({
  diceNum,
  diceRef,
  sparklesRef,
  anglesRef,
  animRef,
}: {
  diceNum: number;
  animRef: React.RefObject<number | null>;
  diceRef: React.RefObject<HTMLCanvasElement | null>;
  sparklesRef: React.RefObject<Sparkle[]>;
  anglesRef: React.RefObject<Angles>;
}) => {
  const val = diceNum;
  const d = diceRef.current?.getContext('2d');
  if (!d) return;

  const { rx: tRx, ry: tRy } = FACE_ANGLES[val];
  const { rx: sRx, ry: sRy } = anglesRef.current;
  let startTime: number | null = null;

  function animate(ts: number): void {
    if (startTime === null) startTime = ts;
    const raw = Math.min((ts - startTime) / DURATION, 1);
    const t = easeOut(raw);

    const deltaRy = shortestAngle(sRy, tRy) + SPINS * Math.PI * 2;

    const deltaRx = shortestAngle(sRx, tRx) + SPINS * Math.PI * 0.5;

    const finalRy = sRy + deltaRy;
    const finalRx = sRx + deltaRx;

    const ry = sRy + (finalRy - sRy) * t;
    const rx = sRx + (finalRx - sRx) * t;
    if (!d) return;
    anglesRef.current = { rx, ry };
    drawDice(diceRef, rx, ry, sparklesRef);

    if (raw < 1) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      anglesRef.current = {
        rx: finalRx % (Math.PI * 2),
        ry: finalRy % (Math.PI * 2),
      };
      drawDice(diceRef, tRx, tRy, sparklesRef);
      sparkle(sparklesRef);

      const sparkleLoop = (): void => {
        drawDice(diceRef, tRx, tRy, sparklesRef);

        if (sparklesRef.current.length > 0) {
          animRef.current = requestAnimationFrame(sparkleLoop);
        } else {
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(sparkleLoop);
    }
  }

  if (animRef.current !== null) cancelAnimationFrame(animRef.current);
  animRef.current = requestAnimationFrame(animate);
  sparkle(sparklesRef);
};
