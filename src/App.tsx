import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/chat/ChatArea';
import { ConfigProvider } from './context/ConfigContext';
import { ChatProvider } from './context/ChatContext';
import { PlayerProvider } from './context/PlayerContext';
import { ToolsProvider } from './context/ToolsContext';
import { SettingsModal } from './components/settings/SettingsModal';
import { MusicSelectionModal } from './components/music/MusicSelectionModal';
import { CalendarModal } from './components/tools/CalendarModal';
import { StopwatchModal } from './components/tools/StopwatchModal';
import { CountdownModal } from './components/tools/CountdownModal';
import { PomodoroModal } from './components/tools/PomodoroModal';
import { CalculatorModal } from './components/tools/CalculatorModal';
import { TodoListModal } from './components/tools/TodoListModal';
import { UnitConverterModal } from './components/tools/UnitConverterModal';
import { WorldClockModal } from './components/tools/WorldClockModal';
import { NotesModal } from './components/tools/NotesModal';
import { GlobalPlayer } from './components/player/GlobalPlayer';

function App() {
  return (
    <ConfigProvider>
      <ChatProvider>
        <PlayerProvider>
          <ToolsProvider>
            <div className="flex h-screen w-screen overflow-hidden bg-nc-bg-main text-nc-text-primary">
              <Sidebar />
              <ChatArea />
              <SettingsModal />
              <MusicSelectionModal />
              <CalendarModal />
              <StopwatchModal />
              <CountdownModal />
              <PomodoroModal />
              <CalculatorModal />
              <TodoListModal />
              <UnitConverterModal />
              <WorldClockModal />
              <NotesModal />
              <GlobalPlayer />
            </div>
          </ToolsProvider>
        </PlayerProvider>
      </ChatProvider>
    </ConfigProvider>
  );
}

export default App;
