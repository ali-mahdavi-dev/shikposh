'use client';
import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Rate,
  Typography,
  Divider,
  Tabs,
  Tag,
  Tooltip,
  Badge,
  App as AntApp,
} from 'antd';
import { ErrorState, ContentLoading } from '@/shared/components/loading';
import { FeaturesList, ShippingInfo, StockStatus } from './_components';
import { ProductDetailSkeleton } from '@/app/_components/skeleton';
import {
  ShoppingCartOutlined,
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ProductDetailProps } from './_types';
import { useProduct, useProductsByCategory, useCategories } from '../_api';
import { useSeller } from '@/app/seller/_api';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { toggleWishlist } from '@/stores/slices/wishlistSlice';
import { getValidImageSrc } from '@/shared/utils';

// Lazy load components for better performance
const ColorSelector = React.lazy(() => import('../_components/color-selector'));
const SizeSelector = React.lazy(() => import('../_components/size-selector'));
const QuantitySelector = React.lazy(() => import('../_components/quantity-selector'));
const RelatedProducts = React.lazy(() => import('../_components/related-products'));
const ProductImageGallery = React.lazy(() => import('../_components/product-image-gallery'));
const Questions = React.lazy(() => import('../_components/questions'));
const ProfileCard = React.lazy(() => import('@/app/profile/_components/profile-card'));

const { Title, Paragraph, Text } = Typography;

