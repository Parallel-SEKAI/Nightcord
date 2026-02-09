import React from 'react';
import { Play, Pause, Download, Maximize2 } from 'lucide-react';
import type { Attachment } from '../../types';
import { usePlayer } from '../../context/PlayerContext';

export const AudioPlayer: React.FC<{ attachment: Attachment }> = ({
  attachment,
}) => {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

  // Check if this specific audio is currently the one playing in the global context
  const isCurrentSong = currentSong?.id === attachment.id;
  const isThisPlaying = isCurrentSong && isPlaying;

  const handlePlayClick = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      if (attachment.url && attachment.id) {
        playSong({
          id: attachment.id,
          url: attachment.url,
          name: attachment.name,
        });
      }
    }
  };

  const handleOpenPlayer = () => {
    if (attachment.url && attachment.id) {
      // If it's already playing, just ensure it's set as current (which it should be)
      // If not, play it
      if (!isCurrentSong) {
        playSong({
          id: attachment.id,
          url: attachment.url,
          name: attachment.name,
        });
      }
      // The global player modal will open because currentSong is set
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-nc-bg-card rounded-lg max-w-sm mt-1 border border-nc-bg-input group/player">
      <div
        className="flex-shrink-0 w-10 h-10 bg-nc-bg-input rounded-full flex items-center justify-center text-nc-accent-purple relative overflow-hidden cursor-pointer"
        onClick={handleOpenPlayer}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/player:opacity-100 transition-opacity">
          <Maximize2 size={16} className="text-white" />
        </div>
        {/* Music Note Icon Placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover/player:opacity-0 transition-opacity"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>

      <div className="flex-1 min-w-0 cursor-pointer" onClick={handleOpenPlayer}>
        <div className="text-sm font-medium text-nc-text-primary truncate hover:underline">
          {attachment.name}
        </div>
        <div className="text-xs text-nc-text-secondary">{attachment.size}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePlayClick}
          className="p-1 hover:bg-nc-bg-hover rounded transition-colors text-nc-text-primary"
        >
          {isThisPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </button>
        {attachment.url && (
          <a
            href={attachment.url}
            download={attachment.name}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:bg-nc-bg-hover rounded transition-colors text-nc-text-primary"
          >
            <Download size={20} />
          </a>
        )}
      </div>
    </div>
  );
};
