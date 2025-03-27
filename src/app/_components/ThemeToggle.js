'use client';

import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-xl w-16 h-8 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 glass-effect"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(124, 58, 237, 0.15)'
      }}
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm" />
      </div>
      <div
        className={`absolute left-1 w-6 h-6 rounded-lg transform transition-all duration-500 ${
          theme === 'dark' ? 'translate-x-7 bg-secondary-400' : 'translate-x-0 bg-primary-400'
        } shadow-lg flex items-center justify-center`}
      >
        <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'}</span>
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}