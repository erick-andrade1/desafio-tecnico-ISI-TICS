import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { CouponRepository } from '../provider/CouponRepository';
import { Coupon } from '../model/Coupon';
import { FilterCoupon } from '../filter';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export class PaginateCouponsUseCase
  implements UseCase<FilterPaginate<FilterCoupon>, ResultPaginate<Coupon>>
{
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
  ) {}

  execute(
    input: FilterPaginate<FilterCoupon>,
  ): Promise<ResultPaginate<Coupon>> {
    return this.repository.paginate(input);
  }
}
