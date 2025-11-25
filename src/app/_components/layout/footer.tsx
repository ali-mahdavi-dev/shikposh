'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Divider, Input } from 'antd';
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartFilled,
  CheckCircleOutlined,
  TruckOutlined,
  SecurityScanOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { App as AntApp } from 'antd';

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const { message } = AntApp.useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      message.warning('لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }
    message.success('عضویت شما در خبرنامه با موفقیت انجام شد!');
    setEmail('');
  };

  const socialLinks = [
    { icon: <InstagramOutlined />, color: 'from-pink-500 via-rose-500 to-red-500', href: '#', label: 'اینستاگرام' },
    { icon: <SendOutlined />, color: 'from-blue-500 via-cyan-500 to-teal-500', href: '#', label: 'تلگرام' },
    { icon: <TwitterOutlined />, color: 'from-sky-400 via-blue-500 to-indigo-500', href: '#', label: 'توییتر' },
    { icon: <FacebookOutlined />, color: 'from-blue-600 via-indigo-600 to-purple-600', href: '#', label: 'فیسبوک' },
  ];

  const features = [
    { icon: <TruckOutlined />, title: 'ارسال سریع', desc: 'ارسال رایگان بالای ۵۰۰ هزار تومان' },
    { icon: <SecurityScanOutlined />, title: 'پرداخت امن', desc: 'پرداخت آنلاین با درگاه‌های معتبر' },
    { icon: <CheckCircleOutlined />, title: 'ضمانت کیفیت', desc: 'ضمانت اصالت و کیفیت کالا' },
    { icon: <CustomerServiceOutlined />, title: 'پشتیبانی ۲۴/۷', desc: 'پاسخگویی در تمام ساعات شبانه روز' },
  ];

  return (
    <AntFooter className="relative mt-20 overflow-hidden bg-gradient-to-b from-slate-50 via-gray-50 to-white text-gray-800 border-t border-gray-200">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-pink-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl" />
      </div>

      {/* Features Section */}
      <div className="relative border-b border-gray-200 bg-gray-50/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:border-pink-300 hover:shadow-md"
              >
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 p-3 text-white transition-transform group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-pink-500/30">
                  {feature.icon}
                </div>
                <Text className="font-semibold text-gray-800">{feature.title}</Text>
                <Text className="text-xs text-gray-600">{feature.desc}</Text>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30"
                >
                  <Text className="text-2xl font-bold text-white">ش</Text>
                </motion.div>
                <div>
                  <Title level={4} className="mb-0 text-gray-800">
                    شیک‌پوشان
                  </Title>
                  <Text className="text-sm text-gray-600">فروشگاه لباس زنانه</Text>
                </div>
              </div>
              <Paragraph className="mb-6 leading-relaxed text-gray-600">
                فروشگاه شیک‌پوشان با بیش از ۵ سال تجربه در زمینه فروش لباس‌های زنانه، جدیدترین و
                شیک‌ترین مدل‌ها را با بهترین کیفیت و قیمت ارائه می‌دهد.
              </Paragraph>
              
              {/* Newsletter Subscription */}
              <div className="mb-6">
                <Text className="mb-2 block text-sm font-semibold text-gray-800">عضویت در خبرنامه</Text>
                <div className="flex gap-2">
                  <Input
                    placeholder="ایمیل خود را وارد کنید"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onPressEnter={handleSubscribe}
                    className="flex-1 border-gray-300 bg-white placeholder:text-gray-400 focus:border-pink-500"
                    size="large"
                  />
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 border-none shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40"
                    size="large"
                  >
                    ارسال
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="group flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm transition-all hover:border-pink-400 hover:bg-pink-50 hover:text-pink-500 hover:shadow-md"
                    aria-label={social.label}
                  >
                    <div className="text-lg">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Title level={5} className="mb-6 flex items-center gap-2 text-gray-800">
                <ArrowLeftOutlined className="text-pink-500" />
                دسترسی سریع
              </Title>
              <div className="space-y-3">
                {[
                  { href: '/', label: 'صفحه اصلی' },
                  { href: '/products', label: 'محصولات' },
                  { href: '/about', label: 'درباره ما' },
                  { href: '/contact', label: 'تماس با ما' },
                  { href: '/notification', label: 'اعلان‌ها' },
                  { href: '/wishlist', label: 'علاقه‌مندی‌ها' },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-600 transition-all hover:translate-x-2 hover:text-pink-500"
                    >
                      <ArrowLeftOutlined className="text-xs opacity-0 transition-all group-hover:opacity-100 group-hover:text-pink-500" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Title level={5} className="mb-6 flex items-center gap-2 text-gray-800">
                <CustomerServiceOutlined className="text-pink-500" />
                خدمات مشتریان
              </Title>
              <div className="space-y-3">
                {[
                  { href: '/profile', label: 'حساب کاربری', icon: <CheckCircleOutlined /> },
                  { href: '/cart', label: 'سبد خرید', icon: <GiftOutlined /> },
                  { href: '/wishlist', label: 'علاقه‌مندی‌ها', icon: <HeartFilled /> },
                  { href: '/notification', label: 'اعلان‌ها', icon: <SendOutlined /> },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-600 transition-all hover:translate-x-2 hover:text-pink-500"
                    >
                      <span className="text-xs text-pink-500/0 transition-all group-hover:text-pink-500">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Title level={5} className="mb-6 flex items-center gap-2 text-gray-800">
                <MailOutlined className="text-pink-500" />
                اطلاعات تماس
              </Title>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-pink-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
                    <PhoneOutlined className="text-pink-500" />
                  </div>
                  <div>
                    <Text className="block font-semibold text-gray-800">۰۲۱-۱۲۳۴۵۶۷۸</Text>
                    <Text className="text-xs text-gray-600">پاسخگویی ۲۴ ساعته</Text>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-pink-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
                    <MailOutlined className="text-pink-500" />
                  </div>
                  <div>
                    <Text className="block font-semibold text-gray-800">info@shikpooshan.com</Text>
                    <Text className="text-xs text-gray-600">پشتیبانی آنلاین</Text>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-pink-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
                    <EnvironmentOutlined className="text-pink-500" />
                  </div>
                  <div>
                    <Text className="block font-semibold text-gray-800">تهران، خیابان ولیعصر</Text>
                    <Text className="text-xs text-gray-600">پلاک ۱۲۳، طبقه ۲</Text>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-12 border-gray-200" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Text className="text-center text-gray-600 md:text-right">
              © {currentYear} فروشگاه شیک‌پوشان. تمامی حقوق محفوظ است.
            </Text>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 transition-colors hover:text-pink-500 hover:underline"
              >
                حریم خصوصی
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/terms"
                className="text-sm text-gray-600 transition-colors hover:text-pink-500 hover:underline"
              >
                شرایط استفاده
              </Link>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-600 shadow-sm"
          >
            <Text className="text-sm">ساخته شده با</Text>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <HeartFilled className="text-pink-500" />
            </motion.span>
            <Text className="text-sm">توسط تیم شیک‌پوشان</Text>
          </motion.div>
        </motion.div>
      </div>
    </AntFooter>
  );
};

export default Footer;
