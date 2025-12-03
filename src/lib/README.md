# Enterprise Architecture Patterns - Usage Guide

این مستندات نحوه استفاده از الگوهای enterprise پیاده‌سازی شده را نشان می‌دهد.

## 📋 فهرست

1. [Validation با Zod](#validation-با-zod)
2. [Error Handling](#error-handling)
3. [Cache Strategy](#cache-strategy)
4. [HTTP Adapter](#http-adapter)
5. [Repository & Service Pattern](#repository--service-pattern)
6. [Auth Guards](#auth-guards)
7. [Server Actions](#server-actions)

---

## Validation با Zod

### استفاده در Forms

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginRequestSchema } from '@/lib/validation/schemas/auth.schema';
import type { LoginRequest } from '@/lib/validation/dto/request';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
  });

  const onSubmit = (data: LoginRequest) => {
    // data is validated and typed
    console.log(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### استفاده در Server Actions

```typescript
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
import { createProductSchema } from '@/lib/validation/schemas/product.schema';

export async function createProduct(input: unknown) {
  const validator = ValidatorFactory.createValidatorWithMessages(createProductSchema);
  const result = validator(input);

  if (!result.success) {
    return { success: false, error: result.errors.join('; ') };
  }

  // result.data is validated and typed
  const validatedData = result.data;
  // ... use validatedData
}
```

---

## Error Handling

### استفاده در API Calls

```typescript
import { handleError } from '@/lib/errors';
import { AppError } from '@/lib/errors/base/app.error';

async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    // Use enterprise error handling
    const appError = handleError(error);
    console.error('Error:', appError.toJSON());
    // Show to user
    message.error(appError.message);
  }
}
```

### استفاده در Components

```typescript
import { handleError } from '@/lib/errors';

function MyComponent() {
  const handleAction = async () => {
    try {
      await someAction();
    } catch (error) {
      const appError = handleError(error);
      // Handle error appropriately
      if (appError.type === 'validation') {
        // Show validation errors
      } else if (appError.type === 'network') {
        // Show network error
      }
    }
  };
}
```

---

## Cache Strategy

### استفاده از Cache Manager

```typescript
import { cacheManager } from '@/lib/cache';

// Get from cache
const cached = cacheManager.get<string>('my-key');
if (cached) {
  return cached;
}

// Set in cache
cacheManager.set('my-key', data, 5 * 60 * 1000); // 5 minutes TTL

// Use different strategies
import { CacheManager } from '@/lib/cache';
const indexedDBCache = new CacheManager('indexeddb');
```

### استفاده از Cache Decorator

```typescript
import { Cache } from '@/lib/cache/cache.decorator';

class MyService {
  @Cache({ ttl: 10 * 60 * 1000 }) // 10 minutes
  async getData() {
    // This will be automatically cached
    return await fetchData();
  }
}
```

---

## HTTP Adapter

### استفاده مستقیم

```typescript
import { FetchAdapter } from '@/lib/api/adapters/fetch.adapter';

const adapter = new FetchAdapter('https://api.example.com');

// GET request
const data = await adapter.get('/users');

// POST request
const result = await adapter.post('/users', { name: 'John' });
```

---

## Repository & Service Pattern

### ایجاد Repository

```typescript
import { BaseRepository } from '@/lib/api/repositories/base.repository';
import { FetchAdapter } from '@/lib/api/adapters/fetch.adapter';
import type { ProductEntity } from './entities';

export class ProductRepository extends BaseRepository<ProductEntity, string> {
  constructor() {
    const adapter = new FetchAdapter();
    super(adapter, '/api/v1/products');
  }

  // Add custom methods
  async getFeaturedProducts(): Promise<ProductEntity[]> {
    return this.httpAdapter.get('/api/v1/products/featured');
  }
}
```

### ایجاد Service

```typescript
import { BaseService } from '@/lib/api/services/base.service';
import { ProductRepository } from './repository';

export class ProductService extends BaseService<ProductEntity, string> {
  constructor() {
    super(new ProductRepository(), true); // cache enabled
  }

  // Add custom methods
  async getFeaturedProducts(): Promise<ProductEntity[]> {
    return this.repository.getFeaturedProducts();
  }
}
```

---

## Auth Guards

### استفاده در Components

```typescript
import { useAuthGuard } from '@/lib/security/guards/auth.guard';

function ProtectedPage() {
  const { isAuthenticated, isLoading, isAuthorized } = useAuthGuard({
    requireAuth: true,
    redirectTo: '/auth',
  });

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthorized) return null; // Will redirect

  return <div>Protected Content</div>;
}
```

### استفاده با HOC

```typescript
import { withAuthGuard } from '@/lib/security/guards/auth.guard';

function MyPage() {
  return <div>My Content</div>;
}

export default withAuthGuard(MyPage, {
  requireAuth: true,
  redirectTo: '/auth',
});
```

### Role Guard

```typescript
import { useRoleGuard } from '@/lib/security/guards/role.guard';

function AdminPage() {
  const { hasRequiredRole } = useRoleGuard({
    allowedRoles: ['admin', 'superuser'],
    redirectTo: '/',
  });

  if (!hasRequiredRole) return null;

  return <div>Admin Content</div>;
}
```

---

## Server Actions

### استفاده در Forms

```typescript
'use client';

import { createProduct } from '@/app/products/_actions/product.actions';
import { createProductSchema } from '@/lib/validation/schemas/product.schema';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';

function ProductForm() {
  const handleSubmit = async (values: unknown) => {
    // Validate
    const validator = ValidatorFactory.createValidatorWithMessages(createProductSchema);
    const result = validator(values);

    if (!result.success) {
      message.error(result.errors.join('; '));
      return;
    }

    // Use server action
    const response = await createProduct(result.data);
    if (response.success) {
      message.success('محصول ایجاد شد');
    } else {
      message.error(response.error);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## مثال کامل: استفاده در یک Component

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginRequestSchema } from '@/lib/validation/schemas/auth.schema';
import { handleError } from '@/lib/errors';
import { useAuthGuard } from '@/lib/security/guards/auth.guard';
import { cacheManager } from '@/lib/cache';

function LoginPage() {
  // Use auth guard
  const { isAuthenticated } = useAuthGuard({ requireAuth: false });

  // Use validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginRequestSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      // Check cache first
      const cacheKey = `login:${data.phone}`;
      const cached = cacheManager.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Make API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      
      // Cache result
      cacheManager.set(cacheKey, result, 5 * 60 * 1000);

      return result;
    } catch (error) {
      // Use enterprise error handling
      const appError = handleError(error);
      console.error('Login error:', appError.toJSON());
      message.error(appError.message);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

---

## نکات مهم

1. **Backward Compatibility**: تمام تغییرات backward compatible هستند
2. **Gradual Migration**: می‌توانید به تدریج از الگوها استفاده کنید
3. **Type Safety**: تمام implementations fully typed هستند
4. **Error Handling**: همیشه از `handleError` استفاده کنید
5. **Validation**: همیشه از Zod schemas برای validation استفاده کنید

