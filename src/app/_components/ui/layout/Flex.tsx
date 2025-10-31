import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const flexDirections = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const flexJustify = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const flexAlign = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const flexWrap = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const flexGaps = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = 'nowrap',
  gap = 'md',
  animation = true,
  motionProps,
  className,
  children,
}) => {
  const flexClasses = cn(
    'flex',
    flexDirections[direction],
    flexJustify[justify],
    flexAlign[align],
    flexWrap[wrap],
    flexGaps[gap],
    className,
  );

  const FlexComponent = animation ? motion.div : 'div';

  const flexProps = {
    className: flexClasses,
    ...(animation && {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      ...motionProps,
    }),
  };

  return <FlexComponent {...flexProps}>{children}</FlexComponent>;
};

export default Flex;
