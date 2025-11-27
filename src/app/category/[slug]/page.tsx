import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity } from '@/app/products/_api/entities';

const ProductGrid = dynamic(() => import('@/app/products/_components').then((m) => m.ProductGrid));

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await serverFetch<CategoryEntity[]>('/api/v1/public/categories', {
    revalidate: 3600,
  });

  return (categories || []).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await serverFetch<CategoryEntity>(`/api/v1/public/categories/${slug}`, {
    tags: ['categories', `category-${slug}`],
  });

  const name = category?.name || slug;

  return {
    title: `خرید ${name} | بهترین مدل‌ها با قیمت مناسب`,
    description: `خرید آنلاین ${name} از شیک‌پوشان. مشاهده جدیدترین مدل‌ها، مقایسه قیمت‌ها و انتخاب از بین صدها محصول با کیفیت. ارسال سریع و ضمانت بازگشت.`,
    keywords: [`خرید ${name}`, `${name} زنانه`, `${name} با تخفیف`, 'شیک‌پوشان'],
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `${name} | فروشگاه شیک‌پوشان`,
      description: `بهترین محصولات ${name} با قیمت مناسب و کیفیت عالی`,
      url: `/category/${slug}`,
      siteName: 'شیک‌پوشان',
      type: 'website',
    },
  };
}

const mapToGrid = (products: ProductEntity[]) =>
  products.map((p) => {
    const firstColorId = p.images ? Object.keys(p.images)[0] : null;
    const image = firstColorId ? p.images?.[firstColorId]?.[0] : p.thumbnail;

    return {
      id: String(p.id),
      slug: p.slug,
      name: p.title,
      image,
      price: p.price || 0,
      origin_price: p.origin_price,
      discount: p.discount || 0,
      rating: p.rating || 0,
      reviewCount: 0,
      isNew: p.is_new || false,
      isFeatured: p.is_featured || false,
    };
  });

export default async function CategoryPage({ params }: Props) {
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

  const gridProducts = mapToGrid(products || []);

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
