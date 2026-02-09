import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';

export const CountdownModal: React.FC = () => {
  const { isCountdownOpen, closeCountdown } = useConfig();
  const {
    countdown,
    startCountdown,
    pauseCountdown,
    resumeCountdown,
    resetCountdown,
  } = useTools();

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  // When timer stops or resets, sync inputs might be desired, but typically we leave them
  // so the user can restart the same timer easily.

  const handleStart = () => {
    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const s = parseInt(seconds || '0', 10);

    const totalMs = (h * 3600 + m * 60 + s) * 1000;
    if (totalMs > 0) {
      startCountdown(totalMs);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ToolsModalWrapper
      title="Countdown"
      isOpen={isCountdownOpen}
      onClose={closeCountdown}
      width="w-[300px]"
    >
      <div className="flex flex-col items-center gap-6 py-4">
        {countdown.isRunning || countdown.remainingTime > 0 ? (
          // Display View
          <div className="text-5xl font-mono text-nc-text-primary tracking-wider">
            {formatTime(countdown.displayTime)}
          </div>
        ) : (
          // Input View
          <div className="flex items-center gap-2 text-nc-text-primary">
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="00"
                className="w-16 bg-nc-bg-input p-2 rounded text-center text-xl font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-xs text-nc-text-secondary mt-1">Hr</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="00"
                className="w-16 bg-nc-bg-input p-2 rounded text-center text-xl font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-xs text-nc-text-secondary mt-1">Min</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="00"
                className="w-16 bg-nc-bg-input p-2 rounded text-center text-xl font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-xs text-nc-text-secondary mt-1">Sec</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!countdown.isRunning && countdown.remainingTime === 0 ? (
            <button
              onClick={handleStart}
              className="p-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-colors"
              disabled={!hours && !minutes && !seconds}
            >
              <Play size={24} fill="currentColor" />
            </button>
          ) : !countdown.isRunning ? (
            <button
              onClick={resumeCountdown}
              className="p-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-colors"
            >
              <Play size={24} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={pauseCountdown}
              className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-colors"
            >
              <Pause size={24} fill="currentColor" />
            </button>
          )}

          <button
            onClick={resetCountdown}
            className="p-3 bg-nc-bg-hover hover:bg-red-500/20 text-nc-text-secondary hover:text-red-400 rounded-full transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
