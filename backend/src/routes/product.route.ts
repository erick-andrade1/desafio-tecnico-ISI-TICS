import { Router } from 'express';
import { container } from '../inversify.config';

import { AppRouter } from './AppRouter';
import { adaptRoute } from '../adapters/express-router-adapter';

import {
  CreateProductController,
  DeleteProductController,
  FindAllProductsController,
  FindProductByIdController,
  PaginateProductsController,
  UpdateProductController,
} from '../controllers/product';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', adaptRoute(container.get(FindAllProductsController)));

  router.get(
    '/paginate',
    adaptRoute(container.get(PaginateProductsController)),
  );

  router.get('/:id', adaptRoute(container.get(FindProductByIdController)));

  router.post('/', adaptRoute(container.get(CreateProductController)));

  router.put('/:id', adaptRoute(container.get(UpdateProductController)));

  router.delete('/:id', adaptRoute(container.get(DeleteProductController)));

  return {
    path: '/products',
    router,
  };
}
