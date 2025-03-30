"use client";
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden' suppressHydrationWarning>
      <div className='flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8' suppressHydrationWarning>
        
        {/* Glassmorphism blurs */}
        <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[700px] h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[500px] h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[900px] h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        
        <main className="glass-effect rounded-xl p-8 mt-8 relative z-10" suppressHydrationWarning>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">About EuphoriLove</h1>
              <p className="text-white/80 mb-4 leading-relaxed">
                EuphoriLove was created by Vicky as a heartfelt space that celebrates love in all its forms—romantic connections, self-love, and meaningful relationships.
              </p>
              <p className="text-white/80 mb-4 leading-relaxed">
                Our platform combines music and chat to create a unique experience where people can connect, share moments, and create memories together regardless of distance.
              </p>
              <p className="text-white/80 leading-relaxed">
                We believe in spreading joy, embracing positivity, and cherishing every moment. EuphoriLove is more than just a platform—it's a community where love and music sync together.
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-xl"></div>
                <Image 
                  src="/heart.png" 
                  alt="EuphoriLove Heart" 
                  width={300} 
                  height={300}
                  className="relative z-10 floating-icon glow"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Our Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-effect p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 group cursor-glow-primary">
                <div className="h-14 w-14 rounded-full bg-primary-600/30 flex items-center justify-center mb-4 group-hover:bg-primary-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
                <p className="text-white/70">Connect with others through our seamless real-time messaging system with enhanced features like file sharing and voice messages.</p>
              </div>
              
              <div className="glass-effect p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary-500/20 group cursor-glow-secondary">
                <div className="h-14 w-14 rounded-full bg-secondary-600/30 flex items-center justify-center mb-4 group-hover:bg-secondary-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Shared Music</h3>
                <p className="text-white/70">Listen to music together in perfect sync. Search and play YouTube tracks that everyone in the room can enjoy simultaneously.</p>
              </div>
              
              <div className="glass-effect p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/20 group cursor-glow-accent">
                <div className="h-14 w-14 rounded-full bg-accent-600/30 flex items-center justify-center mb-4 group-hover:bg-accent-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Private Rooms</h3>
                <p className="text-white/70">Create or join private rooms with unique IDs to ensure your conversations and shared experiences remain intimate and secure.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="glass-effect p-6 rounded-xl border border-secondary-500/30 hover:border-secondary-500/50 transition-all duration-300 group cursor-glow-secondary">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary-500/30 group-hover:border-secondary-500/50 transition-all duration-300">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-white mb-1">{member.name}</h3>
                  <p className="text-secondary-400 text-center mb-3">{member.role}</p>
                  <p className="text-white/80 text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 transform -translate-x-1/2"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative mb-8 ${index % 2 === 0 ? 'pl-8 md:pl-0 md:pr-8 text-left md:text-right' : 'pl-8 text-left'}`}>
                  <div className={`glass-effect p-6 rounded-xl border ${index % 2 === 0 ? 'border-primary-500/30 hover:border-primary-500/50' : 'border-accent-500/30 hover:border-accent-500/50'} transition-all duration-300 group cursor-glow`}>
                    <div className="absolute top-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-y-1/2 left-0 md:left-auto md:right-0 -ml-2 md:ml-0 md:-mr-2"></div>
                    <h3 className="text-xl font-semibold text-white mb-1">{milestone.year} - {milestone.title}</h3>
                    <p className="text-white/80">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Vicky",
    role: "Founder & Developer",
    bio: "Passionate about creating meaningful connections through technology and music.",
    image: "/heart.png"
  },
  {
    name: "Alex",
    role: "UI/UX Designer",
    bio: "Crafts beautiful and intuitive interfaces that enhance user experiences.",
    image: "/heart.png"
  },
  {
    name: "Sam",
    role: "Community Manager",
    bio: "Builds and nurtures our global community of music and love enthusiasts.",
    image: "/heart.png"
  }
];

const milestones = [
  {
    year: "2023",
    title: "Concept Born",
    description: "The idea for EuphoriLove was conceived as a way to combine music and connection."
  },
  {
    year: "2024",
    title: "First Prototype",
    description: "Initial version launched with basic chat and music sharing features."
  },
  {
    year: "Present",
    title: "Growing Community",
    description: "Thousands of users now connecting daily through our platform."
  }
];

export default AboutPage;