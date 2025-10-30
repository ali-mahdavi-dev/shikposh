'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Card, Button, Carousel, Rate, Badge } from 'antd';
import { ShoppingCartOutlined, FireOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BaseBadge } from '@/components/ui';
import { App as AntApp } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { useFeaturedProducts, useCategories } from '@/features/products';
import { ProductCard, CategoryCard } from '@/components/business';

const { Title, Text, Paragraph } = Typography;

interface HomeClientProps {
  initialCategories?: any[];
  initialProducts?: any[];
}

const HomeClient: React.FC<HomeClientProps> = ({
  initialCategories = [],
  initialProducts = [],
}) => {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Use the new architecture hooks
  const {
    data: categories = initialCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    data: featuredProducts = initialProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useFeaturedProducts();

  // Memoize expensive calculations
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return featuredProducts;
    return featuredProducts.filter((product) => product.category === selectedCategory);
  }, [featuredProducts, selectedCategory]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // Memoize hero slides to prevent recreation on every render
  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title: 'کلکسیون بهاری جدید',
        subtitle: 'تا ۵۰٪ تخفیف روی محصولات منتخب',
        image: '/images/daman.jpeg',
        buttonText: 'مشاهده کلکسیون',
        link: '/category/spring-collection',
      },
      {
        id: 2,
        title: 'لباس‌های مجلسی شیک',
        subtitle: 'برای مهمانی‌های خاص شما',
        image: '/images/carousel-homepage-one.jpg',
        buttonText: 'خرید کنید',
        link: '/category/formal',
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

  // Memoize features data
  const features = useMemo(
    () => [
      {
        icon: '🚚',
        title: 'ارسال سریع',
        description: 'ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان',
      },
      {
        icon: '🛡️',
        title: 'ضمانت کیفیت',
        description: 'تضمین اصالت و کیفیت تمامی محصولات',
      },
      {
        icon: '↩️',
        title: 'بازگشت آسان',
        description: 'امکان بازگشت کالا تا ۷ روز پس از خرید',
      },
      {
        icon: '📞',
        title: 'پشتیبانی ۲۴/۷',
        description: 'پاسخگویی در تمام ساعات شبانه‌روز',
      },
    ],
    [],
  );

  // Show loading state
  if (categoriesLoading || productsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Show error state
  if (categoriesError || productsError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">خطا در بارگذاری داده‌ها</h2>
          <p className="text-gray-600">لطفاً صفحه را مجدداً بارگذاری کنید</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Carousel autoplay autoplaySpeed={3000} className="h-96 md:h-[500px]">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="relative !h-96 md:!h-[500px]">
              <div className="relative h-96 w-full md:h-[500px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
                <div className="relative flex h-full items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="max-w-3xl px-6 text-center text-white"
                  >
                    <Title
                      level={1}
                      className="mb-4 text-3xl leading-tight font-extrabold !text-white md:text-5xl"
                    >
                      {slide.title}
                    </Title>
                    <Paragraph className="mb-6 text-base !text-white opacity-90 md:text-lg">
                      {slide.subtitle}
                    </Paragraph>
                    {slide.link && (
                      <Link href={slide.link}>
                        <Button
                          type="primary"
                          size="large"
                          className="!text-white-600 h-auto rounded-2xl !border-0 !bg-white px-8 py-3 font-semibold shadow-md hover:!bg-gray-100"
                        >
                          {slide.buttonText}
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <Title level={2} className="mb-4 text-gray-800">
              دسته‌بندی محصولات
            </Title>
            <Text className="text-lg text-gray-600">
              محصولات خود را بر اساس دسته‌بندی مورد نظر انتخاب کنید
            </Text>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isSelected={selectedCategory === category.id}
                onSelect={handleCategoryChange}
              />
            ))}
          </div>
        </motion.section>

        {/* Featured Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Title level={2} className="mb-2 flex items-center gap-2 text-gray-800">
                <FireOutlined className="text-orange-500" />
                محصولات ویژه
              </Title>
              <Text className="text-gray-600">بهترین و محبوب‌ترین محصولات ما</Text>
            </div>
            <Link href="/products">
              <Button type="link" className="font-semibold text-pink-600">
                مشاهده همه →
              </Button>
            </Link>
          </div>

          <Row gutter={[24, 24]}>
            {filteredProducts.map((product, index) => (
              <Col xs={24} sm={12} lg={6} key={product.id}>
                <ProductCard
                  product={product}
                  index={index}
                  onAddToCart={() => {
                    const colors = product.colors ? Object.keys(product.colors) : [];
                    const sizes = product.sizes || [];
                    const firstColor = colors[0] || 'default';
                    const firstSize = sizes[0] || 'default';
                    dispatch(
                      addToCart({
                        productId: product.id,
                        color: firstColor,
                        size: firstSize,
                        quantity: 1,
                        price: product.price,
                        name: product.name,
                        image: product.image,
                      }),
                    );
                    message.success('به سبد خرید اضافه شد');
                  }}
                />
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <Title level={2} className="mb-4 text-gray-800">
              چرا شیک‌پوشان؟
            </Title>
            <Text className="text-lg text-gray-600">مزایای خرید از فروشگاه ما</Text>
          </div>

          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full rounded-2xl border-0 text-center shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <Title level={4} className="mb-3 text-gray-800">
                      {feature.title}
                    </Title>
                    <Text className="text-gray-600">{feature.description}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="rounded-2xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 text-center text-white">
            <div className="py-8">
              <Title level={2} className="mb-4 text-white">
                عضویت در خبرنامه
              </Title>
              <Paragraph className="mb-6 text-lg text-white/90">
                از جدیدترین محصولات و تخفیف‌های ویژه با خبر شوید
              </Paragraph>
              <div className="mx-auto flex max-w-md gap-3">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 rounded-xl border-0 px-4 py-3 text-gray-800"
                />
                <Button
                  type="primary"
                  size="large"
                  className="rounded-xl border-0 bg-white px-6 font-semibold text-pink-600 hover:bg-gray-100"
                >
                  عضویت
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default HomeClient;
