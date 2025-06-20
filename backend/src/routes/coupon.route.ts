import { Router } from 'express';
import { container } from '../inversify.config';

import { AppRouter } from './AppRouter';
import { adaptRoute } from '../adapters/express-router-adapter';

import {
  CreateCouponController,
  DeleteCouponController,
  FindAllCouponsController,
  FindCouponByIdController,
  PaginateCouponsController,
  UpdateCouponController,
} from '../controllers/coupon';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', adaptRoute(container.get(FindAllCouponsController)));

  router.get('/paginate', adaptRoute(container.get(PaginateCouponsController)));

  router.get('/:id', adaptRoute(container.get(FindCouponByIdController)));

  router.post('/', adaptRoute(container.get(CreateCouponController)));

  router.put('/:id', adaptRoute(container.get(UpdateCouponController)));

  router.delete('/:id', adaptRoute(container.get(DeleteCouponController)));

  return {
    path: '/coupons',
    router,
  };
}
