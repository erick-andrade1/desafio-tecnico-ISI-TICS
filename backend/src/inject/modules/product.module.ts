import { Container } from 'inversify';

import {
  CreateProductController,
  DeleteProductController,
  FindAllProductsController,
  FindProductByIdController,
  PaginateProductsController,
  UpdateProductController,
} from '../../controllers/product';

import { FindProductByIdService } from '../../core/product/service';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  FindAllProductsUseCase,
  FindProductByIdUseCase,
  PaginateProductsUseCase,
  UpdateProductUseCase,
} from '../../core/product/useCases';

import { ProductRepository } from '../../core/product/provider';
import { ProductPrismaRepository } from '../../repositories';

export function registerProductModule(container: Container): void {
  container.bind(CreateProductController).toSelf();
  container.bind(DeleteProductController).toSelf();
  container.bind(FindAllProductsController).toSelf();
  container.bind(FindProductByIdController).toSelf();
  container.bind(UpdateProductController).toSelf();
  container.bind(PaginateProductsController).toSelf();

  container.bind(CreateProductUseCase).toSelf();
  container.bind(DeleteProductUseCase).toSelf();
  container.bind(FindAllProductsUseCase).toSelf();
  container.bind(PaginateProductsUseCase).toSelf();
  container.bind(FindProductByIdUseCase).toSelf();
  container.bind(UpdateProductUseCase).toSelf();

  container.bind(FindProductByIdService).toSelf();

  container.bind(ProductRepository).to(ProductPrismaRepository);
}
