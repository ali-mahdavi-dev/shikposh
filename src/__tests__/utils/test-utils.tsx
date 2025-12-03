/**
 * Test utilities
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

// Create a test store
function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      auth: (state = { isAuthenticated: false, user: null, token: null }) => state,
      cart: (state = { items: [] }) => state,
      wishlist: (state = { items: [] }) => state,
      notifications: (state = { items: [] }) => state,
      ...preloadedState,
    },
    preloadedState,
  });
}

// Create a test query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Custom render function with providers
 */
function customRender(ui: ReactElement, options?: RenderOptions & { preloadedState?: any }) {
  const { preloadedState, ...renderOptions } = options || {};
  const store = createTestStore(preloadedState);
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider direction="rtl">{children}</ConfigProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

