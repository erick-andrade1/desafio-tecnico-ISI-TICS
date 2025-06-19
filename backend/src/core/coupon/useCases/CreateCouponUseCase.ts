import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared';

import { CouponRepository } from '../provider/CouponRepository';
import { Coupon, CouponProps } from '../model/Coupon';
import { CreateCouponDTO } from '../dto';

@injectable()
export class CreateCouponUseCase implements UseCase<CouponProps, Coupon> {
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
  ) {}

  async execute(dto: CreateCouponDTO): Promise<Coupon> {
    const coupon = new Coupon({
      code: dto.code,
      type: dto.type,
      value: dto.value,
      one_shot: dto.one_shot,
      max_uses: dto.max_uses,
      uses_count: dto.uses_count,
      valid_from: dto.valid_from,
      valid_until: dto.valid_until,
    });

    return this.repository.create(coupon);
  }

  private async validate(dto: CreateCouponDTO) {
    return null;
  }
}
