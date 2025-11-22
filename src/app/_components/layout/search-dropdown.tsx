'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Input, Spin, Empty, Typography } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchProducts } from '@/app/products/_api/hooks';
import { useDebounced } from '@/app/products/_api/hooks';

const { Text } = Typography;

interface SearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onClose?: () => void;
  visible: boolean;
  className?: string;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  value,
  onChange,
  onSearch,
  onClose,
  visible,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const debouncedQuery = useDebounced(value, 300);
  const { data: products = [], isLoading, isFetching } = useSearchProducts(debouncedQuery);

  // Limit to 10 products in dropdown
  const displayedProducts = useMemo(() => products.slice(0, 10), [products]);

  const hasResults = products.length > 0 && debouncedQuery.trim().length > 0;
  const showDropdown =
    visible && (isOpen || hasResults || isLoading) && debouncedQuery.trim().length > 0;

  // Prevent body scroll when mobile dropdown is open
  useEffect(() => {
    if (isMobile && showDropdown) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile, showDropdown]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.input?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown || displayedProducts.length === 0) {
        if (e.key === 'Enter' && value.trim()) {
          onSearch(value.trim());
          setIsOpen(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setIsNavigating(true);
          setSelectedIndex((prev) => (prev < displayedProducts.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsNavigating(true);
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < displayedProducts.length) {
            const product = displayedProducts[selectedIndex];
            window.location.href = `/products/${product.slug}`;
            setIsOpen(false);
          } else if (value.trim()) {
            onSearch(value.trim());
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          if (onClose) onClose();
          break;
      }
    },
    [showDropdown, displayedProducts, selectedIndex, value, onSearch, onClose],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (isNavigating && selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, isNavigating]);

  const handleInputFocus = () => {
    if (value.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
    setSelectedIndex(-1);
    setIsNavigating(false);
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onClose) onClose();
  };

  const handleClear = () => {
    onChange('');
    setSelectedIndex(-1);
    setIsOpen(false);
    if (onClose) onClose();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Input
        ref={inputRef}
        placeholder="جستجو در محصولات..."
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        onPressEnter={() => {
          if (value.trim()) {
            onSearch(value.trim());
            setIsOpen(false);
          }
        }}
        size="large"
        prefix={<SearchOutlined className="text-gray-400" />}
        suffix={
          value && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
              type="button"
            >
              <CloseOutlined />
            </button>
          )
        }
        className="w-full rounded-full border-gray-200 shadow-sm hover:border-pink-300 focus:border-pink-500"
        style={{ borderRadius: '9999px' }}
      />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && showDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              if (onClose) onClose();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${
              isMobile
                ? 'fixed inset-x-0 top-0 bottom-0 z-[9999] mt-0 rounded-none border-0 bg-white shadow-none'
                : 'absolute top-full right-0 left-0 z-50 mt-2 max-h-[600px] w-full max-w-[600px] min-w-[500px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl'
            }`}
          >
            {isMobile && (
              <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex-1">
                  <Input
                    placeholder="جستجو در محصولات..."
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPressEnter={() => {
                      if (value.trim()) {
                        onSearch(value.trim());
                        setIsOpen(false);
                      }
                    }}
                    size="large"
                    prefix={<SearchOutlined className="text-gray-400" />}
                    suffix={
                      value && (
                        <button
                          onClick={handleClear}
                          className="flex items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
                          type="button"
                        >
                          <CloseOutlined />
                        </button>
                      )
                    }
                    className="w-full rounded-full border-gray-200"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                  }}
                  className="flex-shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  بستن
                </button>
              </div>
            )}
            <div
              className={`${isMobile ? 'h-[calc(100vh-80px)] overflow-y-auto' : 'max-h-[600px] overflow-y-auto'}`}
              ref={resultsRef}
            >
              {isLoading || isFetching ? (
                <div className="flex items-center justify-center py-20 md:py-12">
                  <Spin size={isMobile ? 'default' : 'large'} />
                </div>
              ) : hasResults ? (
                <>
                  <div className="border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50 px-3 py-2 md:px-4 md:py-3">
                    <Text className="text-xs font-semibold text-gray-700 md:text-sm">
                      {products.length} نتیجه یافت شد
                      {products.length > 10 && ' (نمایش 10 مورد اول)'}
                    </Text>
                  </div>
                  <div className="py-1 md:py-2">
                    {displayedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={handleProductClick}
                          className={`block px-3 py-2.5 transition-all active:bg-gray-100 md:px-4 md:py-3 ${
                            selectedIndex === index
                              ? 'border-r-2 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 md:border-r-4'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 md:gap-4">
                            <div
                              className={`relative ${isMobile ? 'h-14 w-14' : 'h-20 w-20'} flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 md:rounded-xl`}
                            >
                              <Image
                                src={product.image || '/placeholder-product.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes={isMobile ? '56px' : '80px'}
                              />
                              {product.isNew && (
                                <div className="absolute top-0.5 left-0.5 rounded bg-green-500 px-1 py-0.5 text-[10px] text-white md:top-1 md:left-1 md:px-1.5 md:py-0.5 md:text-xs">
                                  جدید
                                </div>
                              )}
                              {product.isFeatured && (
                                <div className="absolute top-0.5 right-0.5 rounded bg-pink-500 px-1 py-0.5 text-[10px] text-white md:top-1 md:right-1 md:px-1.5 md:py-0.5 md:text-xs">
                                  ویژه
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3 md:gap-4">
                                <div className="min-w-0 flex-1 overflow-hidden">
                                  <Text
                                    strong
                                    className="block truncate text-gray-900"
                                    style={{ fontSize: isMobile ? '13px' : '14px' }}
                                    title={product.name}
                                  >
                                    {product.name}
                                  </Text>
                                  <Text
                                    className="mt-0.5 block truncate text-gray-500 md:mt-1"
                                    style={{ fontSize: isMobile ? '11px' : '12px' }}
                                    title={product.brand}
                                  >
                                    {product.brand}
                                  </Text>
                                </div>
                                <div className="ml-2 flex-shrink-0 text-left whitespace-nowrap">
                                  <div className="flex flex-col items-end gap-0.5 md:flex-row md:items-center md:gap-2">
                                    {product.discount > 0 && (
                                      <Text
                                        delete
                                        type="secondary"
                                        className="text-[10px] whitespace-nowrap md:text-xs"
                                      >
                                        {product.originalPrice?.toLocaleString('fa-IR')}
                                      </Text>
                                    )}
                                    <Text
                                      strong
                                      className="whitespace-nowrap text-pink-600"
                                      style={{ fontSize: isMobile ? '13px' : '14px' }}
                                    >
                                      {product.price.toLocaleString('fa-IR')}{' '}
                                      <span className="text-[10px] font-normal md:text-xs">
                                        تومان
                                      </span>
                                    </Text>
                                  </div>
                                  {product.rating > 0 && (
                                    <div className="mt-0.5 flex items-center gap-0.5 md:mt-1 md:gap-1">
                                      <span className="text-[10px] text-yellow-500 md:text-xs">
                                        ★
                                      </span>
                                      <Text
                                        className="whitespace-nowrap text-gray-500"
                                        style={{ fontSize: isMobile ? '10px' : '11px' }}
                                      >
                                        {product.rating.toFixed(1)} ({product.reviewCount})
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  {value.trim() && products.length > 10 && (
                    <div className="sticky bottom-0 border-t border-gray-100 bg-white px-3 py-2.5 shadow-lg md:px-4 md:py-3">
                      <button
                        onClick={() => {
                          onSearch(value.trim());
                          setIsOpen(false);
                        }}
                        className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 py-2.5 text-center text-sm font-medium text-white transition-all hover:from-pink-600 hover:to-purple-700 active:scale-95 md:py-2"
                      >
                        مشاهده همه {products.length} نتیجه برای "{value}"
                      </button>
                    </div>
                  )}
                </>
              ) : debouncedQuery.trim().length > 0 ? (
                <div className="py-20 md:py-12">
                  <Empty
                    description={
                      <Text className="text-sm text-gray-500 md:text-base">نتیجه‌ای یافت نشد</Text>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
