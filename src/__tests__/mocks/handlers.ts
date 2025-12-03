/**
 * MSW Request Handlers
 * Mock API handlers for testing
 */

import { http, HttpResponse } from 'msw';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const handlers = [
  // Products
  http.get(`${API_BASE_URL}/api/v1/public/products`, () => {
    return HttpResponse.json({
      success: true,
      data: [],
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/public/products/:id`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        title: 'Test Product',
        slug: 'test-product',
      },
    });
  }),

  // Auth
  http.post(`${API_BASE_URL}/api/v1/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        message: 'OTP sent',
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/auth/verify-otp`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: '1',
          phone: '09123456789',
        },
        token: 'test-token',
        refreshToken: 'test-refresh-token',
      },
    });
  }),

  // Orders
  http.get(`${API_BASE_URL}/api/v1/orders`, () => {
    return HttpResponse.json({
      success: true,
      data: [],
      total: 0,
      page: 1,
      pages: 1,
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/orders`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        orderNumber: 'ORD-001',
      },
    });
  }),
];

