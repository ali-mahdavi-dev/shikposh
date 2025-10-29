import React from "react";
import { Button, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { QuantitySelectorProps } from "../types";

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
      <Text className="text-gray-700 font-medium">تعداد:</Text>
      
      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            type="text"
            icon={<MinusOutlined />}
            onClick={handleDecrease}
            disabled={quantity <= min}
            className="w-10 h-10 rounded-l-xl border-0 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
          />
        </motion.div>
        
        <div className="w-12 h-10 flex items-center justify-center bg-white border-x border-gray-200">
          <Text className="font-semibold text-gray-800">{quantity}</Text>
        </div>
        
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={handleIncrease}
            disabled={quantity >= max}
            className="w-10 h-10 rounded-r-xl border-0 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
          />
        </motion.div>
      </div>
      
      {max < 10 && (
        <Text className="text-xs text-gray-500">
          (حداکثر {max} عدد)
        </Text>
      )}
    </div>
  );
};

export default QuantitySelector;
