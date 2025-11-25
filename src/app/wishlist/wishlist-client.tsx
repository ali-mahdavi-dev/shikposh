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
    const byId = new Set(wishlistIds.map(String));
    return allProducts
      .filter((p: any) => byId.has(String(p.id)))
      .map(
        (p: any): WishlistProduct => ({
          id: String(p.id),
          name: p.title || p.name || '',
          image: p.thumbnail || p.image || '',
          price: p.price || 0,
          colors: p.colors,
          sizes: p.sizes,
        }),
      );
  }, [allProducts, wishlistIds]);

  const handleMoveToCart = (product: WishlistProduct | any) => {
    // Handle ProductEntity structure (colors and sizes are arrays)
    let colorName = 'default';
    let sizeName = '';

    if (product.colors) {
      if (Array.isArray(product.colors) && product.colors.length > 0) {
        // ProductEntity format: colors is array of {id, name, hex}
        colorName = product.colors[0].name;
      } else if (typeof product.colors === 'object' && !Array.isArray(product.colors)) {
        // ProductSummary format: colors is Record<string, {name}>
        const colorKeys = Object.keys(product.colors);
        const firstColorId = colorKeys[0];
        if (firstColorId && product.colors[firstColorId]?.name) {
          colorName = product.colors[firstColorId].name;
        }
      }
    }

    if (product.sizes) {
      if (Array.isArray(product.sizes) && product.sizes.length > 0) {
        // ProductEntity format: sizes is array of {id, name}
        if (typeof product.sizes[0] === 'object' && product.sizes[0].name) {
          sizeName = product.sizes[0].name;
        } else if (typeof product.sizes[0] === 'string') {
          // ProductSummary format: sizes is array of strings
          sizeName = product.sizes[0];
        }
      }
    }

    // Get image from images object or use provided image/thumbnail
    let productImage = product.image || product.thumbnail || '';
    if (!productImage && product.images && Object.keys(product.images).length > 0) {
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
        size: sizeName,
        quantity: 1,
        price: product.price,
        name: product.name || product.title,
        image: productImage,
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

      <WishlistGrid items={items} onMoveToCart={handleMoveToCart} onRemove={handleRemove} />
    </div>
  );
}
