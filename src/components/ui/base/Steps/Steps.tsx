'use client';

import React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps } from 'antd';
import { cn } from '@/utils/cn';

export interface StepsProps extends Omit<AntStepsProps, 'size' | 'direction'> {
  variant?: 'default' | 'navigation' | 'inline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const stepVariants = {
  default: '',
  navigation: '',
  inline: '',
};

// Mobile-first sizes
const stepSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// Map our size to Ant Design size
const sizeMap: Record<string, 'small' | 'default' | undefined> = {
  xs: 'small',
  sm: 'small',
  md: 'default',
  lg: 'default',
};

export const Steps: React.FC<StepsProps> = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const stepsClasses = cn(stepVariants[variant], stepSizes[size], className);

  const stepsProps = {
    ...props,
    size: sizeMap[size],
    responsive: true, // Always enable responsive for mobile
    className: stepsClasses,
  } as AntStepsProps;

  return <AntSteps {...stepsProps} />;
};

export default Steps;

