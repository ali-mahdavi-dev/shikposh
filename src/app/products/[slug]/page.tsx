'use client';
import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { Card, Button, Rate, Typography, Divider, Tabs, Tag, Tooltip, Badge } from 'antd';
import { PageLoading, ErrorState, ContentLoading } from '@/shared/components/loading';
import { ShoppingCartOutlined, ShareAltOutlined, HeartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ProductDetailProps } from '../types';
import { ProductVariant } from '@/features/products/domain/entities/product.entity';
import { useProduct, useReviews, useProductsByCategory } from '@/features/products';
import { useSellerByProductId } from '@/features/sellers';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { toggleWishlist } from '@/stores/slices/wishlistSlice';

// Lazy load components for better performance
const ColorSelector = React.lazy(() => import('../components/color-selector'));
const SizeSelector = React.lazy(() => import('../components/size-selector'));
const QuantitySelector = React.lazy(() => import('../components/quantity-selector'));
const RelatedProducts = React.lazy(() => import('../components/related-products'));
const ProductImageGallery = React.lazy(() => import('../components/product-image-gallery'));
const CommentBox = React.lazy(() => import('@/components/comment-box'));
const ProfileCard = React.lazy(() => import('@/app/profile/components/profile-card'));
const ReviewSummary = React.lazy(() => import('@/components/review-summary'));

const { Title, Paragraph, Text } = Typography;

