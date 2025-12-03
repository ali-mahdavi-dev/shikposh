'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from 'antd';
import {
  SearchOutlined,
  FireOutlined,
  AppstoreOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { CategoryEntity } from '@/app/products/_api/entities/category.entity';

interface CategoryNode extends CategoryEntity {
  children?: CategoryNode[];
}

interface MobileMegaMenuProps {
  categories: CategoryEntity[];
  onClose?: () => void;
}

// Helper function to organize categories into a tree structure
function buildCategoryTree(categories: CategoryEntity[]): CategoryNode[] {
  const categoryMap = new Map<string, CategoryNode>();
  const rootCategories: CategoryNode[] = [];

  // First pass: create all nodes
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  // Second pass: build tree
  categories.forEach((category) => {
    const node = categoryMap.get(category.id)!;
    if (category.parentId && categoryMap.has(category.parentId)) {
      const parent = categoryMap.get(category.parentId)!;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    } else {
      rootCategories.push(node);
    }
  });

  // Sort categories: parents first, then by name
  const sortCategories = (cats: CategoryNode[]): CategoryNode[] => {
    return cats
      .sort((a, b) => {
        // Categories with children come first
        const aHasChildren = a.children && a.children.length > 0;
        const bHasChildren = b.children && b.children.length > 0;
        if (aHasChildren !== bHasChildren) {
          return aHasChildren ? -1 : 1;
        }
        return a.name.localeCompare(b.name, 'fa');
      })
      .map((cat) => ({
        ...cat,
        children: cat.children ? sortCategories(cat.children) : undefined,
      }));
  };

  return sortCategories(rootCategories);
}

// Flatten category tree for search
function flattenCategories(categories: CategoryNode[]): CategoryNode[] {
  const result: CategoryNode[] = [];
  categories.forEach((cat) => {
    result.push(cat);
    if (cat.children && cat.children.length > 0) {
      result.push(...flattenCategories(cat.children));
    }
  });
  return result;
}

export const MobileMegaMenu: React.FC<MobileMegaMenuProps> = ({ categories, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);
  const allCategories = useMemo(() => flattenCategories(categoryTree), [categoryTree]);

  // Get first 5 root categories for display
  const firstFiveRootCategories = useMemo(() => {
    return categoryTree.slice(0, 5);
  }, [categoryTree]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show only first 5 root categories when no search
      return firstFiveRootCategories;
    }

    // Search in all categories (including subcategories)
    const query = searchQuery.toLowerCase().trim();
    return allCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        (category.description && category.description.toLowerCase().includes(query)),
    );
  }, [searchQuery, firstFiveRootCategories, allCategories]);

  const handleCategoryClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.has(categoryId);
  };

  return (
    <div className="mobile-mega-menu-container w-full" style={{ direction: 'rtl' }}>
      {/* Search Input */}
      <div className="mb-4">
        <Input
          placeholder="جستجوی دسته‌بندی..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="large"
          className="rounded-lg"
          allowClear
        />
      </div>

      {/* Categories List */}
      <div className="max-h-[60vh] space-y-2 overflow-y-auto">
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AppstoreOutlined className="mb-3 text-4xl text-gray-300" />
            <p className="text-sm text-gray-500">دسته‌بندی‌ای یافت نشد</p>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const hasChildren = category.children && category.children.length > 0;
            const isExpanded = isCategoryExpanded(category.id);
            const isSearchMode = !!searchQuery.trim();
            const shouldShowSubcategories =
              hasChildren &&
              (isExpanded ||
                isSearchMode ||
                firstFiveRootCategories.some((root) => root.id === category.id));
            const showDropdownButton = hasChildren && !isSearchMode;

            return (
              <div key={category.id} className="space-y-1">
                {/* Main Category Link */}
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 transition-all hover:bg-gradient-to-l hover:from-pink-50 hover:to-purple-50">
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={handleCategoryClick}
                    className="flex flex-1 items-center gap-3 px-4 py-3 no-underline active:scale-[0.98]"
                  >
                    <div className="flex-shrink-0">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-purple-100">
                          <FireOutlined className="text-lg text-pink-500" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold !text-gray-900">{category.name}</span>
                        {category.productCount !== undefined && (
                          <span className="text-xs text-gray-400">
                            ({category.productCount.toLocaleString('fa-IR')})
                          </span>
                        )}
                      </div>
                      {category.description && (
                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Link>
                  {showDropdownButton && (
                    <button
                      onClick={(e) => toggleCategory(category.id, e)}
                      className="flex h-full items-center justify-center px-3 text-gray-500 transition-all hover:text-pink-600 active:scale-95"
                      aria-label={isExpanded ? 'بستن' : 'باز کردن'}
                    >
                      {isExpanded ? (
                        <UpOutlined className="text-sm" />
                      ) : (
                        <DownOutlined className="text-sm" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {shouldShowSubcategories && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded || isSearchMode
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      {category.children!.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/category/${subcategory.slug}`}
                          onClick={handleCategoryClick}
                          className="mr-4 flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600 active:scale-[0.98]"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-pink-300"></div>
                          <span className="flex-1">{subcategory.name}</span>
                          {subcategory.productCount !== undefined && (
                            <span className="text-xs text-gray-400">
                              {subcategory.productCount.toLocaleString('fa-IR')}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* View All Link */}
      {!searchQuery && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <Link
            href="/products"
            onClick={handleCategoryClick}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 !text-white no-underline transition-all hover:from-pink-600 hover:to-purple-700 active:scale-[0.98]"
          >
            <AppstoreOutlined />
            <span className="font-semibold !text-white">مشاهده همه محصولات</span>
          </Link>
        </div>
      )}
    </div>
  );
};
