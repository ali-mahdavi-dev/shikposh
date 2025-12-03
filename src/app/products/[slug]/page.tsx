import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productContainer } from '../_api/container';
import type { ProductEntity, ProductSummary } from '../_api/entities';
import ProductCardWrapper from './_components/ProductCardWrapper/ProductCardWrapper';
import FeaturesList from './_components/FeaturesList/FeaturesList';
import ShippingInfo from './_components/ShippingInfo/ShippingInfo';
import ProductActions from './_components/ProductActions/ProductActions';
import SellerInfo from './_components/SellerInfo/SellerInfo';
import ProductTabs from './_components/ProductTabs/ProductTabs';
import ProductTags from './_components/ProductTags/ProductTags';
import ProductImageGalleryWrapper from './_components/ProductImageGalleryWrapper/ProductImageGalleryWrapper';
import ProductHeader from './_components/ProductHeader/ProductHeader';
import RelatedProducts from '../_components/RelatedProducts/RelatedProducts';

export const revalidate = 3600;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const productService = productContainer.getService();
  const products = await productService.getAllProducts();
  if (!products || products.length === 0) return [];
  return products.map((product) => ({
    slug: product.slug || String(product.id),
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productService = productContainer.getService();
  const product = await productService.getProductById(slug);

  if (!product) {
    return {
      title: 'محصول یافت نشد | شیک‌پوشان',
      description:
        'متاسفانه محصول مورد نظر یافت نشد. از صفحه محصولات برای یافتن محصولات مشابه استفاده کنید.',
    };
  }

  const priceText = product.price ? `قیمت: ${product.price.toLocaleString('fa-IR')} تومان` : '';
  const discountText = product.discount ? `${product.discount}% تخفیف` : '';
  const categoryText = product.categories?.[0]?.name || '';

  return {
    title: `خرید ${product.title} | ${discountText || categoryText || 'شیک‌پوشان'}`,
    description:
      product.description ||
      `خرید آنلاین ${product.title} از شیک‌پوشان. ${priceText}. ارسال سریع، ضمانت اصالت و بازگشت کالا.`,
    keywords: [product.title, product.brand || '', categoryText, 'خرید آنلاین', 'شیک‌پوشان'].filter(
      Boolean,
    ),
    robots: { index: true, follow: true },
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.title} | شیک‌پوشان`,
      description:
        product.description || `خرید ${product.title} با بهترین قیمت و کیفیت از شیک‌پوشان`,
      images: product.thumbnail ? [{ url: product.thumbnail, alt: product.title }] : [],
      type: 'website',
      url: `/products/${slug}`,
      siteName: 'شیک‌پوشان',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || `خرید ${product.title} از شیک‌پوشان`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

// Get initial images for SSG
function getInitialImages(product: ProductEntity): string[] {
  if (product.images && Object.keys(product.images).length > 0) {
    const firstColorId = Object.keys(product.images)[0];
    return product.images[firstColorId] || [];
  }
  return product.thumbnail ? [product.thumbnail] : [];
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const productService = productContainer.getService();

  const [product, categories] = await Promise.all([
    productService.getProductById(slug),
    productService.getAllCategories(),
  ]);

  if (!product) {
    notFound();
  }

  // Get category slug from categories list or use category name as fallback
  let categorySlug: string | undefined;
  if (product.categories?.[0]) {
    const cat = categories?.find((c) => String(c.id) === String(product.categories[0].id));
    categorySlug = cat?.slug;
  }

  let relatedProducts: ProductSummary[] = [];
  if (categorySlug) {
    const related = await productService.getProductsByCategory(categorySlug);
    if (related && related.length > 0) {
      relatedProducts = related.filter((p) => String(p.id) !== String(product.id));
    }
  }

  // Fallback: if no related products, fetch some products
  if (relatedProducts.length === 0) {
    const newArrivals = await productService.getNewArrivals(10);
    if (newArrivals) {
      relatedProducts = newArrivals.filter((p) => String(p.id) !== String(product.id)).slice(0, 10);
    }
  }

  const initialImages = getInitialImages(product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="py-4 sm:py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <ProductCardWrapper>
            <div className="grid grid-cols-1 gap-4 p-3 sm:gap-6 sm:p-4 md:gap-8 md:p-6 lg:grid-cols-2">
              {/* Product Images */}
              <div className="space-y-4">
                <ProductImageGalleryWrapper images={initialImages} productName={product.title} />
                <div className="mt-4">
                  <SellerInfo sellerId={product.seller_id} />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <ProductHeader
                  brand={product.brand}
                  title={product.title}
                  description={product.description}
                  discount={product.discount}
                  rating={product.rating}
                />

                <ProductTags tags={product.tags || []} />

                <FeaturesList features={product.features} />

                <ProductActions product={product} />

                <ShippingInfo />
              </div>
            </div>

            {/* Divider inside ProductCardWrapper layout */}

            <div className="px-6 pb-6">
              <ProductTabs product={product} />
            </div>

            {/* Divider inside ProductCardWrapper layout */}

            <div className="px-6 pb-6">
              <RelatedProducts products={relatedProducts} />
            </div>
          </ProductCardWrapper>
        </div>
      </div>
    </div>
  );
}
