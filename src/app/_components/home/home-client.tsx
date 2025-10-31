'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Typography, Carousel } from 'antd';
import { App as AntApp } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { useFeaturedProducts, useCategories } from '@/app/products/_api';
import { ProductCard, CategoryCard } from '@/app/_components/business';
import { HomeSkeleton } from '@/app/_components/skeleton';

const { Title, Text, Paragraph } = Typography;

const categoryImages = [
  '/images/dress-main.jpg',
  '/images/handbag.jpg',
  '/images/shoes.jpg',
  '/images/jewelry.jpg',
  '/images/dress-alt1.jpg',
  '/images/dress-alt2.jpeg',
];

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

  const handleAddToCart = useCallback(
    (productId: string | number) => {
      const product = featuredProducts.find((p: any) => String(p.id) === String(productId));
      if (!product) return;

      const colors = product.colors ? Object.keys(product.colors) : [];
      const sizes = product.sizes || [];
      const firstColor = colors[0] || 'default';
      const firstSize = sizes[0] || 'default';

      dispatch(
        addToCart({
          productId: String(product.id),
          color: firstColor,
          size: firstSize,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: product.image,
        }),
      );
      message.success('به سبد خرید اضافه شد');
    },
    [dispatch, message, featuredProducts],
  );

  if (categoriesLoading || productsLoading) {
    return <HomeSkeleton />;
  }

  if (categoriesError || productsError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-500">
        خطا در بارگذاری داده‌ها
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel autoplay className="rounded-2xl overflow-hidden shadow-xl">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative h-[450px] md:h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
                  <div className="max-w-md text-right text-white">
                    <Title level={1} className="!text-white !mb-4">
                      {slide.title}
                    </Title>
                    <Paragraph className="!text-white text-lg mb-6">{slide.subtitle}</Paragraph>
                    <a
                      href={slide.link}
                      className="inline-block rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <Title level={2} className="mb-2 text-gray-800">
            دسته‌بندی‌های محبوب
          </Title>
          <Text className="text-gray-600">محصولات برتر را در دسته‌بندی مورد نظر خود پیدا کنید</Text>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category: any, index: number) => (
            <CategoryCard
              key={category.id}
              category={{
                ...category,
                image: category.image || categoryImages[index % categoryImages.length],
              }}
              index={index}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategoryChange}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <Title level={2} className="mb-6 text-center">
          محصولات برتر
        </Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product: any, index: number) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
