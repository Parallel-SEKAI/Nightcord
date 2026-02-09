import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { useTranslation } from 'react-i18next';

export const CalendarModal: React.FC = () => {
  const { isCalendarOpen, closeCalendar } = useConfig();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { t } = useTranslation();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthKeys = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const dayKeys = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <ToolsModalWrapper
      title={t('calendar.title')}
      isOpen={isCalendarOpen}
      onClose={closeCalendar}
      width="w-[350px]"
    >
      <div className="flex flex-col items-center">
        {/* Navigation */}
        <div className="flex items-center justify-between w-full mb-4">
          <button
            onClick={prevMonth}
            className="p-1 rounded hover:bg-nc-bg-hover text-nc-text-secondary hover:text-nc-text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-bold text-nc-text-primary">
            {t(`calendar.months.${monthKeys[currentDate.getMonth()]}`)}{' '}
            {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded hover:bg-nc-bg-hover text-nc-text-secondary hover:text-nc-text-primary"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 w-full mb-2 text-center text-xs text-nc-text-muted font-bold">
          {dayKeys.map((day) => (
            <div key={day}>{t(`calendar.days.${day}`)}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 w-full gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const todayClass = isToday(day)
              ? 'bg-indigo-500 text-white font-bold'
              : 'text-nc-text-primary hover:bg-nc-bg-hover';
            return (
              <div
                key={day}
                className={`h-8 flex items-center justify-center rounded cursor-default text-sm ${todayClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
