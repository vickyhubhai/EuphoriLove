"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateRoom = () => {
    setIsLoading(true)
    const newRoom = `room-${Math.random().toString(36).substring(7)}`;
    router.push(`/room/${newRoom}`);
  };

  const testimonials = [
    {
      quote: "EuphoriLove transformed my long-distance relationship. The music sharing feature makes us feel closer than ever.",
      author: "Sarah M.",
      role: "Happy User"
    },
    {
      quote: "The most intuitive chat platform I've used. The real-time features are incredible!",
      author: "James T.",
      role: "Music Enthusiast"
    },
    {
      quote: "Creating virtual rooms for my friends has never been easier. We use it every weekend!",
      author: "Priya K.",
      role: "Community Leader"
    }
  ];

  const [activeUsers, setActiveUsers] = useState(0);
  const [countries, setCountries] = useState(0);
  const [supportHours, setSupportHours] = useState(0);

  useEffect(() => {
    // Simulate real-time data fetching
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const target = 10000;
        const increment = Math.ceil((target - prev) / 10);
        return prev + increment > target ? target : prev + increment;
      });
      setCountries(prev => {
        const target = 50;
        const increment = Math.ceil((target - prev) / 5);
        return prev + increment > target ? target : prev + increment;
      });
      setSupportHours(prev => {
        const target = 24;
        const increment = Math.ceil((target - prev) / 3);
        return prev + increment > target ? target : prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: activeUsers.toLocaleString(), label: "Active Users" },
    { value: countries, label: "Countries" },
    { value: `${supportHours}/7`, label: "Support Hours" }
  ];

  return (
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden' suppressHydrationWarning>
      <div className='flex items-center justify-center max-w-screen-xl flex-col space-y-10 mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-20' suppressHydrationWarning>
        <div className='max-w-screen-xl mx-auto flex items-center flex-col justify-center relative z-20' suppressHydrationWarning>
          <h1 className='lg:text-[130px] text-6xl sm:text-8xl font-bold gradient-text font-serif glow'>EuphoriLove</h1>
          <p className='lg:text-2xl text-sm mt-4 font-medium text-white text-center'>Where Love and Music Sync</p>
          
          {/* Animated elements */}
          <Image 
            src="/heart.png" 
            alt="heart" 
            width={100} 
            height={100} 
            className='absolute -top-8 -right-20 floating-icon glow'
          />
          
          {/* Glassmorphism blurs */}
          <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[700px] h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[500px] h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[900px] h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        </div>

        <div className='flex flex-col items-center space-y-8 w-full max-w-md z-30' suppressHydrationWarning>
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
            <span className='px-4 text-sm text-white/60'>or</span>
            <div className='flex-grow h-px bg-white/20' suppressHydrationWarning></div>
      </div>
          
          <div className='glass-effect p-6 rounded-xl w-full space-y-4' suppressHydrationWarning>
            <h3 className='text-white text-center font-medium'>Join Existing Room</h3>
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

      {/* Testimonials Section */}
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10' suppressHydrationWarning>
        <h2 className='text-3xl font-bold gradient-text mb-12 text-center'>What Our Users Say</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='glass-effect p-8 rounded-xl border border-primary-500/30 hover:border-primary-500/50 transition-all duration-300 group cursor-glow'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 text-primary-400 mb-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className='text-white/80 italic mb-6'>"{testimonial.quote}"</p>
              <div>
                <p className='text-primary-400 font-medium'>{testimonial.author}</p>
                <p className='text-white/60 text-sm'>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10' suppressHydrationWarning>
        <div className='glass-effect rounded-xl p-8'>
          <h2 className='text-3xl font-bold gradient-text mb-12 text-center'>Our Growth</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <p className='text-5xl font-bold gradient-text mb-2' suppressHydrationWarning>{stat.value}</p>
                <p className='text-white/80'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page