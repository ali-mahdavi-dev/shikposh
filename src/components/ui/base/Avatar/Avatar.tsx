'use client';

import React from 'react';
import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';
import { cn } from '@/utils/cn';

export interface AvatarProps extends Omit<AntAvatarProps, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  src?: string;
  icon?: React.ReactNode;
  text?: string;
  badge?: {
    count?: number;
    dot?: boolean;
    color?: string;
  };
  className?: string;
}

const avatarSizes = {
  xs: 24, // Mobile: 24px
  sm: 32, // Mobile: 32px, Desktop: 40px
  md: 40, // Mobile: 40px, Desktop: 48px
  lg: 56, // Mobile: 56px, Desktop: 64px
  xl: 80, // Mobile: 80px, Desktop: 96px
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  shape = 'circle',
  src,
  icon,
  text,
  badge,
  className,
  ...props
}) => {
  const avatarSize = avatarSizes[size];

  return (
    <AntAvatar
      size={avatarSize}
      shape={shape}
      src={src}
      icon={icon}
      className={cn(className)}
      {...props}
    >
      {text && text}
      {badge && (
        <AntAvatar
          size="small"
          style={{
            backgroundColor: badge.color || '#ec4899',
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          {badge.dot ? '•' : badge.count}
        </AntAvatar>
      )}
    </AntAvatar>
  );
};

export default Avatar;

