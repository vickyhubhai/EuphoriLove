"use client";
import Image from "next/image";

export default function Features() {
  const features = [
    {
      title: "Real-time Chat",
      description: "Connect instantly with others through our seamless real-time messaging system.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Music Sharing",
      description: "Share and enjoy music together in real-time with synchronized playback.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "Private Rooms",
      description: "Create and join private rooms for intimate conversations and shared experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Theme Customization",
      description: "Personalize your experience with customizable themes and visual settings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen w-screen bg-background background-gradient text-white py-2 relative overflow-y-auto" suppressHydrationWarning>
      <div className="fixed h-[800px] w-[800px] bg-primary-700/30 rounded-full blur-3xl -z-10 absolute bottom-0 -left-32"></div>
      <div className="fixed h-[400px] w-[400px] bg-secondary-600/30 rounded-full blur-3xl -z-10 absolute top-0 -right-32"></div>
      
      <div className="max-w-screen-lg mx-auto w-full px-4 py-8">
        <div className="glass-effect rounded-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Platform Features</h1>
          <p className="text-lg text-gray-200">
            Discover the amazing features that make EuphoriLove a unique platform for connecting hearts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-primary-600/30">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-semibold gradient-text">{feature.title}</h2>
              </div>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-xl p-8 mt-8 text-center backdrop-blur-lg border border-white/10">
          <h2 className="text-3xl font-bold gradient-text mb-6">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-primary-600/30 backdrop-blur-lg border border-white/10 hover:bg-primary-600/40 transition-colors">
              <p className="font-semibold text-lg text-white">Video Calls</p>
            </div>
            <div className="p-6 rounded-lg bg-primary-600/30 backdrop-blur-lg border border-white/10 hover:bg-primary-600/40 transition-colors">
              <p className="font-semibold text-lg text-white">File Sharing</p>
            </div>
            <div className="p-6 rounded-lg bg-primary-600/30 backdrop-blur-lg border border-white/10 hover:bg-primary-600/40 transition-colors">
              <p className="font-semibold text-lg text-white">Voice Messages</p>
            </div>
            <div className="p-6 rounded-lg bg-primary-600/30 backdrop-blur-lg border border-white/10 hover:bg-primary-600/40 transition-colors">
              <p className="font-semibold text-lg text-white">Custom Emojis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}