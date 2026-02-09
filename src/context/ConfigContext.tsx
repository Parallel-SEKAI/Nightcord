import React, { createContext, useContext, useState } from 'react';

interface ConfigState {
  baseUrl: string;
  apiKey: string;
  model: string;
  neteaseBaseUrl: string;
  isSettingsOpen: boolean;
  isMusicSelectionOpen: boolean;
  isCalendarOpen: boolean;
  isStopwatchOpen: boolean;
  isCountdownOpen: boolean;
  isPomodoroOpen: boolean;
  isCalculatorOpen: boolean;
  isTodoListOpen: boolean;
  isUnitConverterOpen: boolean;
  isWorldClockOpen: boolean;
  isNotesOpen: boolean;
  setBaseUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  setNeteaseBaseUrl: (url: string) => void;
  openSettings: () => void;
  closeSettings: () => void;
  openMusicSelection: () => void;
  closeMusicSelection: () => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  openStopwatch: () => void;
  closeStopwatch: () => void;
  openCountdown: () => void;
  closeCountdown: () => void;
  openPomodoro: () => void;
  closePomodoro: () => void;
  openCalculator: () => void;
  closeCalculator: () => void;
  openTodoList: () => void;
  closeTodoList: () => void;
  openUnitConverter: () => void;
  closeUnitConverter: () => void;
  openWorldClock: () => void;
  closeWorldClock: () => void;
  openNotes: () => void;
  closeNotes: () => void;
}

const ConfigContext = createContext<ConfigState | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [baseUrl, setBaseUrlState] = useState(
    () => localStorage.getItem('nc_base_url') || ''
  );
  const [apiKey, setApiKeyState] = useState(
    () => localStorage.getItem('nc_api_key') || ''
  );
  const [model, setModelState] = useState(
    () => localStorage.getItem('nc_model') || ''
  );
  const [neteaseBaseUrl, setNeteaseBaseUrlState] = useState(
    () =>
      localStorage.getItem('nc_netease_base_url') ||
      'https://netease.api.parallel-sekai.org'
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMusicSelectionOpen, setIsMusicSelectionOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStopwatchOpen, setIsStopwatchOpen] = useState(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);
  const [isUnitConverterOpen, setIsUnitConverterOpen] = useState(false);
  const [isWorldClockOpen, setIsWorldClockOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Save to localStorage when changed
  const setBaseUrl = (url: string) => {
    setBaseUrlState(url);
    localStorage.setItem('nc_base_url', url);
  };

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem('nc_api_key', key);
  };

  const setModel = (m: string) => {
    setModelState(m);
    localStorage.setItem('nc_model', m);
  };

  const setNeteaseBaseUrl = (url: string) => {
    setNeteaseBaseUrlState(url);
    localStorage.setItem('nc_netease_base_url', url);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const openMusicSelection = () => setIsMusicSelectionOpen(true);
  const closeMusicSelection = () => setIsMusicSelectionOpen(false);

  const openCalendar = () => setIsCalendarOpen(true);
  const closeCalendar = () => setIsCalendarOpen(false);

  const openStopwatch = () => setIsStopwatchOpen(true);
  const closeStopwatch = () => setIsStopwatchOpen(false);

  const openCountdown = () => setIsCountdownOpen(true);
  const closeCountdown = () => setIsCountdownOpen(false);

  const openPomodoro = () => setIsPomodoroOpen(true);
  const closePomodoro = () => setIsPomodoroOpen(false);

  const openCalculator = () => setIsCalculatorOpen(true);
  const closeCalculator = () => setIsCalculatorOpen(false);

  const openTodoList = () => setIsTodoListOpen(true);
  const closeTodoList = () => setIsTodoListOpen(false);

  const openUnitConverter = () => setIsUnitConverterOpen(true);
  const closeUnitConverter = () => setIsUnitConverterOpen(false);

  const openWorldClock = () => setIsWorldClockOpen(true);
  const closeWorldClock = () => setIsWorldClockOpen(false);

  const openNotes = () => setIsNotesOpen(true);
  const closeNotes = () => setIsNotesOpen(false);

  return (
    <ConfigContext.Provider
      value={{
        baseUrl,
        apiKey,
        model,
        neteaseBaseUrl,
        isSettingsOpen,
        isMusicSelectionOpen,
        isCalendarOpen,
        isStopwatchOpen,
        isCountdownOpen,
        isPomodoroOpen,
        isCalculatorOpen,
        isTodoListOpen,
        isUnitConverterOpen,
        isWorldClockOpen,
        isNotesOpen,
        setBaseUrl,
        setApiKey,
        setModel,
        setNeteaseBaseUrl,
        openSettings,
        closeSettings,
        openMusicSelection,
        closeMusicSelection,
        openCalendar,
        closeCalendar,
        openStopwatch,
        closeStopwatch,
        openCountdown,
        closeCountdown,
        openPomodoro,
        closePomodoro,
        openCalculator,
        closeCalculator,
        openTodoList,
        closeTodoList,
        openUnitConverter,
        closeUnitConverter,
        openWorldClock,
        closeWorldClock,
        openNotes,
        closeNotes,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
