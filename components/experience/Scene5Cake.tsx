'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleCanvas from '../effects/ParticleCanvas';
import { SceneProps } from '@/lib/scene-types';

type CakePhase = 'appearing' | 'viewing' | 'cutting' | 'cut' | 'celebrating';

export default function Scene5Cake({ onNext }: SceneProps) {
  const [phase, setPhase] = useState<CakePhase>('appearing');
  const [flameVisible, setFlameVisible] = useState(true);
  const cakeRef = useRef<HTMLDivElement>(null);
  const sliceRef = useRef<HTMLDivElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(cakeRef.current,
      { opacity: 0, y: 60, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out',
        onComplete: () => setPhase('viewing') }
    );
    return () => { tl.kill(); };
  }, []);

  const handleCut = () => {
    if (phase !== 'viewing') return;
    setPhase('cutting');

    const tl = gsap.timeline();
    tl.fromTo(knifeRef.current,
      { opacity: 0, y: -80, rotate: -20 },
      { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: 'power2.inOut' }
    )
      .to(knifeRef.current,
        { y: 40, duration: 0.4, ease: 'power3.in' }
      )
      .to(knifeRef.current,
        { opacity: 0, duration: 0.3 }
      )
      .add(() => {
        setFlameVisible(false);
        setPhase('cut');
        gsap.fromTo(sliceRef.current,
          { x: 0, rotate: 0 },
          { x: 30, rotate: 8, duration: 0.5, ease: 'power2.out' }
        );
      })
      .add(() => {
        setTimeout(() => setPhase('celebrating'), 600);
      }, '+=0.2');
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060010 0%, #100020 40%, #1a0035 100%)',
      }}
    >
      <ParticleCanvas mode="stars" density={0.7} />
      {phase === 'celebrating' && <ParticleCanvas mode="confetti" density={1.5} />}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(192,132,252,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white/40 tracking-[0.5em] text-xs uppercase mb-12"
        >
          {phase === 'celebrating' ? 'Make a wish...' : 'The cake is ready'}
        </motion.p>

        <div ref={cakeRef} className="relative opacity-0 flex flex-col items-center">
          <div className="relative flex flex-col items-center" style={{ filter: 'drop-shadow(0 20px 40px rgba(192,132,252,0.3))' }}>

            <div className="flex gap-3 mb-2 z-10 relative">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {flameVisible && (
                    <motion.div
                      animate={{
                        scaleY: [1, 1.3, 0.9, 1.2, 1],
                        scaleX: [1, 0.8, 1.1, 0.9, 1],
                        x: [0, 1, -1, 0.5, 0],
                      }}
                      transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, repeatType: 'mirror' }}
                      className="relative"
                      style={{ width: '10px', height: '20px' }}
                    >
                      <div
                        className="absolute inset-0 rounded-full rounded-b-none"
                        style={{
                          background: 'linear-gradient(to bottom, #fff7e6 0%, #ffd700 30%, #ff8c00 70%, transparent 100%)',
                          boxShadow: '0 0 8px #ffd700, 0 0 15px rgba(255,200,0,0.6)',
                          filter: 'blur(0.5px)',
                        }}
                      />
                    </motion.div>
                  )}
                  <div
                    className="w-[3px] rounded-full"
                    style={{
                      height: '35px',
                      background: `linear-gradient(to bottom, ${
                        ['#ff6eb4', '#c084fc', '#60a5fa', '#fbbf24', '#34d399'][i]
                      }, rgba(255,255,255,0.3))`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="relative" style={{ width: '220px' }}>
              <div
                className="w-full rounded-t-3xl overflow-hidden"
                style={{
                  height: '60px',
                  background: 'linear-gradient(180deg, #fce7f3 0%, #f9a8d4 50%, #ec4899 100%)',
                  boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex gap-1 p-2 flex-wrap">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      className="rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        background: ['#ffd700', '#c084fc', '#60a5fa', '#34d399', '#fb923c'][i % 5],
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="w-full"
                style={{
                  height: '50px',
                  background: 'linear-gradient(180deg, #f3e8ff 0%, #e9d5ff 50%, #d8b4fe 100%)',
                  borderLeft: '3px solid rgba(255,255,255,0.3)',
                  borderRight: '3px solid rgba(0,0,0,0.1)',
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <span
                    className="text-purple-700 font-light tracking-widest text-xs uppercase"
                    style={{ fontSize: '10px' }}
                  >
                    Happy Birthday
                  </span>
                </div>
              </div>

              <div
                ref={sliceRef}
                className="absolute right-0 top-0 bottom-0"
                style={{
                  width: '50px',
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.05), rgba(255,255,255,0.1))',
                  borderLeft: phase === 'cut' ? '2px solid rgba(255,255,255,0.6)' : 'none',
                }}
              />

              <div
                className="w-full rounded-b-2xl"
                style={{
                  height: '70px',
                  background: 'linear-gradient(180deg, #fde68a 0%, #fbbf24 40%, #d97706 100%)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                }}
              >
                <div className="h-full flex flex-col justify-center px-4">
                  {[0, 1].map((row) => (
                    <div key={row} className="flex gap-2 my-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full"
                          style={{
                            width: '5px',
                            height: '5px',
                            background: ['#f9a8d4', '#c084fc', '#60a5fa'][i % 3],
                            opacity: 0.7,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="rounded-full mt-1"
              style={{
                width: '240px',
                height: '14px',
                background: 'linear-gradient(180deg, #a16207, #78350f)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {(phase === 'viewing' || phase === 'cutting') && (
            <div ref={knifeRef} className="absolute -top-8 right-8 opacity-0">
              <div style={{ transform: 'rotate(30deg)' }}>
                <div
                  className="rounded-sm"
                  style={{
                    width: '4px',
                    height: '70px',
                    background: 'linear-gradient(to bottom, #e2e8f0, #94a3b8)',
                    boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
                  }}
                />
                <div
                  className="rounded-b-full"
                  style={{
                    width: '4px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
                    marginTop: '-2px',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {phase === 'viewing' && (
              <motion.div
                key="cut-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,110,180,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCut}
                  className="px-10 py-4 text-sm tracking-[0.3em] uppercase text-white/90"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,110,180,0.2), rgba(192,132,252,0.2))',
                    border: '1px solid rgba(255,110,180,0.4)',
                    borderRadius: '4px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Cut The Cake
                </motion.button>
              </motion.div>
            )}

            {phase === 'celebrating' && (
              <motion.div
                key="celebrate"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center flex flex-col items-center gap-4"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-pink-300 text-xl tracking-wide"
                  style={{ textShadow: '0 0 20px rgba(255,110,180,0.6)', fontWeight: 200 }}
                >
                  Make a wish!
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-x-0 bottom-0 h-60 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(192,132,252,0.08) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
