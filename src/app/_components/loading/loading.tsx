"use client";
import React from 'react';
import { Spin, Skeleton } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface LoadingProps {
  type?: 'spinner' | 'skeleton' | 'dots' | 'pulse';
  size?: 'small' | 'default' | 'large';
  text?: string;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children?: React.ReactNode;
}

const loadingTypes = {
  spinner: 'flex items-center justify-center',
  skeleton: 'space-y-3',
  dots: 'flex items-center justify-center space-x-2',
  pulse: 'animate-pulse',
};

const loadingSizes = {
  small: 'text-sm',
  default: 'text-base',
  large: 'text-lg',
};

export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'default',
  text,
  animation = true,
  motionProps,
  className,
  children,
}) => {
  const loadingClasses = cn(loadingTypes[type], loadingSizes[size], className);

  const LoadingComponent = animation ? motion.div : 'div';

  const loadingProps = {
    className: loadingClasses,
    ...(animation && {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      ...motionProps,
    }),
  } as any;

  const renderLoading = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Spin size={size} />
            {text && <p className="text-gray-600">{text}</p>}
          </div>
        );
      case 'skeleton':
        return (
          <div className="space-y-3">
            <Skeleton active paragraph={{ rows: 3 }} />
            {text && <p className="text-center text-gray-600">{text}</p>}
          </div>
        );
      case 'dots':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-pink-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            {text && <p className="text-gray-600">{text}</p>}
          </div>
        );
      case 'pulse':
        return (
          <div className="space-y-3">
            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
            {text && <p className="text-center text-gray-600">{text}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return <LoadingComponent {...loadingProps}>{children || renderLoading()}</LoadingComponent>;
};

export default Loading;

