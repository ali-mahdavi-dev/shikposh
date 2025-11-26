import React from 'react';
import Link from 'next/link';

interface ProductTagsProps {
  tags: string[];
}

export default function ProductTags({ tags }: ProductTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-gray-700">تگ‌ها:</span>
      {tags.map((tag, index) => (
        <Link
          key={`${tag}-${index}`}
          href={`/products?tags=${encodeURIComponent(tag)}`}
          className="inline-flex h-[22px] items-center rounded border border-[#f759ab] !bg-[#fec9e4f5] !px-[7px] text-xs font-medium !text-[#9e1068] transition-all hover:border-[#c41d7f] hover:text-[#c41d7f]"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
