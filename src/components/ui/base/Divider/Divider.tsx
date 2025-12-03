'use client';

import React from 'react';
import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd';
import { cn } from '@/utils/cn';

export interface DividerProps extends Omit<AntDividerProps, 'size' | 'type' | 'variant'> {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'my-2',
  md: 'my-4 md:my-6', // Mobile: 16px, Desktop: 24px
  lg: 'my-6 md:my-8', // Mobile: 24px, Desktop: 32px
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  size = 'md',
  text,
  className,
  ...props
}) => {
  return (
    <AntDivider
      type={variant === 'vertical' ? 'vertical' : 'horizontal'}
      orientation={text ? 'left' : undefined}
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      {text && <span className="text-sm text-gray-500 md:text-base">{text}</span>}
    </AntDivider>
  );
};

export default Divider;
