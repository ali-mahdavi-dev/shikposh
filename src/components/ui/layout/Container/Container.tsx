'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  fluid?: boolean;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = '2xl',
  fluid = false,
  centered = true,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'w-full',
        // Mobile-first padding
        'px-2 sm:px-4 md:px-6 lg:px-8',
        // Max width
        !fluid && maxWidthClasses[maxWidth],
        // Centering
        centered && !fluid && 'mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;

