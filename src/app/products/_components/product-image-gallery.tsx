'use client';

import React, { useState } from 'react';
import { Image } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductImageGalleryProps } from '../_types';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isViewerVisible, setIsViewerVisible] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Normalize images array - ensure we have at least one image
  const normalizedImages =
    images && images.length > 0
      ? images.map((img) => getValidImageSrc(img, DEFAULT_IMAGES.product))
      : [DEFAULT_IMAGES.product];

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) => {
    if (imageErrors.has(index)) {
      return DEFAULT_IMAGES.product;
    }
    return normalizedImages[index] || DEFAULT_IMAGES.product;
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleZoomClick = () => {
    setIsViewerVisible(true);
  };

  return (
    <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={getImageSrc(currentImageIndex)}
          alt={`${productName} - ${currentImageIndex + 1}`}
          className="absolute top-0 left-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onError={() => handleImageError(currentImageIndex)}
        />
      </AnimatePresence>

      <motion.button
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white/70"
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RightOutlined className="text-lg text-gray-700" />
      </motion.button>
      <motion.button
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white/70"
        onClick={goToPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LeftOutlined className="text-lg text-gray-700" />
      </motion.button>

      <motion.button
        className="absolute right-2 bottom-2 z-10 rounded-full bg-white/50 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white/70"
        onClick={handleZoomClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ZoomInOutlined className="text-lg text-gray-700" />
      </motion.button>

      <div className="absolute top-2 left-2 z-10 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
        {currentImageIndex + 1} / {normalizedImages.length}
      </div>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {normalizedImages.map((image, index) => (
          <motion.img
            key={index}
            src={getImageSrc(index)}
            alt={`${productName} thumbnail ${index + 1}`}
            className={`h-16 w-16 cursor-pointer rounded-lg border-2 object-cover ${
              index === currentImageIndex ? 'border-pink-500 shadow-md' : 'border-transparent'
            } transition-all duration-200`}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onError={() => handleImageError(index)}
          />
        ))}
      </div>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: isViewerVisible,
            onVisibleChange: (visible) => setIsViewerVisible(visible),
            current: currentImageIndex,
          }}
        >
          {normalizedImages.map((image, index) => (
            <Image
              key={index}
              src={getImageSrc(index)}
              alt={`${productName} - Image ${index + 1}`}
              onError={() => handleImageError(index)}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default ProductImageGallery;
