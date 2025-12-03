/**
 * Request DTOs - Type exports from schemas
 */

export type {
  LoginRequest,
  VerifyOtpRequest,
  RegisterRequest,
  RefreshTokenRequest,
} from '../schemas/auth.schema';

export type {
  CreateProductInput,
  UpdateProductInput,
  ProductFilterInput,
} from '../schemas/product.schema';

export type {
  CreateOrderInput,
  OrderFilterInput,
} from '../schemas/order.schema';

export type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../schemas/category.schema';

export type {
  PaginationInput,
  SortInput,
  FilterInput,
  IdInput,
  SlugInput,
} from '../schemas/common.schema';
