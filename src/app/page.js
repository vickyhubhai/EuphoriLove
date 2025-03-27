"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect px-6 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image 
            src="/heart.png" 
            alt="heart" 
            width={30} 
            height={30} 
            className="floating-icon glow"
          />
          <span className="text-2xl font-bold gradient-text">EuphoriLove</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/about" className="text-white/90 hover:text-white transition-colors text-shadow">About</a>
          <a href="/features" className="text-white/90 hover:text-white transition-colors text-shadow">Features</a>
          <a href="/contact" className="text-white/90 hover:text-white transition-colors text-shadow">Contact</a>
        </div>
      </div>
    </nav>
  )
}

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
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden' suppressHydrationWarning>
      <Navbar />
      <div className='flex items-center justify-center max-w-screen-xl flex-col space-y-6 sm:space-y-10 mx-auto h-screen px-2 sm:px-6 lg:px-8 pt-20' suppressHydrationWarning>
        <div className='max-w-screen-xl mx-auto flex items-center flex-col justify-center relative z-20 mt-8 sm:mt-0' suppressHydrationWarning>
          <h1 className='text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-bold gradient-text font-serif glow text-center leading-tight tracking-wider'>EuphoriLove</h1>
          <p className='text-base sm:text-lg lg:text-2xl mt-2 sm:mt-4 font-medium text-white text-center px-4 text-shadow-dark'>Where Love and Music Sync</p>
          
          {/* Animated elements */}
          <Image 
            src="/heart.png" 
            alt="heart" 
            width={100} 
            height={100} 
            className='absolute -top-8 -right-20 floating-icon glow'
          />
          
          {/* Glassmorphism blurs */}
          <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[50vh] h-[50vh] md:w-[700px] md:h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[35vh] h-[35vh] md:w-[500px] md:h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[60vh] h-[60vh] md:w-[900px] md:h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        </div>
        


        <div className='flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-[90%] sm:max-w-md z-30 px-4 sm:px-0' suppressHydrationWarning>
          <button 
            onClick={handleCreateRoom} 
            disabled={isLoading}
            className='btn-primary w-full flex items-center justify-center space-x-2'
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
          
          <div className='w-full flex items-center my-6' suppressHydrationWarning>
            <div className='flex-grow h-px bg-white/20' suppressHydrationWarning></div>
            <span className='px-4 text-sm text-white/80 text-shadow'>or</span>
            <div className='flex-grow h-px bg-white/20' suppressHydrationWarning></div>
      </div>
          
          <div className='glass-effect p-4 sm:p-6 rounded-xl w-full space-y-3 sm:space-y-4' suppressHydrationWarning>
            <h3 className='text-white text-center font-medium text-shadow-dark'>Join Existing Room</h3>
            <input
              type="text"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              placeholder='Enter room code'
              className='input-primary w-full'
            />
            <button
              className='btn-secondary w-full flex items-center justify-center'
              onClick={() => router.push(`/room/${roomId}`)}
              disabled={!roomId.trim()}
            >
              Join Room
            </button>
    </div>
     </div>
    </div>
   </div>
  )
}

export default Page