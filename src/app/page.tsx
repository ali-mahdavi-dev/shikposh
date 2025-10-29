import React from 'react';
import { Metadata } from 'next';
import HomeClient from './components/home-client';

// This will be used for static generation
export const metadata: Metadata = {
  title: 'صفحه اصلی',
  description: 'فروشگاه آنلاین شیک‌پوشان - بهترین محصولات مد و پوشاک',
};

// This function runs at build time for static generation
async function getStaticData() {
  try {
    // In a real app, you would fetch from your API
    // For now, we'll return empty arrays and let the client handle the data fetching
    return {
      categories: [],
      products: [],
    };
  } catch (error) {
    console.error('Error fetching static data:', error);
    return {
      categories: [],
      products: [],
    };
  }
}

export default async function Page() {
  // Fetch data at build time for better performance
  const { categories, products } = await getStaticData();

  return <HomeClient initialCategories={categories} initialProducts={products} />;
}
