'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

export interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  defaultSrc?: string;
  fallbackType?: keyof typeof DEFAULT_IMAGES;
}

/**
 * SafeImage component that handles image loading errors
 * Automatically falls back to a default image if the source fails to load
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  defaultSrc,
  fallbackType = 'general',
  alt = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    const defaultImage = defaultSrc || DEFAULT_IMAGES[fallbackType];
    return getValidImageSrc(src, defaultImage);
  });

  const handleError = () => {
    const fallbackImage = defaultSrc || DEFAULT_IMAGES[fallbackType];
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };

  return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />;
};

export default SafeImage;
