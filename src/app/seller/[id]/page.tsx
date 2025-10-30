'use client';
import React, { useState, useMemo } from 'react';
import { Button, Tabs, TabsProps, Typography, Badge, Rate, Tag, Card } from 'antd';
import { PageLoading, ErrorState, ContentLoading } from '@/shared/components/loading';
import { BellOutlined, CheckOutlined, ShopOutlined, CalendarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ProductGrid } from '@/components';
import { CategoryTile } from '@/components/business';
// import { Seller } from '@/types'; // Not needed anymore
import { type ProductGridProps } from '@/components/business';
import { useProducts } from '@/features/products';
import { useSeller } from '@/features/sellers';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { App as AntApp } from 'antd';

const { Title, Text, Paragraph } = Typography;

// Product interface for API data - using any for now due to type compatibility

// Convert product data to ProductGrid item format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToProductGridItem = (product: any): ProductGridProps['products'][number] => ({
  id: product.id,
  name: product.name,
  price: product.price,
  originalPrice: product.originalPrice,
  image: product.image,
  rating: product.rating,
  reviewCount: product.reviewCount,
  discount: product.discount,
  isNew: product.isNew,
  isFeatured: product.isFeatured,
});

export default function SellerPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const sellerId = params.id || 'seller-1';

  const [activeTab, setActiveTab] = useState<string>('products');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Fetch seller and products from API
  const { data: seller, isLoading: sellerLoading, error: sellerError } = useSeller(sellerId);
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();

  const sellerProducts = useMemo(() => products.map(convertToProductGridItem), [products]);

  const bannerImage = '/images/carousel-homepage-one.jpg';

  const tabsItems: TabsProps['items'] = [
    {
      key: 'products',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <ShopOutlined />
          <span>محصولات</span>
          <Badge count={seller?.totalProducts || 0} showZero />
        </span>
      ),
    },
    {
      key: 'categories',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <span>دسته‌بندی‌ها</span>
          <Badge count={seller?.categories?.length || 0} showZero />
        </span>
      ),
    },
    {
      key: 'about',
      label: <span className="px-4 py-2">درباره فروشنده</span>,
    },
  ];

  // Show loading state
  if (sellerLoading) {
    return <PageLoading tip="در حال بارگذاری اطلاعات فروشنده..." />;
  }

  // Show error state
  if (sellerError || !seller) {
    return <ErrorState message="خطا در بارگذاری اطلاعات فروشنده" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 sm:h-56 md:h-64 lg:h-72">
        {bannerImage ? (
          <div className="relative h-full w-full">
            <Image
              src={bannerImage}
              alt={`${seller?.name || 'Seller'} Banner`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600"></div>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="relative z-10 -mt-16 border-b border-gray-200 bg-white sm:-mt-20 md:-mt-24 lg:-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-shrink-0 justify-center pt-16 sm:pt-20 md:pt-24 lg:w-auto lg:justify-start lg:pt-28"
            >
              <div className="relative">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-[3px]">
                    <div className="relative h-full w-full rounded-full bg-white p-1">
                      <div className="absolute inset-1 overflow-hidden rounded-full">
                        <Image
                          src={seller?.avatar || '/images/default-avatar.jpg'}
                          alt={seller?.name || 'Seller'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seller Info */}
            <div className="w-full min-w-0 flex-1 pt-16 sm:pt-20 md:pt-24 lg:w-auto lg:pt-28">
              <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Title level={2} className="!mb-0 !text-2xl !text-gray-800 lg:!text-3xl">
                      {seller?.name || 'فروشنده'}
                    </Title>
                    {seller?.verified && (
                      <Tag icon={<CheckOutlined />} color="success" className="ml-2">
                        تایید شده
                      </Tag>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-3">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={seller?.rating || 0}
                      className="text-sm text-yellow-400"
                    />
                    <Text className="text-sm text-gray-600">
                      {(seller?.rating || 0).toFixed(1)}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      ({Math.floor((seller?.totalProducts || 0) * 0.8)} نظر)
                    </Text>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <ShopOutlined className="text-pink-500" />
                      <Text className="text-sm text-gray-600 lg:text-base">
                        <strong className="font-semibold text-gray-800">
                          {seller?.totalProducts || 0}
                        </strong>{' '}
                        محصول
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarOutlined className="text-purple-500" />
                      <Text className="text-sm text-gray-600 lg:text-base">
                        عضویت از{' '}
                        <strong className="font-semibold text-gray-800">
                          {seller?.joinDate || 'نامشخص'}
                        </strong>
                      </Text>
                    </div>
                  </div>

                  <Paragraph
                    className="!mb-0 text-sm !leading-6 text-gray-600 lg:text-base"
                    ellipsis={{ rows: 2, expandable: true, symbol: 'بیشتر' }}
                  >
                    {seller?.description || 'توضیحاتی در دسترس نیست'}
                  </Paragraph>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto">
                  <Button
                    type={isFollowing ? 'default' : 'primary'}
                    size="large"
                    icon={isFollowing ? <CheckOutlined /> : <BellOutlined />}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={
                      isFollowing
                        ? ''
                        : 'border-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                    }
                  >
                    {isFollowing ? 'دنبال می‌کنم' : 'دنبال کردن'}
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    icon={<BellOutlined />}
                    className="border-gray-300 hover:border-pink-300 hover:text-pink-600"
                  >
                    <span className="hidden sm:inline">اعلان‌ها</span>
                    <span className="sm:hidden">اعلان</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-[72px] z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="max-w-full flex-1 overflow-x-auto">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabsItems}
                className="custom-profile-tabs !border-0"
                moreIcon={null}
                tabBarStyle={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area based on Active Tab */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        {activeTab === 'products' && (
          <div className="space-y-6">
            {productsLoading ? (
              <ContentLoading tip="در حال بارگذاری محصولات..." />
            ) : productsError ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-red-500">خطا در بارگذاری محصولات</Text>
              </div>
            ) : (
              <ProductGrid
                products={sellerProducts}
                cols={4}
                onAddToCart={(id) => {
                  const p = (products as any[]).find((sp) => sp.id === id);
                  if (!p) return;
                  const colors = p.colors ? Object.keys(p.colors) : [];
                  const sizes = p.sizes || [];
                  const firstColor = colors[0] || 'default';
                  const firstSize = sizes[0] || 'default';
                  dispatch(
                    addToCart({
                      productId: p.id,
                      color: firstColor,
                      size: firstSize,
                      quantity: 1,
                      price: p.price,
                      name: p.name,
                      image: p.image,
                    }),
                  );
                  message.success('به سبد خرید اضافه شد');
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            {!seller?.categories?.length ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-gray-500">دسته‌بندی‌ای یافت نشد</Text>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {seller.categories.map((category: { id: string; name: string; count: number }, idx: number) => (
                  <CategoryTile
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    count={category.count}
                    thumbnail={
                      [
                        '/images/dress-main.jpg',
                        '/images/handbag.jpg',
                        '/images/shoes.jpg',
                        '/images/jewelry.jpg',
                      ][idx % 4]
                    }
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <Card className="rounded-xl shadow-md">
              <Title level={3} className="mb-4">
                درباره فروشنده
              </Title>
              <Paragraph className="leading-relaxed text-gray-600">
                {seller?.description || 'توضیحاتی در دسترس نیست'}
              </Paragraph>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Text strong className="mb-2 block">
                      تعداد محصولات
                    </Text>
                    <Text className="text-gray-600">{seller?.totalProducts || 0} محصول</Text>
                  </div>
                  <div>
                    <Text strong className="mb-2 block">
                      تاریخ عضویت
                    </Text>
                    <Text className="text-gray-600">از سال {seller?.joinDate || 'نامشخص'}</Text>
                  </div>
                  <div>
                    <Text strong className="mb-2 block">
                      امتیاز فروشنده
                    </Text>
                    <div className="flex items-center gap-2">
                      <Rate disabled defaultValue={seller?.rating || 0} />
                      <Text className="text-gray-600">{(seller?.rating || 0).toFixed(1)}</Text>
                    </div>
                  </div>
                  <div>
                    <Text strong className="mb-2 block">
                      وضعیت حساب
                    </Text>
                    {seller?.verified ? (
                      <Tag color="success" icon={<CheckOutlined />}>
                        تایید شده
                      </Tag>
                    ) : (
                      <Tag color="default">در انتظار تایید</Tag>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <Title level={4} className="mb-4">
                  دسته‌بندی‌های اصلی
                </Title>
                <div className="flex flex-wrap gap-2">
                  {seller?.categories?.map(
                    (category: { id: string; name: string; count: number }) => (
                      <Tag key={category.id} color="pink" className="px-3 py-1">
                        {category.name} ({category.count})
                      </Tag>
                    ),
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
