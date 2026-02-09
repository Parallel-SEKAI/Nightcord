import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { PlayerModal } from './PlayerModal';

export const GlobalPlayer: React.FC = () => {
  const { currentSong, closePlayer } = usePlayer();

  if (!currentSong) return null;

  return (
    <PlayerModal
      songId={currentSong.id}
      songName={currentSong.name}
      onClose={closePlayer}
    />
  );
};
