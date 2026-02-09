import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { parseLrc, type LyricLine } from '../../utils/lyricParser';
import {
  X,
  Minimize2,
  Maximize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

interface PlayerModalProps {
  songId: string;
  songName: string;
  onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  songId,
  songName,
  onClose,
}) => {
  const { neteaseBaseUrl } = useConfig();
  const { isPlaying, togglePlay, currentTime, duration, seek } = usePlayer();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch lyrics when songId changes
  useEffect(() => {
    const fetchLyrics = async () => {
      if (!songId || !neteaseBaseUrl) {
        setLyrics([]);
        return;
      }
      try {
        const response = await fetch(
          `${neteaseBaseUrl}/lyric?id=${songId}&randomCNIP=true`
        );
        const data = await response.json();
        if (data.lrc && data.lrc.lyric) {
          setLyrics(parseLrc(data.lrc.lyric));
        } else {
          setLyrics([]);
        }
      } catch (error) {
        console.error('Failed to fetch lyrics:', error);
        setLyrics([]);
      }
    };

    fetchLyrics();
  }, [songId, neteaseBaseUrl]);

  // Handle user scroll interaction
  const handleScroll = () => {
    setIsUserScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Reset back to auto-scroll after 3 seconds of no scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Auto-scroll lyrics
  useEffect(() => {
    if (isMinimized || isUserScrolling) return;

    const activeIndex = lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return (
        line.time <= currentTime && (!nextLine || nextLine.time > currentTime)
      );
    });

    if (activeIndex !== -1 && lyricsRef.current) {
      const lyricsContainer = lyricsRef.current.firstElementChild;
      if (lyricsContainer) {
        const activeElement = lyricsContainer.children[
          activeIndex
        ] as HTMLElement;
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }
  }, [currentTime, lyrics, isMinimized, isUserScrolling]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    seek(newTime);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50 bg-nc-bg-card border border-nc-separator rounded-lg shadow-xl p-3 flex items-center gap-3 w-72 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-nc-text-primary truncate">
            {songName}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={togglePlay}
              className="text-nc-text-primary hover:text-nc-accent-purple transition-colors"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-nc-bg-input rounded-lg appearance-none cursor-pointer accent-nc-accent-purple"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 pl-2 border-l border-nc-separator">
          <button
            onClick={() => setIsMinimized(false)}
            className="text-nc-text-secondary hover:text-nc-text-primary"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-nc-text-secondary hover:text-nc-text-primary"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[500px] h-[600px] bg-nc-bg-main border border-nc-separator rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="h-14 border-b border-nc-separator flex items-center justify-between px-4 bg-nc-bg-header">
          <h3 className="font-bold text-nc-text-primary truncate pr-4">
            {songName}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 text-nc-text-secondary hover:text-nc-text-primary hover:bg-nc-bg-hover rounded-md transition-colors"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-nc-text-secondary hover:text-nc-text-primary hover:bg-nc-bg-hover rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Lyrics Area */}
        <div
          className="flex-1 overflow-y-auto p-6 bg-nc-bg-main relative scroll-smooth no-scrollbar"
          ref={lyricsRef}
          onWheel={handleScroll}
          onTouchMove={handleScroll}
        >
          {lyrics.length > 0 ? (
            <div className="flex flex-col gap-4 text-center py-4">
              {lyrics.map((line, index) => {
                const isActive =
                  line.time <= currentTime &&
                  (!lyrics[index + 1] || lyrics[index + 1].time > currentTime);
                return (
                  <p
                    key={index}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'text-nc-text-primary font-bold text-lg scale-105'
                        : 'text-nc-text-muted text-sm blur-[0.5px]'
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-nc-text-muted">
              {songId ? 'Fetching lyrics...' : 'No lyrics available'}
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="h-28 bg-nc-bg-input border-t border-nc-separator p-4 flex flex-col justify-center gap-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 text-xs text-nc-text-muted">
            <span>{formatTime(currentTime)}</span>
            <input
              ref={progressBarRef}
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-nc-separator rounded-lg appearance-none cursor-pointer accent-nc-accent-purple hover:h-2 transition-all"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-6 mt-1">
            <button className="text-nc-text-secondary hover:text-nc-text-primary transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-nc-text-primary text-nc-bg-main rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button className="text-nc-text-secondary hover:text-nc-text-primary transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
