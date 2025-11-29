'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Result, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { paymentService } from '@/app/orders/_api/payment.service';
import { message } from 'antd';

const { Text } = Typography;

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const authority = searchParams.get('authority');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setErrorMessage(
        error === 'payment_failed'
          ? 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.'
          : 'خطایی در پرداخت رخ داد.',
      );
      return;
    }

    if (!authority) {
      setStatus('error');
      setErrorMessage('اطلاعات پرداخت یافت نشد.');
      return;
    }

    // Get order ID from localStorage (stored when order was created)
    const storedOrderId = localStorage.getItem('pending_order_id');
    if (!storedOrderId) {
      setStatus('error');
      setErrorMessage('اطلاعات سفارش یافت نشد.');
      return;
    }

    const orderIdNum = parseInt(storedOrderId, 10);
    setOrderId(orderIdNum);

    // Verify payment
    verifyPayment(authority, orderIdNum);
  }, [searchParams]);

  const verifyPayment = async (authority: string, orderId: number) => {
    try {
      const response = await paymentService.verifyPayment({
        authority,
        order_id: orderId,
      });

      if (response.status === 'payment_confirmed') {
        setStatus('success');
        // Clear pending order ID from localStorage
        localStorage.removeItem('pending_order_id');
        message.success('پرداخت با موفقیت انجام شد!');
      } else {
        setStatus('error');
        setErrorMessage('پرداخت تایید نشد.');
      }
    } catch (error: any) {
      console.error('Payment verification failed:', error);
      setStatus('error');
      setErrorMessage(error?.message || 'خطا در تایید پرداخت. لطفاً با پشتیبانی تماس بگیرید.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-8">
        <Card className="w-full rounded-2xl shadow-lg">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#ec4899' }} spin />} />
            <Text className="text-lg text-gray-600">در حال تایید پرداخت...</Text>
          </div>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-8">
        <Card className="w-full rounded-2xl shadow-lg">
          <Result
            status="success"
            icon={<CheckCircleOutlined style={{ color: '#10b981' }} />}
            title="پرداخت با موفقیت انجام شد!"
            subTitle="سفارش شما ثبت شد و در حال پردازش است."
            extra={[
              <Link key="orders" href="/orders">
                <Button type="primary" size="large" className="rounded-xl">
                  مشاهده سفارشات
                </Button>
              </Link>,
              <Link key="home" href="/">
                <Button size="large" className="rounded-xl">
                  بازگشت به صفحه اصلی
                </Button>
              </Link>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-8">
      <Card className="w-full rounded-2xl shadow-lg">
        <Result
          status="error"
          icon={<CloseCircleOutlined style={{ color: '#ef4444' }} />}
          title="پرداخت ناموفق"
          subTitle={errorMessage}
          extra={[
            <Link key="cart" href="/cart">
              <Button type="primary" size="large" className="rounded-xl">
                بازگشت به سبد خرید
              </Button>
            </Link>,
            <Link key="home" href="/">
              <Button size="large" className="rounded-xl">
                بازگشت به صفحه اصلی
              </Button>
            </Link>,
          ]}
        />
      </Card>
    </div>
  );
}
