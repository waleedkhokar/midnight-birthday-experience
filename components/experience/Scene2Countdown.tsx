'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import { SceneProps } from '@/lib/scene-types';

const TIME_SEQUENCE = [
  { h: '11', m: '57' },
  { h: '11', m: '58' },
  { h: '11', m: '59' },
  { h: '12', m: '00' },
];

export default function Scene2Countdown({ onNext }: SceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);

  const animateDigit = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.fromTo(el,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  };

  useEffect(() => {
    if (!started) return;
    
    // 1 second delay between each count (1000ms)
    const delay = 1000;
    
    intervalRef.current = setTimeout(() => {
      if (currentIndex < TIME_SEQUENCE.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        animateDigit(hourRef.current);
        animateDigit(minRef.current);
        
        // Screen vibration at 11:59 (index 2)
        if (currentIndex === 2) {
          gsap.to(containerRef.current, {
            x: '+=2',
            yoyo: true,
            repeat: 8,
            duration: 0.05,
            ease: 'none',
          });
        }
      } else {
        setIsFlashing(true);
        setTimeout(() => {
          gsap.to(flashRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              setTimeout(onNext, 200);
            },
          });
        }, 500);
      }
    }, delay);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [started, currentIndex, onNext]);

  const currentTime = TIME_SEQUENCE[currentIndex];
  const isMidnight = currentIndex === TIME_SEQUENCE.length - 1;
  const isNearMidnight = currentIndex >= 2; // 11:59 and 12:00

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060010 0%, #0d0018 50%, #1a0030 100%)',
      }}
    >
      <ParticleCanvas mode="stars" density={0.8} />

      <div
        className="absolute inset-0"
        style={{
          background: isNearMidnight
            ? 'radial-gradient(ellipse at center, rgba(255,110,180,0.08) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(192,132,252,0.05) 0%, transparent 60%)',
          transition: 'background 2s ease',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white/50 tracking-[0.5em] text-xs uppercase mb-16"
        >
          {isMidnight ? 'It is time...' : 'The final moments'}
        </motion.p>

        <div
          className="relative p-12 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isMidnight ? 'rgba(255,110,180,0.5)' : 'rgba(192,132,252,0.15)'}`,
            boxShadow: isMidnight
              ? '0 0 60px rgba(255,110,180,0.3), inset 0 0 40px rgba(255,110,180,0.05)'
              : '0 0 40px rgba(192,132,252,0.1), inset 0 0 20px rgba(192,132,252,0.02)',
            transition: 'all 1s ease',
          }}
        >
          <div className="flex items-center gap-4">
            <div ref={hourRef} className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTime.h}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="font-light tracking-widest"
                  style={{
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    color: isMidnight ? '#ff6eb4' : '#ffffff',
                    textShadow: isMidnight
                      ? '0 0 40px rgba(255,110,180,0.8), 0 0 80px rgba(255,110,180,0.4)'
                      : '0 0 20px rgba(255,255,255,0.3)',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'color 0.5s, text-shadow 0.5s',
                  }}
                >
                  {currentTime.h}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.span
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                color: isMidnight ? '#ff6eb4' : '#ffffff',
                textShadow: isMidnight ? '0 0 20px rgba(255,110,180,0.8)' : 'none',
                fontWeight: 200,
                lineHeight: 1,
                transition: 'color 0.5s',
              }}
            >
              :
            </motion.span>

            <div ref={minRef} className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTime.m}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="font-light tracking-widest"
                  style={{
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    color: isMidnight ? '#ff6eb4' : '#ffffff',
                    textShadow: isMidnight
                      ? '0 0 40px rgba(255,110,180,0.8), 0 0 80px rgba(255,110,180,0.4)'
                      : '0 0 20px rgba(255,255,255,0.3)',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'color 0.5s, text-shadow 0.5s',
                  }}
                >
                  {currentTime.m}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-1">
            {TIME_SEQUENCE.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i <= currentIndex ? '20px' : '6px',
                  height: '4px',
                  background: i <= currentIndex
                    ? (isMidnight ? '#ff6eb4' : 'rgba(192,132,252,0.8)')
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isMidnight ? (
            <motion.p
              key="midnight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 text-pink-300 tracking-[0.4em] text-sm uppercase"
              style={{ textShadow: '0 0 20px rgba(255,110,180,0.6)' }}
            >
              Happy Birthday
            </motion.p>
          ) : (
            <motion.div key="waiting" className="mt-12 text-center">
              {!started ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setStarted(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 text-xs tracking-[0.3em] uppercase text-white/80 hover:text-white transition-colors"
                  style={{
                    border: '1px solid rgba(192,132,252,0.3)',
                    borderRadius: '2px',
                    background: 'rgba(192,132,252,0.05)',
                  }}
                >
                  Begin The Journey
                </motion.button>
              ) : (
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white/40 text-xs tracking-[0.4em] uppercase"
                >
                  Counting down...
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isNearMidnight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,110,180,0.12) 0%, transparent 70%)',
          }}
        />
      )}

      <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50" />
    </motion.div>
  );
}