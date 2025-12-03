'use client';

import React from 'react';
import { Empty as AntEmpty } from 'antd';
import { Button } from '../../base/Button';
import { Typography } from '../../base/Typography';
import { cn } from '@/utils/cn';

export interface EmptyProps {
  title?: string;
  description?: string;
  image?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const Empty: React.FC<EmptyProps> = ({
  title = 'داده‌ای وجود ندارد',
  description,
  image,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8 md:py-12', className)}>
      <AntEmpty
        image={image || AntEmpty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className="space-y-2 text-center">
            {title && (
              <Typography variant="h4" size="lg" weight="semibold" color="muted">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="p" size="sm" color="muted">
                {description}
              </Typography>
            )}
          </div>
        }
      />
      {action && (
        <div className="mt-4">
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Empty;

