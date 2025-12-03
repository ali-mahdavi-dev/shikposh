'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  responsiveDirection?: {
    mobile?: 'row' | 'column';
    tablet?: 'row' | 'column';
    desktop?: 'row' | 'column';
  };
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const directionClasses = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// Mobile-first gaps
const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1 md:gap-2', // Mobile: 4px, Desktop: 8px
  sm: 'gap-2 md:gap-3', // Mobile: 8px, Desktop: 12px
  md: 'gap-3 md:gap-4', // Mobile: 12px, Desktop: 16px
  lg: 'gap-4 md:gap-6', // Mobile: 16px, Desktop: 24px
  xl: 'gap-6 md:gap-8', // Mobile: 24px, Desktop: 32px
};

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  responsiveDirection,
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md',
  className,
  children,
}) => {
  // Build responsive direction classes if provided
  let directionClass = directionClasses[direction];
  if (responsiveDirection) {
    if (responsiveDirection.mobile) {
      directionClass = directionClasses[responsiveDirection.mobile];
    }
    if (responsiveDirection.tablet) {
      directionClass += ` md:${directionClasses[responsiveDirection.tablet]}`;
    }
    if (responsiveDirection.desktop) {
      directionClass += ` lg:${directionClasses[responsiveDirection.desktop]}`;
    }
  }

  const flexClasses = cn(
    'flex',
    directionClass,
    alignClasses[align],
    justifyClasses[justify],
    wrap && 'flex-wrap',
    gapClasses[gap],
    className,
  );

  return <div className={flexClasses}>{children}</div>;
};

export default Flex;

