import React from "react";
import { Tooltip, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { ColorSelectorProps, ProductColor } from "../types";

const { Text } = Typography;

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className="space-y-3">
      <Text strong className="text-gray-800">
        رنگ:{" "}
        <span className="font-normal text-gray-600">
          {colors[selectedColor].name}
        </span>
      </Text>
      <div className="flex flex-wrap gap-3">
        {Object.entries(colors).map(
          ([colorKey, color]: [string, ProductColor]) => (
            <Tooltip
              key={colorKey}
              title={
                <div className="text-right">
                  <p className="font-bold">{color.name}</p>
                  {color.discount > 0 && (
                    <p className="text-red-400">{color.discount}% تخفیف</p>
                  )}
                  <p>
                    موجودی: {color.stock > 0 ? `${color.stock} عدد` : "ناموجود"}
                  </p>
                </div>
              }
            >
              <motion.div
                className={`w-10 h-10 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200 ${
                  colorKey === selectedColor
                    ? "border-pink-500 shadow-md"
                    : "border-gray-300 hover:border-pink-300"
                } ${
                  color.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  backgroundColor:
                    colorKey === "red"
                      ? "#ef4444"
                      : colorKey === "blue"
                      ? "#3b82f6"
                      : colorKey === "black"
                      ? "#1f2937"
                      : "#d1d5db",
                }}
                onClick={() => color.stock > 0 && onColorChange(colorKey)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {colorKey === selectedColor && color.stock > 0 && (
                  <CheckOutlined className="text-white text-lg" />
                )}
              </motion.div>
            </Tooltip>
          )
        )}
      </div>
    </div>
  );
};

export default ColorSelector;
