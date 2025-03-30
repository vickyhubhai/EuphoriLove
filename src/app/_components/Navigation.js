"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navigation = () => {
  const pathname = usePathname();
  
  // Define navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="glass-effect sticky top-0 z-50 mx-auto rounded-xl py-3 px-200 max-w-screen-lg w-full flex justify-between items-center mb-6 overflow-x-auto" suppressHydrationWarning>
      <div className="flex items-center space-x-3">
        <Image src="/heart.png" alt="logo" width={35} height={35} className="floating-icon" />
        <h1 className="text-xl font-semibold gradient-text">EuphoriLove</h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6 whitespace-nowrap">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`relative px-2 py-1 transition-all duration-300 ${pathname === item.path ? 'text-white' : 'text-white/70 hover:text-white'} group cursor-glow`}
          >
            <span>{item.name}</span>
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-400 transform scale-x-0 transition-transform duration-300 ${pathname === item.path ? 'scale-x-100' : 'group-hover:scale-x-100'}`}></span>
          </Link>
        ))}
      </nav>
      
      <div className="md:hidden">
        {/* Mobile menu button - can be expanded later */}
        <button className="text-white p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navigation;