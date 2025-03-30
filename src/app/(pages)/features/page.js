"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturesPage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const features = [
    {
      title: "Real-time Chat",
      description: "Connect with others instantly through our seamless messaging system with features like typing indicators, read receipts, and rich media sharing.",
      icon: "/chat1.png",
      comingSoon: false
    },
    {
      title: "Music Sharing",
      description: "Create shared playlists, sync playback with friends, and discover new music together in our immersive audio environment.",
      icon: "/music.png",
      comingSoon: false
    },
    {
      title: "Virtual Rooms",
      description: "Customize your virtual space with themes, backgrounds, and interactive elements for a personalized experience.",
      icon: "/window.svg",
      comingSoon: false
    },
    {
      title: "Global Connections",
      description: "Break language barriers with real-time translation and connect with people worldwide through our global community.",
      icon: "/globe.svg",
      comingSoon: false
    },
    {
      title: "Video Calls",
      description: "Coming soon! High-quality video calls with virtual backgrounds and screen sharing capabilities.",
      icon: "/file.svg",
      comingSoon: true
    },
    {
      title: "Memory Sharing",
      description: "Coming soon! Create and share photo albums, videos, and special moments with your loved ones.",
      icon: "/heart.png",
      comingSoon: true
    }
  ];

  return (
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden' suppressHydrationWarning>
      <audio ref={audioRef} loop src="/tone.mp3" />
      <div className='flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8' suppressHydrationWarning>
        
        {/* Glassmorphism blurs */}
        <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[700px] h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[500px] h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[900px] h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        
        <main className="glass-effect rounded-xl p-8 mt-8 relative z-10" suppressHydrationWarning>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8 text-center">Our Features</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`glass-effect p-6 rounded-xl border transition-all duration-500 group cursor-glow transform hover:scale-[1.02] hover:shadow-lg ${feature.comingSoon ? 'border-accent-500/30 hover:border-accent-500/50' : 'border-primary-500/30 hover:border-primary-500/50'}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${feature.comingSoon ? 'bg-accent-600/30 group-hover:bg-accent-600/50' : 'bg-primary-600/30 group-hover:bg-primary-600/50'}`}>
                    <Image src={feature.icon} alt={feature.title} width={24} height={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold gradient-text">{feature.title}</h2>
                    {feature.comingSoon && (
                      <span className="text-xs bg-accent-500/20 text-accent-400 px-2 py-1 rounded-full">Coming Soon</span>
                    )}
                  </div>
                </div>
                <p className="text-white/80 mb-4">{feature.description}</p>
                {!feature.comingSoon && (
                  <Link href={feature.title === 'Global Connections' ? '/features/global' : '#'}>
                    <button className="text-sm text-primary-400 hover:text-primary-300 flex items-center group">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeaturesPage;