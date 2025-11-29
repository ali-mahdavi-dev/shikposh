import React, { useState, useEffect } from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TruckOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { OrderStatus } from '../_api/entities';

export interface StatusConfig {
  label: string;
  color: 'default' | 'processing' | 'success' | 'error' | 'warning';
  icon: React.ReactNode;
}

/**
 * Processing icon that only spins for 5 seconds
 */
function ProcessingIcon() {
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, 5000); // Stop spinning after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return <SyncOutlined spin={isSpinning} />;
}

export function getStatusConfig(status: OrderStatus): StatusConfig {
  const configs: Record<OrderStatus, StatusConfig> = {
    pending: {
      label: 'در انتظار پرداخت',
      color: 'warning',
      icon: <ClockCircleOutlined />,
    },
    payment_confirmed: {
      label: 'پرداخت تایید شده',
      color: 'success',
      icon: <CheckCircleOutlined />,
    },
    processing: {
      label: 'در حال پردازش',
      color: 'processing',
      icon: <ProcessingIcon />,
    },
    confirmed: {
      label: 'تایید شده',
      color: 'default',
      icon: <CheckCircleOutlined />,
    },
    shipped: {
      label: 'ارسال شده',
      color: 'processing',
      icon: <TruckOutlined />,
    },
    delivered: {
      label: 'تحویل داده شده',
      color: 'success',
      icon: <CheckCircleOutlined />,
    },
    cancelled: {
      label: 'لغو شده',
      color: 'error',
      icon: <CloseCircleOutlined />,
    },
    refunded: {
      label: 'بازگشت وجه',
      color: 'error',
      icon: <CloseCircleOutlined />,
    },
  };

  return configs[status];
}
