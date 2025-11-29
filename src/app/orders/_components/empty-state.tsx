'use client';

import React from 'react';
import { Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export function OrdersEmptyState() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-6 rounded-full bg-pink-100 p-8"
      >
        <ShoppingCartOutlined className="text-6xl text-pink-500" />
      </motion.div>
      <Title level={3} className="mb-3 text-gray-900">
        هنوز سفارشی ثبت نکرده‌اید
      </Title>
      <Text type="secondary" className="mb-8 max-w-md text-base leading-7">
        اولین خرید خود را انجام دهید تا اینجا تاریخچه سفارش‌هایتان نمایش داده شود.
        با خرید از شیک‌پوشان، از بهترین کیفیت و قیمت بهره‌مند شوید.
      </Text>
      <Button
        type="primary"
        size="large"
        icon={<ShoppingCartOutlined />}
        onClick={() => router.push('/products')}
        className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 border-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        شروع خرید
      </Button>
    </motion.div>
  );
}

export default OrdersEmptyState;

