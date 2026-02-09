import type { User } from '../types';

export const currentUser: User = {
  id: 'me',
  name: 'Me',
  avatar: '',
  status: 'online',
};

export const users: { [key: string]: User } = {
  k: {
    id: 'k',
    name: 'K',
    avatar: '/avatars/k.png',
    status: 'online', // Inferred from screenshot
    accentColor: 'bg-purple-600',
  },
  amia: {
    id: 'amia',
    name: 'Amia',
    avatar: '/avatars/amia.png',
    status: 'online',
    accentColor: 'bg-pink-400',
  },
  yuki: {
    id: 'yuki',
    name: '雪',
    avatar: '/avatars/yuki.png',
    status: 'online',
    accentColor: 'bg-blue-400',
  },
  enanan: {
    id: 'enanan',
    name: 'えななん',
    avatar: '/avatars/enana.png',
    status: 'online',
    accentColor: 'bg-yellow-500',
  },
  system: {
    id: 'system',
    name: 'System',
    avatar: '',
    status: 'offline',
  },
};

export const voiceUsers = [
  users['k'],
  users['yuki'],
  users['enanan'],
  users['amia'],
];
