'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RightOutlined, FireOutlined, AppstoreOutlined } from '@ant-design/icons';
import { CategoryEntity } from '@/app/products/_api/entities/category.entity';

interface CategoryNode extends CategoryEntity {
  children?: CategoryNode[];
}

interface MegaMenuProps {
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

export const MegaMenu: React.FC<MegaMenuProps> = ({ categories, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);

  // Group root categories into columns (max 3 columns)
  const columns = useMemo(() => {
    const cols: CategoryNode[][] = [[], [], []];
    categoryTree.forEach((category, index) => {
      cols[index % 3].push(category);
    });
    return cols.filter((col) => col.length > 0);
  }, [categoryTree]);

  const handleCategoryClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="mega-menu-container w-full bg-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <AppstoreOutlined className="text-xl text-pink-500" />
          <h3 className="text-lg font-bold text-gray-900">همه دسته‌بندی‌ها</h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-1">
              {column.map((category) => {
                const hasChildren = category.children && category.children.length > 0;
                const isHovered = hoveredCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {/* Main Category Link */}
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={handleCategoryClick}
                      className="flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 hover:bg-gradient-to-l hover:from-pink-50 hover:to-purple-50 hover:shadow-sm"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex-shrink-0">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-purple-100">
                              <FireOutlined className="text-pink-500" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 transition-colors group-hover:text-pink-600">
                              {category.name}
                            </span>
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
                      </div>
                      {hasChildren && (
                        <RightOutlined
                          className={`flex-shrink-0 text-xs text-gray-400 transition-all duration-200 ${
                            isHovered ? '-translate-x-1 text-pink-500' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Subcategories Panel */}
                    <AnimatePresence>
                      {hasChildren && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-0 right-full z-50 mr-2 w-64 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2xl"
                          style={{ direction: 'rtl' }}
                          onMouseEnter={() => setHoveredCategory(category.id)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <div className="p-2">
                            <div className="mb-2 border-b border-gray-100 px-3 py-2">
                              <h4 className="text-sm font-semibold text-gray-900">
                                {category.name}
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {category.children!.map((subcategory) => (
                                <Link
                                  key={subcategory.id}
                                  href={`/category/${subcategory.slug}`}
                                  onClick={handleCategoryClick}
                                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-all hover:bg-pink-50 hover:text-pink-600"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <Link
            href="/products"
            onClick={handleCategoryClick}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-white transition-all hover:from-pink-600 hover:to-purple-700 hover:shadow-lg"
          >
            <AppstoreOutlined />
            <span className="!text-white font-semibold">مشاهده همه محصولات</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .mega-menu-container {
          direction: rtl;
        }
        .mega-menu-container * {
          direction: rtl;
        }
      `}</style>
    </div>
  );
};
