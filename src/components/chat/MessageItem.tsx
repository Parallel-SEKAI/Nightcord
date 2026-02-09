import React from 'react';
import type { Message, User } from '../../types';
import { users, currentUser } from '../../data/mock';
import { Avatar } from '../ui/Avatar';
import { AudioPlayer } from './AudioPlayer';

interface MessageItemProps {
  message: Message;
  isContinuation?: boolean;
}

// Define the fallback AI user for error cases
const SYSTEM_USER: User = users['system'];

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isContinuation = false,
}) => {
  // Look up the user from mock users, or use the AI user if it's the AI or unknown user
  let user = users[message.userId];

  if (message.userId === 'me') {
    user = currentUser;
  }

  // If the user is not found in the mock data, use the AI user as fallback
  if (!user && message.userId === 'system') {
    user = SYSTEM_USER;
  }

  // If still no user found, return null to not display the message
  if (!user) return null;

  return (
    <div
      className={`group px-4 py-1 hover:bg-black/10 flex gap-4 ${isContinuation ? 'mt-0' : 'mt-4'}`}
    >
      {!isContinuation ? (
        <div className="flex-shrink-0 cursor-pointer mt-0.5">
          <Avatar user={user} size="md" showStatus={false} />
        </div>
      ) : (
        <div className="w-8 flex-shrink-0 text-xs text-nc-text-muted opacity-0 group-hover:opacity-100 text-right select-none">
          {/* Timestamp hover only */}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {!isContinuation && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-nc-text-primary hover:underline cursor-pointer">
              {user.name}
            </span>
            <span className="text-xs text-nc-text-muted">
              {message.timestamp}
            </span>
          </div>
        )}

        <div
          className={`text-nc-text-primary/90 whitespace-pre-wrap ${!isContinuation ? 'mt-1' : ''}`}
        >
          {message.content}
          {message.attachment && message.attachment.type === 'audio' && (
            <AudioPlayer attachment={message.attachment} />
          )}
        </div>
      </div>
    </div>
  );
};
