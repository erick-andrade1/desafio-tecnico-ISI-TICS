import { inject, injectable } from 'inversify';
import { CouponRepository } from '../provider';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { Coupon } from '../model/Coupon';

@injectable()
export class FindCouponByCodeService {
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
  ) {}

  async execute(code: string): Promise<Coupon> {
    const coupon = await this.repository.findByCode(code);

    if (!coupon) {
      throw new AppObjectNotFoundError(Errors.COUPON_NOT_FOUND);
    }

    return coupon;
  }
}
