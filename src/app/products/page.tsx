'use client';

import React, { useMemo, useState, useEffect, useDeferredValue } from 'react';
import { useProducts, useCategories } from '@/features/products/application/hooks/use-products.hook';
import { ProductGrid } from '@/components/business/ProductGrid';
import { Input, Select, Rate, Button, Drawer, Space, Typography, Tag } from 'antd';
import { FilterOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';

const { Text } = Typography;
const { Option } = Select;

function useDebounced<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  

  // URL state
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'all');
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('min') || 0),
    Number(searchParams.get('max') || 10_000_000),
  ]);
  // Local price range and dedicated text inputs for smooth typing
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    Number(searchParams.get('min') || 0),
    Number(searchParams.get('max') || 10_000_000),
  ]);
  const [minText, setMinText] = useState<string>(String(Number(searchParams.get('min') || 0)));
  const [maxText, setMaxText] = useState<string>(String(Number(searchParams.get('max') || 10_000_000)));
  const debouncedMinText = useDebounced(minText, 300);
  const debouncedMaxText = useDebounced(maxText, 300);
  const debouncedLocalPrice = useDebounced(localPriceRange, 150);
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get('rating') || 0));
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(searchParams.get('featured') === 'true');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // (no debounce for query since we apply explicitly)

  // APPLIED (committed) state - used for filtering and URL
  const [appliedQuery, setAppliedQuery] = useState<string>(searchParams.get('q') || '');
  const [appliedCategory, setAppliedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [appliedSort, setAppliedSort] = useState<string>(searchParams.get('sort') || 'relevance');
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    Number(searchParams.get('min') || 0),
    Number(searchParams.get('max') || 10_000_000),
  ]);
  const [appliedMinRating, setAppliedMinRating] = useState<number>(Number(searchParams.get('rating') || 0));
  const [appliedOnlyFeatured, setAppliedOnlyFeatured] = useState<boolean>(searchParams.get('featured') === 'true');

  // Fetch data
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();

  // Deduplicate categories and remove built-in "همه"
  const categoryNames = useMemo(() => {
    const seen = new Set<string>();
    const names = (categories as any[])
      .map((c) => (c?.name ?? '').toString().trim())
      .filter((n) => n && n !== 'همه')
      .filter((n) => {
        if (seen.has(n)) return false;
        seen.add(n);
        return true;
      });
    return names;
  }, [categories]);

  // Sync URL only when APPLIED filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedQuery) params.set('q', appliedQuery);
    if (appliedCategory && appliedCategory !== 'all') params.set('category', appliedCategory);
    if (appliedSort && appliedSort !== 'relevance') params.set('sort', appliedSort);
    if (appliedPriceRange[0] > 0) params.set('min', String(appliedPriceRange[0]));
    if (appliedPriceRange[1] < 10_000_000) params.set('max', String(appliedPriceRange[1]));
    if (appliedMinRating > 0) params.set('rating', String(appliedMinRating));
    if (appliedOnlyFeatured) params.set('featured', 'true');
    const qs = params.toString();
    router.replace(`/products${qs ? `?${qs}` : ''}`);
  }, [appliedQuery, appliedCategory, appliedSort, appliedPriceRange, appliedMinRating, appliedOnlyFeatured, router]);

  // Keep local slider in sync when committed range changes
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Commit price range based on debounced text inputs
  useEffect(() => {
    const minValRaw = Number((debouncedMinText || '0').toString().replace(/\D/g, ''));
    const maxValRaw = Number((debouncedMaxText || '0').toString().replace(/\D/g, ''));
    const clampedMin = Math.max(0, Math.min(minValRaw, 10_000_000));
    const clampedMax = Math.max(clampedMin, Math.min(maxValRaw || 0, 10_000_000));
    const next: [number, number] = [clampedMin, clampedMax];
    if (next[0] !== priceRange[0] || next[1] !== priceRange[1]) {
      setLocalPriceRange(next);
      setPriceRange(next);
    }
  }, [debouncedMinText, debouncedMaxText]);

  // Debounce local slider changes to commit to filters smoothly
  useEffect(() => {
    if (
      Array.isArray(debouncedLocalPrice) &&
      (debouncedLocalPrice[0] !== priceRange[0] || debouncedLocalPrice[1] !== priceRange[1])
    ) {
      setPriceRange(debouncedLocalPrice as [number, number]);
    }
  }, [debouncedLocalPrice, priceRange]);

  // Derived filtered products (client-side filters) - based on APPLIED state
  const filteredProducts = useMemo(() => {
    let list = products;

    if (appliedOnlyFeatured) {
      list = list.filter((p) => p.isFeatured);
    }

    if (appliedCategory && appliedCategory !== 'all') {
      list = list.filter((p) => p.category === appliedCategory);
    }

    if (appliedQuery) {
      const q = appliedQuery.toLowerCase();
      const norm = (v?: string) => (v ?? '').toLowerCase();
      list = list.filter((p) => norm(p.name).includes(q) || norm(p.brand).includes(q) || norm(p.description).includes(q));
    }

    list = list.filter((p) => p.price >= appliedPriceRange[0] && p.price <= appliedPriceRange[1]);
    if (appliedMinRating > 0) {
      list = list.filter((p) => Math.round(p.rating) >= appliedMinRating);
    }

    switch (appliedSort) {
      case 'price_asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }

    return list.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      reviewCount: p.reviewCount,
      isNew: p.isNew,
      isFeatured: p.isFeatured,
    }));
  }, [products, appliedQuery, appliedCategory, appliedPriceRange, appliedMinRating, appliedSort, appliedOnlyFeatured]);

  // Defer rendering large lists to keep typing and filter controls responsive
  const deferredProducts = useDeferredValue(filteredProducts);

  // Client-side pagination (Load more)
  const DEFAULT_PAGE_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState<number>(DEFAULT_PAGE_SIZE);

  // Reset pagination whenever APPLIED filters change
  useEffect(() => {
    setVisibleCount(DEFAULT_PAGE_SIZE);
  }, [appliedQuery, appliedCategory, appliedPriceRange, appliedMinRating, appliedSort, appliedOnlyFeatured]);

  const visibleProducts = useMemo(() => {
    if (!Array.isArray(deferredProducts)) return [];
    return deferredProducts.slice(0, visibleCount);
  }, [deferredProducts, visibleCount]);

  const handleAddToCart = (id: string) => {
    const p = products.find((x: any) => String(x.id) === String(id));
    if (!p) return;
    const colors = p.colors ? Object.keys(p.colors) : [];
    const sizes = p.sizes || [];
    const firstColor = colors[0] || 'default';
    const firstSize = sizes[0] || 'default';
    dispatch(
      addToCart({
        productId: p.id,
        color: firstColor,
        size: firstSize,
        quantity: 1,
        price: p.price,
        name: p.name,
        image: p.image,
      }),
    );
  };

  const applyFilters = () => {
    const minValRaw = Number((minText || '0').toString().replace(/\D/g, ''));
    const maxValRaw = Number((maxText || '0').toString().replace(/\D/g, ''));
    const clampedMin = Math.max(0, Math.min(minValRaw, 10_000_000));
    const clampedMax = Math.max(clampedMin, Math.min(maxValRaw || 0, 10_000_000));
    const committedRange: [number, number] = [clampedMin, clampedMax];

    setAppliedQuery(query.trim());
    setAppliedCategory(category);
    setAppliedSort(sort);
    setAppliedMinRating(minRating);
    setAppliedOnlyFeatured(onlyFeatured);
    setAppliedPriceRange(committedRange);
  };

  const resetFilters = () => {
    // Reset pending
    setQuery('');
    setCategory('all');
    setSort('relevance');
    setPriceRange([0, 10_000_000]);
    setLocalPriceRange([0, 10_000_000]);
    setMinText('0');
    setMaxText('10000000');
    setMinRating(0);
    setOnlyFeatured(false);

    // Reset applied
    setAppliedQuery('');
    setAppliedCategory('all');
    setAppliedSort('relevance');
    setAppliedPriceRange([0, 10_000_000]);
    setAppliedMinRating(0);
    setAppliedOnlyFeatured(false);
  };

  const ActiveFilters = () => {
    const active: string[] = [];
    if (appliedQuery) active.push(`جستجو: ${appliedQuery}`);
    if (appliedCategory !== 'all') active.push(`دسته: ${appliedCategory}`);
    if (appliedOnlyFeatured) active.push('ویژه');
    if (appliedPriceRange[0] > 0 || appliedPriceRange[1] < 10_000_000)
      active.push(`قیمت: ${appliedPriceRange[0].toLocaleString()} - ${appliedPriceRange[1].toLocaleString()} تومان`);
    if (appliedMinRating > 0) active.push(`حداقل امتیاز: ${appliedMinRating}`);
    if (appliedSort !== 'relevance') active.push(`مرتب‌سازی: ${appliedSort}`);

    if (active.length === 0) return null;
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {active.map((a) => (
          <Tag key={a} color="magenta" className="m-0 px-2 py-1">
            {a}
          </Tag>
        ))}
        <Button type="link" onClick={resetFilters} icon={<ReloadOutlined />}>بازنشانی</Button>
      </div>
    );
  };

  const FiltersPanel = () => (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Text className="text-sm text-gray-600">دسته‌بندی</Text>
        <Select value={category} onChange={setCategory} className="w-full">
          <Option key="cat-all-default" value="all">همه</Option>
          {categoryNames.map((name) => (
            <Option key={`cat-name-${name}`} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm text-gray-600">محدوده قیمت (تومان)</Text>
        <div className="grid grid-cols-2 gap-3">
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            value={minText}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              setMinText(raw);
            }}
            placeholder="حداقل"
            suffix="تومان"
          />
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            value={maxText}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              setMaxText(raw);
            }}
            placeholder="حداکثر"
            suffix="تومان"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm text-gray-600">حداقل امتیاز</Text>
        <Rate value={minRating} onChange={setMinRating as any} />
      </div>

      <div className="flex items-center justify-between">
        <Space>
          <Text className="text-sm text-gray-600">فقط ویژه</Text>
        </Space>
        <Select value={onlyFeatured ? 'yes' : 'no'} onChange={(v) => setOnlyFeatured(v === 'yes')} className="w-24">
          <Option value="no">خیر</Option>
          <Option value="yes">بله</Option>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm text-gray-600">مرتب‌سازی</Text>
        <Select value={sort} onChange={setSort} suffixIcon={<FilterOutlined />}>
          <Option value="relevance">مرتبط‌ترین</Option>
          <Option value="price_asc">قیمت: کم به زیاد</Option>
          <Option value="price_desc">قیمت: زیاد به کم</Option>
          <Option value="rating_desc">بالاترین امتیاز</Option>
          <Option value="newest">جدیدترین</Option>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
      {/* Header: search + sort (mobile-first) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
          <Button icon={<FilterOutlined />} onClick={() => setDrawerOpen(true)}>
            فیلترها
          </Button>
          </div>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="جستجوی محصول، برند یا توضیحات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            inputMode="text"
            autoComplete="off"
            onKeyDown={(e) => e.stopPropagation()}
            className="h-10 w-full sm:w-80"
          />
        </div>

        <div className="flex items-center gap-2">
          <Text className="hidden text-sm text-gray-600 sm:block">مرتب‌سازی:</Text>
          <Select value={sort} onChange={setSort} className="w-full sm:w-56">
            <Option value="relevance">مرتبط‌ترین</Option>
            <Option value="price_asc">قیمت: کم به زیاد</Option>
            <Option value="price_desc">قیمت: زیاد به کم</Option>
            <Option value="rating_desc">بالاترین امتیاز</Option>
            <Option value="newest">جدیدترین</Option>
          </Select>
        </div>
      </div>

      {/* Results meta */}
      <div className="mt-2 text-xs text-gray-500">
        {isLoading ? 'در حال بارگذاری محصولات…' : `تعداد نتایج: ${deferredProducts.length.toLocaleString('fa-IR')}`}
      </div>

      <ActiveFilters />

      {/* Content */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <FiltersPanel />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button onClick={applyFilters} type="primary" block>
                اعمال فیلترها
              </Button>
              <Button icon={<ReloadOutlined />} onClick={resetFilters} block>
                بازنشانی
              </Button>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="products-page lg:col-span-9">
          <ProductGrid
            products={visibleProducts}
            loading={isLoading}
            error={(error as any)?.message}
            cols={3}
            gap="lg"
            emptyMessage="هیچ محصولی مطابق فیلترها یافت نشد"
            onAddToCart={handleAddToCart}
          />

          {/* Load more */}
          {!isLoading && visibleProducts.length < deferredProducts.length && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => setVisibleCount((c) => c + DEFAULT_PAGE_SIZE)}>
                نمایش موارد بیشتر
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer title="فیلتر محصولات" placement="right" onClose={() => setDrawerOpen(false)} open={drawerOpen} width={320}>
        <FiltersPanel />
        <div className="mt-6 flex gap-2">
          <Button onClick={resetFilters} icon={<ReloadOutlined />} className="flex-1">
            بازنشانی
          </Button>
          <Button type="primary" onClick={() => { applyFilters(); setDrawerOpen(false); }} className="flex-1">
            اعمال
          </Button>
        </div>
      </Drawer>
      <style jsx global>{`
        /* Scoped fixes for product list rendering */
        .products-page .ant-card {
          direction: rtl;
        }
        .products-page .ant-card * {
          list-style: none;
          writing-mode: horizontal-tb;
        }
        .products-page .ant-card .ant-rate {
          direction: ltr; /* ensure stars align properly */
        }
      `}</style>
    </div>
  );
}


