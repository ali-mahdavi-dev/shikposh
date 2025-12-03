'use client';

import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from '../../base/Button';
import { Typography } from '../../base/Typography';
import { cn } from '@/utils/cn';

export interface ErrorProps {
  title?: string;
  message?: string;
  variant?: 'inline' | 'fullPage';
  retry?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const Error: React.FC<ErrorProps> = ({
  title = 'خطا در بارگذاری',
  message = 'متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
  variant = 'inline',
  retry,
  className,
}) => {
  const content = (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <ExclamationCircleOutlined className="mb-4 text-4xl text-red-500 md:text-5xl" />
      <Typography variant="h4" size="lg" weight="semibold" color="error" className="mb-2">
        {title}
      </Typography>
      <Typography variant="p" size="sm" color="muted" className="max-w-md">
        {message}
      </Typography>
      {retry && (
        <div className="mt-4">
          <Button variant="primary" onClick={retry.onClick}>
            {retry.label}
          </Button>
        </div>
      )}
    </div>
  );

  if (variant === 'fullPage') {
    return <div className="flex min-h-[60vh] items-center justify-center">{content}</div>;
  }

  return <div className="py-8 md:py-12">{content}</div>;
};

export default Error;
