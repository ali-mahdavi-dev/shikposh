'use client';

import React from 'react';
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';
import { cn } from '@/utils/cn';

export interface BadgeProps extends Omit<AntBadgeProps, 'size'> {
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'round' | 'square' | 'pill';
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-pink-100 text-pink-800 border-pink-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

const badgeSizes = {
  sm: 'text-xs px-2 py-0.5 min-h-[18px]',
  md: 'text-sm px-2.5 py-1 min-h-[22px]',
  lg: 'text-base px-3 py-1.5 min-h-[26px]',
};

const shapeClasses = {
  round: 'rounded-full',
  square: 'rounded-md',
  pill: 'rounded-full px-3',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  shape = 'round',
  dot = false,
  count,
  showZero = false,
  className,
  children,
  ...props
}) => {
  // If dot variant, use Ant Badge dot
  if (dot) {
    return (
      <AntBadge dot className={cn(badgeVariants[variant], className)} {...props}>
        {children}
      </AntBadge>
    );
  }

  // If count variant, use Ant Badge count
  if (count !== undefined) {
    return (
      <AntBadge
        count={count}
        showZero={showZero}
        className={cn(badgeVariants[variant], className)}
        {...props}
      >
        {children}
      </AntBadge>
    );
  }

  // Custom badge with text
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center border font-medium',
        badgeVariants[variant],
        badgeSizes[size],
        shapeClasses[shape],
        className,
      )}
      {...(props as any)}
    >
      {children}
    </span>
  );
};

export default Badge;
