import React from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface BaseModalProps extends Omit<AntModalProps, 'size'> {
  variant?: 'default' | 'centered' | 'fullscreen' | 'drawer';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  rounded?: boolean;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const modalVariants = {
  default: 'rounded-2xl',
  centered: 'rounded-2xl',
  fullscreen: 'rounded-none',
  drawer: 'rounded-t-2xl',
};

const modalSizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

export const BaseModal: React.FC<BaseModalProps> = ({
  variant = 'default',
  size = 'md',
  rounded = true,
  animation = true,
  motionProps,
  className,
  children,
  ...props
}) => {
  const modalClasses = cn(
    modalVariants[variant],
    modalSizes[size],
    rounded && 'rounded-2xl',
    className,
  );

  const ModalComponent = animation ? motion(AntModal) : AntModal;

  const modalProps = {
    ...props,
    className: modalClasses,
    ...(animation && {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.2 },
      ...motionProps,
    }),
  };

  return <ModalComponent {...modalProps}>{children}</ModalComponent>;
};

export default BaseModal;
