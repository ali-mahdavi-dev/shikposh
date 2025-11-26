'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  useFilteredProducts,
  useCategories,
  useProducts,
  useDebounced,
  type ProductFilters,
} from './_api';
import { ProductGrid } from './_components';
import { ProductGridSkeleton } from '@/app/_components/skeleton';
import { Input, Select, Rate, Button, Drawer, Typography, Tag, Slider } from 'antd';
import { FilterOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { formatIranianPrice } from '@/shared/utils';

const { Text } = Typography;
const { Option } = Select;

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Get all products for add to cart (need full product data)
  const { data: allProducts = [] } = useProducts();
  const { data: categories = [] } = useCategories();

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
      category_name: category !== 'all' ? category : undefined,
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

  // Fetch filtered products from API
  const { data: filteredProducts = [], isLoading, error } = useFilteredProducts(filters);

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
    if (category !== 'all') params.set('category_name', category);
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

  const ActiveFilters = () => {
    const getSortLabel = (sortValue: string): string => {
      const sortLabels: Record<string, string> = {
        relevance: 'مرتبط‌ترین',
        price_asc: 'قیمت: کم به زیاد',
        price_desc: 'قیمت: زیاد به کم',
        rating_desc: 'بالاترین امتیاز',
        newest: 'جدیدترین',
      };
      return sortLabels[sortValue] || sortValue;
    };

    const active: string[] = [];
    if (debouncedSearchQuery) active.push(`جستجو: ${debouncedSearchQuery}`);
    if (category !== 'all') active.push(`دسته: ${category}`);
    if (selectedTags.length > 0) active.push(`تگ‌ها: ${selectedTags.join(', ')}`);
    if (onlyFeatured) active.push('ویژه');
    if (minPriceNum > 0 || maxPriceNum < 10_000_000) {
      active.push(
        `قیمت: ${formatIranianPrice(minPriceNum)} - ${formatIranianPrice(maxPriceNum)} تومان`,
      );
    }
    if (minRating > 0) active.push(`حداقل امتیاز: ${minRating}`);
    if (sortBy !== 'relevance') {
      const sortLabel = getSortLabel(sortBy);
      active.push(`مرتب‌سازی: ${sortLabel}`);
    }

    return (
      <div className="mt-1 flex min-h-[32px] flex-wrap items-center gap-2">
        {active.length > 0 && (
          <>
            {active.map((filter, idx) => (
              <Tag key={idx} color="magenta" className="m-0 px-2 py-1">
                {filter}
              </Tag>
            ))}
            <Button type="link" onClick={resetFilters} icon={<ReloadOutlined />} size="small">
              بازنشانی
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="!sm:flex-row !sm:items-center !sm:justify-between flex flex-col gap-3">
        <div>
          {/* Active Filters */}
          <ActiveFilters />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <Button icon={<FilterOutlined />} onClick={() => setDrawerOpen(true)}>
                فیلترها
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex-1 text-xs text-gray-500">
            {isLoading
              ? 'در حال بارگذاری...'
              : `تعداد نتایج: ${filteredProducts.length.toLocaleString('fa-IR')}`}
          </div>

          <div className="flex w-1/3 items-center justify-end gap-2 sm:w-auto">
            <Text className="hidden text-sm text-gray-600 sm:block">مرتب‌سازی:</Text>
            <Select value={sortBy} onChange={setSortBy} className="w-full sm:w-56">
              <Option value="relevance">مرتبط‌ترین</Option>
              <Option value="price_asc">قیمت: کم به زیاد</Option>
              <Option value="price_desc">قیمت: زیاد به کم</Option>
              <Option value="rating_desc">بالاترین امتیاز</Option>
              <Option value="newest">جدیدترین</Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* Filters Panel */}
            <div className="space-y-4">
              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="جستجوی محصول، برند یا توضیحات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full sm:w-80"
              />

              <div className="flex flex-col gap-2">
                <Text className="text-sm text-gray-600">دسته‌بندی</Text>
                <Select
                  value={category}
                  onChange={setCategory}
                  className="w-full"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  <Option value="all">همه</Option>
                  {categoryOptions.map((cat) => (
                    <Option key={cat.slug} value={cat.name}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="flex flex-col gap-1">
                    <Text className="text-xs text-gray-500">حداقل قیمت</Text>
                    <Text className="text-base font-semibold text-gray-900">
                      {formatIranianPrice(priceRange[0])} تومان
                    </Text>
                  </div>
                  <div className="mx-2 text-gray-400">–</div>
                  <div className="flex flex-col gap-1">
                    <Text className="text-xs text-gray-500">حداکثر قیمت</Text>
                    <Text className="text-base font-semibold text-gray-900">
                      {formatIranianPrice(priceRange[1])} تومان
                    </Text>
                  </div>
                </div>
                <Slider
                  range
                  min={0}
                  max={10_000_000}
                  step={10000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  tooltip={{
                    formatter: (value) => `${formatIranianPrice(value || 0)} تومان`,
                  }}
                  className="!mb-0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Text className="text-sm text-gray-600">حداقل امتیاز</Text>
                <Rate value={minRating} onChange={(val) => setMinRating(val)} />
              </div>

              <div className="flex items-center justify-between">
                <Text className="text-sm text-gray-600">فقط ویژه</Text>
                <Select
                  value={onlyFeatured ? 'yes' : 'no'}
                  onChange={(v) => setOnlyFeatured(v === 'yes')}
                  className="w-24"
                >
                  <Option value="no">خیر</Option>
                  <Option value="yes">بله</Option>
                </Select>
              </div>

              {allTags.length > 0 && (
                <div className="flex flex-col gap-2">
                  <Text className="text-sm text-gray-600">تگ‌ها</Text>
                  <Select
                    mode="multiple"
                    value={selectedTags}
                    onChange={setSelectedTags}
                    placeholder="تگ‌ها را انتخاب کنید"
                    className="w-full"
                    maxTagCount="responsive"
                    showSearch
                    filterOption={(input, option) => {
                      const label =
                        typeof option?.label === 'string'
                          ? option.label
                          : String(option?.label || '');
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {allTags.map((tag) => (
                      <Option key={tag} value={tag}>
                        {tag}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Button onClick={resetFilters} icon={<ReloadOutlined />} block>
                بازنشانی
              </Button>
            </div>
          </div>
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
              gap="lg"
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
      <Drawer
        title="فیلتر محصولات"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={320}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Text className="text-sm text-gray-600">دسته‌بندی</Text>
            <Select value={category} onChange={setCategory} className="w-full">
              <Option value="all">همه</Option>
              {categoryOptions.map((cat) => (
                <Option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex flex-col gap-1">
                <Text className="text-xs text-gray-500">حداقل قیمت</Text>
                <Text className="text-base font-semibold text-gray-900">
                  {formatIranianPrice(priceRange[0])} تومان
                </Text>
              </div>
              <div className="mx-2 text-gray-400">–</div>
              <div className="flex flex-col gap-1">
                <Text className="text-xs text-gray-500">حداکثر قیمت</Text>
                <Text className="text-base font-semibold text-gray-900">
                  {formatIranianPrice(priceRange[1])} تومان
                </Text>
              </div>
            </div>
            <Slider
              range
              min={0}
              max={10_000_000}
              step={10000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              tooltip={{
                formatter: (value) => `${value?.toLocaleString('fa-IR')} تومان`,
              }}
              className="!mb-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Text className="text-sm text-gray-600">حداقل امتیاز</Text>
            <Rate value={minRating} onChange={(val) => setMinRating(val)} />
          </div>

          <div className="flex items-center justify-between">
            <Text className="text-sm text-gray-600">فقط ویژه</Text>
            <Select
              value={onlyFeatured ? 'yes' : 'no'}
              onChange={(v) => setOnlyFeatured(v === 'yes')}
              className="w-24"
            >
              <Option value="no">خیر</Option>
              <Option value="yes">بله</Option>
            </Select>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <Text className="text-sm text-gray-600">تگ‌ها</Text>
              <Select
                mode="multiple"
                value={selectedTags}
                onChange={setSelectedTags}
                placeholder="تگ‌ها را انتخاب کنید"
                className="w-full"
                maxTagCount="responsive"
                showSearch
                filterOption={(input, option) => {
                  const label =
                    typeof option?.label === 'string' ? option.label : String(option?.label || '');
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
              >
                {allTags.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Button onClick={resetFilters} icon={<ReloadOutlined />} block>
            بازنشانی
          </Button>
        </div>
      </Drawer>

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
