import React from 'react';
import type { User } from '../../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 'md',
  showStatus = true,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className="relative inline-block">
      <div
        className={`rounded-full overflow-hidden ${sizeClasses[size]} ring-2 ring-offset-2 ring-offset-nc-bg-sidebar ${user.accentColor ? user.accentColor.replace('bg-', 'ring-') : 'ring-gray-500'} flex items-center justify-center bg-gray-600`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      {showStatus && user.status !== 'offline' && (
        <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-nc-green ring-2 ring-nc-bg-sidebar" />
      )}
    </div>
  );
};
