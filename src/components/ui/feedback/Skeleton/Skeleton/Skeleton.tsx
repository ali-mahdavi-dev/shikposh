'use client';

import React from 'react';
import { Skeleton as AntSkeleton, SkeletonProps as AntSkeletonProps } from 'antd';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends Omit<AntSkeletonProps, 'active'> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = true,
  className,
  ...props
}) => {
  if (variant === 'circular') {
    return (
      <AntSkeleton.Avatar
        active={animation}
        shape="circle"
        size={width || height || 40}
        className={className}
        {...props}
      />
    );
  }

  if (variant === 'rectangular' || variant === 'rounded') {
    return (
      <AntSkeleton.Button
        active={animation}
        block
        shape={variant === 'rounded' ? 'round' : 'default'}
        style={{ width, height: height || 20 }}
        className={cn('!h-auto', className)}
        {...props}
      />
    );
  }

  // Text variant with multiple lines
  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <AntSkeleton
            key={index}
            active={animation}
            paragraph={{ rows: 1, width: index === lines - 1 ? '60%' : '100%' }}
            title={false}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <AntSkeleton
      active={animation}
      paragraph={{ rows: 1, width }}
      title={false}
      className={className}
      {...props}
    />
  );
};

export default Skeleton;

