"use client";
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-lg">
        {/* Decorative elements - gradient blurs */}
        <div className="absolute -top-40 -left-20 bg-primary-600/30 w-72 h-72 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-28 -right-20 bg-secondary-500/30 w-72 h-72 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/20 w-96 h-96 rounded-full blur-3xl -z-10"></div>
        
        {/* Content */}
        <div className="glass-effect relative z-10 p-8 md:p-12 rounded-2xl border border-white/10 text-center">
          <h1 className="gradient-text text-7xl md:text-9xl font-bold mb-4">404</h1>
          <h2 className="text-foreground text-xl md:text-2xl font-medium mb-6">Page Not Found</h2>
          <p className="text-foreground/70 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          
          <Link href="/" className="btn-primary inline-flex items-center px-6 py-3">
            <span>Back to Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 