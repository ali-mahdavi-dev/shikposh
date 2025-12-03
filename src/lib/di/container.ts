import 'reflect-metadata';

import { container } from 'tsyringe';

import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import { FetchAdapter } from '@/lib/api/adapters/fetch.adapter';
import { HTTP_ADAPTER_TOKEN } from './tokens';

// Notification module
import {
  HttpNotificationRepository,
  type NotificationRepository,
} from '@/app/notification/_api/repository';
import { NotificationService } from '@/app/notification/_api/service';

// Admin products module
import {
  HttpAdminProductRepository,
  HttpAdminCategoryRepository,
  HttpAdminColorRepository,
  HttpAdminSizeRepository,
  HttpAdminTagRepository,
  type AdminProductRepository,
  type AdminCategoryRepository,
  type AdminColorRepository,
  type AdminSizeRepository,
  type AdminTagRepository,
} from '@/app/admin/products/_api/repository';
import { AdminProductService } from '@/app/admin/products/_api/service';

function registerHttpAdapters() {
  if (!container.isRegistered<IHttpAdapter>(HTTP_ADAPTER_TOKEN)) {
    container.registerSingleton<IHttpAdapter>(HTTP_ADAPTER_TOKEN, FetchAdapter);
  }
}

function registerNotificationModule() {
  if (!container.isRegistered<NotificationRepository>(HttpNotificationRepository)) {
    container.registerSingleton<NotificationRepository>(
      HttpNotificationRepository,
      HttpNotificationRepository,
    );
  }

  if (!container.isRegistered(NotificationService)) {
    container.registerSingleton(NotificationService, NotificationService);
  }
}

function registerAdminProductsModule() {
  if (!container.isRegistered<AdminProductRepository>(HttpAdminProductRepository)) {
    container.registerSingleton<AdminProductRepository>(
      HttpAdminProductRepository,
      HttpAdminProductRepository,
    );
  }

  if (!container.isRegistered<AdminCategoryRepository>(HttpAdminCategoryRepository)) {
    container.registerSingleton<AdminCategoryRepository>(
      HttpAdminCategoryRepository,
      HttpAdminCategoryRepository,
    );
  }

  if (!container.isRegistered<AdminColorRepository>(HttpAdminColorRepository)) {
    container.registerSingleton<AdminColorRepository>(
      HttpAdminColorRepository,
      HttpAdminColorRepository,
    );
  }

  if (!container.isRegistered<AdminSizeRepository>(HttpAdminSizeRepository)) {
    container.registerSingleton<AdminSizeRepository>(
      HttpAdminSizeRepository,
      HttpAdminSizeRepository,
    );
  }

  if (!container.isRegistered<AdminTagRepository>(HttpAdminTagRepository)) {
    container.registerSingleton<AdminTagRepository>(HttpAdminTagRepository, HttpAdminTagRepository);
  }

  if (!container.isRegistered(AdminProductService)) {
    container.registerSingleton(AdminProductService, AdminProductService);
  }
}

export function registerDependencies() {
  registerHttpAdapters();
  registerNotificationModule();
  registerAdminProductsModule();
}

// Initialize container registrations once at module load
registerDependencies();

// Export a single application-wide container
export const appContainer = container;
