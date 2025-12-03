import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export function StockStatus({ stock }: { stock: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}
      ></div>
      <Text className={stock > 0 ? 'text-green-600' : 'text-red-500'}>
        {stock > 0 ? `موجود در انبار (${stock} عدد)` : 'ناموجود'}
      </Text>
    </div>
  );
}

export default StockStatus;

