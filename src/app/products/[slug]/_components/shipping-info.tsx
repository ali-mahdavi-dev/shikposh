import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export function ShippingInfo() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600">🚚</span>
          <Text>ارسال رایگان برای خرید بالای 500,000 تومان</Text>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🛡️</span>
          <Text>گارانتی اصالت و کیفیت محصول</Text>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-600">↩️</span>
          <Text>امکان بازگشت تا 7 روز</Text>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;

