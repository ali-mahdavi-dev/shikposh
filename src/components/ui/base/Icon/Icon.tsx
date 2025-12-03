'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import * as HeroIcons from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
  animation?: boolean;
  motionProps?: MotionProps;
  onClick?: () => void;
}

const iconSizes = {
  xs: 'w-3 h-3 md:w-4 md:h-4', // Mobile: 12px, Desktop: 16px
  sm: 'w-4 h-4 md:w-5 md:h-5', // Mobile: 16px, Desktop: 20px
  md: 'w-5 h-5 md:w-6 md:h-6', // Mobile: 20px, Desktop: 24px
  lg: 'w-6 h-6 md:w-8 md:h-8', // Mobile: 24px, Desktop: 32px
  xl: 'w-8 h-8 md:w-10 md:h-10', // Mobile: 32px, Desktop: 40px
  '2xl': 'w-12 h-12 md:w-16 md:h-16', // Mobile: 48px, Desktop: 64px
};

// Icon name mapping to Heroicons component names
const iconNameMap: Record<string, keyof typeof HeroIcons> = {
  home: 'HomeIcon',
  user: 'UserIcon',
  cart: 'ShoppingCartIcon',
  heart: 'HeartIcon',
  search: 'MagnifyingGlassIcon',
  menu: 'Bars3Icon',
  close: 'XMarkIcon',
  'arrow-right': 'ArrowRightIcon',
  'arrow-left': 'ArrowLeftIcon',
  'arrow-up': 'ArrowUpIcon',
  'arrow-down': 'ArrowDownIcon',
  check: 'CheckIcon',
  plus: 'PlusIcon',
  minus: 'MinusIcon',
  star: 'StarIcon',
  bell: 'BellIcon',
  mail: 'EnvelopeIcon',
  phone: 'PhoneIcon',
  location: 'MapPinIcon',
  settings: 'Cog6ToothIcon',
  edit: 'PencilIcon',
  delete: 'TrashIcon',
  save: 'BookmarkIcon',
  download: 'ArrowDownTrayIcon',
  upload: 'ArrowUpTrayIcon',
  refresh: 'ArrowPathIcon',
  play: 'PlayIcon',
  pause: 'PauseIcon',
  stop: 'StopIcon',
  next: 'ChevronRightIcon',
  previous: 'ChevronLeftIcon',
  eye: 'EyeIcon',
  'eye-slash': 'EyeSlashIcon',
  info: 'InformationCircleIcon',
  warning: 'ExclamationTriangleIcon',
  error: 'XCircleIcon',
  success: 'CheckCircleIcon',
  calendar: 'CalendarIcon',
  clock: 'ClockIcon',
  share: 'ShareIcon',
  filter: 'FunnelIcon',
  sort: 'ArrowsUpDownIcon',
  grid: 'Squares2X2Icon',
  list: 'Bars4Icon',
  image: 'PhotoIcon',
  video: 'VideoCameraIcon',
  link: 'LinkIcon',
  'external-link': 'ArrowTopRightOnSquareIcon',
  like: 'HandThumbUpIcon',
  dislike: 'HandThumbDownIcon',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  className,
  animation = false,
  motionProps,
  onClick,
}) => {
  const iconName = iconNameMap[name] || name;
  const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons] as React.ComponentType<{
    className?: string;
  }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const iconClasses = cn(
    iconSizes[size],
    color || 'text-gray-600',
    onClick && 'cursor-pointer hover:text-pink-600 transition-colors',
    className,
  );

  const iconElement = <IconComponent className={iconClasses} />;

  if (animation) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        {...motionProps}
      >
        {iconElement}
      </motion.div>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} className="inline-block">
        {iconElement}
      </div>
    );
  }

  return iconElement;
};

export default Icon;