export default function ProductDetailClient({ productId = '1' }: ProductDetailProps) {
  // Next.js router for navigation
  const router = useRouter();

  // Redux hooks
  const dispatch = useAppDispatch();
  const { message } = AntApp.useApp();
  const wishlistItems = useAppSelector((state) => state.wishlist.productIds);

  // Use the new architecture hooks
  const { data: productData, isLoading, error } = useProduct(productId);

  // Get seller information from API (only if product has seller_id)
  const {
    data: sellerData,
    isLoading: sellerLoading,
    error: sellerError,
  } = useSeller(productData?.seller_id ? String(productData.seller_id) : '');

  // Get all categories to find category slug
  const { data: categories = [] } = useCategories();

  // Get category slug from product's category ID
  const categorySlug = useMemo(() => {
    if (!productData?.categories?.[0]?.id || !categories.length) {
      return '';
    }
    const categoryId = productData.categories[0].id;
    const category = categories.find((cat) => String(cat.id) === String(categoryId));
    return category?.slug || '';
  }, [productData?.categories, categories]);

  // Get related products from API based on product category slug
  const { data: relatedProductsData = [] } = useProductsByCategory(categorySlug);

  // Use product data from React Query
  const product = productData;

  // Initialize state with default values
  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('1');

  // Check if product is in wishlist using Redux state
  const isWishlisted = product ? wishlistItems.includes(String(product.id)) : false;

  // Get current images based on selected color
  const currentImages = useMemo(() => {
    if (!product) return [];
    if (selectedColorId && product.images?.[selectedColorId]) {
      return product.images[selectedColorId];
    }
    // Fallback to first color's images or thumbnail
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      return product.images[firstColorId] || [];
    }
    return product.thumbnail ? [product.thumbnail] : [];
  }, [product, selectedColorId]);

  // Get available sizes for selected color from variant
  const availableSizes = useMemo(() => {
    if (!product || !selectedColorId || !product.variant) return [];

    const colorVariants = product.variant[selectedColorId];
    if (!colorVariants) return [];

    // Get all size IDs that have stock for this color
    return Object.keys(colorVariants)
      .map((sizeId) => {
        const size = product.sizes?.find((s) => s.id.toString() === sizeId);
        return size ? { id: sizeId, name: size.name } : null;
      })
      .filter((size): size is { id: string; name: string } => size !== null);
  }, [product, selectedColorId]);

  // Get current stock from variant based on selected color and size
  const currentStock = useMemo(() => {
    if (!product || !selectedColorId || !product.variant) {
      return product?.stock || 0;
    }

    const colorVariants = product.variant[selectedColorId];
    if (!colorVariants) return 0;

    if (selectedSizeId) {
      const sizeVariant = colorVariants[selectedSizeId];
      return sizeVariant?.stock || 0;
    }

    // If no size selected, return sum of all sizes for this color
    return Object.values(colorVariants).reduce(
      (sum, sizeVariant) => sum + (sizeVariant?.stock || 0),
      0,
    );
  }, [product, selectedColorId, selectedSizeId]);

  // Initialize selected color when product data is available
  React.useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      // Select first color by default
      const firstColorId = product.colors[0].id.toString();
      setSelectedColorId(firstColorId);
    }
  }, [product]);

  // Reset selected size when color changes
  React.useEffect(() => {
    setSelectedSizeId('');
  }, [selectedColorId]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleAddToCart = useCallback(() => {
    if (product) {
      // Get color name from color ID
      const colorName =
        product.colors?.find((c) => c.id.toString() === selectedColorId)?.name || selectedColorId;

      // Get size name from size ID
      const sizeName =
        product.sizes?.find((s) => s.id.toString() === selectedSizeId)?.name || selectedSizeId;

      dispatch(
        addToCart({
          productId: String(product.id),
          color: colorName,
          size: sizeName,
          quantity: quantity,
          price: product.price,
          name: product.title,
          image: currentImages[0] || product.thumbnail,
        }),
      );
      message.success('به سبد خرید اضافه شد');
    }
  }, [product, selectedColorId, selectedSizeId, quantity, currentImages, dispatch, message]);

  const handleWishlistToggle = useCallback(() => {
    if (product) {
      dispatch(toggleWishlist(String(product.id)));
      message.success(isWishlisted ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
    }
  }, [product, dispatch, message, isWishlisted]);

  // Memoize expensive calculations
  const averageRating = useMemo(() => {
    return product?.rating || 0;
  }, [product?.rating]);

  // Memoize tab items to prevent recreation
  const tabItems = useMemo(
    () => [
      {
        key: '1',
        label: 'مشخصات فنی',
        children: (
          <div className="space-y-3">
            {product && product.specs && product.specs.length > 0 ? (
              product.specs.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                  <Text strong className="text-gray-700">
                    {spec.key}:
                  </Text>
                  <Text className="text-gray-600">{spec.value}</Text>
                </div>
              ))
            ) : (
              <Text className="text-gray-500">مشخصات فنی برای این محصول ثبت نشده است.</Text>
            )}
          </div>
        ),
      },
      {
        key: 'qa',
        label: 'سوالات',
        children: (
          <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}>
            <Questions productId={productId} />
          </Suspense>
        ),
      },
      {
        key: '3',
        label: 'راهنمای سایز',
        children: (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold">راهنمای انتخاب سایز:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                <div>
                  <strong>S:</strong> 36-38
                </div>
                <div>
                  <strong>M:</strong> 38-40
                </div>
                <div>
                  <strong>L:</strong> 40-42
                </div>
                <div>
                  <strong>XL:</strong> 42-44
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              💡 توصیه می‌شود قبل از خرید، جدول سایز را با دقت مطالعه کنید.
            </p>
          </div>
        ),
      },
    ],
    [product, averageRating, productId],
  );

  // Loading and error states - moved after all hooks
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <ErrorState message="خطا در بارگذاری محصول" description="متأسفانه محصول مورد نظر یافت نشد." />
    );
  }

  // Filter out current product from related products
  const relatedProducts = relatedProductsData.filter((p) => p.id !== String(productId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                  <Suspense
                    fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-200" />}
                  >
                    <ProductImageGallery images={currentImages} productName={product.title} />
                  </Suspense>
                  <div className="mt-4">
                    {sellerLoading ? (
                      <ContentLoading tip="در حال بارگذاری اطلاعات فروشنده..." size="small" />
                    ) : sellerError ? (
                      <div className="p-8 text-center text-gray-500">
                        خطا در بارگذاری اطلاعات فروشنده
                      </div>
                    ) : sellerData ? (
                      <Suspense
                        fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}
                      >
                        <ProfileCard
                          name={sellerData?.name || 'فروشنده'}
                          avatar={getValidImageSrc(sellerData?.avatar)}
                          description={sellerData?.description || 'توضیحاتی در دسترس نیست'}
                          rating={sellerData?.rating || sellerData?.stats?.averageRating || 0}
                          totalProducts={sellerData?.totalProducts || 0}
                          joinDate={sellerData?.joinDate || 'نامشخص'}
                          verified={sellerData?.verified || false}
                          sellerId={sellerData?.id}
                          reviewCount={sellerData?.stats?.totalReviews}
                        />
                      </Suspense>
                    ) : product?.seller_id ? (
                      <div className="p-8 text-center text-gray-500">
                        در حال بارگذاری اطلاعات فروشنده...
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        اطلاعات فروشنده در دسترس نیست
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Text className="text-sm text-gray-500">{product.brand}</Text>
                      <Tag color="pink" className="text-xs">
                        برند معتبر
                      </Tag>
                    </div>
                    <div className="relative mb-3">
                      {product.discount && product.discount > 0 && (
                        <Badge.Ribbon text={`${product.discount}% تخفیف`} color="red">
                          <div />
                        </Badge.Ribbon>
                      )}
                      <Title level={2} className="mb-0 text-gray-800">
                        {product.title}
                      </Title>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                      <Rate allowHalf disabled value={averageRating} className="text-sm" />
                    </div>
                  </div>

                  {/* Description */}
                  <Paragraph className="leading-relaxed text-gray-600">
                    {product.description}
                  </Paragraph>

                  {/* Tags for SEO */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Text className="text-sm font-semibold text-gray-700">تگ‌ها:</Text>
                      {product.tags.map((tag, index) => (
                        <Tag
                          key={`${tag}-${index}`}
                          color="pink"
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => {
                            router.push(`/products?tags=${encodeURIComponent(tag)}`);
                          }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <FeaturesList features={product.features} />

                  {/* Color Selection */}
                  <Suspense
                    fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-200" />}
                  >
                    <ColorSelector
                      colors={product.colors.reduce(
                        (acc, color) => {
                          acc[color.id.toString()] = { name: color.name };
                          return acc;
                        },
                        {} as Record<string, { name: string }>,
                      )}
                      selectedColor={selectedColorId}
                      onColorChange={setSelectedColorId}
                    />
                  </Suspense>

                  {/* Size Selection */}
                  {product.sizes && product.sizes.length > 0 && availableSizes.length > 0 && (
                    <Suspense
                      fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-200" />}
                    >
                      <SizeSelector
                        sizes={availableSizes.map((s) => s.name)}
                        selectedSize={
                          availableSizes.find((s) => s.id === selectedSizeId)?.name || ''
                        }
                        onSizeChange={(sizeName) => {
                          const size = availableSizes.find((s) => s.name === sizeName);
                          setSelectedSizeId(size?.id || '');
                        }}
                      />
                    </Suspense>
                  )}

                  {/* Stock Status */}
                  <StockStatus stock={currentStock} />

                  {/* Price and Actions */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {product.discount &&
                        product.discount > 0 &&
                        product.original_price > product.price ? (
                          <>
                            <Text delete className="text-lg text-gray-400">
                              {product.original_price.toLocaleString()} تومان
                            </Text>
                            <Text className="text-2xl font-bold text-red-600">
                              {product.price.toLocaleString()} تومان
                            </Text>
                          </>
                        ) : (
                          <Text className="text-2xl font-bold text-pink-600">
                            {product.price.toLocaleString()} تومان
                          </Text>
                        )}
                      </div>

                      <Suspense
                        fallback={<div className="h-10 w-24 animate-pulse rounded bg-gray-200" />}
                      >
                        <QuantitySelector
                          quantity={quantity}
                          onQuantityChange={setQuantity}
                          max={currentStock}
                        />
                      </Suspense>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        disabled={currentStock === 0}
                        className="h-12 flex-1 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-700"
                      >
                        افزودن به سبد خرید
                      </Button>

                      <Tooltip
                        title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                      >
                        <Button
                          size="large"
                          icon={
                            isWishlisted ? (
                              <HeartFilled className="text-red-500" />
                            ) : (
                              <HeartOutlined />
                            )
                          }
                          onClick={handleWishlistToggle}
                          className={`h-12 w-12 rounded-xl border-2 transition-all duration-300 ${
                            isWishlisted
                              ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100'
                              : 'border-gray-300 hover:border-pink-300 hover:text-pink-500'
                          }`}
                        />
                      </Tooltip>

                      <Tooltip title="اشتراک‌گذاری">
                        <Button
                          size="large"
                          icon={<ShareAltOutlined />}
                          className="h-12 w-12 rounded-xl border-2 border-gray-300 transition-all duration-300 hover:border-purple-300 hover:text-purple-500"
                        />
                      </Tooltip>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <ShippingInfo />
                </div>
              </div>

              <Divider className="my-8" />

              {/* Tabs Section */}
              <div className="px-6 pb-6">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={tabItems}
                  className="custom-tabs"
                />
              </div>

              <Divider className="my-8" />

              {/* Related Products */}
              <div className="px-6 pb-6">
                <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-200" />}>
                  <RelatedProducts products={relatedProducts} />
                </Suspense>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
