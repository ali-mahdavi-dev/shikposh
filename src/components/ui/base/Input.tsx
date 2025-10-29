import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { cn } from '@/utils/cn';

export interface BaseInputProps extends Omit<AntInputProps, 'size' | 'status' | 'variant'> {
  variant?: 'default' | 'filled' | 'outlined' | 'borderless';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'default' | 'error' | 'warning' | 'success';
  rounded?: boolean;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const inputVariants = {
  default: 'border-gray-200 hover:border-pink-300 focus:border-pink-500',
  filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-pink-500',
  outlined: 'border-2 border-gray-300 hover:border-pink-400 focus:border-pink-500',
  borderless: 'border-0 bg-transparent hover:bg-gray-50 focus:bg-white focus:border-pink-500',
};

const inputSizes = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg',
};

const statusClasses = {
  default: '',
  error: 'border-red-500 focus:border-red-500',
  warning: 'border-yellow-500 focus:border-yellow-500',
  success: 'border-green-500 focus:border-green-500',
};

export const BaseInput: React.FC<BaseInputProps> = ({
  variant = 'default',
  size = 'md',
  status = 'default',
  rounded = true,
  className,
  label,
  error,
  helperText,
  required = false,
  multiline = false,
  rows = 4,
  ...props
}) => {
  const inputClasses = cn(
    'transition-all duration-300',
    inputVariants[variant],
    inputSizes[size],
    statusClasses[status],
    rounded && 'rounded-xl',
    error && 'border-red-500 focus:border-red-500',
    className,
  );

  const inputProps = {
    ...props,
    className: inputClasses,
  };

  // TextArea doesn't support certain Input props like prefix, suffix, etc.
  // Filter out incompatible props and cast to TextAreaProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { prefix, suffix, addonBefore, addonAfter, type, ...textAreaCompatibleProps } = props;
  // Type assertion needed because InputProps and TextAreaProps have incompatible onChange types,
  // but they're compatible at runtime when using TextArea
  const textAreaProps = {
    className: inputClasses,
    rows,
    // Spread compatible props with type assertion
    ...(textAreaCompatibleProps as unknown as Partial<TextAreaProps>),
  } as TextAreaProps;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {multiline ? <AntInput.TextArea {...textAreaProps} /> : <AntInput {...inputProps} />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default BaseInput;
