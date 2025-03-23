'use client';

import React, { useEffect, useState } from 'react';

const YouTubePlayer = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: '',
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
      setPlayer(newPlayer);
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const [volume, setVolume] = useState(100);

  const onPlayerReady = (event) => {
    console.log('Player is ready');
    event.target.setVolume(volume);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 10, 100);
    handleVolumeChange(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 10, 0);
    handleVolumeChange(newVolume);
  };

  const searchVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  const playVideo = (id) => {
    setVideoId(id);
    if (player) {
      player.loadVideoById(id);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for music..."
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={searchVideos}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div id="youtube-player" className="mb-4"></div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={decreaseVolume}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          -
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
          className="w-48"
        />
        <button
          onClick={increaseVolume}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          +
        </button>
        <span className="text-sm">{volume}%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((video) => (
          <div
            key={video.id.videoId}
            className="border rounded p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => playVideo(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full"
            />
            <p className="mt-2 font-semibold">{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubePlayer;