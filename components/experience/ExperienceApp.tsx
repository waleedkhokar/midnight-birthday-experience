'use client';

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneId } from '@/lib/scene-types';
import Scene1Door from './Scene1Door';
import Scene2Countdown from './Scene2Countdown';
import Scene3Midnight from './Scene3Midnight';
import Scene4Lights from './Scene4Lights';
import Scene5Cake from './Scene5Cake';
import Scene6Wishes from './Scene6Wishes';
import SceneFinal from './SceneFinal';
import AudioController from '../effects/AudioController';

const SCENE_ORDER: SceneId[] = [
  'door',
  'countdown',
  'midnight',
  'lights',
  'cake',
  'wishes',
  'final',
];

const SCENE_LABELS: Record<SceneId, string> = {
  door: 'Entry',
  countdown: 'Countdown',
  midnight: 'Midnight',
  lights: 'Celebration',
  cake: 'Ceremony',
  wishes: 'Wishes',
  final: 'Memory',
};

export default function ExperienceApp() {
  const [currentScene, setCurrentScene] = useState<SceneId>('door');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  const goToNextScene = useCallback(() => {
    const currentIndex = SCENE_ORDER.indexOf(currentScene);
    if (currentIndex < SCENE_ORDER.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(SCENE_ORDER[currentIndex + 1]);
        setIsTransitioning(false);
      }, 400);
    }
  }, [currentScene]);

  const currentIndex = SCENE_ORDER.indexOf(currentScene);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#050010', fontFamily: "'Inter', sans-serif" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {currentScene === 'door' && <Scene1Door onNext={goToNextScene} />}
          {currentScene === 'countdown' && <Scene2Countdown onNext={goToNextScene} />}
          {currentScene === 'midnight' && <Scene3Midnight onNext={goToNextScene} />}
          {currentScene === 'lights' && <Scene4Lights onNext={goToNextScene} />}
          {currentScene === 'cake' && <Scene5Cake onNext={goToNextScene} />}
          {currentScene === 'wishes' && <Scene6Wishes onNext={goToNextScene} />}
          {currentScene === 'final' && <SceneFinal />}
        </motion.div>
      </AnimatePresence>

      {currentScene !== 'door' && currentScene !== 'final' && (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {SCENE_ORDER.slice(1, -1).map((scene, i) => {
              const idx = i + 1;
              const isDone = idx < currentIndex;
              const isCurrent = scene === currentScene;
              return (
                <div key={scene} className="flex items-center gap-2">
                  <div
                    className="transition-all duration-500"
                    style={{
                      width: isCurrent ? '24px' : '6px',
                      height: '4px',
                      borderRadius: '2px',
                      background: isCurrent
                        ? '#ff6eb4'
                        : isDone
                        ? 'rgba(255,110,180,0.4)'
                        : 'rgba(255,255,255,0.1)',
                    }}
                  />
                  {isCurrent && (
                    <span
                      className="text-white/40 transition-all duration-300"
                      style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    >
                      {SCENE_LABELS[scene]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

  <AudioController />

      {isTransitioning && (
        <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      )}
    </div>
  );
}
