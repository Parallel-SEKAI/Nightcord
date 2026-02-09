import React, { useState, useEffect } from 'react';
import { X, Search, Play, Pause } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { usePlayer, type Song } from '../../context/PlayerContext';
import musicsData from '../../data/musics.json';

// Type for the music data from JSON
interface MusicItem {
  name: string;
  id: number;
}

export const MusicSelectionModal: React.FC = () => {
  const { isMusicSelectionOpen, closeMusicSelection, neteaseBaseUrl } =
    useConfig();
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<MusicItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with all songs or empty
  useEffect(() => {
    setFilteredSongs(musicsData as MusicItem[]);
  }, []);

  // Filter songs when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSongs(musicsData as MusicItem[]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = (musicsData as MusicItem[]).filter((song) =>
      song.name.toLowerCase().includes(query)
    );
    setFilteredSongs(filtered);
  }, [searchQuery]);

  const handlePlaySong = async (song: MusicItem) => {
    // If the song is already playing, just toggle play
    if (currentSong?.id === song.id.toString()) {
      togglePlay();
      return;
    }

    if (!neteaseBaseUrl) {
      alert('Please configure Netease Cloud Music API URL in Settings first.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${neteaseBaseUrl}/song/url?id=${song.id}&randomCNIP=true`
      );
      const data = await response.json();

      if (data.data && data.data[0] && data.data[0].url) {
        const newSong: Song = {
          id: song.id.toString(),
          name: song.name,
          url: data.data[0].url,
        };
        playSong(newSong);
      } else {
        console.error('No URL found for song:', song.name);
        alert('Could not retrieve song URL. Please try another song.');
      }
    } catch (error) {
      console.error('Error fetching song URL:', error);
      alert('Failed to fetch song. Please check your API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMusicSelectionOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[600px] h-[500px] bg-nc-bg-main border border-nc-separator rounded-lg shadow-2xl flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b border-nc-separator flex items-center justify-between">
          <h2 className="text-xl font-bold text-nc-text-primary">
            Select Music
          </h2>
          <button
            onClick={closeMusicSelection}
            className="text-nc-text-secondary hover:text-nc-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-nc-separator bg-nc-bg-header">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-nc-text-secondary"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a song..."
              className="w-full bg-nc-bg-input text-nc-text-primary pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              autoFocus
            />
          </div>
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => {
              const isCurrentSong = currentSong?.id === song.id.toString();
              return (
                <div
                  key={song.id}
                  className={`flex items-center justify-between p-3 rounded hover:bg-nc-bg-hover transition-colors group ${
                    isCurrentSong ? 'bg-nc-bg-hover' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div
                      className={`font-medium truncate ${isCurrentSong ? 'text-indigo-400' : 'text-nc-text-primary'}`}
                    >
                      {song.name}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlaySong(song)}
                    disabled={isLoading}
                    className={`p-2 rounded-full hover:bg-nc-bg-input transition-colors ${
                      isCurrentSong
                        ? 'text-indigo-400'
                        : 'text-nc-text-secondary hover:text-nc-text-primary'
                    }`}
                  >
                    {isCurrentSong && isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" />
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-nc-text-muted">
              No songs found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-nc-separator text-xs text-nc-text-muted text-center">
          {filteredSongs.length} songs available
        </div>
      </div>
    </div>
  );
};
