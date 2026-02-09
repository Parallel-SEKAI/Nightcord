import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';

export const CalculatorModal: React.FC = () => {
  const { isCalculatorOpen, closeCalculator } = useConfig();
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [resetNext, setResetNext] = useState(false);

  const handleNumber = (num: string) => {
    if (resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setResetNext(false);
  };

  const handleEqual = () => {
    try {
      // Basic evaluation safely
      const result = new Function('return ' + expression + display)();
      setDisplay(String(result));
      setExpression('');
      setResetNext(true);
    } catch {
      setDisplay('Error');
      setResetNext(true);
    }
  };

  const buttons = [
    {
      label: 'C',
      onClick: handleClear,
      className: 'col-span-1 bg-red-500 hover:bg-red-600 text-white',
    },
    {
      label: '÷',
      onClick: () => handleOperator('/'),
      className: 'bg-nc-bg-hover text-nc-text-primary',
    },
    {
      label: '×',
      onClick: () => handleOperator('*'),
      className: 'bg-nc-bg-hover text-nc-text-primary',
    },
    {
      label: '-',
      onClick: () => handleOperator('-'),
      className: 'bg-nc-bg-hover text-nc-text-primary',
    },
    {
      label: '7',
      onClick: () => handleNumber('7'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '8',
      onClick: () => handleNumber('8'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '9',
      onClick: () => handleNumber('9'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '+',
      onClick: () => handleOperator('+'),
      className: 'bg-nc-bg-hover text-nc-text-primary',
    },
    {
      label: '4',
      onClick: () => handleNumber('4'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '5',
      onClick: () => handleNumber('5'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '6',
      onClick: () => handleNumber('6'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '=',
      onClick: handleEqual,
      className:
        'row-span-2 bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center h-full',
    },
    {
      label: '1',
      onClick: () => handleNumber('1'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '2',
      onClick: () => handleNumber('2'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '3',
      onClick: () => handleNumber('3'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '0',
      onClick: () => handleNumber('0'),
      className: 'col-span-2 bg-nc-bg-sidebar text-nc-text-primary',
    },
    {
      label: '.',
      onClick: () => handleNumber('.'),
      className: 'bg-nc-bg-sidebar text-nc-text-primary',
    },
  ];

  return (
    <ToolsModalWrapper
      title="Calculator"
      isOpen={isCalculatorOpen}
      onClose={closeCalculator}
      width="w-[300px]"
    >
      <div className="flex flex-col gap-4">
        <div className="bg-nc-bg-hover p-4 rounded text-right overflow-hidden">
          <div className="text-xs text-nc-text-secondary h-4">{expression}</div>
          <div className="text-3xl font-bold text-nc-text-primary truncate">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 h-80">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`rounded font-semibold text-xl transition-colors active:scale-95 ${btn.className}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
