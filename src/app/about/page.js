"use client";
import Navbar from '../_components/shared/Navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Vicky Pandey",
      role: "Founder & CEO",
      description: "Music enthusiast and relationship expert with a passion for bringing people together."
    },
    {
      name: "Vicky Pandey",
      role: "Lead Developer",
      description: "Full-stack developer with expertise in real-time applications and audio synchronization."
    },
    {
      name: "Yash Pandey",
      role: "UX Designer",
      description: "Creative designer focused on creating intuitive and beautiful user experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-background background-gradient">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            About EuphoriLove
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            EuphoriLove is a revolutionary platform that brings couples closer through the power of music. 
            We believe that shared musical experiences can create deeper connections and lasting memories.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-effect p-8 rounded-2xl mb-20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-6 text-center">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-white/80 mb-4">
                At EuphoriLove, we're dedicated to creating meaningful connections through music. 
                Our platform allows couples to share their favorite songs, create playlists together, 
                and experience music in perfect sync, no matter the distance.
              </p>
              <p className="text-white/80">
                We understand that music has the power to evoke emotions and create lasting memories. 
                That's why we've built a platform that makes it easy to share these special moments 
                with the ones you love.
              </p>
            </div>
            <div className="relative h-64 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-effect p-6 rounded-xl text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-primary-400 mb-3">{member.role}</p>
                <p className="text-white/70">{member.description}</p>
              </motion.div>
            ))}
        </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Connection",
                description: "We believe in the power of music to bring people closer together and create meaningful relationships."
              },
              {
                title: "Innovation",
                description: "We're constantly pushing the boundaries of what's possible in shared music experiences."
              },
              {
                title: "Quality",
                description: "We're committed to providing the highest quality audio and user experience for our users."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;