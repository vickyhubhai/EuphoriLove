'use client';

import React from 'react';
import YouTubePlayer from './YouTubePlayer';

const Page = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Music Player</h1>
      <YouTubePlayer />
    </div>
  );
};

export default Page;