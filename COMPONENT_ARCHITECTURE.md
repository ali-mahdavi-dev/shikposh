# Component Architecture Documentation

## Overview

This project follows a clean, modular component architecture with reusable base components, business-specific components, and a comprehensive configuration system.

## Directory Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── base/             # Base components (Button, Input, Card, etc.)
│   │   ├── layout/           # Layout components (Container, Grid, Flex)
│   │   ├── form/             # Form components
│   │   ├── data/             # Data display components
│   │   ├── navigation/       # Navigation components
│   │   ├── feedback/         # Feedback components
│   │   ├── overlay/          # Overlay components
│   │   └── media/            # Media components
│   ├── business/             # Business-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryCard.tsx
│   │   └── PriceDisplay.tsx
│   └── layout/               # Layout components (Header, Footer)
├── configs/                  # Configuration files
│   ├── theme.ts             # Theme configuration
│   ├── components.ts        # Component configuration
│   └── index.ts            # Main config exports
├── providers/               # Context providers
│   └── theme-provider.tsx  # Theme provider
└── utils/                   # Utility functions
    └── cn.ts               # Class name utility
```

## Base Components

### Button Component

A highly configurable button component with multiple variants and sizes.

```tsx
import { BaseButton } from '@/components/ui';

<BaseButton
  variant="primary"
  size="md"
  loading={false}
  disabled={false}
  fullWidth={false}
  rounded={true}
  gradient={false}
  animation={true}
  onClick={() => console.log('clicked')}
>
  Click me
</BaseButton>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `rounded`: boolean
- `gradient`: boolean
- `animation`: boolean

### Input Component

A configurable input component with validation states and animations.

```tsx
import { BaseInput } from '@/components/ui';

<BaseInput
  variant="default"
  size="md"
  status="default"
  rounded={true}
  animation={true}
  label="نام کاربری"
  error="این فیلد الزامی است"
  helperText="نام کاربری خود را وارد کنید"
  required={true}
/>;
```

### Card Component

A flexible card component with multiple variants and hover effects.

```tsx
import { BaseCard } from '@/components/ui';

<BaseCard variant="elevated" size="md" rounded={true} shadow="lg" hover={true} animation={true}>
  Card content
</BaseCard>;
```

## Business Components

### ProductCard Component

A specialized card component for displaying products with actions.

```tsx
import { ProductCard } from '@/components/business';

<ProductCard
  id="1"
  name="پیراهن مجلسی"
  price={1500000}
  originalPrice={2000000}
  image="/images/dress.jpg"
  rating={4.5}
  reviewCount={24}
  discount={25}
  isNew={true}
  isFeatured={false}
  onAddToCart={(id) => console.log('Add to cart:', id)}
  onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
  onView={(id) => console.log('View product:', id)}
/>;
```

### ProductGrid Component

A grid component for displaying multiple products with loading and error states.

```tsx
import { ProductGrid } from '@/components/business';

<ProductGrid
  products={products}
  loading={false}
  error={null}
  cols={4}
  gap="md"
  onAddToCart={handleAddToCart}
  onAddToWishlist={handleAddToWishlist}
  onView={handleViewProduct}
  emptyMessage="محصولی یافت نشد"
/>;
```

## Configuration System

### Theme Configuration

The theme system provides a centralized way to manage colors, spacing, typography, and other design tokens.

```tsx
import { themeConfig } from '@/configs';

// Access theme values
const primaryColor = themeConfig.colors.primary[500];
const spacing = themeConfig.spacing.md;
const borderRadius = themeConfig.borderRadius.lg;
```

### Component Configuration

Component configurations define default props and styling for each component.

```tsx
import { componentConfig } from '@/configs';

// Access component configurations
const buttonConfig = componentConfig.Button;
const inputConfig = componentConfig.Input;
```

## Usage Patterns

### 1. Consistent Styling

All components use the `cn` utility function for consistent class name management:

```tsx
import { cn } from '@/utils/cn';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  variant === 'primary' && 'primary-class',
);
```

### 2. Animation Support

Most components support animations through Framer Motion:

```tsx
<BaseButton
  animation={true}
  motionProps={{
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }}
>
  Animated Button
</BaseButton>
```

### 3. Responsive Design

Layout components automatically handle responsive behavior:

```tsx
<Grid
  cols={4}
  responsive={true} // Automatically adjusts columns based on screen size
>
  {items.map((item) => (
    <Item key={item.id} {...item} />
  ))}
</Grid>
```

### 4. TypeScript Support

All components are fully typed with comprehensive TypeScript interfaces:

```tsx
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  // ... other props
}
```

## Best Practices

### 1. Component Composition

Prefer composition over inheritance. Build complex components by combining simpler ones:

```tsx
const ProductCard = ({ product, onAddToCart }) => (
  <BaseCard variant="elevated" hover={true}>
    <Image src={product.image} alt={product.name} />
    <BaseButton onClick={() => onAddToCart(product.id)}>Add to Cart</BaseButton>
  </BaseCard>
);
```

### 2. Props Interface

Always define clear, well-documented prop interfaces:

```tsx
interface ComponentProps {
  /** The main content to display */
  children: React.ReactNode;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

### 3. Default Props

Use default props for better developer experience:

```tsx
const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  disabled = false,
  className,
  children,
}) => {
  // Component implementation
};
```

### 4. Error Boundaries

Wrap components in error boundaries for better error handling:

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <ProductGrid products={products} />
</ErrorBoundary>
```

## Performance Considerations

### 1. Memoization

Use React.memo for components that receive stable props:

```tsx
export default React.memo(ProductCard);
```

### 2. Lazy Loading

Implement lazy loading for heavy components:

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>;
```

### 3. Animation Performance

Use transform and opacity for smooth animations:

```tsx
const motionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};
```

## Testing

### 1. Unit Tests

Write unit tests for individual components:

```tsx
import { render, screen } from '@testing-library/react';
import { BaseButton } from '@/components/ui';

test('renders button with correct text', () => {
  render(<BaseButton>Click me</BaseButton>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 2. Integration Tests

Test component interactions:

```tsx
test('calls onAddToCart when add to cart button is clicked', () => {
  const mockOnAddToCart = jest.fn();
  render(<ProductCard id="1" name="Test Product" price={100} onAddToCart={mockOnAddToCart} />);

  fireEvent.click(screen.getByText('Add to Cart'));
  expect(mockOnAddToCart).toHaveBeenCalledWith('1');
});
```

## Accessibility

### 1. ARIA Labels

Always include proper ARIA labels:

```tsx
<BaseButton aria-label="Add product to cart" onClick={handleAddToCart}>
  <ShoppingCartIcon />
</BaseButton>
```

### 2. Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
<BaseButton
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</BaseButton>
```

### 3. Focus Management

Manage focus for better user experience:

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isVisible) {
    buttonRef.current?.focus();
  }
}, [isVisible]);
```

This architecture provides a solid foundation for building maintainable, scalable, and reusable React components while following modern best practices.
