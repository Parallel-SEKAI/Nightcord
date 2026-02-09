import React from 'react';
import { Play, Pause, RotateCcw, Coffee, Monitor, Brain } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { useTranslation } from 'react-i18next';

export const PomodoroModal: React.FC = () => {
  const { isPomodoroOpen, closePomodoro } = useConfig();
  const {
    pomodoro,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    setPomodoroMode,
  } = useTools();
  const { t } = useTranslation();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ToolsModalWrapper
      title={t('pomodoro.title')}
      isOpen={isPomodoroOpen}
      onClose={closePomodoro}
      width="w-[350px]"
    >
      <div className="flex flex-col items-center gap-6 py-2">
        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-nc-bg-input p-1 rounded-lg">
          <button
            onClick={() => setPomodoroMode('work')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              pomodoro.mode === 'work'
                ? 'bg-nc-bg-hover text-white shadow-sm'
                : 'text-nc-text-secondary hover:text-nc-text-primary'
            }`}
          >
            <Monitor size={14} /> {t('pomodoro.work')}
          </button>
          <button
            onClick={() => setPomodoroMode('shortBreak')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              pomodoro.mode === 'shortBreak'
                ? 'bg-nc-bg-hover text-white shadow-sm'
                : 'text-nc-text-secondary hover:text-nc-text-primary'
            }`}
          >
            <Coffee size={14} /> {t('pomodoro.shortBreak')}
          </button>
          <button
            onClick={() => setPomodoroMode('longBreak')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              pomodoro.mode === 'longBreak'
                ? 'bg-nc-bg-hover text-white shadow-sm'
                : 'text-nc-text-secondary hover:text-nc-text-primary'
            }`}
          >
            <Brain size={14} /> {t('pomodoro.longBreak')}
          </button>
        </div>

        {/* Timer Display */}
        <div
          className={`text-6xl font-mono tracking-wider ${
            pomodoro.mode === 'work' ? 'text-indigo-400' : 'text-emerald-400'
          }`}
        >
          {formatTime(pomodoro.displayTime)}
        </div>

        {/* Status Text */}
        <div className="text-sm text-nc-text-secondary font-medium uppercase tracking-widest">
          {pomodoro.isRunning
            ? pomodoro.mode === 'work'
              ? t('pomodoro.focusing')
              : t('pomodoro.resting')
            : t('pomodoro.paused')}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {!pomodoro.isRunning ? (
            <button
              onClick={startPomodoro}
              className="p-4 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-colors"
            >
              <Play size={28} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={pausePomodoro}
              className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-colors"
            >
              <Pause size={28} fill="currentColor" />
            </button>
          )}

          <button
            onClick={resetPomodoro}
            className="p-4 bg-nc-bg-hover hover:bg-red-500/20 text-nc-text-secondary hover:text-red-400 rounded-full transition-colors"
          >
            <RotateCcw size={28} />
          </button>
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
