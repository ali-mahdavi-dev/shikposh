'use client';

import React from 'react';
import { Tooltip, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ColorSelectorProps } from '../_types';

const { Text } = Typography;

type ColorValue = { name: string; hex?: string; stock?: number; discount?: number };

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorChange }) => {
  // If no colors available, don't render
  if (!colors || Object.keys(colors).length === 0) {
    return null;
  }

  // If selectedColor doesn't exist in colors, use first available color
  const currentColor = colors[selectedColor] || Object.values(colors)[0];
  const currentColorKey = colors[selectedColor] ? selectedColor : Object.keys(colors)[0];

  return (
    <div className="space-y-3">
      <Text strong className="text-gray-800">
        رنگ:{' '}
        <span className="font-normal text-gray-600">{currentColor?.name || 'انتخاب نشده'}</span>
      </Text>
      <div className="flex flex-wrap gap-3">
        {Object.entries(colors).map(([colorKey, color]: [string, ColorValue]) => (
          <Tooltip
            key={colorKey}
            title={
              <div className="text-right">
                <p className="font-bold">{color.name}</p>
                {color.discount ? <p className="text-red-400">{color.discount}% تخفیف</p> : null}
                {color.stock !== undefined && (
                  <p>موجودی: {color.stock > 0 ? `${color.stock} عدد` : 'ناموجود'}</p>
                )}
              </div>
            }
          >
            <motion.div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 ${
                colorKey === currentColorKey
                  ? 'border-pink-500 shadow-md outline-2 outline-offset-2 outline-pink-500'
                  : 'border-gray-300 hover:border-pink-300'
              } ${color.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
              style={{
                backgroundColor: color.hex || '#d1d5db',
              }}
              onClick={() => (color.stock === 0 ? undefined : onColorChange(colorKey))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {colorKey === currentColorKey && (color.stock === undefined || color.stock > 0) && (
                <CheckOutlined className="text-lg text-white" />
              )}
            </motion.div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
