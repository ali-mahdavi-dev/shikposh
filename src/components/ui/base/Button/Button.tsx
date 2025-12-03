'use client';

import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ButtonProps extends Omit<AntButtonProps, 'size' | 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-pink-500 to-purple-600 border-0 text-white hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-lg active:from-pink-700 active:to-purple-800',
  secondary:
    'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300 active:bg-gray-300',
  outline:
    'border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50 hover:border-pink-600 active:bg-pink-100',
  ghost: 'border-0 text-gray-600 hover:text-pink-600 hover:bg-pink-50 active:bg-pink-100',
  danger:
    'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 active:bg-red-700 shadow-md hover:shadow-lg',
  success:
    'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600 active:bg-green-700 shadow-md hover:shadow-lg',
  link: 'border-0 text-pink-500 hover:text-pink-600 underline-offset-4 hover:underline p-0 h-auto',
};

// Mobile-first sizes (minimum 44px for touch targets)
const buttonSizes = {
  xs: 'h-10 px-3 text-xs md:h-11 md:px-4', // Mobile: 40px, Desktop: 44px
  sm: 'h-11 px-4 text-sm md:h-12 md:px-5', // Mobile: 44px, Desktop: 48px
  md: 'h-12 px-5 text-sm md:h-14 md:px-6 md:text-base', // Mobile: 48px, Desktop: 56px
  lg: 'h-14 px-6 text-base md:h-16 md:px-8 md:text-lg', // Mobile: 56px, Desktop: 64px
  xl: 'h-16 px-8 text-lg md:h-20 md:px-10 md:text-xl', // Mobile: 64px, Desktop: 80px
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  rounded = true,
  gradient = false,
  animation = true,
  motionProps,
  className,
  children,
  disabled,
  loading,
  ...props
}) => {
  const baseClasses = cn(
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
    // Variant styles
    buttonVariants[variant],
    // Size styles (mobile-first)
    buttonSizes[size],
    // States
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    fullWidth && 'w-full',
    rounded && 'rounded-xl',
    gradient && variant === 'primary' && 'bg-gradient-to-r from-pink-500 to-purple-600',
    className,
  );

  const buttonProps = {
    ...props,
    className: baseClasses,
    disabled: disabled || loading || false,
    loading: loading || false,
  } as AntButtonProps;

  if (animation && !disabled && !loading) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...motionProps}
      >
        <AntButton {...buttonProps}>{children}</AntButton>
      </motion.div>
    );
  }

  return <AntButton {...buttonProps}>{children}</AntButton>;
};

export default Button;
