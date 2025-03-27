'use client';

export const userConfig = {
  defaultAvatar: '/heart.png',
  maxUsernameLength: 20,
  availableAvatars: [
    '/avatars/avatar1.svg',
    '/avatars/avatar2.svg',
    '/avatars/avatar3.svg',
    '/avatars/avatar4.svg'
  ]
};

export const roomCategories = [
  { id: 'pop', name: 'Pop Music', icon: '🎵' },
  { id: 'rock', name: 'Rock', icon: '🎸' },
  { id: 'jazz', name: 'Jazz', icon: '🎷' },
  { id: 'classical', name: 'Classical', icon: '🎻' },
  { id: 'electronic', name: 'Electronic', icon: '🎹' }
];

export const themeConfig = {
  light: {
    background: 'bg-gradient-to-r from-pink-50 to-purple-50',
    text: 'text-gray-800',
    card: 'bg-white/80 backdrop-blur-sm',
    input: 'bg-white/90 border-purple-200',
    button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    icon: '🌙'
  },
  dark: {
    background: 'bg-gradient-to-r from-gray-900 to-purple-900',
    text: 'text-purple-50',
    card: 'bg-gray-800/80 backdrop-blur-sm',
    input: 'bg-gray-700/90 border-purple-600',
    button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    icon: '✨'
  }
};

export const musicConfig = {
  background: {
    light: '/audio/light-theme.mp3',
    dark: '/audio/dark-theme.mp3'
  },
  volume: 0.3,
  autoplay: false
};