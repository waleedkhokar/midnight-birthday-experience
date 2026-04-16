'use client';

import { useEffect, useRef } from 'react';

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  gravity: number;
  trail: { x: number; y: number }[];
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  color: string;
  particles: FireworkParticle[];
  trail: { x: number; y: number }[];
}

const FIREWORK_COLORS = [
  '#ff6eb4', '#ffd700', '#c084fc', '#60a5fa',
  '#f472b6', '#fb923c', '#a78bfa', '#34d399',
  '#ff4488', '#ffcc00', '#00d4ff',
];

export default function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const rafRef = useRef<number>(0);
  const lastLaunchRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createExplosion = (fw: Firework) => {
      const count = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 5 + 2;
        fw.particles.push({
          x: fw.x,
          y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: fw.color,
          radius: Math.random() * 2 + 1,
          gravity: 0.08,
          trail: [],
        });
      }
    };

    const launchFirework = () => {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const targetY = canvas.height * (0.1 + Math.random() * 0.35);
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      fireworksRef.current.push({
        x,
        y: canvas.height,
        targetY,
        vy: -15 - Math.random() * 5,
        exploded: false,
        color,
        particles: [],
        trail: [],
      });
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(10, 0, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (active && time - lastLaunchRef.current > 400) {
        const burst = Math.floor(Math.random() * 3) + 1;
        for (let b = 0; b < burst; b++) {
          setTimeout(launchFirework, b * 100);
        }
        lastLaunchRef.current = time;
      }

      fireworksRef.current = fireworksRef.current.filter((fw) => {
        if (!fw.exploded) {
          fw.trail.push({ x: fw.x, y: fw.y });
          if (fw.trail.length > 8) fw.trail.shift();

          fw.trail.forEach((t, i) => {
            ctx.globalAlpha = (i / fw.trail.length) * 0.6;
            ctx.fillStyle = fw.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 2 - (i / fw.trail.length) * 1.5, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.globalAlpha = 1;
          ctx.fillStyle = fw.color;
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 15;
          ctx.shadowColor = fw.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          fw.y += fw.vy;
          fw.vy += 0.3;

          if (fw.y <= fw.targetY) {
            fw.exploded = true;
            createExplosion(fw);
          }
          return true;
        } else {
          fw.particles = fw.particles.filter((p) => {
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 4) p.trail.shift();

            p.trail.forEach((t, i) => {
              ctx.globalAlpha = (i / p.trail.length) * p.alpha * 0.4;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(t.x, t.y, p.radius * 0.5, 0, Math.PI * 2);
              ctx.fill();
            });

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.alpha -= 0.015;

            return p.alpha > 0;
          });

          return fw.particles.length > 0;
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
