import type { FaceData } from '../types';
import type { Sparkle, Vec2, Vec3 } from '../../common';

import { FACE_NUMS, FACES } from '../constants';

import { drawSparkles } from '../../common';
import { getCenterFace, getNormalFace, project, rotateX, rotateY, rotateZ } from './animate';
import { getVertices } from './common';

export const drawDice = (
  ry: number,
  rx: number,
  rz: number,
  opacity: number,
  diceCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  sparklesRef: React.RefObject<Sparkle[]>,
): void => {
  const canvas = diceCanvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.clearRect(0, 0, 300, 320);

  ctx.globalAlpha = opacity;

  //rotate
  let verts = getVertices();

  verts = rotateZ(verts, rz);
  verts = rotateX(verts, rx);
  verts = rotateY(verts, ry);

  const cx = 150;
  const cy = 160;
  const scale = 110;

  const proj = project(verts, cx, cy, scale);

  const lRaw: Vec3 = [0.4, 0.6, 1.0];

  const lLen = Math.hypot(...lRaw);

  const light: Vec3 = [lRaw[0] / lLen, lRaw[1] / lLen, lRaw[2] / lLen];

  const facesData: FaceData[] = FACES.map((f, i) => {
    const pts3: Vec3[] = [verts[f[0]], verts[f[1]], verts[f[2]]];

    const n = getNormalFace(pts3);

    const nLen = Math.hypot(...n);

    const nN: Vec3 = [n[0] / nLen, n[1] / nLen, n[2] / nLen];

    const centroid = getCenterFace(pts3);

    const dot = nN.reduce((sum, value, idx) => sum + value * light[idx], 0);

    return {
      i,
      f,
      nN,
      centroid,
      dot,
    };
  });

  facesData.sort((a, b) => a.centroid[2] - b.centroid[2]);

  for (const face of facesData) {
    const { f, nN, dot, i } = face;

    const p2: Vec2[] = [proj[f[0]], proj[f[1]], proj[f[2]]];

    const visible = nN[2] > 0;
    if (!visible) continue;

    const brightness = Math.max(0, dot);

    const lo = [125, 63, 12];
    const hi = [201, 134, 79];

    const r = Math.round(lo[0] + (hi[0] - lo[0]) * brightness);

    const g = Math.round(lo[1] + (hi[1] - lo[1]) * brightness);

    const b = Math.round(lo[2] + (hi[2] - lo[2]) * brightness);

    ctx.beginPath();

    ctx.moveTo(p2[0][0], p2[0][1]);
    ctx.lineTo(p2[1][0], p2[1][1]);
    ctx.lineTo(p2[2][0], p2[2][1]);

    ctx.closePath();

    ctx.fillStyle = `rgb(${r},${g},${b})`;

    ctx.fill();

    ctx.strokeStyle = 'rgb(169, 161, 111)';
    ctx.lineWidth = 1;

    ctx.stroke();

    if (nN[2] > 0.4) {
      const px = (p2[0][0] + p2[1][0] + p2[2][0]) / 3;

      const py = (p2[0][1] + p2[1][1] + p2[2][1]) / 3;

      const fontSize = nN[2] > 0.7 ? 22 : nN[2] > 0.5 ? 16 : 11;

      ctx.font = `600 ${fontSize}px Georgia, serif`;

      ctx.fillStyle = 'rgb(240, 236, 209)';

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.save();

      ctx.translate(px, py);

      const angle = Math.atan2(p2[1][1] - p2[0][1], p2[1][0] - p2[0][0]);

      ctx.rotate(angle);

      ctx.restore();

      ctx.fillText(FACE_NUMS[i].toString(), px, py);
    }
  }
  ctx.globalAlpha = 1;
  drawSparkles(diceCanvasRef, sparklesRef);
};
