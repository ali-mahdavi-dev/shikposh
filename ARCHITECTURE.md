# معماری پروژه - Feature-Based Architecture

این پروژه از **معماری Feature-Based** استفاده می‌کند که یکی از بهترین روش‌های سازماندهی کد در پروژه‌های React/Next.js است.

## ساختار کلی

```
src/
├── features/                    # ویژگی‌های اصلی برنامه
│   ├── products/               # ویژگی محصولات
│   │   ├── domain/            # لایه دامنه (Domain Layer)
│   │   │   ├── entities/      # موجودیت‌ها
│   │   │   ├── repositories/  # قراردادهای دسترسی به داده
│   │   │   └── services/      # منطق کسب‌وکار
│   │   ├── infrastructure/    # لایه زیرساخت (Infrastructure Layer)
│   │   │   ├── repositories/  # پیاده‌سازی دسترسی به داده
│   │   │   └── di/           # تزریق وابستگی
│   │   ├── application/       # لایه کاربرد (Application Layer)
│   │   │   └── hooks/        # هوک‌های React Query
│   │   └── index.ts          # صادرات عمومی
│   ├── chat/                 # ویژگی چت
│   └── index.ts
├── shared/                    # کدهای مشترک
│   ├── errors/               # مدیریت خطا
│   └── utils/                # ابزارهای کمکی
├── components/               # کامپوننت‌های عمومی
├── app/                     # صفحات Next.js
└── lib/                     # تنظیمات و پیکربندی
```

## لایه‌های معماری

### 1. Domain Layer (لایه دامنه)

- **Entities**: موجودیت‌های اصلی کسب‌وکار
- **Repositories**: قراردادهای دسترسی به داده (Interface)
- **Services**: منطق کسب‌وکار و قوانین دامنه

### 2. Infrastructure Layer (لایه زیرساخت)

- **Repositories**: پیاده‌سازی واقعی دسترسی به داده
- **DI Container**: مدیریت وابستگی‌ها
- **External Services**: سرویس‌های خارجی (API، Database)

### 3. Application Layer (لایه کاربرد)

- **Hooks**: هوک‌های React Query برای مدیریت state
- **Use Cases**: موارد استفاده و منطق کاربرد

## مزایای این معماری

### ✅ جداسازی نگرانی‌ها (Separation of Concerns)

- هر لایه مسئولیت مشخصی دارد
- تغییرات در یک لایه، لایه‌های دیگر را تحت تأثیر قرار نمی‌دهد

### ✅ قابلیت تست (Testability)

- هر لایه به صورت مستقل قابل تست است
- Mock کردن وابستگی‌ها آسان است

### ✅ قابلیت نگهداری (Maintainability)

- کد منظم و قابل فهم
- تغییرات آسان‌تر اعمال می‌شود

### ✅ قابلیت توسعه (Scalability)

- افزودن ویژگی‌های جدید آسان است
- تیم‌های مختلف می‌توانند روی ویژگی‌های مختلف کار کنند

### ✅ وابستگی معکوس (Dependency Inversion)

- لایه‌های بالایی به لایه‌های پایینی وابسته نیستند
- هر دو به abstractions وابسته هستند

## نحوه استفاده

### 1. استفاده از هوک‌ها در کامپوننت‌ها

```typescript
import { useFeaturedProducts, useCategories } from '@/features/products';

const MyComponent = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();
  const { data: categories } = useCategories();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <ProductList products={products} />;
};
```

### 2. افزودن ویژگی جدید

1. ایجاد پوشه ویژگی در `src/features/`
2. تعریف entities در `domain/entities/`
3. تعریف repository interface در `domain/repositories/`
4. پیاده‌سازی repository در `infrastructure/repositories/`
5. ایجاد service در `domain/services/`
6. ایجاد hooks در `application/hooks/`
7. تنظیم DI container

### 3. مدیریت خطا

```typescript
import { ApiError, handleApiError } from '@/shared';

try {
  const data = await fetchData();
} catch (error) {
  const apiError = handleApiError(error);
  console.error(apiError.message);
}
```

## JSON Server

پروژه از JSON Server برای شبیه‌سازی API استفاده می‌کند:

```bash
npm run json-server
```

### Endpoints موجود:

- `GET /products` - لیست محصولات
- `GET /products/:id` - محصول خاص
- `GET /products?isFeatured=true` - محصولات ویژه
- `GET /products?category=dresses` - محصولات دسته‌بندی
- `GET /categories` - دسته‌بندی‌ها
- `GET /reviews?productId=:id` - نظرات محصول
- `POST /reviews` - ایجاد نظر جدید
- `GET /chatUsers` - کاربران چت
- `GET /messages` - پیام‌ها

## بهترین روش‌ها

### 1. نام‌گذاری

- از نام‌های واضح و توصیفی استفاده کنید
- از قراردادهای TypeScript پیروی کنید

### 2. Error Handling

- همیشه خطاها را مدیریت کنید
- پیام‌های خطای کاربرپسند ارائه دهید

### 3. Loading States

- برای عملیات async، loading state نمایش دهید
- از React Query برای cache و refetch استفاده کنید

### 4. Type Safety

- از TypeScript به طور کامل استفاده کنید
- Interface ها را به درستی تعریف کنید

## مثال کامل

```typescript
// 1. Entity
export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  // ...
}

// 2. Repository Interface
export interface ProductRepository {
  getAllProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity>;
}

// 3. Repository Implementation
export class JsonServerProductRepository implements ProductRepository {
  async getAllProducts(): Promise<ProductEntity[]> {
    // Implementation
  }
}

// 4. Service
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.repository.getAllProducts();
  }
}

// 5. Hook
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts(),
  });
};
```

این معماری به شما کمک می‌کند تا کدی تمیز، قابل نگهداری و قابل توسعه بنویسید.
