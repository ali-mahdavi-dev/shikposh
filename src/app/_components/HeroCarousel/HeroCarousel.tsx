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
    <section className="relative px-2 md:px-0">
      <Carousel
        autoplay
        className="overflow-hidden rounded-xl shadow-lg md:rounded-2xl md:shadow-xl"
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-8 md:pr-16">
                <div className="max-w-[280px] text-right text-white sm:max-w-sm md:max-w-md">
                  <Title
                    level={1}
                    className="!mb-2 !text-xl !text-white sm:!mb-3 sm:!text-2xl md:!mb-4 md:!text-3xl lg:!text-4xl"
                  >
                    {slide.title}
                  </Title>
                  <Paragraph className="mb-4 text-sm !text-white/95 sm:mb-5 sm:text-base md:mb-6 md:text-lg">
                    {slide.subtitle}
                  </Paragraph>
                  <Link
                    href={slide.link}
                    className="inline-block rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-600 active:scale-95 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3"
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
