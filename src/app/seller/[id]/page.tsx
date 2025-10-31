'use client';
import React, { useState, useMemo } from 'react';
import { Tabs, TabsProps, Typography, Badge } from 'antd';
import { ErrorState } from '@/shared/components/loading';
import { SellerSkeleton, ProductGridSkeleton } from '@/app/_components/skeleton';
import { ShopOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import { ProductGrid } from '@/app/_components';
import { CategoryTile } from '@/app/_components/business';
import { type ProductGridProps } from '@/app/_components/business';
import { useProducts } from '@/app/products/_api';
import { useSeller } from '../_api';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { App as AntApp } from 'antd';
import { SellerHeader, AboutSection } from './_components';
import type { Seller } from './_types';

const { Text } = Typography;

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
    return <SellerSkeleton />;
  }

  // Show error state
  if (sellerError || !seller) {
    return <ErrorState message="خطا در بارگذاری اطلاعات فروشنده" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerHeader
        seller={seller as unknown as Seller}
        isFollowing={isFollowing}
        onFollowToggle={() => setIsFollowing(!isFollowing)}
        bannerImage={bannerImage}
      />

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
              <ProductGridSkeleton count={8} cols={4} />
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
                {Array.isArray(seller.categories) &&
                  seller.categories
                    .map((cat, idx) => {
                      if (typeof cat === 'string') {
                        return {
                          id: `cat-${idx}`,
                          name: cat,
                          count: 0,
                        };
                      }
                      return cat as { id: string; name: string; count: number };
                    })
                    .map((category, idx) => (
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

        {activeTab === 'about' && <AboutSection seller={seller as unknown as Seller} />}
      </div>
    </div>
  );
}
