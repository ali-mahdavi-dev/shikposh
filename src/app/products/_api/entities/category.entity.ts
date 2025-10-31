export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount?: number;
}
