import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface BaseCardProps extends Omit<AntCardProps, 'size'> {
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

const cardSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

export const BaseCard: React.FC<BaseCardProps> = ({
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
    rounded && 'rounded-2xl',
    hover && 'hover:shadow-lg hover:-translate-y-1',
    className,
  );

  const CardComponent = animation ? motion(AntCard) : AntCard;

  const cardProps = {
    ...props,
    className: cardClasses,
    ...(animation && {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      ...motionProps,
    }),
  };

  return <CardComponent {...cardProps}>{children}</CardComponent>;
};

export default BaseCard;
