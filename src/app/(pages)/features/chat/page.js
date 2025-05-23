"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ChatFeaturePage() {
  return (
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden'>
      <div className='flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Glassmorphism blurs */}
        <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[700px] h-[700px] rounded-full blur-3xl'></div>
        <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[500px] h-[500px] rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[900px] h-[900px] rounded-full blur-3xl -z-10'></div>
        
        <main className="glass-effect rounded-xl p-8 mt-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8 text-center">Real-time Chat</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="glass-effect p-6 rounded-xl border border-primary-500/30 flex-1">
              <h2 className="text-2xl font-semibold gradient-text mb-4">Features</h2>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant messaging with typing indicators
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Read receipts and message status
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rich media sharing (images, videos, files)
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Group chats and private conversations
                </li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-xl border border-primary-500/30 flex-1">
              <h2 className="text-2xl font-semibold gradient-text mb-4">How it works</h2>
              <p className="text-white/80 mb-4">
                Our real-time chat system uses WebSockets to deliver messages instantly with minimal latency. 
                The interface is designed for seamless communication with intuitive controls and beautiful animations.
              </p>
              <div className="flex justify-center mt-6">
                <Image 
                  src="/chat1.png" 
                  alt="Chat interface preview" 
                  width={300} 
                  height={200} 
                  className="rounded-lg glow"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}