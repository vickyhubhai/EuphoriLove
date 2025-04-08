"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/tone.mp3') : null);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audio]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 glass-effect py-4 px-6'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <Link href='/' className='text-xl sm:text-2xl font-bold gradient-text transition-colors'>EuphoriLove</Link>
        
        {/* Mobile menu button */}
          <button
          onClick={toggleMenu}
          className='lg:hidden p-2 rounded-lg glass-effect hover:bg-primary-500/20 transition-colors'
          aria-label='Toggle menu'
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          </button>

        {/* Desktop menu */}
        <div className='hidden lg:flex items-center space-x-6'>
          <Link href='/about' className='text-white hover:text-primary-400 transition-colors font-medium'>About</Link>
          <Link href='/features' className='text-white hover:text-primary-400 transition-colors font-medium'>Features</Link>
          <Link href='/contact' className='text-white hover:text-primary-400 transition-colors font-medium'>Contact</Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 right-0 glass-effect py-4 px-6 flex flex-col space-y-4 mt-2'>
            <Link 
              href='/about' 
              className='text-white hover:text-primary-400 transition-colors font-medium'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href='/features' 
              className='text-white hover:text-primary-400 transition-colors font-medium'
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href='/contact' 
              className='text-white hover:text-primary-400 transition-colors font-medium'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}