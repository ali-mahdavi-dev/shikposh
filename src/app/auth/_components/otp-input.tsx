'use client';

import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { Input } from 'antd';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
}) => {
  const [otp, setOtp] = useState<string[]>(() => {
    const initialOtp = value.split('').slice(0, length);
    while (initialOtp.length < length) {
      initialOtp.push('');
    }
    return initialOtp;
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    const newOtp = value.split('').slice(0, length);
    while (newOtp.length < length) {
      newOtp.push('');
    }
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    if (newValue && !/^\d$/.test(newValue)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    // Combine all values and call onChange
    const combinedValue = newOtp.join('');
    onChange(combinedValue);

    // Auto-focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/\D/g, '').slice(0, length).split('');

    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < length) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      onChange(newOtp.join(''));
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-12 h-12 text-center text-xl font-semibold ${
            error ? 'border-red-500' : ''
          }`}
          style={{
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}
        />
      ))}
    </div>
  );
};

