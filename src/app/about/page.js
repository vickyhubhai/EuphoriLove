"use client";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col h-screen w-screen bg-background background-gradient text-white py-2 relative overflow-hidden" suppressHydrationWarning>
      <div className="fixed h-[800px] w-[800px] bg-primary-700/30 rounded-full blur-3xl -z-10 absolute bottom-0 -left-32"></div>
      <div className="fixed h-[400px] w-[400px] bg-secondary-600/30 rounded-full blur-3xl -z-10 absolute top-0 -right-32"></div>
      
      <div className="max-w-screen-lg mx-auto w-full px-4 py-8">
        <div className="glass-effect rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-6">About EuphoriLove</h1>
          <p className="text-lg mb-6">
            EuphoriLove is a unique platform created by Vicky, dedicated to celebrating love in all its beautiful forms. Our mission is to create a space where people can connect, share, and experience the joy of meaningful relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-2xl font-semibold gradient-text mb-4">Our Mission</h2>
            <p className="text-gray-200">
              To foster genuine connections and create a supportive community where love, understanding, and positivity thrive.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-2xl font-semibold gradient-text mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Authenticity in relationships</li>
              <li>Respect for all forms of love</li>
              <li>Creating meaningful connections</li>
              <li>Spreading joy and positivity</li>
            </ul>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold gradient-text mb-6">Meet the Creator</h2>
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              <Image
                src="/heart.png"
                alt="Creator"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Vicky</h3>
              <p className="text-gray-200">
                Passionate about bringing people together and creating meaningful connections through technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}