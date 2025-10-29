import { themeConfig } from './theme';

export const componentConfig = {
  Button: {
    defaultProps: {
      variant: 'primary',
      size: 'md',
      rounded: true,
      animation: true,
    },
    variants: {
      primary: {
        className:
          'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl',
        hover: 'hover:from-pink-600 hover:to-purple-700',
      },
      secondary: {
        className: 'bg-gray-100 text-gray-700 border-gray-200',
        hover: 'hover:bg-gray-200 hover:border-gray-300',
      },
      outline: {
        className: 'border-2 border-pink-500 text-pink-500 bg-transparent',
        hover: 'hover:bg-pink-50 hover:border-pink-600',
      },
      ghost: {
        className: 'border-0 text-gray-600',
        hover: 'hover:text-pink-600 hover:bg-pink-50',
      },
    },
    sizes: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-6 text-sm',
      lg: 'h-12 px-8 text-base',
      xl: 'h-14 px-10 text-lg',
    },
  },
  Input: {
    defaultProps: {
      variant: 'default',
      size: 'md',
      rounded: true,
      animation: true,
    },
    variants: {
      default: {
        className: 'border-gray-200',
        hover: 'hover:border-pink-300',
        focus: 'focus:border-pink-500',
      },
      filled: {
        className: 'bg-gray-50 border-gray-200',
        hover: 'hover:bg-gray-100',
        focus: 'focus:bg-white focus:border-pink-500',
      },
      outlined: {
        className: 'border-2 border-gray-300',
        hover: 'hover:border-pink-400',
        focus: 'focus:border-pink-500',
      },
    },
    sizes: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
    },
  },
  Card: {
    defaultProps: {
      variant: 'default',
      size: 'md',
      rounded: true,
      shadow: 'sm',
      hover: true,
      animation: true,
    },
    variants: {
      default: {
        className: 'bg-white border-gray-200',
      },
      elevated: {
        className: 'bg-white shadow-lg border-0',
      },
      outlined: {
        className: 'bg-white border-2 border-gray-300',
      },
      filled: {
        className: 'bg-gray-50 border-gray-200',
      },
      gradient: {
        className: 'bg-gradient-to-br from-white to-gray-50 border-gray-200',
      },
    },
    sizes: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },
  Modal: {
    defaultProps: {
      variant: 'default',
      size: 'md',
      rounded: true,
      animation: true,
    },
    variants: {
      default: {
        className: 'rounded-2xl',
      },
      centered: {
        className: 'rounded-2xl',
      },
      fullscreen: {
        className: 'rounded-none',
      },
      drawer: {
        className: 'rounded-t-2xl',
      },
    },
    sizes: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full',
    },
  },
  Loading: {
    defaultProps: {
      type: 'spinner',
      size: 'default',
      animation: true,
    },
    types: {
      spinner: {
        className: 'flex items-center justify-center',
      },
      skeleton: {
        className: 'space-y-3',
      },
      dots: {
        className: 'flex items-center justify-center space-x-2',
      },
      pulse: {
        className: 'animate-pulse',
      },
    },
  },
  Icon: {
    defaultProps: {
      size: 'md',
      animation: false,
    },
    sizes: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-12 h-12',
    },
  },
} as const;

export type ComponentConfig = typeof componentConfig;
export type ButtonVariant = keyof typeof componentConfig.Button.variants;
export type InputVariant = keyof typeof componentConfig.Input.variants;
export type CardVariant = keyof typeof componentConfig.Card.variants;
export type ModalVariant = keyof typeof componentConfig.Modal.variants;
export type LoadingType = keyof typeof componentConfig.Loading.types;
