import React from 'react';

export function FeaturesList({ features }: { features: string[] }) {
  if (!Array.isArray(features) || features.length === 0) return null;
  return (
    <div className="rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 p-4">
      <h4 className="mb-3 font-semibold text-gray-800">ویژگی‌های محصول:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeaturesList;

