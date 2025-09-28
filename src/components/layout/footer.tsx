"use client";
import React from "react";
import { Layout, Typography, Row, Col, Space, Button, Divider } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Text className="text-white font-bold text-xl">ش</Text>
                </div>
                <div>
                  <Title level={4} className="text-white mb-0">
                    شیک‌پوشان
                  </Title>
                  <Text className="text-gray-300 text-sm">
                    فروشگاه لباس زنانه
                  </Text>
                </div>
              </div>
              <Paragraph className="text-gray-300 mb-4">
                فروشگاه شیک‌پوشان با بیش از ۵ سال تجربه در زمینه فروش لباس‌های
                زنانه، جدیدترین و شیک‌ترین مدل‌ها را با بهترین کیفیت و قیمت
                ارائه می‌دهد.
              </Paragraph>
              <Space size="large">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    type="text"
                    icon={<InstagramOutlined />}
                    className="text-pink-400 hover:text-pink-300 text-xl"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    type="text"
                    icon={<SendOutlined />}
                    className="text-blue-400 hover:text-blue-300 text-xl"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    type="text"
                    icon={<TwitterOutlined />}
                    className="text-sky-400 hover:text-sky-300 text-xl"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    type="text"
                    icon={<FacebookOutlined />}
                    className="text-blue-500 hover:text-blue-400 text-xl"
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
              <Title level={5} className="text-white mb-4">
                دسترسی سریع
              </Title>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  صفحه اصلی
                </Link>
                <Link
                  href="/categories"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  دسته‌بندی محصولات
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  درباره ما
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  وبلاگ
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
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
              <Title level={5} className="text-white mb-4">
                خدمات مشتریان
              </Title>
              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  حساب کاربری
                </Link>
                <Link
                  href="/orders"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  پیگیری سفارش
                </Link>
                <Link
                  href="/wishlist"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  لیست علاقه‌مندی‌ها
                </Link>
                <Link
                  href="/returns"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  مرجوعی کالا
                </Link>
                <Link
                  href="/size-guide"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
                >
                  راهنمای سایز
                </Link>
                <Link
                  href="/shipping"
                  className="block text-gray-300 hover:text-pink-400 transition-colors"
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
              <Title level={5} className="text-white mb-4">
                اطلاعات تماس
              </Title>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PhoneOutlined className="text-pink-400" />
                  <div>
                    <Text className="text-gray-300 block">۰۲۱-۱۲۳۴۵۶۷۸</Text>
                    <Text className="text-gray-400 text-sm">
                      پاسخگویی ۲۴ ساعته
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MailOutlined className="text-pink-400" />
                  <div>
                    <Text className="text-gray-300 block">
                      info@shikpooshan.com
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      پشتیبانی آنلاین
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-pink-400 mt-1" />
                  <div>
                    <Text className="text-gray-300 block">
                      تهران، خیابان ولیعصر
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      پلاک ۱۲۳، طبقه ۲
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <Divider className="border-gray-600 my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Text className="text-gray-400">
              © {currentYear} فروشگاه شیک‌پوشان. تمامی حقوق محفوظ است.
            </Text>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
              >
                شرایط استفاده
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Text className="text-sm">ساخته شده با</Text>
            <HeartFilled className="text-pink-500 text-sm" />
            <Text className="text-sm">توسط تیم شیک‌پوشان</Text>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-600"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Text className="text-white text-xs font-bold">✓</Text>
              </div>
              <Text className="text-sm">ضمانت اصالت کالا</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Text className="text-white text-xs font-bold">🚚</Text>
              </div>
              <Text className="text-sm">ارسال سریع</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Text className="text-white text-xs font-bold">💳</Text>
              </div>
              <Text className="text-sm">پرداخت امن</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Text className="text-white text-xs font-bold">📞</Text>
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
