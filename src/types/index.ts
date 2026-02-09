export interface User {
  id: string;
  name: string;
  avatar: string; // URL or Initials
  status: 'online' | 'voice' | 'offline';
  accentColor?: string; // For the ring around avatar
  isMuted?: boolean;
}

export interface Attachment {
  type: 'file' | 'audio' | 'image';
  name: string;
  size: string;
  url?: string;
  id?: string;
}

export interface Message {
  id: string;
  userId: string;
  content?: string;
  timestamp: string; // e.g. "昨日 15:51"
  attachment?: Attachment;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  category?: string;
}
