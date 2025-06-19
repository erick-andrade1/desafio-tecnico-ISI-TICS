import { Container } from 'inversify';

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

export function registerCouponModule(container: Container): void {
  container.bind(CreateCouponUseCase).toSelf();
  container.bind(DeleteCouponUseCase).toSelf();
  container.bind(FindAllCouponsUseCase).toSelf();
  container.bind(PaginateCouponsUseCase).toSelf();
  container.bind(FindCouponByCodeUseCase).toSelf();
  container.bind(UpdateCouponUseCase).toSelf();

  container.bind(FindCouponByCodeService).toSelf();
}
