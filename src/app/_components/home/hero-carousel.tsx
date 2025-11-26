'use client';

import React from 'react';
import Link from 'next/link';
import { Typography, Carousel } from 'antd';

const { Title, Paragraph } = Typography;

const heroSlides = [
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
];

export default function HeroCarousel() {
  return (
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
  );
}
