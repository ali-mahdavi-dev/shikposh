/**
 * Design System Tokens
 * Mobile-first design tokens for consistent styling across the application
 */

// Spacing Scale (4px base unit - mobile-first)
export const spacing = {
  xs: '4px', // 0.25rem
  sm: '8px', // 0.5rem
  md: '12px', // 0.75rem
  base: '16px', // 1rem
  lg: '24px', // 1.5rem
  xl: '32px', // 2rem
  '2xl': '48px', // 3rem
  '3xl': '64px', // 4rem
} as const;

// Typography Scale (mobile-first)
export const typography = {
  fontFamily: {
    sans: 'Vazir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: ['12px', { lineHeight: '16px' }], // Mobile: 12px
    sm: ['14px', { lineHeight: '20px' }], // Mobile: 14px
    base: ['16px', { lineHeight: '24px' }], // Mobile: 16px
    lg: ['18px', { lineHeight: '28px' }], // Mobile: 18px
    xl: ['20px', { lineHeight: '28px' }], // Mobile: 20px
    '2xl': ['24px', { lineHeight: '32px' }], // Mobile: 24px, Desktop: 28px
    '3xl': ['30px', { lineHeight: '36px' }], // Mobile: 30px, Desktop: 36px
    '4xl': ['36px', { lineHeight: '44px' }], // Mobile: 36px, Desktop: 48px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

// Color Palette
export const colors = {
  primary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899', // Main brand color
    600: '#db2777',
    700: '#be185d',
    800: '#9f1239',
    900: '#831843',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Purple
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
} as const;

// Breakpoints (mobile-first)
export const breakpoints = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  '2xl': '1536px',
} as const;

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '8px', // 0.5rem
  md: '12px', // 0.75rem
  lg: '16px', // 1rem
  xl: '24px', // 1.5rem
  '2xl': '32px', // 2rem
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;

// Touch Targets (minimum 44px for accessibility)
export const touchTargets = {
  min: '44px', // 11 Tailwind units
  sm: '48px', // 12 Tailwind units
  md: '56px', // 14 Tailwind units
  lg: '64px', // 16 Tailwind units
} as const;

// Transitions
export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Export all tokens
export const tokens = {
  spacing,
  typography,
  colors,
  breakpoints,
  borderRadius,
  shadows,
  zIndex,
  touchTargets,
  transitions,
} as const;

export type Spacing = keyof typeof spacing;
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
export type Breakpoint = keyof typeof breakpoints;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
