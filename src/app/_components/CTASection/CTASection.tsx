import React from 'react';
import Link from 'next/link';
import { GiftOutlined } from '@ant-design/icons';

export default function CtaSection() {
  return (
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
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">۱۵٪ تخفیف اولین خرید</h2>
            <p className="text-lg text-white/90">
              همین الان ثبت‌نام کنید و از تخفیف ویژه بهره‌مند شوید
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth"
              className="rounded-xl bg-white/90 px-8 py-4 text-center font-bold text-pink-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              ثبت‌نام رایگان
            </Link>
            <Link
              href="/products"
              className="rounded-xl border-2 border-white bg-white/20 px-8 py-4 text-center font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
