'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Card } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md text-center">
            <div className="mb-6">
              <div className="mb-4 text-6xl">⚠️</div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800">خطایی رخ داده است</h1>
              <p className="mb-4 text-gray-600">متأسفانه مشکلی در بارگذاری صفحه پیش آمده است.</p>
            </div>

            <Alert
              message="جزئیات خطا"
              description={
                <div className="text-left">
                  <p className="mb-2 text-sm text-gray-600">
                    <strong>خطا:</strong> {this.state.error?.message}
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <details className="text-xs text-gray-500">
                      <summary className="cursor-pointer">جزئیات بیشتر</summary>
                      <pre className="mt-2 whitespace-pre-wrap">{this.state.error?.stack}</pre>
                    </details>
                  )}
                </div>
              }
              type="error"
              className="mb-6"
            />

            <div className="space-y-3">
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.handleReload}
                block
                size="large"
              >
                تلاش مجدد
              </Button>

              <Button icon={<HomeOutlined />} onClick={this.handleGoHome} block size="large">
                بازگشت به صفحه اصلی
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);

    // You can integrate with error reporting services here
    // e.g., Sentry, LogRocket, etc.
  };

  return { handleError };
};
