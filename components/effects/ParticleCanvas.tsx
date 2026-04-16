'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  twinkle: number;
  twinkleSpeed: number;
}

interface ParticleCanvasProps {
  mode: 'stars' | 'confetti' | 'fog';
  density?: number;
}

const STAR_COLORS = ['#ffffff', '#ffe4f3', '#ffd6f9', '#c8b4ff', '#ffd700'];
const CONFETTI_COLORS = ['#ff6eb4', '#ffd700', '#c084fc', '#60a5fa', '#34d399', '#fb923c'];

export default function ParticleCanvas({ mode, density = 1 }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / (mode === 'stars' ? 3000 : 6000) * density);
      particlesRef.current = Array.from({ length: count }, () => createParticle(canvas));
    };

    const createParticle = (canvas: HTMLCanvasElement): Particle => {
      if (mode === 'stars') {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.05,
          radius: Math.random() * 1.8 + 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        };
      } else if (mode === 'confetti') {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 0.5,
          radius: Math.random() * 4 + 2,
          alpha: Math.random() * 0.9 + 0.1,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
        };
      } else {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.3,
          vy: (Math.random() - 0.5) * 0.1,
          radius: Math.random() * 80 + 40,
          alpha: Math.random() * 0.06 + 0.01,
          color: '#a78bfa',
          twinkle: 0,
          twinkleSpeed: 0,
        };
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;

        if (mode === 'confetti' && p.y > canvas.height + 10) {
          particlesRef.current[i] = createParticle(canvas);
          particlesRef.current[i].y = -10;
        }
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        if (p.y < -100 && mode !== 'confetti') p.y = canvas.height + 100;
        if (p.y > canvas.height + 100 && mode !== 'confetti') p.y = -100;

        ctx.save();
        if (mode === 'stars') {
          const twinkleAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle));
          ctx.globalAlpha = twinkleAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          if (p.radius > 1) {
            ctx.globalAlpha = twinkleAlpha * 0.3;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
            grd.addColorStop(0, p.color);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fill();
          }
        } else if (mode === 'confetti') {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.twinkle);
          ctx.fillRect(-p.radius / 2, -p.radius / 2, p.radius, p.radius * 0.4);
          ctx.restore();
        } else {
          ctx.globalAlpha = p.alpha;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grd.addColorStop(0, p.color);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mode, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
