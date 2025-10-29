# Setup Guide

This project uses React Query, MSW, Redux Toolkit, Jest, React Testing Library, and json-server for API mocking.

## Prerequisites

- Node.js 18+
- Yarn

## Installation

```bash
yarn install
```

## Running the Application

### Development Mode

1. Start json-server (in one terminal):

```bash
yarn json-server
```

2. Start Next.js dev server (in another terminal):

```bash
yarn dev
```

The application will be available at `http://localhost:3000`
The json-server API will be available at `http://localhost:3001`

## Testing

### Run Tests

```bash
yarn test
```

### Watch Mode

```bash
yarn test:watch
```

### Coverage

```bash
yarn test:coverage
```

## Storybook

To initialize Storybook (if not already initialized):

```bash
npx storybook@latest init
```

Then run:

```bash
yarn storybook
```

## API Endpoints (json-server)

- GET `/products` - Get all products
- GET `/products/:id` - Get product by ID
- GET `/products?isFeatured=true` - Get featured products
- GET `/products?category=dresses` - Get products by category
- GET `/categories` - Get all categories
- GET `/reviews?productId=1` - Get reviews for a product
- POST `/reviews` - Create a new review
- PATCH `/reviews/:id` - Update a review
- GET `/chatUsers` - Get chat users

## MSW (Mock Service Worker)

MSW is configured to intercept API calls in development and tests. The handlers are defined in `src/mocks/handlers.ts`.

## Redux Toolkit

The store is configured in `src/stores/store.ts` with slices for:

- Cart management (`cartSlice`)
- Wishlist management (`wishlistSlice`)

## React Query

React Query hooks are available in `src/hooks/use-api.ts`:

- `useProducts()` - Get all products
- `useProduct(id)` - Get single product
- `useFeaturedProducts()` - Get featured products
- `useProductsByCategory(category)` - Get products by category
- `useCategories()` - Get all categories
- `useReviews(productId)` - Get reviews for a product
- `useCreateReview()` - Create a new review mutation
- `useUpdateReviewHelpful()` - Update review helpful mutation
- `useChatUsers()` - Get chat users

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/        # React components
├── hooks/            # Custom hooks (including React Query hooks)
├── lib/              # API client functions
├── mocks/            # MSW handlers
├── providers/        # React Query and Redux providers
├── stores/           # Redux store and slices
└── types/            # TypeScript types
```
