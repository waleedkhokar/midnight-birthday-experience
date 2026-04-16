'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sound.webm');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    audioRef.current.play().catch(err => {
      console.log('Auto-play failed:', err);
      setIsPlaying(false);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Currently playing -> STOP it
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Currently stopped -> PLAY it
      audioRef.current.play().catch(err => {
        console.log('Play failed:', err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:scale-105 transition-all duration-300 group"
      aria-label={isPlaying ? 'Stop Music' : 'Play Music'}
    >
      {isPlaying ? (
        // SHOW STOP ICON (square) when music IS playing
        <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="1" />
        </svg>
      ) : (
        // SHOW PLAY ICON (triangle) when music IS stopped
        <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}