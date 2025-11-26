'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Button, Tooltip, App as AntApp } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { toggleWishlist } from '@/stores/slices/wishlistSlice';
import { formatIranianPrice } from '@/shared/utils';
import type { ProductEntity } from '../../_api/entities';
import ColorSelector from '../../_components/color-selector';
import SizeSelector from '../../_components/size-selector';
import QuantitySelector from '../../_components/quantity-selector';
import { useToggleWishlistMutation } from '@/app/wishlist/_api/hooks';

interface ProductActionsProps {
  product: ProductEntity;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const wishlistItems = useAppSelector((state) => state.wishlist.productIds);

  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const prevColorIdRef = useRef<string>('');

  const isWishlisted = wishlistItems.includes(String(product.id));

  // Get current images based on selected color
  const currentImages = useMemo(() => {
    if (selectedColorId && product.images?.[selectedColorId]) {
      return product.images[selectedColorId];
    }
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      return product.images[firstColorId] || [];
    }
    return product.thumbnail ? [product.thumbnail] : [];
  }, [product, selectedColorId]);

  // Get available sizes for selected color
  const availableSizes = useMemo(() => {
    if (!selectedColorId || !product.variant) return [];
    const colorVariants = product.variant[selectedColorId];
    if (!colorVariants) return [];

    return Object.keys(colorVariants)
      .map((sizeId) => {
        const size = product.sizes?.find((s) => s.id.toString() === sizeId);
        return size ? { id: sizeId, name: size.name } : null;
      })
      .filter((size): size is { id: string; name: string } => size !== null);
  }, [product, selectedColorId]);

  // Get current stock
  const currentStock = useMemo(() => {
    if (!selectedColorId || !product.variant) {
      return product?.stock || 0;
    }
    const colorVariants = product.variant[selectedColorId];
    if (!colorVariants) return 0;

    if (selectedSizeId) {
      return colorVariants[selectedSizeId]?.stock || 0;
    }
    return Object.values(colorVariants).reduce((sum, v) => sum + (v?.stock || 0), 0);
  }, [product, selectedColorId, selectedSizeId]);

  // Initialize color
  useEffect(() => {
    if (product.colors?.length > 0) {
      setSelectedColorId(product.colors[0].id.toString());
    }
  }, [product]);

  // Handle size when color changes
  useEffect(() => {
    if (!selectedColorId || !product.variant || selectedColorId === prevColorIdRef.current) {
      prevColorIdRef.current = selectedColorId;
      return;
    }
    prevColorIdRef.current = selectedColorId;

    const colorVariants = product.variant[selectedColorId];
    if (!colorVariants) {
      setSelectedSizeId('');
      return;
    }

    setSelectedSizeId((current) => {
      if (current && colorVariants[current]) return current;
      const ids = Object.keys(colorVariants);
      return ids.length > 0 ? ids[0] : '';
    });
  }, [selectedColorId, product]);

  // Initial size selection
  useEffect(() => {
    if (availableSizes.length > 0 && selectedColorId && !selectedSizeId) {
      setSelectedSizeId(availableSizes[0].id);
    }
  }, [availableSizes, selectedColorId, selectedSizeId]);

  const handleAddToCart = useCallback(() => {
    const colorName =
      product.colors?.find((c) => c.id.toString() === selectedColorId)?.name || selectedColorId;
    const sizeName =
      product.sizes?.find((s) => s.id.toString() === selectedSizeId)?.name || selectedSizeId;

    dispatch(
      addToCart({
        productId: String(product.id),
        color: colorName,
        size: sizeName,
        quantity,
        price: product.price,
        name: product.title,
        image: currentImages[0] || product.thumbnail,
      }),
    );
    message.success('به سبد خرید اضافه شد');
  }, [product, selectedColorId, selectedSizeId, quantity, currentImages, dispatch, message]);

  const toggleWishlistMutation = useToggleWishlistMutation();

  const handleWishlistToggle = useCallback(() => {
    // Update local state immediately for optimistic UI
    dispatch(toggleWishlist(String(product.id)));

    // Call API to persist in database
    toggleWishlistMutation.mutate(Number(product.id), {
      onSuccess: (response) => {
        message.success(response.added ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد');
      },
      onError: () => {
        // Revert on error
        dispatch(toggleWishlist(String(product.id)));
        message.error('خطا در ذخیره‌سازی');
      },
    });
  }, [product, dispatch, message, toggleWishlistMutation]);

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <ColorSelector
        colors={product.colors.reduce(
          (acc, color) => {
            acc[color.id.toString()] = { name: color.name, hex: color.hex };
            return acc;
          },
          {} as Record<string, { name: string; hex?: string }>,
        )}
        selectedColor={selectedColorId}
        onColorChange={setSelectedColorId}
      />

      {/* Size Selection */}
      {product.sizes?.length > 0 && availableSizes.length > 0 && (
        <SizeSelector
          sizes={availableSizes.map((s) => s.name)}
          selectedSize={availableSizes.find((s) => s.id === selectedSizeId)?.name || ''}
          onSizeChange={(sizeName) => {
            const size = availableSizes.find((s) => s.name === sizeName);
            setSelectedSizeId(size?.id || '');
          }}
        />
      )}

      {/* Stock Status */}
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
          currentStock > 0
            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
            : 'bg-red-50 text-red-600 ring-1 ring-red-200'
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${currentStock > 0 ? 'animate-pulse bg-emerald-500' : 'bg-red-500'}`}
        />
        {currentStock > 0 ? `${currentStock} عدد موجود در انبار` : 'ناموجود'}
      </div>

      {/* Price and Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(product.discount && product.discount > 0) || product.origin_price ? (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatIranianPrice(
                    product.origin_price ||
                      Math.round(product.price / (1 - (product.discount || 0) / 100)),
                  )}{' '}
                  تومان
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {formatIranianPrice(product.price)} تومان
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-pink-600">
                {formatIranianPrice(product.price)} تومان
              </span>
            )}
          </div>

          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} max={currentStock} />
        </div>

        <div className="flex gap-3">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="h-12 flex-1 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white"
          >
            افزودن به سبد خرید
          </Button>

          <Tooltip title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}>
            <Button
              size="large"
              icon={isWishlisted ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              onClick={handleWishlistToggle}
              className={`h-12 w-12 rounded-xl border-2 ${
                isWishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-300'
              }`}
            />
          </Tooltip>

          <Tooltip title="اشتراک‌گذاری">
            <Button
              size="large"
              icon={<ShareAltOutlined />}
              className="h-12 w-12 rounded-xl border-2 border-gray-300"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
