import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity } from '@/app/products/_api/entities';
import { ProductGrid } from '@/app/products/_components';

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

// Helper to map ProductEntity to grid format
function mapToGridProduct(products: ProductEntity[]) {
  return products.map((product) => {
    let firstImage = product.thumbnail;
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      const firstColorImages = product.images[firstColorId];
      if (firstColorImages?.length > 0) {
        firstImage = firstColorImages[0];
      }
    }

    return {
      id: String(product.id),
      slug: product.slug,
      name: product.title,
      image: firstImage,
      price: product.price || 0,
      origin_price: product.origin_price,
      discount: product.discount || 0,
      rating: product.rating || 0,
      reviewCount: 0,
      isNew: product.is_new || false,
      isFeatured: product.is_featured || false,
    };
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch category and products server-side
  const [category, products] = await Promise.all([
    serverFetch<CategoryEntity>(`/api/v1/public/categories/${slug}`, {
      tags: ['categories', `category-${slug}`],
    }),
    serverFetch<ProductEntity[]>(`/api/v1/public/products/category/${slug}`, {
      tags: ['products', `category-products-${slug}`],
    }),
  ]);

  if (!category) {
    notFound();
  }

  const gridProducts = mapToGridProduct(products || []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-sm text-gray-500">
          {`تعداد محصولات: ${gridProducts.length.toLocaleString('fa-IR')}`}
        </p>
      </div>

      {/* Products Grid */}
      <section>
        <ProductGrid
          products={gridProducts}
          loading={false}
          error={undefined}
          cols={3}
          gap="lg"
          emptyMessage={`هیچ محصولی در دسته‌بندی ${category.name} یافت نشد`}
        />
      </section>
    </div>
  );
}
