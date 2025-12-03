'use client';

import React from 'react';
import { Steps } from 'antd';

type Step = 'phone' | 'otp' | 'register';

interface AuthStepsProps {
  currentStep: Step;
}

export const AuthSteps: React.FC<AuthStepsProps> = ({ currentStep }) => {
  const getStepNumber = () => {
    switch (currentStep) {
      case 'phone':
        return 0;
      case 'otp':
        return 1;
      case 'register':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Steps
      current={getStepNumber()}
      items={[
        { title: 'شماره تلفن' },
        { title: 'تایید کد' },
        ...(currentStep === 'register' ? [{ title: 'اطلاعات' }] : []),
      ]}
      className="mb-4 sm:mb-6"
      size="small"
      responsive={true}
    />
  );
};
