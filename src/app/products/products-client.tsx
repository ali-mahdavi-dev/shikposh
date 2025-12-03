'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useFilteredProducts, useDebounced, type ProductFilters } from './_api';
import { ProductGrid } from './_components/ProductGrid/ProductGrid';
import {
  ActiveFilters,
  ProductsHeader,
  ProductsSort,
  ProductsResults,
  ProductsFilters,
  ProductsFiltersDrawer,
} from './_components';
import { ProductGridSkeleton } from '@/components/ui/feedback/Skeleton';
import { Button } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/features/cart';
import type { ProductEntity, CategoryEntity } from './_api/entities';

interface ProductsClientProps {
  initialProducts?: ProductEntity[];
  initialCategories?: CategoryEntity[];
}

export default function ProductsClient({
  initialProducts = [],
  initialCategories = [],
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Use initial server data
  const allProducts = initialProducts;
  const categories = initialCategories;

  // Initialize filters from URL or defaults
  const getUrlParam = (key: string, defaultValue: string) => searchParams.get(key) || defaultValue;

  // Instant filters (applied immediately)
  const [category, setCategory] = useState(getUrlParam('category', 'all'));
  const [sortBy, setSortBy] = useState(getUrlParam('sort', 'relevance'));
  const [minRating, setMinRating] = useState(Number(getUrlParam('rating', '0')));
  const [onlyFeatured, setOnlyFeatured] = useState(getUrlParam('featured', 'false') === 'true');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    getUrlParam('tags', '').split(',').filter(Boolean),
  );

  // Typed filters (with debounce - 1 second)
  const [searchQuery, setSearchQuery] = useState(getUrlParam('q', ''));

  // Price range for slider (numbers)
  const initialMin = Number(getUrlParam('min', '0').replace(/\D/g, '') || '0');
  const initialMax = Number(getUrlParam('max', '10000000').replace(/\D/g, '') || '10000000');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Math.max(0, Math.min(initialMin, 10_000_000)),
    Math.max(initialMin, Math.min(initialMax, 10_000_000)),
  ]);

  // Debounced typed filters
  const debouncedSearchQuery = useDebounced(searchQuery, 1000);
  const debouncedPriceRange = useDebounced(priceRange, 1000);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Extract min and max from debounced range
  const minPriceNum = useMemo(() => debouncedPriceRange[0], [debouncedPriceRange]);
  const maxPriceNum = useMemo(() => debouncedPriceRange[1], [debouncedPriceRange]);

  // Build filters object for API (using debounced values for typed inputs)
  const filters: ProductFilters = useMemo(
    () => ({
      q: debouncedSearchQuery.trim() || undefined,
      category: category !== 'all' ? category : undefined,
      min: minPriceNum > 0 ? minPriceNum : undefined,
      max: maxPriceNum < 10_000_000 ? maxPriceNum : undefined,
      rating: minRating > 0 ? minRating : undefined,
      featured: onlyFeatured || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      sort: sortBy !== 'relevance' ? sortBy : undefined,
    }),
    [
      debouncedSearchQuery,
      category,
      minPriceNum,
      maxPriceNum,
      minRating,
      onlyFeatured,
      selectedTags,
      sortBy,
    ],
  );

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.q ||
      filters.category ||
      filters.min ||
      filters.max ||
      filters.rating ||
      filters.featured ||
      filters.tags?.length ||
      filters.sort
    );
  }, [filters]);

  // Only fetch from API when filters are active, otherwise use SSG data
  const {
    data: apiFilteredProducts = [],
    isLoading,
    error,
  } = useFilteredProducts(hasActiveFilters ? filters : {}, { enabled: hasActiveFilters });

  // Use SSG data when no filters, API data when filters are active
  const filteredProducts = useMemo(() => {
    if (!hasActiveFilters) {
      // Map initial products to ProductSummary format for display
      return allProducts.map((product) => {
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
          price: product.price || 0,
          origin_price: product.origin_price,
          discount: product.discount || 0,
          rating: product.rating || 0,
          reviewCount: 0,
          image: firstImage,
          category: product.categories?.[0]?.name || 'همه',
          isNew: product.is_new || false,
          isFeatured: product.is_featured || false,
        };
      });
    }
    return apiFilteredProducts;
  }, [hasActiveFilters, allProducts, apiFilteredProducts]);

  // Extract unique categories with slug for filtering
  const categoryOptions = useMemo(() => {
    const seen = new Set<string>();
    return categories
      .filter((c) => c?.slug && !seen.has(c.slug) && (seen.add(c.slug), true))
      .map((c) => ({
        slug: c.slug,
        name: c.name,
      }));
  }, [categories]);

  // Extract unique tags from all products (for filter options)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProducts.forEach((product: any) => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach((tag: string) => {
          if (tag?.trim()) tagSet.add(tag.trim());
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [allProducts]);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(24);
  const visibleProducts = useMemo(
    () =>
      filteredProducts.slice(0, visibleCount).map((product) => ({
        ...product,
        id: String(product.id),
        slug: product.slug || String(product.id),
      })),
    [filteredProducts, visibleCount],
  );

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [
    debouncedSearchQuery,
    category,
    minPriceNum,
    maxPriceNum,
    minRating,
    onlyFeatured,
    selectedTags,
    sortBy,
  ]);

  // Sync URL with filters (using debounced values for typed inputs)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchQuery) params.set('q', debouncedSearchQuery);
    if (category !== 'all') params.set('category', category);
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    if (minPriceNum > 0) params.set('min', String(minPriceNum));
    if (maxPriceNum < 10_000_000) params.set('max', String(maxPriceNum));
    if (minRating > 0) params.set('rating', String(minRating));
    if (onlyFeatured) params.set('featured', 'true');
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));

    const qs = params.toString();
    const url = `/products${qs ? `?${qs}` : ''}`;
    router.replace(url);
  }, [
    debouncedSearchQuery,
    category,
    sortBy,
    minPriceNum,
    maxPriceNum,
    minRating,
    onlyFeatured,
    selectedTags,
    router,
  ]);

  // Handlers
  const handleAddToCart = (id: string) => {
    const product = allProducts.find((p: any) => String(p.id) === String(id));
    if (!product) return;

    // Get color name from colors array (ProductEntity has colors as array)
    const colorName =
      product.colors && product.colors.length > 0 ? product.colors[0].name : 'default';

    // Get first image from images or use thumbnail
    let productImage = product.thumbnail || '';
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      const firstColorImages = product.images[firstColorId];
      if (firstColorImages && firstColorImages.length > 0) {
        productImage = firstColorImages[0];
      }
    }

    dispatch(
      addToCart({
        productId: String(product.id),
        color: colorName,
        size: '', // No size in new structure
        quantity: 1,
        price: product.price,
        name: product.title,
        image: productImage,
      }),
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setSortBy('relevance');
    setPriceRange([0, 10_000_000]);
    setMinRating(0);
    setOnlyFeatured(false);
    setSelectedTags([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-3 sm:px-4 sm:py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Search and Filter Row */}
        <ProductsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => setDrawerOpen(true)}
        />

        {/* Active Filters */}
        <div>
          <ActiveFilters
            searchQuery={debouncedSearchQuery}
            category={category}
            selectedTags={selectedTags}
            onlyFeatured={onlyFeatured}
            minPrice={minPriceNum}
            maxPrice={maxPriceNum}
            minRating={minRating}
            sortBy={sortBy}
            onReset={resetFilters}
          />
        </div>

        {/* Sort and Results Row */}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
          <ProductsResults count={filteredProducts.length} isLoading={isLoading} />
          <ProductsSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:col-span-3 lg:block">
          <ProductsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
            categoryOptions={categoryOptions}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            onlyFeatured={onlyFeatured}
            onOnlyFeaturedChange={setOnlyFeatured}
            selectedTags={selectedTags}
            onSelectedTagsChange={setSelectedTags}
            allTags={allTags}
            onReset={resetFilters}
          />
        </aside>

        {/* Products Grid */}
        <section className="products-page lg:col-span-9">
          {isLoading ? (
            <ProductGridSkeleton count={12} cols={3} />
          ) : (
            <ProductGrid
              products={visibleProducts}
              loading={false}
              error={(error as any)?.message}
              cols={3}
              gap="md"
              emptyMessage="هیچ محصولی مطابق فیلترها یافت نشد"
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Load more */}
          {!isLoading && visibleProducts.length < filteredProducts.length && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => setVisibleCount((c) => c + 24)}>نمایش موارد بیشتر</Button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      <ProductsFiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        categoryOptions={categoryOptions}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        onlyFeatured={onlyFeatured}
        onOnlyFeaturedChange={setOnlyFeatured}
        selectedTags={selectedTags}
        onSelectedTagsChange={setSelectedTags}
        allTags={allTags}
        onReset={resetFilters}
      />

      <style jsx global>{`
        .products-page .ant-card {
          direction: rtl;
        }
        .products-page .ant-card * {
          list-style: none;
          writing-mode: horizontal-tb;
        }
        .products-page .ant-card .ant-rate {
          direction: ltr;
        }
      `}</style>
    </div>
  );
}
