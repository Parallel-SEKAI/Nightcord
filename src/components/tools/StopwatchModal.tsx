import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { useTranslation } from 'react-i18next';

export const StopwatchModal: React.FC = () => {
  const { isStopwatchOpen, closeStopwatch } = useConfig();
  const { stopwatch, startStopwatch, pauseStopwatch, resetStopwatch } =
    useTools();
  const { t } = useTranslation();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <ToolsModalWrapper
      title={t('stopwatch.title')}
      isOpen={isStopwatchOpen}
      onClose={closeStopwatch}
      width="w-[300px]"
    >
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="text-5xl font-mono text-nc-text-primary tracking-wider">
          {formatTime(stopwatch.displayTime)}
        </div>

        <div className="flex items-center gap-4">
          {!stopwatch.isRunning ? (
            <button
              onClick={startStopwatch}
              className="p-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-colors"
            >
              <Play size={24} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={pauseStopwatch}
              className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-colors"
            >
              <Pause size={24} fill="currentColor" />
            </button>
          )}

          <button
            onClick={resetStopwatch}
            className="p-3 bg-nc-bg-hover hover:bg-red-500/20 text-nc-text-secondary hover:text-red-400 rounded-full transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
