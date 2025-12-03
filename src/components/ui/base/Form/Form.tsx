'use client';

import React from 'react';
import { Form as AntForm, FormProps as AntFormProps, FormItemProps as AntFormItemProps } from 'antd';
import { cn } from '@/utils/cn';

export interface FormProps extends AntFormProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface FormItemProps extends AntFormItemProps {
  className?: string;
}

// Mobile-first spacing
const formSpacing = {
  xs: 'space-y-2',
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-5',
  xl: 'space-y-6',
};

export const Form: React.FC<FormProps> = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const formClasses = cn(formSpacing[size], className);

  const formProps = {
    ...props,
    className: formClasses,
  } as AntFormProps;

  return <AntForm {...formProps} />;
};

// Export Form.Item for convenience
Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.useForm = AntForm.useForm;
Form.useWatch = AntForm.useWatch;
Form.Provider = AntForm.Provider;

export default Form;

