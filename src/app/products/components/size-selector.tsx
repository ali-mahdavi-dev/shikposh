import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { SizeSelectorProps } from '../types';

const { Text } = Typography;

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <div className="space-y-3">
      <Text strong className="text-gray-800">سایز: <span className="font-normal text-gray-600">{selectedSize}</span></Text>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <motion.button
            key={size}
            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-semibold transition-all duration-200\n              ${selectedSize === size ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-md' : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:text-pink-500'}\n            `}
            onClick={() => onSizeChange(size)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {size}
          </motion.button>
        ))}
      </div>
      <Text className="text-gray-500 text-sm">💡 سایز مناسب خود را از راهنمای سایز انتخاب کنید</Text>
    </div>
  );
};

export default SizeSelector;