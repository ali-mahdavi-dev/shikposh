import React from 'react';
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  SyncOutlined,
} from '@ant-design/icons';

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

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.bg} group cursor-default rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:rotate-12">
              <feature.icon className={`text-2xl ${feature.color}`} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
