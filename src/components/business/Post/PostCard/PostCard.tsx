import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/base/Card';
import { Badge } from '@/components/ui/base/Badge';
import { cn } from '@/utils/cn';
import { SafeImage } from '@/shared';

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
  const cardClasses = cn('group relative overflow-hidden cursor-pointer', className);

  const calculateDiscount = () => {
    return discount;
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
      <Card variant="elevated" size="sm" className="overflow-hidden p-0" hover={true}>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <SafeImage
            src={image}
            alt={title || 'Post'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fallbackType="post"
          />

          {/* Badges - Top Right */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            {isNew && <Badge text="جدید" variant="primary" />}
            {isFeatured && <Badge text="ویژه" variant="primary" />}
            {calculateDiscount() > 0 && (
              <Badge text={`${calculateDiscount()}% تخفیف`} variant="success" />
            )}
            {badges.map((badge, index) => (
              <Badge key={index} text={badge} />
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
      </Card>
    </motion.div>
  ) : (
    <div className={cardClasses} onClick={onClick}>
      <Card variant="elevated" size="sm" className="overflow-hidden p-0" hover={true}>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <SafeImage
            src={image}
            alt={title || 'Post'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fallbackType="post"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            {isNew && <Badge text="جدید" variant="primary" />}
            {isFeatured && <Badge text="ویژه" variant="primary" />}
            {calculateDiscount() > 0 && (
              <Badge text={`${calculateDiscount()}% تخفیف`} variant="success" />
            )}
            {badges.map((badge, index) => (
              <Badge key={index} text={badge} />
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
      </Card>
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
