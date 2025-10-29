import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface BaseButtonProps extends Omit<AntButtonProps, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
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
    'bg-gradient-to-r from-pink-500 to-purple-600 border-0 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl',
  secondary: 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300',
  outline:
    'border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50 hover:border-pink-600',
  ghost: 'border-0 text-gray-600 hover:text-pink-600 hover:bg-pink-50',
  danger: 'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600',
  success: 'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600',
};

const buttonSizes = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
  xl: 'h-14 px-10 text-lg',
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = true,
  gradient = false,
  animation = true,
  motionProps,
  className,
  children,
  ...props
}) => {
  const baseClasses = cn(
    'font-medium transition-all duration-300 flex items-center justify-center gap-2',
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && 'w-full',
    rounded && 'rounded-xl',
    gradient && 'bg-gradient-to-r from-pink-500 to-purple-600',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  const ButtonComponent = animation ? motion.button : 'button';

  const buttonProps = {
    className: baseClasses,
    disabled: disabled || loading,
    ...(animation && {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      ...motionProps,
    }),
  };

  return (
    <AntButton {...props} {...buttonProps} loading={loading} className={baseClasses}>
      {children}
    </AntButton>
  );
};

export default BaseButton;
