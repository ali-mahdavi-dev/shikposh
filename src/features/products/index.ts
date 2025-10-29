// Domain exports
export * from './domain/entities/product.entity';
export * from './domain/entities/category.entity';
export * from './domain/entities/review.entity';
export * from './domain/repositories/product.repository';
export * from './domain/services/product.service';

// Infrastructure exports
export * from './infrastructure/repositories/json-server-product.repository';
export * from './infrastructure/di/product.container';

// Application exports
export * from './application/hooks';
