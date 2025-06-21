import { Container } from 'inversify';

import {
  CreateProductController,
  DeactivateProductController,
  FindProductByIdController,
  PaginateProductsController,
  UpdateProductController,
  RestoreInactiveProductController,
  RemoveProductDiscountController,
  ApplyPercentDiscountToProductController,
  ApplyCouponDiscountToProductController,
} from '../../controllers/product';

import {
  FindProductByIdService,
  ValidateProductService,
} from '../../core/product/service';

import {
  CreateProductUseCase,
  DeactivateProductUseCase,
  FindProductByIdUseCase,
  PaginateProductsUseCase,
  UpdateProductUseCase,
  RestoreInactiveProductUseCase,
  RemoveProductDiscountUseCase,
  ApplyPercentDiscountToProductUseCase,
  ApplyCouponDiscountToProductUseCase,
} from '../../core/product/useCases';

import { ProductRepository } from '../../core/product/provider';
import { ProductPrismaRepository } from '../../repositories';

export function registerProductModule(container: Container): void {
  container.bind(CreateProductController).toSelf();
  container.bind(DeactivateProductController).toSelf();
  container.bind(FindProductByIdController).toSelf();
  container.bind(UpdateProductController).toSelf();
  container.bind(PaginateProductsController).toSelf();
  container.bind(RestoreInactiveProductController).toSelf();
  container.bind(RemoveProductDiscountController).toSelf();
  container.bind(ApplyPercentDiscountToProductController).toSelf();
  container.bind(ApplyCouponDiscountToProductController).toSelf();

  container.bind(CreateProductUseCase).toSelf();
  container.bind(DeactivateProductUseCase).toSelf();
  container.bind(PaginateProductsUseCase).toSelf();
  container.bind(FindProductByIdUseCase).toSelf();
  container.bind(UpdateProductUseCase).toSelf();
  container.bind(RestoreInactiveProductUseCase).toSelf();
  container.bind(RemoveProductDiscountUseCase).toSelf();
  container.bind(ApplyPercentDiscountToProductUseCase).toSelf();
  container.bind(ApplyCouponDiscountToProductUseCase).toSelf();

  container.bind(FindProductByIdService).toSelf();
  container.bind(ValidateProductService).toSelf();

  container.bind(ProductRepository).to(ProductPrismaRepository);
}
