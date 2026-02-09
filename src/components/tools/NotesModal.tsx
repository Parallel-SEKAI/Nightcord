import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';

export const NotesModal: React.FC = () => {
  const { isNotesOpen, closeNotes } = useConfig();
  const { notesContent, updateNotes } = useTools();

  return (
    <ToolsModalWrapper
      title="Notes"
      isOpen={isNotesOpen}
      onClose={closeNotes}
      width="w-[500px]"
      height="h-[600px]"
    >
      <div className="h-full flex flex-col">
        <textarea
          value={notesContent}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder="Type your notes here..."
          className="flex-1 w-full bg-nc-bg-sidebar text-nc-text-primary p-4 rounded border border-nc-separator focus:outline-none focus:border-indigo-500 resize-none font-mono text-sm leading-relaxed"
        />
        <div className="mt-2 text-xs text-nc-text-secondary text-right">
          Auto-saved
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
