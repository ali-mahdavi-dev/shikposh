'use client';

import React, { useMemo, lazy, Suspense } from 'react';
import { Typography, Carousel } from 'antd';
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  SyncOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const DiscountedProductsSlider = lazy(() => import('./discounted-products-slider'));
const BestSellingProductsSlider = lazy(() => import('./bestselling-products-slider'));
const NewArrivalsSlider = lazy(() => import('./new-arrivals-slider'));

const { Title, Paragraph } = Typography;

interface HomeClientProps {
  initialCategories?: any[];
  initialProducts?: any[];
}

const features = [
  {
    icon: RocketOutlined,
    title: 'ارسال رایگان',
    description: 'برای سفارش‌های بالای ۵۰۰ هزار تومان',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: SafetyCertificateOutlined,
    title: 'ضمانت اصالت',
    description: '۱۰۰٪ اصل با گارانتی معتبر',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: CustomerServiceOutlined,
    title: 'پشتیبانی ۲۴/۷',
    description: 'پاسخگویی در تمام ساعات شبانه‌روز',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: SyncOutlined,
    title: 'بازگشت آسان',
    description: '۷ روز ضمانت بازگشت کالا',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
];

const HomeClient: React.FC<HomeClientProps> = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title: 'کلکسیون بهاری جدید',
        subtitle: 'تا ۵۰٪ تخفیف روی محصولات منتخب',
        image: '/images/daman.jpeg',
        buttonText: 'مشاهده کلکسیون',
        link: '/products',
      },
      {
        id: 2,
        title: 'لباس‌های مجلسی شیک',
        subtitle: 'برای مهمانی‌های خاص شما',
        image: '/images/carousel-homepage-one.jpg',
        buttonText: 'خرید کنید',
        link: '/products',
      },
      {
        id: 3,
        title: 'ارسال رایگان',
        subtitle: 'برای خریدهای بالای ۵۰۰ هزار تومان',
        image: '/images/Women-Formal.avif',
        buttonText: 'شروع خرید',
        link: '/products',
      },
    ],
    [],
  );

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel autoplay className="overflow-hidden rounded-2xl shadow-xl">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative h-[450px] md:h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
                  <div className="max-w-md text-right text-white">
                    <Title level={1} className="!mb-4 !text-white">
                      {slide.title}
                    </Title>
                    <Paragraph className="mb-6 text-lg !text-white">{slide.subtitle}</Paragraph>
                    <Link
                      href={slide.link}
                      className="inline-block rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bg} group cursor-default rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:rotate-12`}
              >
                <feature.icon className={`text-2xl ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Most Discounted Products Slider */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <DiscountedProductsSlider />
      </Suspense>

      {/* Best Selling Products Slider */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <BestSellingProductsSlider />
      </Suspense>

      {/* New Arrivals Slider */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <NewArrivalsSlider />
      </Suspense>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 p-8 md:p-12">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-right">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm">
                <GiftOutlined className="text-lg text-white" />
                <span className="text-sm font-medium text-white">پیشنهاد ویژه</span>
              </div>
              <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                ۱۵٪ تخفیف اولین خرید
              </h2>
              <p className="text-lg text-white/90">
                همین الان ثبت‌نام کنید و از تخفیف ویژه بهره‌مند شوید
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row"> 
              <Link
                href="/auth/register"
                className="!rounded-xl !bg-white/90 !px-8 !py-4 !text-center !font-bold !text-pink-500 !shadow-lg !transition-all !duration-300 hover:!-translate-y-1 hover:bg-white hover:!shadow-xl"
              >
                ثبت‌نام رایگان
              </Link>
              <Link
                href="/products"
                className="!rounded-xl !border-2 !border-white !bg-white/20 !px-8 !py-4 !text-center !font-bold !text-white !backdrop-blur-sm !transition-all !duration-300 hover:!bg-white/30"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
