'use client';
import React, { useState, useMemo } from 'react';
import { Tabs, TabsProps, Typography, Badge } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { ProductGrid } from '@/app/_components';
import { CategoryTile } from '@/app/_components/business';
import { type ProductGridProps } from '@/app/_components/business';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { App as AntApp } from 'antd';
import { SellerHeader, AboutSection } from './_components';
import type { Seller } from './_types';
import type { SellerEntity } from '../_api/entities';
import type { ProductEntity } from '@/app/products/_api/entities';

const { Text } = Typography;

interface SellerClientProps {
  initialSeller: SellerEntity;
  initialProducts?: ProductEntity[];
}

// Convert product data to ProductGrid item format
const convertToProductGridItem = (product: ProductEntity): ProductGridProps['products'][number] => {
  let firstImage = product.thumbnail;
  if (product.images && Object.keys(product.images).length > 0) {
    const firstColorId = Object.keys(product.images)[0];
    const firstColorImages = product.images[firstColorId];
    if (firstColorImages?.length > 0) {
      firstImage = firstColorImages[0];
    }
  }

  return {
    id: String(product.id),
    slug: product.slug || String(product.id),
    name: product.title,
    price: product.price,
    image: firstImage,
    rating: product.rating,
    reviewCount: 0,
    discount: product.discount,
    isNew: product.is_new,
    isFeatured: product.is_featured,
  };
};

export default function SellerClient({ initialSeller, initialProducts = [] }: SellerClientProps) {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();

  const [activeTab, setActiveTab] = useState<string>('products');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Use server-provided data
  const seller = initialSeller;
  const products = initialProducts;

  const sellerProducts = useMemo(() => products.map(convertToProductGridItem), [products]);

  const bannerImage = '/images/carousel-homepage-one.jpg';

  const tabsItems: TabsProps['items'] = [
    {
      key: 'products',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <ShopOutlined />
          <span>محصولات</span>
          <Badge count={seller.totalProducts || 0} showZero />
        </span>
      ),
    },
    {
      key: 'categories',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <span>دسته‌بندی‌ها</span>
          <Badge count={seller.categories?.length || 0} showZero />
        </span>
      ),
    },
    {
      key: 'about',
      label: <span className="px-4 py-2">درباره فروشنده</span>,
    },
  ];

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
            <ProductGrid
              products={sellerProducts}
              cols={4}
              onAddToCart={(id) => {
                const p = (products as any[]).find((sp) => String(sp.id) === String(id));
                if (!p) return;

                // Get color name from colors array (ProductEntity has colors as array)
                const colorName =
                  p.colors && Array.isArray(p.colors) && p.colors.length > 0
                    ? p.colors[0].name
                    : 'default';

                // Get size name from sizes array (ProductEntity has sizes as array)
                const sizeName =
                  p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes[0].name : '';

                // Get first image from images or use thumbnail
                let productImage = p.thumbnail || '';
                if (p.images && Object.keys(p.images).length > 0) {
                  const firstColorId = Object.keys(p.images)[0];
                  const firstColorImages = p.images[firstColorId];
                  if (firstColorImages && firstColorImages.length > 0) {
                    productImage = firstColorImages[0];
                  }
                }

                dispatch(
                  addToCart({
                    productId: String(p.id),
                    color: colorName,
                    size: sizeName,
                    quantity: 1,
                    price: p.price,
                    name: p.title,
                    image: productImage,
                  }),
                );
                message.success('به سبد خرید اضافه شد');
              }}
            />
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
