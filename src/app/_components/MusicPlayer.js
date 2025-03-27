'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { musicConfig } from './ThemeConfig';

export default function MusicPlayer() {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio(musicConfig.background[theme]) : null);

  useEffect(() => {
    if (audio) {
      audio.volume = musicConfig.volume;
      audio.loop = true;
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  useEffect(() => {
    if (audio) {
      audio.src = musicConfig.background[theme];
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [theme, audio]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-4 right-4 p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/80 text-white hover:bg-gray-700/80' : 'bg-white/80 text-gray-800 hover:bg-gray-100/80'} border border-purple-500/30 shadow-lg`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <span className="text-xl">{isPlaying ? '🎵' : '🔇'}</span>
    </button>
  );
}