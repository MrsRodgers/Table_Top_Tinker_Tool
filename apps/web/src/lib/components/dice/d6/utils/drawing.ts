import type { Vec3, Vec2, Sparkle } from '../../common/types';
import type { D6FaceData } from '../types';

import { drawSparkles } from '../../common';
import {
  BASE_VERTS,
  CX,
  CY,
  SCALE,
  CUBE_FACES,
  KEY,
  FILL,
  LO,
  HI,
} from '../constants';

import {
  rotateX,
  rotateY,
  project,
  faceNormal,
  faceCentroid,
  dot3,
  norm,
} from './animate';

export function drawDice(
  diceCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  rx: number,
  ry: number,
    sparklesRef: React.RefObject<Sparkle[]>,
): void {
  const dc = diceCanvasRef.current?.getContext('2d');
  if (!dc) return;
  dc.clearRect(0, 0, 320, 340);

  let verts = BASE_VERTS;
  verts = rotateX(verts, rx);
  verts = rotateY(verts, ry);
  const proj = project(verts, CX, CY, SCALE);

  const faceData: D6FaceData[] = CUBE_FACES.map((f) => {
    const v3 = f.idxs.map((i) => verts[i]) as Vec3[];
    const v2 = f.idxs.map((i) => proj[i]) as Vec2[];
    const n = faceNormal(v3[0], v3[1], v3[2]);
    const centroid = faceCentroid(v3);

    // Phong: diffuse key + fill + specular
    const kd = Math.max(0, dot3(n, KEY));
    const fd = Math.max(0, dot3(n, FILL)) * 0.18;
    const half = norm([KEY[0], KEY[1], KEY[2] + 1]);
    const spec = Math.pow(Math.max(0, dot3(n, half)), 32) * 0.3;
    const br = kd * 0.82 + fd + spec;

    return {
      f,
      n,
      centroid,
      r: Math.min(255, Math.round(LO[0] + (HI[0] - LO[0]) * br)),
      g: Math.min(255, Math.round(LO[1] + (HI[1] - LO[1]) * br)),
      b: Math.min(255, Math.round(LO[2] + (HI[2] - LO[2]) * br)),
      v2,
      visible: n[2] > 0,
    };
  });

  // Painter's algorithm — depth sort by centroid z
  faceData.sort((a, b) => a.centroid[2] - b.centroid[2]);

  for (const { r, g, b, v2, visible, n, f } of faceData) {
    const pts = v2;

    // Face fill
    dc.beginPath();
    dc.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < 4; i++) dc.lineTo(pts[i][0], pts[i][1]);
    dc.closePath();

    if (visible) {
      dc.fillStyle = `rgb(${r},${g},${b})`;
      dc.fill();

      const minY = Math.min(...pts.map((p) => p[1]));
      const maxY = Math.max(...pts.map((p) => p[1]));
      const grad = dc.createLinearGradient(0, minY, 0, maxY);
      grad.addColorStop(0, 'rgba(255,255,255,0.10)');
      grad.addColorStop(1, 'rgba(0,0,0,0.15)');
      dc.beginPath();
      dc.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 4; i++) dc.lineTo(pts[i][0], pts[i][1]);
      dc.closePath();
      dc.fillStyle = grad;
      dc.fill();
    } else {
      dc.fillStyle = 'rgb(201, 134, 79)';
      dc.fill();
    }

    dc.beginPath();
    dc.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < 4; i++) dc.lineTo(pts[i][0], pts[i][1]);
    dc.closePath();
    dc.strokeStyle = visible
      ? `rgba(169, 161, 111,${0.2 + n[2] * 0.4})`
      : 'rgb(169, 161, 111)';
    dc.lineWidth = visible ? 1.6 : 0.8;
    dc.stroke();

    if (visible && n[2] > 0.3) {
      const px = (pts[0][0] + pts[1][0] + pts[2][0] + pts[3][0]) / 4;
      const py = (pts[0][1] + pts[1][1] + pts[2][1] + pts[3][1]) / 4;
      const sz = n[2] > 0.7 ? 32 : n[2] > 0.45 ? 23 : 15;
      dc.save();
      dc.shadowColor = 'rgba(0,0,0,0.6)';
      dc.shadowBlur = 4;
      dc.shadowOffsetY = 2;
      dc.font = `700 ${sz}px Georgia, serif`;
      dc.fillStyle = `rgba(240, 236, 209, ${0.55 + n[2] * 0.45})`;
      dc.textAlign = 'center';
      dc.textBaseline = 'middle';
      dc.fillText(String(f.num), px, py);
      dc.restore();
    }
  }
  drawSparkles(diceCanvasRef, sparklesRef);
}
