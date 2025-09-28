import React, { useState } from 'react';
import { Image } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductImageGalleryProps } from '../types';

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isViewerVisible, setIsViewerVisible] = useState<boolean>(false);

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
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      {/* Main Image */}
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${productName} - ${currentImageIndex + 1}`}
          className="w-full h-full object-cover absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white/70 transition-colors z-10"
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LeftOutlined className="text-lg text-gray-700" />
      </motion.button>
      <motion.button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white/70 transition-colors z-10"
        onClick={goToPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RightOutlined className="text-lg text-gray-700" />
      </motion.button>

      {/* Zoom Button */}
      <motion.button
        className="absolute bottom-2 right-2 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white/70 transition-colors z-10"
        onClick={handleZoomClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ZoomInOutlined className="text-lg text-gray-700" />
      </motion.button>

      {/* Image Counter */}
      <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-3 py-1 rounded-full z-10">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`${productName} thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${index === currentImageIndex ? 'border-pink-500 shadow-md' : 'border-transparent'} transition-all duration-200`}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Ant Design Image.PreviewGroup for full-screen zoom */}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: isViewerVisible,
            onVisibleChange: (visible) => setIsViewerVisible(visible),
            current: currentImageIndex,
          }}
        >
          {images.map((image, index) => (
            <Image key={index} src={image} />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default ProductImageGallery;