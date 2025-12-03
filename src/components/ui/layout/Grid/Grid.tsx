'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  animation?: boolean;
  className?: string;
  children: React.ReactNode;
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

// Mobile-first gaps
const gridGaps = {
  none: 'gap-0',
  sm: 'gap-2 md:gap-3', // Mobile: 8px, Desktop: 12px
  md: 'gap-3 md:gap-4', // Mobile: 12px, Desktop: 16px
  lg: 'gap-4 md:gap-6', // Mobile: 16px, Desktop: 24px
  xl: 'gap-6 md:gap-8', // Mobile: 24px, Desktop: 32px
};

// Mobile-first responsive grid
const responsiveGrid = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
  12: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12',
};

export const Grid: React.FC<GridProps> = ({
  cols = 3,
  gap = 'md',
  responsive = true,
  animation = true,
  className,
  children,
}) => {
  const gridClasses = cn(
    'grid',
    responsive ? responsiveGrid[cols] : gridCols[cols],
    gridGaps[gap],
    animation && 'animate-fade-in',
    className,
  );

  return <div className={gridClasses}>{children}</div>;
};

export default Grid;

