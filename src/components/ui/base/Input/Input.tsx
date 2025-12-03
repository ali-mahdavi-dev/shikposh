'use client';

import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { cn } from '@/utils/cn';

export interface InputProps extends Omit<AntInputProps, 'size' | 'status' | 'variant'> {
  variant?: 'default' | 'filled' | 'outlined' | 'borderless';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'default' | 'error' | 'warning' | 'success';
  rounded?: boolean;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const inputVariants = {
  default: 'border-gray-200 hover:border-pink-300 focus:border-pink-500',
  filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-pink-500',
  outlined: 'border-2 border-gray-300 hover:border-pink-400 focus:border-pink-500',
  borderless: 'border-0 bg-transparent hover:bg-gray-50 focus:bg-white focus:border-pink-500',
};

// Mobile-first sizes (minimum 44px height for touch targets)
const inputSizes = {
  xs: 'h-10 px-3 text-xs md:h-11 md:px-4', // Mobile: 40px, Desktop: 44px
  sm: 'h-11 px-4 text-sm md:h-12 md:px-5', // Mobile: 44px, Desktop: 48px
  md: 'h-12 px-4 text-sm md:h-14 md:px-6 md:text-base', // Mobile: 48px, Desktop: 56px
  lg: 'h-14 px-6 text-base md:h-16 md:px-8 md:text-lg', // Mobile: 56px, Desktop: 64px
  xl: 'h-16 px-8 text-lg md:h-20 md:px-10 md:text-xl', // Mobile: 64px, Desktop: 80px
};

const statusClasses = {
  default: '',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
  warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
};

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  status = 'default',
  rounded = true,
  className,
  label,
  error,
  helperText,
  required = false,
  multiline = false,
  rows = 4,
  ...props
}) => {
  const inputClasses = cn(
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
    inputVariants[variant],
    inputSizes[size],
    statusClasses[status],
    rounded && 'rounded-xl',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    className,
  );

  const inputProps = {
    ...props,
    className: inputClasses,
  };

  // TextArea compatible props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { prefix, suffix, addonBefore, addonAfter, type, ...textAreaCompatibleProps } = props;
  const textAreaProps = {
    className: inputClasses,
    rows,
    ...(textAreaCompatibleProps as unknown as Partial<TextAreaProps>),
  } as TextAreaProps;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 md:text-base">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {multiline ? (
        <AntInput.TextArea {...textAreaProps} />
      ) : (
        <AntInput {...inputProps} />
      )}
      {error && <p className="text-xs text-red-500 md:text-sm">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-gray-500 md:text-sm">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

