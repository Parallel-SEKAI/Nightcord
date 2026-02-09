import React from 'react';
import { X } from 'lucide-react';

interface ToolsModalWrapperProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export const ToolsModalWrapper: React.FC<ToolsModalWrapperProps> = ({
  title,
  isOpen,
  onClose,
  children,
  width = 'w-[400px]',
  height = 'h-auto',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`${width} ${height} bg-nc-bg-main border border-nc-separator rounded-lg shadow-2xl flex flex-col relative`}
      >
        {/* Header */}
        <div className="p-4 border-b border-nc-separator flex items-center justify-between">
          <h2 className="text-xl font-bold text-nc-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-nc-text-secondary hover:text-nc-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};
