import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

const containerPadding = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  padding = 'md',
  centered = true,
  animation = true,
  motionProps,
  className,
  children,
}) => {
  const containerClasses = cn(
    'w-full',
    containerSizes[size],
    containerPadding[padding],
    centered && 'mx-auto',
    className,
  );

  const ContainerComponent = animation ? motion.div : 'div';

  const containerProps = {
    className: containerClasses,
    ...(animation && {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      ...motionProps,
    }),
  };

  return <ContainerComponent {...containerProps}>{children}</ContainerComponent>;
};

export default Container;
