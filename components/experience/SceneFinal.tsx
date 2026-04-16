'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';

export default function SceneFinal() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(line1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(line3Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(signatureRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        '-=0.2'
      )
      .add(() => setTimeout(() => setShowReplay(true), 800), '+=0.5');

    return () => { tl.kill(); };
  }, []);

  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a003a 0%, #0a0018 40%, #050010 100%)',
      }}
    >
      <ParticleCanvas mode="stars" density={1.5} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,110,180,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <div ref={line1Ref} className="opacity-0 mb-6">
          <p
            className="text-white/30 tracking-[0.6em] uppercase"
            style={{ fontSize: '0.7rem', fontWeight: 300 }}
          >
            flashback
          </p>
        </div>

        <div ref={line2Ref} className="opacity-0 mb-4">
          <motion.h1
            animate={{
              textShadow: [
                '0 0 40px rgba(255,110,180,0.4)',
                '0 0 70px rgba(255,110,180,0.6)',
                '0 0 40px rgba(255,110,180,0.4)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 200,
              letterSpacing: '0.05em',
              lineHeight: 1.4,
            }}
          >
            Some moments are meant to be remembered forever
            <br />
            
          </motion.h1>
        </div>

        <div ref={line3Ref} className="opacity-0 mb-12">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#ff6eb4',
              fontWeight: 200,
              textShadow: '0 0 20px rgba(255,110,180,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            I hope this year brings you peace growth and happiness Happy Birthday 🎂✨
          </motion.span>
        </div>

        <div ref={signatureRef} className="opacity-0">
          <div
            className="px-10 py-8 rounded-3xl text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,110,180,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(192,132,252,0.08)',
            }}
          >
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">That's all… just a quiet wish 🙂
</p>
            <motion.p
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,110,180,0.4)',
                  '0 0 40px rgba(255,110,180,0.7)',
                  '0 0 20px rgba(255,110,180,0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                color: '#ff6eb4',
                fontWeight: 200,
                letterSpacing: '0.15em',
              }}
            >
              Javascript
            </motion.p>
            <p style={{ fontSize: '1.8rem', marginTop: '0.3rem' }}>🎀</p>
            <p className="text-white/20 text-xs tracking-widest mt-4" style={{ fontStyle: 'italic' }}>
              22nd Birthday — 17-April-2026
            </p>
          </div>
        </div>

        {showReplay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-14 flex flex-col items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,110,180,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReplay}
              className="px-8 py-3 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white/70 transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '2px',
                backdropFilter: 'blur(10px)',
              }}
            >
              Relive The Memory
            </motion.button>
          </motion.div>
        )}
      </div>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            left: `${10 + i * 11}%`,
            bottom: `${10 + (i % 3) * 15}%`,
            width: '3px',
            height: '3px',
            background: i % 2 === 0 ? '#ff6eb4' : '#c084fc',
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff6eb4' : '#c084fc'}`,
          }}
        />
      ))}
    </div>
  );
}
