import React from 'react';
import { Metadata } from 'next';
import CategoryClient from './category-client';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mapping between slug and category name
const categoryMapping: Record<string, string> = {
  dresses: 'پیراهن و لباس مجلسی',
  tops: 'بلوز و تاپ',
  skirts: 'دامن',
  pants: 'شلوار',
  accessories: 'اکسسوری',
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = categoryMapping[slug] || slug;

  return {
    title: `${categoryName} | شیک‌پوشان`,
    description: `محصولات دسته‌بندی ${categoryName} در فروشگاه شیک‌پوشان`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = categoryMapping[slug] || slug;

  return <CategoryClient categoryName={categoryName} />;
}
