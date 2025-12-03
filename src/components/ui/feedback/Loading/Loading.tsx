'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { cn } from '@/utils/cn';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'inline' | 'fullPage';
  text?: string;
  className?: string;
}

const sizeConfig = {
  sm: { iconSize: 16, textSize: 'text-sm' },
  md: { iconSize: 24, textSize: 'text-base' },
  lg: { iconSize: 32, textSize: 'text-lg' },
};

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  className,
}) => {
  const config = sizeConfig[size];
  const icon = <LoadingOutlined style={{ fontSize: config.iconSize }} spin />;

  // Map our size to Ant Design Spin size
  const spinSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'default';

  if (variant === 'fullPage') {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm',
          className,
        )}
      >
        <Spin size="large" indicator={icon} />
        {text && <p className={cn('mt-4 text-gray-600', config.textSize)}>{text}</p>}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <Spin size="small" indicator={icon} />
        {text && <span className={cn('text-gray-600', config.textSize)}>{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <Spin size={spinSize} indicator={icon} />
      {text && <p className={cn('mt-2 text-gray-600', config.textSize)}>{text}</p>}
    </div>
  );
};

export default Loading;
