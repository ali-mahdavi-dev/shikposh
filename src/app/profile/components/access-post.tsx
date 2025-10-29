'use client';

import { Select } from 'antd';
import React from 'react';

interface AccessPostProps {
  defaultValue?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const defaultOptions = [
  { value: 'public', label: 'عمومی' },
  { value: 'private', label: 'خصوصی' },
  { value: 'friends', label: 'دوستان' },
];

const AccessPost: React.FC<AccessPostProps> = ({
  defaultValue = 'public',
  options = defaultOptions,
  onChange,
  placeholder = 'انتخاب دسترسی',
  style = { width: 120 },
}) => {
  const handleChange = (value: string | string[]) => {
    if (onChange) {
      onChange(value);
    } else {
      console.log(`selected ${value}`);
    }
  };

  return (
    <div>
      <Select
        defaultValue={defaultValue}
        style={style}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AccessPost;
