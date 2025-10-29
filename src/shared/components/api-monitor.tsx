'use client';

import React, { useState, useEffect } from 'react';
import { Badge, Card, Tooltip, Button } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { healthService, HealthStatus } from '../services/health.service';

interface ApiMonitorProps {
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const ApiMonitor: React.FC<ApiMonitorProps> = ({
  showDetails = false,
  autoRefresh = true,
  refreshInterval = 30000,
}) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const status = await healthService.checkHealth();
      setHealthStatus(status);
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();

    if (autoRefresh) {
      const interval = setInterval(checkHealth, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusIcon = () => {
    if (!healthStatus) return <ExclamationCircleOutlined />;

    switch (healthStatus.status) {
      case 'healthy':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'degraded':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'unhealthy':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  const getStatusColor = () => {
    if (!healthStatus) return 'default';

    switch (healthStatus.status) {
      case 'healthy':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'unhealthy':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    if (!healthStatus) return 'نامشخص';

    switch (healthStatus.status) {
      case 'healthy':
        return 'سالم';
      case 'degraded':
        return 'مشکل جزئی';
      case 'unhealthy':
        return 'مشکل';
      default:
        return 'نامشخص';
    }
  };

  if (!showDetails) {
    return (
      <Tooltip title={`وضعیت API: ${getStatusText()}`}>
        <Badge status={getStatusColor() as any} text={getStatusIcon()} />
      </Tooltip>
    );
  }

  return (
    <Card
      size="small"
      title="وضعیت سیستم"
      extra={
        <Button type="text" icon={<ReloadOutlined />} loading={loading} onClick={checkHealth} />
      }
      className="w-80"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">وضعیت کلی:</span>
          <Badge status={getStatusColor() as any} text={getStatusText()} />
        </div>

        {healthStatus && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm">API:</span>
              <Badge
                status={healthStatus.services.api ? 'success' : 'error'}
                text={healthStatus.services.api ? 'متصل' : 'قطع'}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">دیتابیس:</span>
              <Badge
                status={healthStatus.services.database ? 'success' : 'error'}
                text={healthStatus.services.database ? 'متصل' : 'قطع'}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">زمان پاسخ:</span>
              <span className="font-mono text-sm">{healthStatus.responseTime}ms</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">نسخه:</span>
              <span className="font-mono text-sm">v{healthStatus.version}</span>
            </div>

            <div className="text-center text-xs text-gray-500">
              آخرین بررسی: {new Date(healthStatus.timestamp).toLocaleString('fa-IR')}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
