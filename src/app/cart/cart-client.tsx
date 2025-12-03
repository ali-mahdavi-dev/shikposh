'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { Typography, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { updateCartItemsWithProductData } from '@/stores/features/cart';
import { useProductsForCart } from '@/app/products/_api';
import { CartItem, CartSummary, CartEmpty, CartLoading } from './_components';
import type { PaymentMethod } from './_components/payment-method-selector';
import { paymentService } from '@/app/orders/_api/payment.service';

const { Title } = Typography;

export default function CartClient() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('zarinpal');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Ensure consistent initial render between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get unique product IDs from cart items
  const productIds = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.productId)));
  }, [items]);

  // Fetch product details from API (only if we have items)
  const { data: cartProducts = [], isLoading: isLoadingProducts } = useProductsForCart(productIds);

  // Update cart items with product data when API response arrives
  useEffect(() => {
    if (cartProducts.length > 0) {
      dispatch(updateCartItemsWithProductData(cartProducts));
    }
  }, [cartProducts, dispatch]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.price || 0;
      return sum + price * item.quantity;
    }, 0);

    // Calculate total discount (savings)
    // Formula: discount = price × discount% / (100 - discount%)
    const totalDiscount = items.reduce((sum, item) => {
      if (item.price && item.discount && item.discount > 0) {
        // Calculate discount amount: price × discount / (100 - discount)
        const discountAmount = Math.round((item.price * item.discount) / (100 - item.discount));
        return sum + discountAmount * item.quantity;
      }
      return sum;
    }, 0);

    // Calculate tax (3% on subtotal)
    const taxRate = 0.03; // 3%
    const tax = Math.round(subtotal * taxRate);

    // Calculate tax on discount (tax that would have been paid on the discount amount)
    const taxOnDiscount = Math.round(totalDiscount * taxRate);

    // Real savings = discount - tax on discount (rounded)
    const realSavings = Math.round(totalDiscount - taxOnDiscount);

    const shipping = items.length > 0 ? 0 : 0;
    const total = subtotal + tax + shipping;
    return { subtotal, shipping, total, totalDiscount, tax, realSavings };
  }, [items]);

  const handleContinuePurchase = async () => {
    if (items.length === 0) {
      message.warning('سبد خرید شما خالی است');
      return;
    }

    setIsCreatingOrder(true);
    try {
      // Prepare order items
      const orderItems = items.map((item) => ({
        product_id: Number(item.productId),
        product_name: item.name || 'محصول',
        product_slug: item.slug,
        product_image: item.image,
        quantity: item.quantity,
        price: item.price || 0,
        discount: item.discount || 0,
        color: item.color,
        size: item.size,
      }));

      // Create order request
      const orderRequest = {
        items: orderItems,
        payment_method: selectedPaymentMethod,
        total_amount: totals.subtotal,
        discount_amount: totals.totalDiscount,
        shipping_cost: totals.shipping,
        final_amount: totals.total,
      };

      // Create order and get payment URL
      const response = await paymentService.createOrderAndGetPaymentUrl(orderRequest);

      // Store order ID for callback verification
      localStorage.setItem('pending_order_id', response.order_id.toString());

      // Redirect to payment gateway
      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        message.error('خطا در ایجاد درخواست پرداخت');
        setIsCreatingOrder(false);
      }
    } catch (error: any) {
      console.error('Failed to create order:', error);
      message.error(error?.message || 'خطا در ایجاد سفارش. لطفاً دوباره تلاش کنید.');
      setIsCreatingOrder(false);
    }
  };

  // During SSR and initial client render, show empty state to prevent hydration mismatch
  // After mount, show actual cart state
  const showEmptyState = !isMounted || !items.length;
  const showLoadingState = isMounted && items.length > 0 && isLoadingProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {showEmptyState ? (
        <CartEmpty />
      ) : showLoadingState ? (
        <CartLoading />
      ) : (
        <>
          <Title level={2} className="mb-6 text-gray-800">
            سبد خرید
          </Title>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.color}-${item.size}`} item={item} />
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <CartSummary
                totals={totals}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onContinuePurchase={handleContinuePurchase}
                isCreatingOrder={isCreatingOrder}
                itemsCount={items.length}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
