import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface WorldClock {
  id: string;
  timezone: string;
  label: string;
}

interface StopwatchState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number; // in milliseconds
  displayTime: number; // For UI rendering
}

interface CountdownState {
  isRunning: boolean;
  endTime: number | null;
  remainingTime: number; // in milliseconds
  initialDuration: number; // in milliseconds
  displayTime: number; // For UI rendering
}

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  isRunning: boolean;
  mode: PomodoroMode;
  endTime: number | null;
  remainingTime: number; // in milliseconds
  duration: number; // in milliseconds
  displayTime: number; // For UI rendering
}

interface ToolsContextType {
  // Stopwatch
  stopwatch: StopwatchState;
  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;

  // Countdown
  countdown: CountdownState;
  startCountdown: (durationMs: number) => void;
  pauseCountdown: () => void;
  resumeCountdown: () => void;
  resetCountdown: () => void;

  // Pomodoro
  pomodoro: PomodoroState;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  setPomodoroMode: (mode: PomodoroMode) => void;

  // Todo List
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;

  // World Clock
  worldClocks: WorldClock[];
  addWorldClock: (timezone: string, label: string) => void;
  removeWorldClock: (id: string) => void;

  // Notes
  notesContent: string;
  updateNotes: (content: string) => void;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

// --- Constants ---
const POMODORO_TIMES = {
  work: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
};

export const ToolsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- Stopwatch Logic ---
  const [stopwatch, setStopwatch] = useState<StopwatchState>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
    displayTime: 0,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (stopwatch.isRunning) {
      interval = setInterval(() => {
        setStopwatch((prev) => ({
          ...prev,
          displayTime:
            prev.elapsedTime + (Date.now() - (prev.startTime || Date.now())),
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [stopwatch.isRunning]);

  const startStopwatch = () => {
    if (!stopwatch.isRunning) {
      setStopwatch((prev) => ({
        ...prev,
        isRunning: true,
        startTime: Date.now(),
      }));
    }
  };

  const pauseStopwatch = () => {
    if (stopwatch.isRunning) {
      const now = Date.now();
      const newElapsedTime =
        stopwatch.elapsedTime + (now - (stopwatch.startTime || now));
      setStopwatch({
        isRunning: false,
        elapsedTime: newElapsedTime,
        startTime: null,
        displayTime: newElapsedTime,
      });
    }
  };

  const resetStopwatch = () => {
    setStopwatch({
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
      displayTime: 0,
    });
  };

  // --- Countdown Logic ---
  const [countdown, setCountdown] = useState<CountdownState>({
    isRunning: false,
    endTime: null,
    remainingTime: 0,
    initialDuration: 0,
    displayTime: 0,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (countdown.isRunning && countdown.endTime) {
      interval = setInterval(() => {
        const left = countdown.endTime! - Date.now();
        if (left <= 0) {
          setCountdown((prev) => ({
            ...prev,
            isRunning: false,
            remainingTime: 0,
            displayTime: 0,
            endTime: null,
          }));
        } else {
          setCountdown((prev) => ({ ...prev, displayTime: left }));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [countdown.isRunning, countdown.endTime]);

  const startCountdown = (durationMs: number) => {
    setCountdown({
      isRunning: true,
      initialDuration: durationMs,
      remainingTime: durationMs,
      displayTime: durationMs,
      endTime: Date.now() + durationMs,
    });
  };

  const pauseCountdown = () => {
    if (countdown.isRunning && countdown.endTime) {
      const left = countdown.endTime - Date.now();
      const finalLeft = left > 0 ? left : 0;
      setCountdown((prev) => ({
        ...prev,
        isRunning: false,
        remainingTime: finalLeft,
        displayTime: finalLeft,
        endTime: null,
      }));
    }
  };

  const resumeCountdown = () => {
    if (!countdown.isRunning && countdown.remainingTime > 0) {
      setCountdown((prev) => ({
        ...prev,
        isRunning: true,
        endTime: Date.now() + prev.remainingTime,
        displayTime: prev.remainingTime,
      }));
    }
  };

  const resetCountdown = () => {
    setCountdown((prev) => ({
      isRunning: false,
      endTime: null,
      remainingTime: prev.initialDuration,
      initialDuration: prev.initialDuration,
      displayTime: prev.initialDuration,
    }));
  };

  // --- Pomodoro Logic ---
  const [pomodoro, setPomodoro] = useState<PomodoroState>({
    isRunning: false,
    mode: 'work',
    endTime: null,
    remainingTime: POMODORO_TIMES.work,
    duration: POMODORO_TIMES.work,
    displayTime: POMODORO_TIMES.work,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (pomodoro.isRunning && pomodoro.endTime) {
      interval = setInterval(() => {
        const left = pomodoro.endTime! - Date.now();
        if (left <= 0) {
          setPomodoro((prev) => ({
            ...prev,
            isRunning: false,
            remainingTime: 0,
            displayTime: 0,
            endTime: null,
          }));
        } else {
          setPomodoro((prev) => ({ ...prev, displayTime: left }));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [pomodoro.isRunning, pomodoro.endTime]);

  const startPomodoro = () => {
    if (!pomodoro.isRunning) {
      const durationToUse =
        pomodoro.remainingTime > 0 ? pomodoro.remainingTime : pomodoro.duration;
      setPomodoro((prev) => ({
        ...prev,
        isRunning: true,
        endTime: Date.now() + durationToUse,
        displayTime: durationToUse,
      }));
    }
  };

  const pausePomodoro = () => {
    if (pomodoro.isRunning && pomodoro.endTime) {
      const left = pomodoro.endTime - Date.now();
      const finalLeft = left > 0 ? left : 0;
      setPomodoro((prev) => ({
        ...prev,
        isRunning: false,
        remainingTime: finalLeft,
        displayTime: finalLeft,
        endTime: null,
      }));
    }
  };

  const resetPomodoro = () => {
    setPomodoro((prev) => ({
      ...prev,
      isRunning: false,
      endTime: null,
      remainingTime: prev.duration,
      displayTime: prev.duration,
    }));
  };

  const setPomodoroMode = (mode: PomodoroMode) => {
    setPomodoro({
      isRunning: false,
      mode: mode,
      endTime: null,
      remainingTime: POMODORO_TIMES[mode],
      duration: POMODORO_TIMES[mode],
      displayTime: POMODORO_TIMES[mode],
    });
  };

  // --- Todo List Logic ---
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('nc_tools_todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nc_tools_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // --- World Clock Logic ---
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>(() => {
    const saved = localStorage.getItem('nc_tools_clocks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nc_tools_clocks', JSON.stringify(worldClocks));
  }, [worldClocks]);

  const addWorldClock = (timezone: string, label: string) => {
    setWorldClocks((prev) => [
      ...prev,
      { id: Date.now().toString(), timezone, label },
    ]);
  };

  const removeWorldClock = (id: string) => {
    setWorldClocks((prev) => prev.filter((clock) => clock.id !== id));
  };

  // --- Notes Logic ---
  const [notesContent, setNotesContent] = useState<string>(() => {
    return localStorage.getItem('nc_tools_notes') || '';
  });

  useEffect(() => {
    localStorage.setItem('nc_tools_notes', notesContent);
  }, [notesContent]);

  const updateNotes = (content: string) => {
    setNotesContent(content);
  };

  return (
    <ToolsContext.Provider
      value={{
        stopwatch,
        startStopwatch,
        pauseStopwatch,
        resetStopwatch,

        countdown,
        startCountdown,
        pauseCountdown,
        resumeCountdown,
        resetCountdown,

        pomodoro,
        startPomodoro,
        pausePomodoro,
        resetPomodoro,
        setPomodoroMode,

        todos,
        addTodo,
        toggleTodo,
        deleteTodo,

        worldClocks,
        addWorldClock,
        removeWorldClock,

        notesContent,
        updateNotes,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};
