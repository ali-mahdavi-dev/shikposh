import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from 'antd';
import { AppstoreOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

export interface CategoryTileProps {
  id: string;
  name: string;
  count?: number;
  thumbnail?: string;
  href?: string;
  icon?: React.ReactNode;
  countSuffix?: string; // e.g., "محصول" or "پست"
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  id: _id,
  name,
  count = 0,
  thumbnail = '/images/dress-main.jpg',
  href,
  icon,
  countSuffix = 'محصول',
}) => {
  const content = (
    <div className="group h-full cursor-pointer">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {icon ?? <AppstoreOutlined className="text-3xl text-pink-600" />}
            </div>
          </div>

          {/* Count Badge */}
          {count > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-md backdrop-blur-sm">
              <span>{count}</span>
              <span className="text-[10px]">{countSuffix}</span>
            </div>
          )}

          {/* Shine Effect */}
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <Title
            level={5}
            className="!mb-0 line-clamp-2 !text-gray-800 transition-colors group-hover:text-pink-600"
            style={{ fontSize: '15px', fontWeight: 700, minHeight: '44px' }}
          >
            {name}
          </Title>
          <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <span>مشاهده همه</span>
            <RightOutlined className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-pink-300" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default CategoryTile;
