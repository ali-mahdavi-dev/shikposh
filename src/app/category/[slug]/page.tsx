import React from 'react';
import { Metadata } from 'next';
import CategoryClient from './category-client';
import { ProductContainer } from '@/app/products/_api/container';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCategoryName(slug: string): Promise<string> {
  try {
    const productService = ProductContainer.getProductService();
    const category = await productService.getCategoryBySlug(slug);
    return category?.name || slug;
  } catch (error) {
    console.error('Error fetching category:', error);
    return slug;
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = await getCategoryName(slug);

  return {
    title: `${categoryName} | شیک‌پوشان`,
    description: `محصولات دسته‌بندی ${categoryName} در فروشگاه شیک‌پوشان`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = await getCategoryName(slug);

  return <CategoryClient categoryName={categoryName} categorySlug={slug} />;
}
