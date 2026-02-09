import React, { useState } from 'react';
import { Smile, File } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTranslation } from 'react-i18next';

export const ChatInput: React.FC = () => {
  const { sendMessage } = useChat();
  const [content, setContent] = useState('');
  const { t } = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim()) {
        sendMessage(content);
        setContent('');
      }
    }
  };

  return (
    <div className="px-4 pb-6 pt-2">
      <div className="bg-nc-bg-input rounded-lg flex items-center p-2.5 gap-3">
        {/* Input */}
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder', {
            channel: t('chat.channelName'),
          })}
          className="flex-1 bg-transparent text-nc-text-primary placeholder-nc-text-muted focus:outline-none font-medium"
        />

        {/* Right Actions */}
        <div className="flex items-center gap-3 text-nc-text-secondary">
          <button className="hover:text-nc-text-primary transition-colors font-bold text-xl leading-none">
            @
          </button>
          <button className="hover:text-nc-text-primary transition-colors font-bold text-lg leading-none">
            Aa
          </button>
          <button className="hover:text-nc-text-primary transition-colors">
            <Smile size={24} />
          </button>
          <button className="hover:text-nc-text-primary transition-colors">
            <File size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
