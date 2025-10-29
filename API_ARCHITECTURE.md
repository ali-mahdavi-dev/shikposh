# API Architecture Documentation

## Overview

This project implements a robust, production-ready API architecture with the following features:

- **Clean Architecture**: Separation of concerns with Domain, Application, and Infrastructure layers
- **Feature-based Organization**: Code organized by business features
- **Real API Integration**: JSON Server with custom middleware for realistic API behavior
- **Error Handling**: Comprehensive error management with custom error types
- **Caching**: Intelligent caching system for improved performance
- **Health Monitoring**: Real-time API health monitoring
- **Request Interception**: Rate limiting and retry mechanisms

## Architecture Layers

### 1. Domain Layer (`src/features/*/domain/`)

- **Entities**: Core business objects (Product, Review, Category)
- **Repositories**: Interfaces defining data access contracts
- **Services**: Business logic and domain rules

### 2. Application Layer (`src/features/*/application/`)

- **Hooks**: React Query hooks for data fetching and state management
- **DTOs**: Data Transfer Objects for API communication

### 3. Infrastructure Layer (`src/features/*/infrastructure/`)

- **Repositories**: Concrete implementations of domain interfaces
- **DI Containers**: Dependency injection configuration

### 4. Shared Layer (`src/shared/`)

- **Services**: Common services (API, Cache, Health)
- **Components**: Reusable UI components
- **Utils**: Utility functions and helpers

## API Services

### ApiService (`src/shared/services/api.service.ts`)

Centralized HTTP client with:

- Automatic error handling
- Request/response interceptors
- Caching support
- TypeScript generics for type safety

```typescript
// Usage example
const products = await apiService.get<ProductEntity[]>('/products');
const newProduct = await apiService.post<ProductEntity>('/products', productData);
```

### CacheService (`src/shared/services/cache.service.ts`)

In-memory caching with:

- TTL (Time To Live) support
- Automatic cleanup
- Size limits
- Statistics tracking

### HealthService (`src/shared/services/health.service.ts`)

API health monitoring with:

- Real-time status checking
- Service availability tracking
- Response time monitoring
- Periodic health checks

## Error Handling

### Custom Error Types

```typescript
// ApiError with specific error codes
throw ApiError.notFound('Product not found');
throw ApiError.badRequest('Invalid input data');
throw ApiError.internal('Server error');
```

### Error Boundary

React Error Boundary for graceful error handling:

- Catches JavaScript errors in component tree
- Displays user-friendly error messages
- Provides recovery options

## JSON Server Configuration

### Custom Middleware (`json-server-middleware.js`)

- **Validation**: Input validation for all endpoints
- **Error Handling**: Proper HTTP status codes
- **Rate Limiting**: Request throttling
- **Custom Routes**: Feature-specific endpoints

### API Endpoints

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products
- `GET /products/:id` - Get product by ID

#### Reviews

- `GET /products/:id/reviews` - Get product reviews (paginated)
- `POST /reviews` - Create new review
- `PATCH /reviews/:id` - Update review helpfulness
- `GET /reviews/search` - Search reviews
- `GET /reviews/stats/:productId` - Get review statistics

#### Health

- `GET /health` - API health check

## Request Flow

1. **Component** calls React Query hook
2. **Hook** calls Application Service
3. **Service** calls Repository
4. **Repository** calls ApiService
5. **ApiService** makes HTTP request
6. **Response** flows back through layers
7. **Data** is cached and returned to component

## Caching Strategy

- **GET requests**: Cached for 5 minutes by default
- **POST/PUT/PATCH/DELETE**: Cache invalidation
- **Cache keys**: Based on endpoint and parameters
- **Cleanup**: Automatic removal of expired items

## Monitoring

### API Monitor Component

- Real-time status indicator
- Service availability
- Response time tracking
- Version information

### Health Checks

- Automatic periodic checks (30s interval)
- Service status tracking
- Performance metrics
- Error rate monitoring

## Best Practices

### 1. Error Handling

- Always use try-catch blocks
- Provide meaningful error messages
- Log errors for debugging
- Handle network failures gracefully

### 2. Caching

- Cache frequently accessed data
- Invalidate cache on updates
- Use appropriate TTL values
- Monitor cache performance

### 3. API Calls

- Use appropriate HTTP methods
- Include proper headers
- Handle loading states
- Implement retry logic

### 4. Type Safety

- Define interfaces for all data structures
- Use TypeScript generics
- Validate API responses
- Handle type errors gracefully

## Development

### Running the API Server

```bash
# Start JSON Server with custom middleware
yarn json-server

# Start both API and Next.js
yarn dev:full
```

### Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Testing API

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test products endpoint
curl http://localhost:3001/api/products

# Test reviews endpoint
curl http://localhost:3001/products/1/reviews
```

## Production Considerations

1. **Rate Limiting**: Implement proper rate limiting
2. **Authentication**: Add JWT or session-based auth
3. **Logging**: Implement comprehensive logging
4. **Monitoring**: Use APM tools (e.g., Sentry, DataDog)
5. **Caching**: Consider Redis for distributed caching
6. **Database**: Replace JSON Server with real database
7. **Security**: Implement CORS, CSRF protection
8. **Performance**: Add CDN and compression
