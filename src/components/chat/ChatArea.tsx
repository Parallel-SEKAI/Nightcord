import React, { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { useChat } from '../../context/ChatContext';
import { useTranslation } from 'react-i18next';

export const ChatArea: React.FC = () => {
  const { messages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 bg-nc-bg-main flex flex-col min-w-0">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between shadow-sm border-b border-nc-separator">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none text-nc-text-secondary">
            ☾
          </span>
          <h2 className="font-bold text-nc-text-primary">
            {t('chat.channelName')}
          </h2>
        </div>

        {/* Window Controls (Mac Style) */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col px-4 pt-4">
        <div className="flex-1" /> {/* Spacer to push messages down */}
        <div className="flex flex-col pb-4">
          {messages.map((msg, index) => {
            const prevMsg = messages[index - 1];

            // Let's just group by ID if sequence
            const isSequence = prevMsg && prevMsg.userId === msg.userId;

            return (
              <MessageItem
                key={msg.id}
                message={msg}
                isContinuation={isSequence}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
};
