import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryClient from './category-client';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity } from '@/app/products/_api/entities';

export const revalidate = 3600; // ISR: revalidate every hour

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await serverFetch<CategoryEntity[]>('/api/v1/public/categories', {
    revalidate: 3600,
  });

  if (!categories) return [];

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await serverFetch<CategoryEntity>(`/api/v1/public/categories/${slug}`, {
    tags: ['categories', `category-${slug}`],
  });

  const categoryName = category?.name || slug;

  return {
    title: `${categoryName} | شیک‌پوشان`,
    description: `محصولات دسته‌بندی ${categoryName} در فروشگاه شیک‌پوشان`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch category and products server-side
  const [category, products, allProducts] = await Promise.all([
    serverFetch<CategoryEntity>(`/api/v1/public/categories/${slug}`, {
      tags: ['categories', `category-${slug}`],
    }),
    serverFetch<ProductEntity[]>(`/api/v1/public/products/category/${slug}`, {
      tags: ['products', `category-products-${slug}`],
    }),
    serverFetch<ProductEntity[]>('/api/v1/public/products', {
      tags: ['products'],
    }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <CategoryClient
      categoryName={category.name}
      categorySlug={slug}
      initialProducts={products || []}
      initialAllProducts={allProducts || []}
    />
  );
}
