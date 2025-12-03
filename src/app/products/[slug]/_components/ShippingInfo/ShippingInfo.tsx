import React from 'react';

export function ShippingInfo() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600">🚚</span>
          <span className="text-gray-700">ارسال رایگان برای خرید بالای 500,000 تومان</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🛡️</span>
          <span className="text-gray-700">گارانتی اصالت و کیفیت محصول</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-600">↩️</span>
          <span className="text-gray-700">امکان بازگشت تا 7 روز</span>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
