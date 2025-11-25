'use client';

import React, { useMemo, useState } from 'react';
import { useProductsByCategory, useProducts } from '@/app/products/_api';
import { ProductGrid } from '@/app/products/_components';
import { ProductGridSkeleton } from '@/app/_components/skeleton';
import { Typography, Button, Select } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';

const { Text, Title } = Typography;
const { Option } = Select;

interface CategoryClientProps {
  categoryName: string;
  categorySlug: string;
}

export default function CategoryClient({ categoryName, categorySlug }: CategoryClientProps) {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState('relevance');

  // Get all products for add to cart (need full product data)
  const { data: allProducts = [] } = useProducts();

  // Fetch products by category (use slug for API)
  const {
    data: categoryProducts = [],
    isLoading,
    error,
  } = useProductsByCategory(categorySlug === 'all' ? 'all' : categorySlug);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...categoryProducts];

    switch (sortBy) {
      case 'price_asc':
        return products.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_desc':
        return products.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating_desc':
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return products.sort((a, b) => {
          // Sort by isNew first (new products come first), then by rating
          if (a.isNew !== b.isNew) {
            return a.isNew ? -1 : 1;
          }
          return (b.rating || 0) - (a.rating || 0);
        });
      default:
        return products;
    }
  }, [categoryProducts, sortBy]);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(24);
  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount).map((product) => {
      // Ensure all required fields are present
      return {
        id: String(product.id),
        slug: product.slug || String(product.id),
        name: product.name || '',
        image: product.image || '',
        price: product.price || 0,
        discount: product.discount || 0,
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        origin_price: product.origin_price,
      };
    });
  }, [sortedProducts, visibleCount]);

  // Reset pagination when sort changes
  React.useEffect(() => {
    setVisibleCount(24);
  }, [sortBy]);

  // Handlers
  const handleAddToCart = (id: string) => {
    const product = allProducts.find((p: any) => String(p.id) === String(id));
    if (!product) return;

    // Get color name from colors array
    const colorName =
      product.colors && product.colors.length > 0 ? product.colors[0].name : 'default';

    // Get first image from images or use thumbnail
    let productImage = product.thumbnail || '';
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      const firstColorImages = product.images[firstColorId];
      if (firstColorImages && firstColorImages.length > 0) {
        productImage = firstColorImages[0];
      }
    }

    dispatch(
      addToCart({
        productId: String(product.id),
        color: colorName,
        size: '',
        quantity: 1,
        price: product.price,
        name: product.title,
        image: productImage,
      }),
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title level={2} className="!mb-2 !text-2xl font-bold text-gray-900">
            {categoryName}
          </Title>
          <Text className="text-sm text-gray-500">
            {isLoading
              ? 'در حال بارگذاری...'
              : `تعداد محصولات: ${categoryProducts.length.toLocaleString('fa-IR')}`}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <Text className="text-sm text-gray-600">مرتب‌سازی:</Text>
          <Select value={sortBy} onChange={setSortBy} className="w-full sm:w-56">
            <Option value="relevance">مرتبط‌ترین</Option>
            <Option value="price_asc">قیمت: کم به زیاد</Option>
            <Option value="price_desc">قیمت: زیاد به کم</Option>
            <Option value="rating_desc">بالاترین امتیاز</Option>
            <Option value="newest">جدیدترین</Option>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <section className="category-page">
        {isLoading ? (
          <ProductGridSkeleton count={12} cols={3} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Text type="danger" className="text-lg">
              خطا در بارگذاری محصولات
            </Text>
            <Text className="mt-2 text-gray-500">
              {(error as any)?.message || 'لطفاً دوباره تلاش کنید'}
            </Text>
          </div>
        ) : (
          <>
            <ProductGrid
              products={visibleProducts}
              loading={false}
              error={undefined}
              cols={3}
              gap="lg"
              emptyMessage={`هیچ محصولی در دسته‌بندی ${categoryName} یافت نشد`}
              onAddToCart={handleAddToCart}
            />

            {/* Load more */}
            {visibleProducts.length < sortedProducts.length && (
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setVisibleCount((c) => c + 24)} size="large">
                  نمایش موارد بیشتر
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <style jsx global>{`
        .category-page .ant-card {
          direction: rtl;
        }
        .category-page .ant-card * {
          list-style: none;
          writing-mode: horizontal-tb;
        }
        .category-page .ant-card .ant-rate {
          direction: ltr;
        }
      `}</style>
    </div>
  );
}
