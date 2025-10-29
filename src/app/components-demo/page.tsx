'use client';

import React, { useState } from 'react';
import {
  BaseButton,
  BaseInput,
  BaseCard,
  BaseModal,
  BaseLoading,
  BaseIcon,
  Container,
  Grid,
  Flex,
  ProductGrid,
  CategoryCard,
  PriceDisplay,
} from '@/components';

const ComponentsDemo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const sampleProducts = [
    {
      id: '1',
      name: 'پیراهن مجلسی قرمز',
      price: 1500000,
      originalPrice: 2000000,
      image: '/images/dress-main.jpg',
      rating: 4.5,
      reviewCount: 24,
      discount: 25,
      isNew: true,
      isFeatured: false,
    },
    {
      id: '2',
      name: 'بلوز سفید ساده',
      price: 800000,
      image: '/images/dress-alt1.jpg',
      rating: 4.2,
      reviewCount: 18,
      isNew: false,
      isFeatured: true,
    },
    {
      id: '3',
      name: 'شلوار جین آبی',
      price: 1200000,
      image: '/images/dress-alt2.jpeg',
      rating: 4.8,
      reviewCount: 32,
      isNew: false,
      isFeatured: false,
    },
  ];

  const sampleCategories = [
    {
      id: '1',
      name: 'پیراهن و لباس مجلسی',
      image: '/images/dress-main.jpg',
      productCount: 45,
      color: '#ec4899',
    },
    {
      id: '2',
      name: 'بلوز و تاپ',
      image: '/images/dress-alt1.jpg',
      productCount: 32,
      color: '#8b5cf6',
    },
    {
      id: '3',
      name: 'شلوار',
      image: '/images/dress-alt2.jpeg',
      productCount: 28,
      color: '#06b6d4',
    },
  ];

  const handleAddToCart = (id: string) => {
    console.log('Add to cart:', id);
  };

  const handleCategoryClick = (id: string) => {
    console.log('Category clicked:', id);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <Container size="xl" className="py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">نمایش کامپوننت‌ها</h1>
          <p className="text-lg text-gray-600">
            مجموعه کامپوننت‌های قابل استفاده مجدد و قابل تنظیم
          </p>
        </div>

        {/* Base Components Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">کامپوننت‌های پایه</h2>

          {/* Buttons */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">دکمه‌ها</h3>
            <Flex gap="md" wrap="wrap">
              <BaseButton variant="primary">Primary</BaseButton>
              <BaseButton variant="secondary">Secondary</BaseButton>
              <BaseButton variant="outline">Outline</BaseButton>
              <BaseButton variant="ghost">Ghost</BaseButton>
              <BaseButton variant="danger">Danger</BaseButton>
              <BaseButton variant="success">Success</BaseButton>
            </Flex>
          </BaseCard>

          {/* Inputs */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">ورودی‌ها</h3>
            <Grid cols={2} gap="md">
              <BaseInput label="نام کاربری" placeholder="نام کاربری خود را وارد کنید" required />
              <BaseInput
                label="ایمیل"
                placeholder="ایمیل خود را وارد کنید"
                type="email"
                error="ایمیل معتبر نیست"
              />
              <BaseInput label="پیام" placeholder="پیام خود را بنویسید" multiline rows={4} />
              <BaseInput
                label="شماره تلفن"
                placeholder="شماره تلفن خود را وارد کنید"
                helperText="شماره تلفن 11 رقمی وارد کنید"
              />
            </Grid>
          </BaseCard>

          {/* Cards */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">کارت‌ها</h3>
            <Grid cols={3} gap="md">
              <BaseCard variant="default" className="p-4">
                <h4 className="mb-2 font-medium">Default Card</h4>
                <p className="text-sm text-gray-600">محتوای کارت پیش‌فرض</p>
              </BaseCard>
              <BaseCard variant="elevated" className="p-4">
                <h4 className="mb-2 font-medium">Elevated Card</h4>
                <p className="text-sm text-gray-600">کارت با سایه بیشتر</p>
              </BaseCard>
              <BaseCard variant="gradient" className="p-4">
                <h4 className="mb-2 font-medium">Gradient Card</h4>
                <p className="text-sm text-gray-600">کارت با گرادیانت</p>
              </BaseCard>
            </Grid>
          </BaseCard>

          {/* Loading States */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">حالت‌های بارگذاری</h3>
            <Grid cols={2} gap="md">
              <BaseLoading type="spinner" text="در حال بارگذاری..." />
              <BaseLoading type="skeleton" />
            </Grid>
            <div className="mt-4">
              <BaseButton onClick={handleLoading} loading={loading}>
                {loading ? 'در حال بارگذاری...' : 'شروع بارگذاری'}
              </BaseButton>
            </div>
          </BaseCard>

          {/* Icons */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">آیکون‌ها</h3>
            <Flex gap="md" wrap="wrap">
              <BaseIcon name="home" size="lg" />
              <BaseIcon name="user" size="lg" />
              <BaseIcon name="cart" size="lg" />
              <BaseIcon name="heart" size="lg" />
              <BaseIcon name="search" size="lg" />
              <BaseIcon name="star" size="lg" />
            </Flex>
          </BaseCard>
        </section>

        {/* Business Components Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">کامپوننت‌های تجاری</h2>

          {/* Product Cards */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">کارت‌های محصول</h3>
            <ProductGrid products={sampleProducts} cols={3} onAddToCart={handleAddToCart} />
          </BaseCard>

          {/* Category Cards */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">کارت‌های دسته‌بندی</h3>
            <Grid cols={3} gap="md">
              {sampleCategories.map((category) => (
                <CategoryCard key={category.id} {...category} onClick={handleCategoryClick} />
              ))}
            </Grid>
          </BaseCard>

          {/* Price Display */}
          <BaseCard variant="elevated" className="p-6">
            <h3 className="mb-4 text-lg font-medium">نمایش قیمت</h3>
            <Flex direction="column" gap="md">
              <PriceDisplay price={1500000} originalPrice={2000000} size="lg" />
              <PriceDisplay price={800000} size="md" />
              <PriceDisplay price={1200000} originalPrice={1500000} size="sm" />
            </Flex>
          </BaseCard>
        </section>

        {/* Modal Demo */}
        <BaseCard variant="elevated" className="p-6">
          <h3 className="mb-4 text-lg font-medium">مدال</h3>
          <BaseButton onClick={() => setModalOpen(true)}>باز کردن مدال</BaseButton>

          <BaseModal
            title="مدال نمونه"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => setModalOpen(false)}
          >
            <p>این یک مدال نمونه است که با کامپوننت BaseModal ساخته شده است.</p>
          </BaseModal>
        </BaseCard>
      </div>
    </Container>
  );
};

export default ComponentsDemo;
