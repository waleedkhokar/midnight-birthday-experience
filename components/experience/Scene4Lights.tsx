'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import { SceneProps } from '@/lib/scene-types';

const LIGHTS = [
  { color: '#fbbf24', name: 'Amber', shadow: 'rgba(251,191,36,0.6)', pos: { x: '15%', y: '20%' } },
  { color: '#f472b6', name: 'Rose', shadow: 'rgba(244,114,182,0.6)', pos: { x: '80%', y: '15%' } },
  { color: '#c084fc', name: 'Violet', shadow: 'rgba(192,132,252,0.6)', pos: { x: '10%', y: '65%' } },
  { color: '#60a5fa', name: 'Blue', shadow: 'rgba(96,165,250,0.6)', pos: { x: '85%', y: '60%' } },
  { color: '#fb923c', name: 'Orange', shadow: 'rgba(251,146,60,0.6)', pos: { x: '50%', y: '10%' } },
  { color: '#34d399', name: 'Emerald', shadow: 'rgba(52,211,153,0.6)', pos: { x: '45%', y: '80%' } },
];

const MESSAGES = [
  "Not every connection needs words",
  "Some people just stay quietly",
  "You're one of them"
];

export default function Scene4Lights({ onNext }: SceneProps) {
  const [lightsOn, setLightsOn] = useState(false);
  const [activeLights, setActiveLights] = useState<number[]>([]);
  const [showContinue, setShowContinue] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTurnOn = () => {
    setLightsOn(true);
    gsap.to(containerRef.current, {
      backgroundColor: '#0d0020',
      duration: 1,
      ease: 'power2.inOut',
    });

    LIGHTS.forEach((_, i) => {
      setTimeout(() => {
        setActiveLights((prev) => [...prev, i]);
      }, i * 280);
    });

    setTimeout(() => setShowContinue(true), LIGHTS.length * 280 + 800);
  };

  // Show messages one by one after lights are on
  useEffect(() => {
    if (showContinue) {
      MESSAGES.forEach((_, index) => {
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, index]);
        }, index * 2000); // 2 seconds between each message
      });
    }
  }, [showContinue]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#050010' }}
    >
      <ParticleCanvas mode="stars" density={0.6} />

      {LIGHTS.map((light, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={activeLights.includes(i) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute pointer-events-none"
          style={{
            left: light.pos.x,
            top: light.pos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            animate={activeLights.includes(i) ? {
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            className="rounded-full"
            style={{
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${light.color}40 0%, ${light.color}15 40%, transparent 70%)`,
              filter: 'blur(30px)',
              boxShadow: `0 0 80px ${light.shadow}`,
            }}
          />
          <motion.div
            animate={activeLights.includes(i) ? {
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: light.color,
              boxShadow: `0 0 20px ${light.shadow}, 0 0 40px ${light.shadow}`,
            }}
          />
        </motion.div>
      ))}

      {activeLights.length === LIGHTS.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.05) 0%, rgba(244,114,182,0.05) 30%, rgba(192,132,252,0.05) 60%, transparent 80%)',
          }}
        />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {!lightsOn ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <p className="text-white/30 tracking-[0.5em] text-xs uppercase mb-12">
              The celebration awaits
            </p>

            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 60px rgba(255,110,180,0.6)',
              }}
              whileTap={{ scale: 0.94 }}
              onClick={handleTurnOn}
              className="relative px-12 py-5 rounded-2xl text-white font-light tracking-[0.2em] uppercase text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,110,180,0.15), rgba(192,132,252,0.15))',
                border: '1px solid rgba(255,110,180,0.4)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 30px rgba(255,110,180,0.2)',
              }}
            >
              <span className="mr-2">Turn On The Celebration</span>
              <span>✨</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: '1px solid rgba(255,110,180,0.2)',
                  transform: 'scale(1.05)',
                }}
              />
            </motion.button>
          </motion.div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-white/60 tracking-[0.4em] text-xs uppercase mb-4">
                {activeLights.length < LIGHTS.length ? 'Illuminating...' : 'The lights are on'}
              </p>
              <div className="flex gap-2 justify-center">
                {LIGHTS.map((light, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={activeLights.includes(i) ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: light.color,
                      boxShadow: `0 0 10px ${light.shadow}`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {showContinue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-12 space-y-4">
                  {MESSAGES.map((message, index) => (
                    <AnimatePresence key={index}>
                      {visibleMessages.includes(index) && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="text-pink-300/80 text-lg"
                          style={{ fontWeight: 200, letterSpacing: '0.05em' }}
                        >
                          {message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {visibleMessages.length === MESSAGES.length && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251,191,36,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="px-10 py-4 text-sm tracking-[0.3em] uppercase text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(255,110,180,0.15))',
                      border: '1px solid rgba(251,191,36,0.3)',
                      borderRadius: '4px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Continue
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}