import React from 'react';
import {
  ChevronDown,
  Mic,
  Headphones,
  Settings,
  Music,
  Calendar,
  Timer,
  Watch,
  Clock,
  Calculator,
  CheckSquare,
  ArrowRightLeft,
  Globe,
  FileText,
} from 'lucide-react';
import { voiceUsers } from '../../data/mock';
import { Avatar } from '../ui/Avatar';
import { useConfig } from '../../context/ConfigContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const {
    openSettings,
    openMusicSelection,
    openCalendar,
    openStopwatch,
    openCountdown,
    openPomodoro,
    openCalculator,
    openTodoList,
    openUnitConverter,
    openWorldClock,
    openNotes,
  } = useConfig();

  return (
    <div className="w-64 bg-nc-bg-sidebar flex flex-col h-full border-r border-nc-separator">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center justify-between shadow-sm hover:bg-nc-bg-hover transition-colors cursor-pointer border-b border-nc-separator">
        <h1 className="font-bold text-nc-text-primary text-sm truncate">
          25時、ナイトコードで。
        </h1>
        <ChevronDown size={16} className="text-nc-text-primary" />
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1">
        {/* Active Channel */}
        <div className="px-2">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-nc-bg-hover rounded text-nc-text-primary cursor-pointer">
            <span className="text-lg leading-none">☾</span>{' '}
            {/* Placeholder for moon icon */}
            <span className="font-medium text-sm">{t('sidebar.work')}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="pt-4">
          <div className="flex items-center px-4 pb-1 text-xs font-semibold text-nc-text-secondary uppercase hover:text-nc-text-primary cursor-pointer">
            <ChevronDown size={12} className="mr-0.5" />
            {t('sidebar.voiceChat')}
          </div>

          {/* Voice Users List */}
          <div className="space-y-0.5 px-2 mt-1">
            {voiceUsers.map((user) => (
              <div
                key={user.id}
                className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-nc-bg-hover cursor-pointer text-nc-text-secondary hover:text-nc-text-primary"
              >
                <div className="flex items-center gap-2">
                  <Avatar user={user} size="sm" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                {/* Icons only show on hover in real Discord, but here we show Mic for style match */}
                <Mic size={14} className="text-nc-text-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center px-4 pb-1 text-xs font-semibold text-nc-text-secondary uppercase hover:text-nc-text-primary cursor-pointer">
            <ChevronDown size={12} className="mr-0.5 -rotate-90" />
            {t('sidebar.offline')}
          </div>
        </div>
      </div>

      {/* User Controls (Bottom Bar) - Optional but typical for Discord clones */}
      <div className="h-14 bg-nc-bg-sidebar px-2 flex items-center justify-between border-t border-nc-separator">
        {/* Simplified User Area */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-nc-bg-hover cursor-pointer outline-none"
              title="User Settings"
            >
              <Avatar
                user={{
                  id: 'me',
                  name: 'Me',
                  avatar: '',
                  status: 'online',
                }}
                size="sm"
              />
              <div className="text-xs">
                <div className="font-bold text-nc-text-primary">Me</div>
                <div className="text-nc-text-secondary text-[10px]">#1234</div>
              </div>
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-[#111214] rounded-md px-1 py-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade border border-nc-separator z-50 mb-2"
              sideOffset={5}
              align="start"
            >
              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openMusicSelection}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Music size={14} />
                </div>
                {t('sidebar.music')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openCalendar}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Calendar size={14} />
                </div>
                {t('sidebar.calendar')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openStopwatch}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Watch size={14} />
                </div>
                {t('sidebar.stopwatch')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openCountdown}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Timer size={14} />
                </div>
                {t('sidebar.countdown')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openPomodoro}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Clock size={14} />
                </div>
                {t('sidebar.pomodoro')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openCalculator}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Calculator size={14} />
                </div>
                {t('sidebar.calculator')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openTodoList}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <CheckSquare size={14} />
                </div>
                {t('sidebar.todoList')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openUnitConverter}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <ArrowRightLeft size={14} />
                </div>
                {t('sidebar.converter')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openWorldClock}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Globe size={14} />
                </div>
                {t('sidebar.worldClock')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openNotes}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <FileText size={14} />
                </div>
                {t('sidebar.notes')}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="group text-sm leading-none text-nc-text-primary rounded-[3px] flex items-center h-[32px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[highlighted]:text-white cursor-pointer"
                onClick={openSettings}
              >
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Settings size={14} />
                </div>
                {t('sidebar.settings')}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div className="flex items-center gap-3 pr-2">
          <Mic
            size={18}
            className="text-nc-text-primary cursor-pointer hover:text-gray-200"
          />
          <Headphones
            size={18}
            className="text-nc-text-primary cursor-pointer hover:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
};
