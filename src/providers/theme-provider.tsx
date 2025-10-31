'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { themeConfig } from '@/configs';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [isDark, setIsDark] = useState(defaultTheme === 'dark');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update document class for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const antdTheme = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: themeConfig.colors.primary[500],
      colorSuccess: themeConfig.colors.success[500],
      colorWarning: themeConfig.colors.warning[500],
      colorError: themeConfig.colors.error[500],
      borderRadius: 12,
      fontFamily: themeConfig.typography.fontFamily.sans.join(', '),
    },
    components: {
      Button: {
        borderRadius: 12,
        controlHeight: 40,
      },
      Card: {
        borderRadius: 16,
      },
      Input: {
        borderRadius: 12,
      },
      Select: {
        borderRadius: 12,
      },
    },
  };

  const contextValue: ThemeContextType = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={antdTheme} direction="rtl">
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
