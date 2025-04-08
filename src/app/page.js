"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Navbar from './_components/shared/Navbar';

const Page = () => {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateRoom = () => {
    setIsLoading(true)
    const newRoom = `room-${Math.random().toString(36).substring(7)}`;
    router.push(`/room/${newRoom}`);
  };

  return (
    <div className='w-full min-h-screen bg-background background-gradient overflow-x-hidden relative' suppressHydrationWarning>
      <Navbar />
      
      {/* Main content */}
      <div className='flex items-center justify-center flex-col space-y-8 mx-auto min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-10' suppressHydrationWarning>
        <div className='w-full max-w-4xl mx-auto flex items-center flex-col justify-center relative z-20' suppressHydrationWarning>
          <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-[130px] font-bold gradient-text font-serif glow text-center leading-tight'>
            EuphoriLove
          </h1>
          <p className='text-base sm:text-lg lg:text-2xl mt-4 font-medium text-white text-center max-w-xl'>
            Where Love and Music Sync
          </p>
          
          {/* Animated elements - Responsive positioning */}
          <div className='hidden sm:block'>
            <Image 
              src="/heart.png" 
              alt="heart" 
              width={100} 
              height={100} 
              className='absolute top-0 right-0 sm:-top-8 sm:-right-20 floating-icon glow'
            />
          </div>
          
          {/* Glassmorphism blurs - Adjusted for mobile */}
          <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        </div>

        {/* Action buttons and form - Made responsive */}
        <div className='flex flex-col items-center space-y-6 w-full max-w-sm z-30 px-4 sm:px-0' suppressHydrationWarning>
          <button 
            onClick={handleCreateRoom} 
            disabled={isLoading}
            className='btn-primary w-full flex items-center justify-center space-x-2 py-3 px-4 sm:py-4'
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <span>Create a Room</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
          
          <div className='w-full flex items-center' suppressHydrationWarning>
            <div className='flex-grow h-px bg-white/20' suppressHydrationWarning></div>
            <span className='px-4 text-sm sm:text-base text-white/60'>or</span>
            <div className='flex-grow h-px bg-white/20' suppressHydrationWarning></div>
          </div>
          
          <div className='glass-effect p-4 sm:p-6 rounded-xl w-full space-y-4' suppressHydrationWarning>
            <h3 className='text-white text-center font-medium text-lg sm:text-xl'>Join Existing Room</h3>
            <input
              type="text"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              placeholder='Enter room code'
              className='input-primary w-full text-base sm:text-lg'
            />
            <button
              className='btn-secondary w-full flex items-center justify-center py-3 px-4 sm:py-4'
              onClick={() => router.push(`/room/${roomId}`)}
              disabled={!roomId.trim()}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page