import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';

export interface BaseIconProps {
  name: string;
  variant?: 'outline' | 'solid';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
  animation?: boolean;
  motionProps?: MotionProps;
  onClick?: () => void;
}

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-12 h-12',
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

export const BaseIcon: React.FC<BaseIconProps> = ({
  name,
  variant = 'outline',
  size = 'md',
  color = 'currentColor',
  className,
  animation = false,
  motionProps,
  onClick,
}) => {
  const iconClasses = cn(iconSizes[size], onClick && 'cursor-pointer', className);

  // Get the Heroicons component name
  const iconComponentName = iconNameMap[name.toLowerCase()];

  // Select the icon library (outline or solid)
  const iconLibrary = variant === 'solid' ? HeroIconsSolid : HeroIcons;

  // Get the icon component
  const IconComponent = iconComponentName
    ? (iconLibrary[iconComponentName] as React.ComponentType<{ className?: string }>)
    : null;

  // If icon not found, return a fallback
  if (!IconComponent) {
    console.warn(
      `Icon "${name}" not found. Available icons: ${Object.keys(iconNameMap).join(', ')}`,
    );
    return (
      <span className={iconClasses} style={{ color }}>
        ?
      </span>
    );
  }

  const iconProps = {
    className: iconClasses,
    style: { color },
    onClick,
  };

  // Apply animation if enabled
  if (animation) {
    return (
      <motion.div
        className="inline-flex"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        {...motionProps}
      >
        <IconComponent {...iconProps} />
      </motion.div>
    );
  }

  return <IconComponent {...iconProps} />;
};

export default BaseIcon;
