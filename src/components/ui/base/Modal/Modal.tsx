'use client';

import React from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ModalProps extends Omit<AntModalProps, 'size'> {
  variant?: 'default' | 'centered' | 'fullscreen' | 'drawer';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  rounded?: boolean;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const modalVariants = {
  default: 'rounded-xl md:rounded-2xl',
  centered: 'rounded-xl md:rounded-2xl',
  fullscreen: 'rounded-none m-0 max-w-full h-full',
  drawer: 'rounded-t-2xl',
};

// Mobile-first sizes (fullscreen on mobile for better UX)
const modalSizes = {
  xs: 'w-[90%] max-w-xs md:max-w-xs',
  sm: 'w-[90%] max-w-sm md:max-w-sm',
  md: 'w-[95%] max-w-md md:max-w-md',
  lg: 'w-[95%] max-w-lg md:max-w-lg',
  xl: 'w-[95%] max-w-xl md:max-w-xl',
  full: 'w-full h-full max-w-full m-0',
};

export const Modal: React.FC<ModalProps> = ({
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
    rounded && variant !== 'fullscreen' && 'rounded-xl md:rounded-2xl',
    className,
  );

  // On mobile, make modals more mobile-friendly
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileProps = isMobile
    ? {
        width: '100%',
        style: { maxWidth: '100%', margin: 0, top: 0, paddingBottom: 0 },
      }
    : {};

  const ModalComponent = animation ? motion(AntModal) : AntModal;

  const modalProps = {
    ...props,
    ...mobileProps,
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

export default Modal;

