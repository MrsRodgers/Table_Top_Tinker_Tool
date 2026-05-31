import type { Sparkle } from "./types";

export const sparkle = (
  sparklesRef: React.RefObject<Sparkle[]>,
): void => {
  const particles: Sparkle[] = [];

  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;

    const speed = 1 + Math.random() * 5;

    particles.push({
      x: 150,
      y: 160,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      life: 1,
      size: 2 + Math.random() * 4,
      hue: 45 + Math.random() * 40,
    });
  }

  sparklesRef.current = particles;
};

export const drawSparkles = (
  diceCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  sparklesRef: React.RefObject<Sparkle[]>,
): void => {
  const canvas = diceCanvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const particles = sparklesRef.current;

  for (const p of particles) {
    if (p.life <= 0) continue;

    p.x += p.vx;
    p.y += p.vy;

    p.vy += 0.04;

    p.life -= 0.02;

    ctx.beginPath();
    const radius = Math.max(0, p.size * p.life);

    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

    ctx.fillStyle = `hsla(${p.hue},100%,75%,${p.life})`;

    ctx.shadowColor = `hsla(${p.hue},100%,75%,${p.life})`;
    ctx.shadowBlur = 12;

    ctx.fill();
  }

  ctx.shadowBlur = 0;

  sparklesRef.current = particles.filter((p) => p.life > 0);
};

export const drawShadow = (
  progress: number,
  shadowCanvasRef: React.RefObject<HTMLCanvasElement | null>,
): void => {
  const canvas = shadowCanvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.clearRect(0, 0, 300, 20);

  const scale = 0.5 + 0.5 * progress;
  const alpha = 0.15 * progress;

  ctx.beginPath();

  ctx.ellipse(150, 10, 80 * scale, 8 * scale, 0, 0, Math.PI * 2);

  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.fill();
};
