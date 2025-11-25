'use client';

import React, { useRef } from 'react';
import { Typography, Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  FireOutlined,
  PercentageOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { ProductCard } from '@/app/_components/business';
import { App as AntApp } from 'antd';

const { Title, Text } = Typography;

interface ProductSliderProps {
  title: string;
  description: string;
  products: any[];
  icon?: 'fire' | 'discount' | 'star';
  accentColor?: 'pink' | 'orange' | 'purple';
}

const iconMap = {
  fire: FireOutlined,
  discount: PercentageOutlined,
  star: StarOutlined,
};

const colorMap = {
  pink: {
    gradient: 'from-pink-500 to-rose-400',
    hover: 'hover:border-pink-400 hover:text-pink-500',
    bg: 'bg-pink-50',
    text: 'text-pink-500',
    border: 'border-pink-200',
  },
  orange: {
    gradient: 'from-orange-500 to-amber-400',
    hover: 'hover:border-orange-400 hover:text-orange-500',
    bg: 'bg-orange-50',
    text: 'text-orange-500',
    border: 'border-orange-200',
  },
  purple: {
    gradient: 'from-purple-500 to-violet-400',
    hover: 'hover:border-purple-400 hover:text-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-500',
    border: 'border-purple-200',
  },
};

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  description,
  products,
  icon = 'star',
  accentColor = 'pink',
}) => {
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const limitedProducts = products.slice(0, 12);
  const IconComponent = iconMap[icon];
  const colors = colorMap[accentColor];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (id: string | number) => {
    const p = products.find((x: any) => String(x.id) === String(id)) as any;
    if (!p) return;

    let colorName = 'default';
    if (p.colors) {
      if (Array.isArray(p.colors) && p.colors.length > 0) {
        colorName = p.colors[0].name;
      } else if (typeof p.colors === 'object' && !Array.isArray(p.colors)) {
        const colorKeys = Object.keys(p.colors);
        const firstColorId = colorKeys[0];
        if (firstColorId && p.colors[firstColorId]?.name) {
          colorName = p.colors[firstColorId].name;
        }
      }
    }

    let sizeName = '';
    if (p.sizes) {
      if (Array.isArray(p.sizes) && p.sizes.length > 0) {
        if (typeof p.sizes[0] === 'object' && p.sizes[0].name) {
          sizeName = p.sizes[0].name;
        } else if (typeof p.sizes[0] === 'string') {
          sizeName = p.sizes[0];
        }
      }
    }

    dispatch(
      addToCart({
        productId: String(p.id),
        color: colorName,
        size: sizeName,
        quantity: 1,
        price: p.price,
        name: p.name,
        image: p.image,
      }),
    );
    message.success('به سبد خرید اضافه شد');
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className={`rounded-2xl ${colors.bg} ${colors.border} border p-6 shadow-sm`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`rounded-xl bg-gradient-to-br ${colors.gradient} p-3 shadow-lg`}>
              <IconComponent className="text-2xl text-white" />
            </div>
            <div>
              <Title level={3} className="!mb-1 !text-gray-800">
                {title}
              </Title>
              <Text className="text-gray-500">{description}</Text>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="default"
              shape="circle"
              size="large"
              icon={<RightOutlined />}
              onClick={() => scroll('right')}
              className={`border-gray-300 shadow-sm transition-all duration-300 ${colors.hover}`}
            />
            <Button
              type="default"
              shape="circle"
              size="large"
              icon={<LeftOutlined />}
              onClick={() => scroll('left')}
              className={`border-gray-300 shadow-sm transition-all duration-300 ${colors.hover}`}
            />
          </div>
        </div>

        {/* Products Slider */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {limitedProducts.map((product: any, index: number) => (
            <div key={product.id} className="w-64 flex-shrink-0">
              <ProductCard
                product={product}
                index={index}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