const ProductDetail: React.FC<ProductDetailProps> = ({ productId = '1' }) => {
  // Redux hooks
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.productIds);

  // Use the new architecture hooks
  const { data: productData, isLoading, error } = useProduct(productId);
  const { data: reviews = [] } = useReviews(productId);

  // Get seller information from API
  const { data: sellerData, isLoading: sellerLoading } = useSellerByProductId(productId);

  // Get related products from API based on product category
  const { data: relatedProductsData = [] } = useProductsByCategory(productData?.category || '');

  // Use product data from React Query
  const product = productData;

  // Initialize state with default values
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  // Check if product is in wishlist using Redux state
  const isWishlisted = product ? wishlistItems.includes(product.id) : false;

  // Initialize state when product data is available
  React.useEffect(() => {
    if (product && Object.keys(product.variants).length > 0) {
      const firstColor = Object.keys(product.variants)[0];
      const firstSize = Object.keys(product.variants[firstColor])[0];

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setCurrentVariant(product.variants[firstColor][firstSize]);
    }
  }, [product]);

  // Update current variant when color or size changes
  React.useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants[selectedColor]?.[selectedSize];
      if (variant) {
        setCurrentVariant(variant);
      } else {
        // Only update if the size is actually different to prevent infinite loop
        const availableSizes = Object.keys(product.variants[selectedColor] || {});
        if (availableSizes.length > 0) {
          const firstAvailableSize = availableSizes[0];
          if (firstAvailableSize !== selectedSize) {
            setSelectedSize(firstAvailableSize);
            setCurrentVariant(product.variants[selectedColor][firstAvailableSize]);
          }
        }
      }
    }
  }, [product, selectedColor, selectedSize]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleAddToCart = useCallback(() => {
    if (product && currentVariant) {
      dispatch(
        addToCart({
          productId: product.id,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
          price: currentVariant.price,
          name: product.name,
          image: currentVariant.images[0] || product.image,
        }),
      );
    }
  }, [product, currentVariant, selectedColor, selectedSize, quantity, dispatch]);

  const handleWishlistToggle = useCallback(() => {
    if (product) {
      dispatch(toggleWishlist(product.id));
    }
  }, [product, dispatch]);

  // Memoize expensive calculations
  const averageRating = useMemo(() => {
    if (reviews.length > 0) {
      return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    }
    return product?.rating || 0;
  }, [reviews, product?.rating]);

  // Memoize tab items to prevent recreation
  const tabItems = useMemo(
    () => [
      {
        key: '1',
        label: 'مشخصات فنی',
        children: (
          <div className="space-y-3">
            {product &&
              Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-100 py-2">
                  <Text strong className="text-gray-700">
                    {key}:
                  </Text>
                  <Text className="text-gray-600">{value}</Text>
                </div>
              ))}
          </div>
        ),
      },
      {
        key: '2',
        label: `نظرات کاربران (${reviews.length || product?.reviewCount || 0})`,
        children: showAllReviews ? (
          <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}>
            <CommentBox productId={productId} />
          </Suspense>
        ) : (
          <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}>
            <ReviewSummary
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={reviews.length}
              onViewReviews={() => setShowAllReviews(true)}
            />
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
    [product, reviews, averageRating, showAllReviews, productId],
  );

  // Loading and error states - moved after all hooks
  if (isLoading) {
    return <PageLoading tip="در حال بارگذاری محصول..." />;
  }

  if (error || !product) {
    return (
      <ErrorState message="خطا در بارگذاری محصول" description="متأسفانه محصول مورد نظر یافت نشد." />
    );
  }

  if (!currentVariant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری اطلاعات محصول...</p>
        </div>
      </div>
    );
  }

  // Calculate values after early returns to ensure currentVariant is not null
  const discountPrice =
    currentVariant.discount && currentVariant.discount > 0
      ? Math.round(currentVariant.price * (1 - currentVariant.discount / 100))
      : currentVariant.price;

  // Filter out current product from related products
  const relatedProducts = relatedProductsData.filter((p) => p.id !== productId);

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
                    <ProductImageGallery
                      images={currentVariant.images}
                      productName={product.name}
                    />
                  </Suspense>
                  <div className="mt-4">
                    {sellerLoading ? (
                      <ContentLoading tip="در حال بارگذاری اطلاعات فروشنده..." size="small" />
                    ) : sellerData ? (
                      <Suspense
                        fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}
                      >
                        <ProfileCard
                          name={sellerData?.name || 'فروشنده'}
                          avatar={sellerData?.avatar || '/images/default-avatar.jpg'}
                          description={sellerData?.description || 'توضیحاتی در دسترس نیست'}
                          rating={sellerData?.rating || 0}
                          totalProducts={sellerData?.totalProducts || 0}
                          joinDate={sellerData?.joinDate || 'نامشخص'}
                          verified={sellerData?.verified || false}
                          sellerId={sellerData?.id}
                        />
                      </Suspense>
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
                    <Title level={2} className="mb-3 text-gray-800">
                      {product.name}
                      {currentVariant.discount && currentVariant.discount > 0 && (
                        <Badge.Ribbon text={`${currentVariant.discount}% تخفیف`} color="red">
                          <div></div>
                        </Badge.Ribbon>
                      )}
                    </Title>

                    <div className="mb-4 flex items-center gap-3">
                      <Rate allowHalf disabled value={averageRating} className="text-sm" />
                      <Text className="text-gray-500">
                        ({reviews.length || product.reviewCount} نظر)
                      </Text>
                    </div>
                  </div>

                  {/* Description */}
                  <Paragraph className="leading-relaxed text-gray-600">
                    {product.description}
                  </Paragraph>

                  {/* Features */}
                  <div className="rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-gray-800">ویژگی‌های محصول:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Color Selection */}
                  <Suspense
                    fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-200" />}
                  >
                    <ColorSelector
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                    />
                  </Suspense>

                  {/* Size Selection */}
                  <Suspense
                    fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-200" />}
                  >
                    <SizeSelector
                      sizes={Object.keys(product.variants[selectedColor])}
                      selectedSize={selectedSize}
                      onSizeChange={setSelectedSize}
                    />
                  </Suspense>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        currentVariant.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                    <Text className={currentVariant.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                      {currentVariant.stock > 0
                        ? `موجود در انبار (${currentVariant.stock} عدد)`
                        : 'ناموجود'}
                    </Text>
                  </div>

                  {/* Price and Actions */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {currentVariant.discount && currentVariant.discount > 0 ? (
                          <>
                            <Text delete className="text-lg text-gray-400">
                              {currentVariant.price.toLocaleString()} تومان
                            </Text>
                            <Text className="text-2xl font-bold text-red-600">
                              {discountPrice.toLocaleString()} تومان
                            </Text>
                          </>
                        ) : (
                          <Text className="text-2xl font-bold text-pink-600">
                            {currentVariant.price.toLocaleString()} تومان
                          </Text>
                        )}
                      </div>

                      <Suspense
                        fallback={<div className="h-10 w-24 animate-pulse rounded bg-gray-200" />}
                      >
                        <QuantitySelector
                          quantity={quantity}
                          onQuantityChange={setQuantity}
                          max={currentVariant.stock}
                        />
                      </Suspense>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        disabled={currentVariant.stock === 0}
                        className="h-12 flex-1 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-700"
                      >
                        افزودن به سبد خرید
                      </Button>

                      <Tooltip
                        title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                      >
                        <Button
                          size="large"
                          icon={<HeartOutlined />}
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
                  <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🚚</span>
                        <Text>ارسال رایگان برای خرید بالای 500,000 تومان</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">🛡️</span>
                        <Text>گارانتی اصالت و کیفیت محصول</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600">↩️</span>
                        <Text>امکان بازگشت تا 7 روز</Text>
                      </div>
                    </div>
                  </div>
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
};

export default ProductDetail;
