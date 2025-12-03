'use client';

import React from 'react';
import { Button, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { QuantitySelectorProps } from '../_types';

const { Text } = Typography;

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  max = 10,
  min = 1,
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Text className="font-medium text-gray-700">تعداد:</Text>

      <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            type="text"
            icon={<MinusOutlined />}
            onClick={handleDecrease}
            disabled={quantity <= min}
            className="flex h-10 w-10 items-center justify-center rounded-l-xl border-0 hover:bg-gray-100 disabled:opacity-50"
          />
        </motion.div>

        <div className="flex h-10 w-12 items-center justify-center border-x border-gray-200 bg-white">
          <Text className="font-semibold text-gray-800">{quantity}</Text>
        </div>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={handleIncrease}
            disabled={quantity >= max}
            className="flex h-10 w-10 items-center justify-center rounded-r-xl border-0 hover:bg-gray-100 disabled:opacity-50"
          />
        </motion.div>
      </div>

      {max < 4 && <Text className="text-xs text-gray-500">(حداکثر {max} عدد)</Text>}
    </div>
  );
};

export default QuantitySelector;

