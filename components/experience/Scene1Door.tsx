'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import { SceneProps } from '@/lib/scene-types';

export default function Scene1Door({ onNext }: SceneProps) {
  const doorRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({
      onComplete: onNext,
    });

    tl.to(doorLeftRef.current, {
      rotateY: -110,
      duration: 1.8,
      ease: 'power3.inOut',
    }, 0)
      .to(doorRightRef.current, {
        rotateY: 110,
        duration: 1.8,
        ease: 'power3.inOut',
      }, 0)
      .to('.door-glow', {
        opacity: 1,
        scale: 1.5,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.3)
      .to(doorRef.current, {
        scale: 1.8,
        duration: 1.8,
        ease: 'power3.inOut',
      }, 0.2)
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.in',
      }, 1.5);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060010]">
      <ParticleCanvas mode="fog" density={0.8} />
      <ParticleCanvas mode="stars" density={0.6} />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-pink-300/60 tracking-[0.4em] text-xs uppercase mb-3">A Midnight Memory</p>
          <h1 className="text-white/20 tracking-[0.2em] text-sm uppercase">Interactive Birthday Experience</h1>
        </motion.div>

        <div
          ref={doorRef}
          className="relative"
          style={{ perspective: '1200px' }}
        >
          <div
            className="door-glow absolute inset-0 opacity-0 rounded-lg"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,110,180,0.6) 0%, rgba(192,132,252,0.3) 40%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'scale(1)',
            }}
          />

          <div
            className="relative flex"
            style={{
              width: '200px',
              height: '320px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute inset-0 rounded-t-full border border-white/10"
              style={{
                background: 'linear-gradient(180deg, #1a0030 0%, #0d0018 100%)',
                boxShadow: 'inset 0 0 40px rgba(192,132,252,0.1), 0 0 60px rgba(192,132,252,0.15)',
              }}
            />

            <div
              ref={doorLeftRef}
              className="absolute left-0 top-0 bottom-0 w-1/2 origin-left"
              style={{
                background: 'linear-gradient(180deg, #2d0050 0%, #1a0030 50%, #0d001e 100%)',
                borderRight: '1px solid rgba(192,132,252,0.2)',
                boxShadow: 'inset 2px 0 15px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                borderRadius: '0',
              }}
            >
              <div className="absolute inset-2 border border-pink-500/10 rounded-sm" />
              <div className="absolute inset-6 border border-pink-500/5 rounded-sm" />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: 'radial-gradient(circle, #ffd700, #ff8c00)', boxShadow: '0 0 8px #ffd700' }}
              />
            </div>

            <div
              ref={doorRightRef}
              className="absolute right-0 top-0 bottom-0 w-1/2 origin-right"
              style={{
                background: 'linear-gradient(180deg, #2d0050 0%, #1a0030 50%, #0d001e 100%)',
                borderLeft: '1px solid rgba(192,132,252,0.2)',
                boxShadow: 'inset -2px 0 15px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-2 border border-pink-500/10 rounded-sm" />
              <div className="absolute inset-6 border border-pink-500/5 rounded-sm" />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: 'radial-gradient(circle, #ffd700, #ff8c00)', boxShadow: '0 0 8px #ffd700' }}
              />
            </div>

            <div className="absolute -inset-x-8 -top-2 h-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent blur-sm" />
            <div className="absolute -inset-x-8 -bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm" />
          </div>

          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'radial-gradient(ellipse, rgba(192,132,252,0.4) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <motion.button
            onClick={handleEnter}
            disabled={isOpening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 text-sm tracking-[0.3em] uppercase font-light text-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,110,180,0.4)',
              borderRadius: '2px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.span
              className="absolute inset-0"
              animate={{ boxShadow: ['0 0 15px rgba(255,110,180,0.2)', '0 0 30px rgba(255,110,180,0.4)', '0 0 15px rgba(255,110,180,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ borderRadius: '2px' }}
            />
            {isOpening ? 'Opening...' : 'Enter Experience'}
          </motion.button>

          <motion.p
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-white/25 text-xs tracking-widest"
          >
            For Javascript
          </motion.p>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(192,132,252,0.08) 0%, transparent 60%)',
        }}
      />

      <div ref={overlayRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50" />
    </div>
  );
}
