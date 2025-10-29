'use client';
import React from 'react';
import { Layout, Typography, Row, Col, Space, Button, Divider } from 'antd';
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600">
                  <Text className="text-xl font-bold text-white">ش</Text>
                </div>
                <div>
                  <Title level={4} className="mb-0 text-white">
                    شیک‌پوشان
                  </Title>
                  <Text className="text-sm text-gray-300">فروشگاه لباس زنانه</Text>
                </div>
              </div>
              <Paragraph className="mb-4 text-gray-300">
                فروشگاه شیک‌پوشان با بیش از ۵ سال تجربه در زمینه فروش لباس‌های زنانه، جدیدترین و
                شیک‌ترین مدل‌ها را با بهترین کیفیت و قیمت ارائه می‌دهد.
              </Paragraph>
              <Space size="large">
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="text"
                    icon={<InstagramOutlined />}
                    className="text-xl text-pink-400 hover:text-pink-300"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="text"
                    icon={<SendOutlined />}
                    className="text-xl text-blue-400 hover:text-blue-300"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="text"
                    icon={<TwitterOutlined />}
                    className="text-xl text-sky-400 hover:text-sky-300"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="text"
                    icon={<FacebookOutlined />}
                    className="text-xl text-blue-500 hover:text-blue-400"
                  />
                </motion.div>
              </Space>
            </motion.div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Title level={5} className="mb-4 text-white">
                دسترسی سریع
              </Title>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  صفحه اصلی
                </Link>
                <Link
                  href="/categories"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  دسته‌بندی محصولات
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  درباره ما
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  وبلاگ
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  سوالات متداول
                </Link>
              </div>
            </motion.div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Title level={5} className="mb-4 text-white">
                خدمات مشتریان
              </Title>
              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  حساب کاربری
                </Link>
                <Link
                  href="/orders"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  پیگیری سفارش
                </Link>
                <Link
                  href="/wishlist"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  لیست علاقه‌مندی‌ها
                </Link>
                <Link
                  href="/returns"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  مرجوعی کالا
                </Link>
                <Link
                  href="/size-guide"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  راهنمای سایز
                </Link>
                <Link
                  href="/shipping"
                  className="block text-gray-300 transition-colors hover:text-pink-400"
                >
                  شرایط ارسال
                </Link>
              </div>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Title level={5} className="mb-4 text-white">
                اطلاعات تماس
              </Title>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PhoneOutlined className="text-pink-400" />
                  <div>
                    <Text className="block text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</Text>
                    <Text className="text-sm text-gray-400">پاسخگویی ۲۴ ساعته</Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MailOutlined className="text-pink-400" />
                  <div>
                    <Text className="block text-gray-300">info@shikpooshan.com</Text>
                    <Text className="text-sm text-gray-400">پشتیبانی آنلاین</Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1 text-pink-400" />
                  <div>
                    <Text className="block text-gray-300">تهران، خیابان ولیعصر</Text>
                    <Text className="text-sm text-gray-400">پلاک ۱۲۳، طبقه ۲</Text>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-8 border-gray-600" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Text className="text-gray-400">
              © {currentYear} فروشگاه شیک‌پوشان. تمامی حقوق محفوظ است.
            </Text>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 transition-colors hover:text-pink-400"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 transition-colors hover:text-pink-400"
              >
                شرایط استفاده
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Text className="text-sm">ساخته شده با</Text>
            <HeartFilled className="text-sm text-pink-500" />
            <Text className="text-sm">توسط تیم شیک‌پوشان</Text>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8 border-t border-gray-600 pt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Text className="text-xs font-bold text-white">✓</Text>
              </div>
              <Text className="text-sm">ضمانت اصالت کالا</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <Text className="text-xs font-bold text-white">🚚</Text>
              </div>
              <Text className="text-sm">ارسال سریع</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <Text className="text-xs font-bold text-white">💳</Text>
              </div>
              <Text className="text-sm">پرداخت امن</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <Text className="text-xs font-bold text-white">📞</Text>
              </div>
              <Text className="text-sm">پشتیبانی ۲۴/۷</Text>
            </div>
          </div>
        </motion.div>
      </div>
    </AntFooter>
  );
};

export default Footer;
