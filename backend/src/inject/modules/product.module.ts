import { Container } from 'inversify';

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

export function registerProductModule(container: Container): void {
  container.bind(CreateProductUseCase).toSelf();
  container.bind(DeleteProductUseCase).toSelf();
  container.bind(FindAllProductsUseCase).toSelf();
  container.bind(PaginateProductsUseCase).toSelf();
  container.bind(FindProductByIdUseCase).toSelf();
  container.bind(UpdateProductUseCase).toSelf();

  container.bind(FindProductByIdService).toSelf();
}
