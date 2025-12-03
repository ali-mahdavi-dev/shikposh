'use client';

import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { cn } from '@/utils/cn';

const { Option: AntOption } = AntSelect;

export interface SelectProps extends Omit<AntSelectProps, 'size' | 'variant'> {
  variant?: 'default' | 'filled' | 'outlined' | 'borderless';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  className?: string;
}

const selectVariants = {
  default: 'border-gray-200 hover:border-pink-300 focus:border-pink-500',
  filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-pink-500',
  outlined: 'border-2 border-gray-300 hover:border-pink-400 focus:border-pink-500',
  borderless: 'border-0 bg-transparent hover:bg-gray-50 focus:bg-white focus:border-pink-500',
};

// Mobile-first sizes (minimum 44px height for touch targets)
const selectSizes = {
  xs: 'h-10 text-xs md:h-11 md:text-sm', // Mobile: 40px, Desktop: 44px
  sm: 'h-11 text-sm md:h-12 md:text-base', // Mobile: 44px, Desktop: 48px
  md: 'h-12 text-sm md:h-14 md:text-base', // Mobile: 48px, Desktop: 56px
  lg: 'h-14 text-base md:h-16 md:text-lg', // Mobile: 56px, Desktop: 64px
  xl: 'h-16 text-lg md:h-20 md:text-xl', // Mobile: 64px, Desktop: 80px
};

// Map our size to Ant Design size
const sizeMap: Record<string, 'small' | 'middle' | 'large' | undefined> = {
  xs: 'small',
  sm: 'small',
  md: 'middle',
  lg: 'large',
  xl: 'large',
};

export const Select: React.FC<SelectProps> = ({
  variant = 'default',
  size = 'md',
  rounded = true,
  className,
  ...props
}) => {
  const selectClasses = cn(
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
    selectVariants[variant],
    selectSizes[size],
    rounded && 'rounded-xl',
    className,
  );

  const selectProps = {
    ...props,
    size: sizeMap[size],
    className: selectClasses,
    popupClassName: cn('select-dropdown', props.popupClassName),
  } as AntSelectProps;

  return <AntSelect {...selectProps} />;
};

// Export Option as well for convenience
export const Option = AntOption;

export default Select;
