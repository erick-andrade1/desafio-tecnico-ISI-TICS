import { Router } from 'express';
import { container } from '../inversify.config';

import { AppRouter } from './AppRouter';
import { adaptRoute } from '../adapters/express-router-adapter';

import {
  CreateProductController,
  InactivateProductController,
  FindProductByIdController,
  PaginateProductsController,
  UpdateProductController,
  RestoreInactiveProductController,
  RemoveProductDiscountController,
  ApplyPercentDiscountToProductController,
  ApplyCouponDiscountToProductController,
} from '../controllers/product';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', adaptRoute(container.get(PaginateProductsController)));

  router.get('/:id', adaptRoute(container.get(FindProductByIdController)));

  router.post('/', adaptRoute(container.get(CreateProductController)));

  router.patch('/:id', adaptRoute(container.get(UpdateProductController)));

  router.delete('/:id', adaptRoute(container.get(InactivateProductController)));

  router.post(
    '/:id/restore',
    adaptRoute(container.get(RestoreInactiveProductController)),
  );

  router.post(
    '/:id/discount/percent',
    adaptRoute(container.get(ApplyPercentDiscountToProductController)),
  );

  router.post(
    '/:id/discount/coupon',
    adaptRoute(container.get(ApplyCouponDiscountToProductController)),
  );

  router.delete(
    '/:id/discount',
    adaptRoute(container.get(RemoveProductDiscountController)),
  );

  return {
    path: '/products',
    router,
  };
}
