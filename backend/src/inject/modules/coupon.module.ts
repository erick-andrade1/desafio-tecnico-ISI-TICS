import { Container } from 'inversify';

import {
  CreateCouponController,
  DeleteCouponController,
  FindAllCouponsController,
  FindCouponByIdController,
  PaginateCouponsController,
  UpdateCouponController,
} from '../../controllers/coupon';

import { FindCouponByCodeService } from '../../core/coupon/service';

import {
  CreateCouponUseCase,
  DeleteCouponUseCase,
  FindAllCouponsUseCase,
  FindCouponByCodeUseCase,
  PaginateCouponsUseCase,
  UpdateCouponUseCase,
} from '../../core/coupon/useCases';

import { CouponRepository } from '../../core/coupon/provider';
import { CouponPrismaRepository } from '../../repositories';

export function registerCouponModule(container: Container): void {
  container.bind(CreateCouponController).toSelf();
  container.bind(DeleteCouponController).toSelf();
  container.bind(FindAllCouponsController).toSelf();
  container.bind(FindCouponByIdController).toSelf();
  container.bind(UpdateCouponController).toSelf();
  container.bind(PaginateCouponsController).toSelf();

  container.bind(CreateCouponUseCase).toSelf();
  container.bind(DeleteCouponUseCase).toSelf();
  container.bind(FindAllCouponsUseCase).toSelf();
  container.bind(PaginateCouponsUseCase).toSelf();
  container.bind(FindCouponByCodeUseCase).toSelf();
  container.bind(UpdateCouponUseCase).toSelf();

  container.bind(FindCouponByCodeService).toSelf();

  container.bind(CouponRepository).to(CouponPrismaRepository);
}
