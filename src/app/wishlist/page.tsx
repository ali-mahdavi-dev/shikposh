'use client';
import React, { useMemo } from 'react';
import { Card, Button, Typography, Empty, Row, Col, App as AntApp, Popconfirm } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { removeFromWishlist } from '@/stores/slices/wishlistSlice';
import { addToCart } from '@/stores/slices/cartSlice';
import { useProducts } from '@/features/products';

const { Title, Text } = Typography;

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const wishlistIds = useAppSelector((s) => s.wishlist.productIds);
  const { data: allProducts = [], isLoading, error } = useProducts();

  const items = useMemo(() => {
    const byId = new Set(wishlistIds);
    return allProducts.filter((p: any) => byId.has(p.id));
  }, [allProducts, wishlistIds]);

  const handleMoveToCart = (p: any) => {
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
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    message.success('از علاقه‌مندی‌ها حذف شد');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-500">
        خطا در بارگذاری علاقه‌مندی‌ها
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <Card className="rounded-2xl shadow-sm">
          <Empty description="لیست علاقه‌مندی خالی است">
            <Link href="/">
              <Button type="primary">شروع خرید</Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Title level={2} className="mb-6 text-gray-800">
        علاقه‌مندی‌ها
      </Title>

      <Row gutter={[24, 24]}>
        {items.map((p: any, index: number) => (
          <Col xs={24} sm={12} lg={6} key={p.id}>
            <Card className="h-full rounded-2xl shadow-md">
              <Link href={`/products/${p.id}`} className="block">
                <div className="relative mb-3 h-48 w-full overflow-hidden rounded-xl bg-gray-100">
                  {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" />}
                </div>
                <Text className="mb-2 block line-clamp-2 font-semibold text-gray-800">{p.name}</Text>
                <Text className="mb-3 block text-pink-600">{p.price?.toLocaleString()} تومان</Text>
              </Link>

              <div className="flex gap-2">
                <Button
                  type="primary"
                  className="flex-1 rounded-lg border-0 bg-gradient-to-r from-pink-500 to-purple-600"
                  onClick={() => handleMoveToCart(p)}
                >
                  افزودن به سبد
                </Button>
                <Popconfirm title="حذف از علاقه‌مندی‌ها؟" onConfirm={() => handleRemove(p.id)} okText="بله" cancelText="خیر">
                  <Button danger className="rounded-lg">حذف</Button>
                </Popconfirm>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}


