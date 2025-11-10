'use client';
import React, { useMemo } from 'react';
import { Typography, App as AntApp } from 'antd';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { removeFromWishlist } from '@/stores/slices/wishlistSlice';
import { addToCart } from '@/stores/slices/cartSlice';
import { useProducts } from '@/app/products/_api';
import { WishlistGrid, WishlistEmptyState } from './_components';
import type { WishlistProduct } from './_types';
import { WishlistSkeleton } from '@/app/_components/skeleton';

const { Title } = Typography;

export default function WishlistClient() {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const wishlistIds = useAppSelector((s) => s.wishlist.productIds);
  const { data: allProducts = [], isLoading, error } = useProducts();

  const items = useMemo(() => {
    const byId = new Set(wishlistIds);
    return allProducts.filter((p: any) => byId.has(p.id));
  }, [allProducts, wishlistIds]);

  const handleMoveToCart = (product: WishlistProduct) => {
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
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    message.success('از علاقه‌مندی‌ها حذف شد');
  };

  if (isLoading) {
    return <WishlistSkeleton />;
  }
  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-500">
        خطا در بارگذاری علاقه‌مندی‌ها
      </div>
    );
  }

  if (!items.length) {
    return <WishlistEmptyState />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Title level={2} className="mb-6 text-gray-800">
        علاقه‌مندی‌ها
      </Title>

      <WishlistGrid
        items={items as WishlistProduct[]}
        onMoveToCart={handleMoveToCart}
        onRemove={handleRemove}
      />
    </div>
  );
}

