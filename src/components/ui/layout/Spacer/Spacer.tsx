'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

// Mobile-first spacing
const spacingClasses = {
  xs: 'py-1 md:py-2', // Mobile: 4px, Desktop: 8px
  sm: 'py-2 md:py-3', // Mobile: 8px, Desktop: 12px
  md: 'py-3 md:py-4', // Mobile: 12px, Desktop: 16px
  lg: 'py-4 md:py-6', // Mobile: 16px, Desktop: 24px
  xl: 'py-6 md:py-8', // Mobile: 24px, Desktop: 32px
  '2xl': 'py-8 md:py-12', // Mobile: 32px, Desktop: 48px
  '3xl': 'py-12 md:py-16', // Mobile: 48px, Desktop: 64px
};

const horizontalSpacingClasses = {
  xs: 'px-1 md:px-2',
  sm: 'px-2 md:px-3',
  md: 'px-3 md:px-4',
  lg: 'px-4 md:px-6',
  xl: 'px-6 md:px-8',
  '2xl': 'px-8 md:px-12',
  '3xl': 'px-12 md:px-16',
};

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  direction = 'vertical',
  className,
}) => {
  const classes = direction === 'vertical' ? spacingClasses[size] : horizontalSpacingClasses[size];

  return <div className={cn(classes, className)} />;
};

export default Spacer;
