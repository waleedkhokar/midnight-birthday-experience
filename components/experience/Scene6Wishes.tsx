'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import { SceneProps } from '@/lib/scene-types';

const WISHES = [
  {
    text: 'Wishing you peace, happiness and perfect clarity',
    sub: 'May every day bring you something beautiful',
    icon: '🌙',
    color: 'rgba(192,132,252,0.12)',
    border: 'rgba(192,132,252,0.25)',
    glow: 'rgba(192,132,252,0.15)',
  },
  {
    text: 'May your journey always grow beautifully',
    sub: 'Every step forward is a story worth telling',
    icon: '🌱',
    color: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.2)',
    glow: 'rgba(52,211,153,0.12)',
  },
  {
    text: 'Stay strong and keep achieving your dreams',
    sub: 'You are capable of far more than you know',
    icon: '✨',
    color: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.2)',
    glow: 'rgba(251,191,36,0.12)',
  },
  {
    text: 'May love, laughter and light follow you everywhere',
    sub: 'The world is brighter because you exist in it',
    icon: '💗',
    color: 'rgba(244,114,182,0.12)',
    border: 'rgba(244,114,182,0.25)',
    glow: 'rgba(244,114,182,0.15)',
  },
  {
    text: 'Happy Birthday, Javascript',
    sub: 'Year 22 — your most beautiful chapter yet',
    icon: '🎂',
    color: 'rgba(255,110,180,0.12)',
    border: 'rgba(255,110,180,0.3)',
    glow: 'rgba(255,110,180,0.2)',
  },
];

export default function Scene6Wishes({ onNext }: SceneProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [allVisible, setAllVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    WISHES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, i]);
        if (i === WISHES.length - 1) {
          setTimeout(() => setAllVisible(true), 800);
        }
      }, 600 + i * 500);
    });
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060010 0%, #0d001e 50%, #1a0035 100%)',
      }}
    >
      <ParticleCanvas mode="stars" density={1.2} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(192,132,252,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 overflow-y-auto z-10">
        <div className="min-h-full flex flex-col items-center py-20 px-4">
          <h2
            ref={titleRef}
            className="text-center mb-16 opacity-0"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            Wishes & Duas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
            {WISHES.map((wish, i) => (
              <AnimatePresence key={i}>
                {visibleCards.includes(i) && (
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={i === 4 ? 'md:col-span-2' : ''}
                  >
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        boxShadow: [
                          `0 0 20px ${wish.glow}`,
                          `0 0 35px ${wish.glow}`,
                          `0 0 20px ${wish.glow}`,
                        ],
                      }}
                      transition={{
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      whileHover={{ scale: 1.02, y: -8 }}
                      className="relative p-6 rounded-2xl cursor-default select-none"
                      style={{
                        background: wish.color,
                        border: `1px solid ${wish.border}`,
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0" role="img">{wish.icon}</span>
                        <div>
                          <p
                            className="text-white/90 leading-relaxed"
                            style={{ fontWeight: 200, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                          >
                            {wish.text}
                          </p>
                          <p
                            className="mt-2 text-white/40"
                            style={{ fontSize: '0.8rem', fontStyle: 'italic' }}
                          >
                            {wish.sub}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {allVisible && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-16 text-center flex flex-col items-center gap-4"
            >
              <motion.p
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white/40 text-xs tracking-[0.4em] uppercase"
              >
                One final scene awaits
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,110,180,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-10 py-4 text-sm tracking-[0.3em] uppercase text-white/80"
                style={{
                  background: 'rgba(255,110,180,0.08)',
                  border: '1px solid rgba(255,110,180,0.3)',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                The Final Moment
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
