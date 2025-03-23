"use client";

import React from 'react';

export default function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-lg">
        {/* Decorative elements - gradient blurs */}
        <div className="absolute -top-40 -right-20 bg-primary-600/30 w-72 h-72 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-28 -left-20 bg-secondary-500/30 w-72 h-72 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/20 w-96 h-96 rounded-full blur-3xl -z-10"></div>
        
        {/* Content */}
        <div className="glass-effect relative z-10 p-8 md:p-12 rounded-2xl border border-white/10 text-center">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-foreground/70 mb-8">We encountered an error while processing your request.</p>
          
          <button 
            onClick={() => reset()} 
            className="btn-primary inline-flex items-center px-6 py-3"
          >
            <span>Try Again</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 