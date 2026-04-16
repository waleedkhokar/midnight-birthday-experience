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
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
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
      aria-label={isPlaying ? 'Mute' : 'Play'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3z M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z M18 12c0-2.83-1.5-5.33-4-6.68v13.36c2.5-1.35 4-3.85 4-6.68z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3z M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z M18 12c0-2.83-1.5-5.33-4-6.68v13.36c2.5-1.35 4-3.85 4-6.68z M19 8l-6 6 M13 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
}