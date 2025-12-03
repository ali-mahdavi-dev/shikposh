'use client';

import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface CardProps extends Omit<AntCardProps, 'size' | 'variant'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-white border-gray-200',
  elevated: 'bg-white shadow-lg border-0',
  outlined: 'bg-white border-2 border-gray-300',
  filled: 'bg-gray-50 border-gray-200',
  gradient: 'bg-gradient-to-br from-white to-gray-50 border-gray-200',
};

// Mobile-first padding
const cardSizes = {
  sm: 'p-3 md:p-4', // Mobile: 12px, Desktop: 16px
  md: 'p-4 md:p-6', // Mobile: 16px, Desktop: 24px
  lg: 'p-5 md:p-8', // Mobile: 20px, Desktop: 32px
  xl: 'p-6 md:p-10', // Mobile: 24px, Desktop: 40px
};

const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  rounded = true,
  shadow = 'sm',
  hover = true,
  animation = true,
  motionProps,
  className,
  children,
  ...props
}) => {
  const cardClasses = cn(
    'transition-all duration-300',
    cardVariants[variant],
    cardSizes[size],
    shadowClasses[shadow],
    rounded && 'rounded-xl md:rounded-2xl', // Mobile: 12px, Desktop: 16px
    hover && 'hover:shadow-lg hover:-translate-y-1',
    className,
  );

  if (animation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionCard = motion(AntCard as any);
    return (
      <MotionCard
        {...(props as any)}
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...(motionProps as any)}
      >
        {children}
      </MotionCard>
    );
  }

  return (
    <AntCard {...props} className={cardClasses}>
      {children}
    </AntCard>
  );
};

export default Card;
