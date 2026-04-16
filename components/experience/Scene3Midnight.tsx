'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import FireworksCanvas from '../effects/FireworksCanvas';
import { SceneProps } from '@/lib/scene-types';

export default function Scene3Midnight({ onNext }: SceneProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [lightRaysVisible, setLightRaysVisible] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
    )
      .fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

    const timer1 = setTimeout(() => setFireworksActive(true), 400);
    const timer2 = setTimeout(() => setLightRaysVisible(true), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      tl.kill();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1a0050 0%, #0a0020 40%, #050010 100%)',
      }}
    >
      <ParticleCanvas mode="stars" density={2} />
      <ParticleCanvas mode="confetti" density={1.5} />
      <FireworksCanvas active={fireworksActive} />

      {lightRaysVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.15, 0.08, 0.15], scaleY: [0, 1] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 1,
              }}
              className="absolute bottom-0 origin-bottom"
              style={{
                left: `${15 + i * 14}%`,
                width: '2px',
                height: '70%',
                background: `linear-gradient(to top, ${
                  ['#ff6eb4', '#c084fc', '#ffd700', '#60a5fa', '#ff6eb4', '#ffd700'][i]
                }, transparent)`,
                filter: 'blur(8px)',
                transform: `rotate(${(i - 2.5) * 8}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div ref={titleRef} className="text-center opacity-0">
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-pink-300/70 tracking-[0.5em] text-xs uppercase mb-6"
            style={{ textShadow: '0 0 20px rgba(255,110,180,0.5)' }}
          >
            It is now
          </motion.p>

          <motion.h1
            animate={{
              textShadow: [
                '0 0 40px rgba(255,110,180,0.6), 0 0 80px rgba(255,110,180,0.3)',
                '0 0 60px rgba(255,110,180,0.9), 0 0 120px rgba(255,110,180,0.5)',
                '0 0 40px rgba(255,110,180,0.6), 0 0 80px rgba(255,110,180,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 200,
              letterSpacing: '0.15em',
              color: '#ff6eb4',
              lineHeight: 1.1,
            }}
          >
            12:00
          </motion.h1>

          <div
            className="mt-4 text-white/20 tracking-[0.3em] text-sm uppercase"
            style={{ fontWeight: 200 }}
          >
            Midnight
          </div>
        </div>

        <div ref={subRef} className="opacity-0 mt-12 text-center">
          <motion.div
            className="relative px-8 py-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,110,180,0.2)',
              boxShadow: '0 0 40px rgba(255,110,180,0.1)',
            }}
          >
            <p
              className="text-white/80 tracking-wide"
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                fontWeight: 200,
              }}
            >
              Happy 22nd Birthday
            </p>
            <p
              className="mt-2 tracking-[0.2em]"
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                color: '#ff6eb4',
                fontWeight: 300,
                textShadow: '0 0 20px rgba(255,110,180,0.5)',
              }}
            >
              Javascript
            </p>
            <span className="text-2xl">🎀</span>
          </motion.div>
        </div>

        <div ref={btnRef} className="opacity-0 mt-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,110,180,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-10 py-4 text-sm tracking-[0.3em] uppercase text-white/90 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,110,180,0.2), rgba(192,132,252,0.2))',
              border: '1px solid rgba(255,110,180,0.4)',
              borderRadius: '4px',
              backdropFilter: 'blur(10px)',
            }}
          >
            Continue
          </motion.button>
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,110,180,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
