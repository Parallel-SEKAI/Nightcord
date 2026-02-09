import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { Plus, X, Globe } from 'lucide-react';

const COMMON_TIMEZONES = [
  { label: 'New York', value: 'America/New_York' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Tokyo', value: 'Asia/Tokyo' },
  { label: 'UTC', value: 'UTC' },
  { label: 'Los Angeles', value: 'America/Los_Angeles' },
  { label: 'Paris', value: 'Europe/Paris' },
  { label: 'Berlin', value: 'Europe/Berlin' },
  { label: 'Sydney', value: 'Australia/Sydney' },
  { label: 'Shanghai', value: 'Asia/Shanghai' },
  { label: 'Dubai', value: 'Asia/Dubai' },
];

export const WorldClockModal: React.FC = () => {
  const { isWorldClockOpen, closeWorldClock } = useConfig();
  const { worldClocks, addWorldClock, removeWorldClock } = useTools();
  const [selectedTz, setSelectedTz] = useState(COMMON_TIMEZONES[0].value);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    const tz = COMMON_TIMEZONES.find((t) => t.value === selectedTz);
    if (tz) {
      addWorldClock(tz.value, tz.label);
    }
  };

  const formatTime = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(currentTime);
    } catch {
      return '--:--:--';
    }
  };

  const formatDate = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(currentTime);
    } catch {
      return '---';
    }
  };

  return (
    <ToolsModalWrapper
      title="World Clock"
      isOpen={isWorldClockOpen}
      onClose={closeWorldClock}
      width="w-[450px]"
      height="h-[500px]"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Add Clock Section */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <select
              value={selectedTz}
              onChange={(e) => setSelectedTz(e.target.value)}
              className="w-full appearance-none bg-nc-bg-sidebar text-nc-text-primary px-3 py-2 pr-8 rounded border border-nc-separator focus:outline-none focus:border-indigo-500"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label} ({tz.value})
                </option>
              ))}
            </select>
            <Globe
              size={16}
              className="absolute right-3 top-2.5 text-nc-text-secondary pointer-events-none"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 rounded transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Clocks List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Always show Local Time */}
          <div className="bg-nc-bg-hover p-4 rounded-lg border border-nc-separator/50">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-bold text-indigo-400 uppercase tracking-wide">
                Local Time
              </span>
              <span className="text-xs text-nc-text-secondary">
                {formatDate(Intl.DateTimeFormat().resolvedOptions().timeZone)}
              </span>
            </div>
            <div className="text-4xl font-light text-nc-text-primary">
              {formatTime(Intl.DateTimeFormat().resolvedOptions().timeZone)}
            </div>
          </div>

          {/* User Added Clocks */}
          {worldClocks.map((clock) => (
            <div
              key={clock.id}
              className="relative bg-nc-bg-sidebar p-4 rounded-lg border border-nc-separator/50 group"
            >
              <button
                onClick={() => removeWorldClock(clock.id)}
                className="absolute top-2 right-2 text-nc-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-bold text-nc-text-secondary uppercase tracking-wide">
                  {clock.label}
                </span>
                <span className="text-xs text-nc-text-secondary">
                  {formatDate(clock.timezone)}
                </span>
              </div>
              <div className="text-3xl font-light text-nc-text-primary">
                {formatTime(clock.timezone)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
