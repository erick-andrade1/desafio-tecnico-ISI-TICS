import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { CouponRepository } from '../provider/CouponRepository';
import { Coupon } from '../model/Coupon';
import { FilterCoupon } from '../filter';

@injectable()
export class FindAllCouponsUseCase
  implements UseCase<FilterCoupon | undefined, Coupon[]>
{
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
  ) {}

  execute(filter?: FilterCoupon): Promise<Coupon[]> {
    return this.repository.findAll(filter);
  }
}
