import React, { useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BaseCard } from '@/app/_components/ui';
import { Badge as BaseBadge } from '@/app/_components';
import { cn } from '@/utils/cn';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

export interface PostCardProps {
  title?: string;
  image: string;
  href?: string;
  badges?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  image,
  href,
  badges = [],
  isNew = false,
  isFeatured = false,
  discount = 0,
  animation = true,
  motionProps,
  className,
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState(() => getValidImageSrc(image, DEFAULT_IMAGES.post));

  const cardClasses = cn('group relative overflow-hidden cursor-pointer', className);

  const calculateDiscount = () => {
    return discount;
  };

  const handleImageError = () => {
    setImageSrc(DEFAULT_IMAGES.post);
  };

  const content = animation ? (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...motionProps}
      onClick={onClick}
    >
      <BaseCard variant="elevated" size="sm" className="overflow-hidden p-0" hover={true}>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title || 'Post'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />

          {/* Badges - Top Right */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            {isNew && <BaseBadge text="جدید" variant="new" />}
            {isFeatured && <BaseBadge text="ویژه" variant="featured" />}
            {calculateDiscount() > 0 && (
              <BaseBadge text={`${calculateDiscount()}% تخفیف`} variant="discount" />
            )}
            {badges.map((badge, index) => (
              <BaseBadge key={index} text={badge} />
            ))}
          </div>
        </div>

        {/* Title (Optional) */}
        {title && (
          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-pink-600">
              {title}
            </h3>
          </div>
        )}
      </BaseCard>
    </motion.div>
  ) : (
    <div className={cardClasses} onClick={onClick}>
      <BaseCard variant="elevated" size="sm" className="overflow-hidden p-0" hover={true}>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title || 'Post'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            {isNew && <BaseBadge text="جدید" variant="new" />}
            {isFeatured && <BaseBadge text="ویژه" variant="featured" />}
            {calculateDiscount() > 0 && (
              <BaseBadge text={`${calculateDiscount()}% تخفیف`} variant="discount" />
            )}
            {badges.map((badge, index) => (
              <BaseBadge key={index} text={badge} />
            ))}
          </div>
        </div>

        {/* Title (Optional) */}
        {title && (
          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-pink-600">
              {title}
            </h3>
          </div>
        )}
      </BaseCard>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};
