import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { CouponRepository } from '../provider/CouponRepository';
import { Coupon } from '../model/Coupon';
import { UpdateCouponDTO } from '../dto/UpdateCouponDTO';
import { FindCouponByCodeService } from '../service/FindCouponByCodeService';

@injectable()
export class UpdateCouponUseCase implements UseCase<UpdateCouponDTO, Coupon> {
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
    @inject(FindCouponByCodeService)
    private readonly findCouponByCodeService: FindCouponByCodeService,
  ) {}

  async execute(dto: UpdateCouponDTO): Promise<Coupon> {
    let coupon = await this.findCouponByCodeService.execute(dto.code);

    coupon = coupon.copyWith({
      type: dto.type,
      value: dto.value,
      one_shot: dto.one_shot,
      max_uses: dto.max_uses,
      uses_count: dto.uses_count,
      valid_from: dto.valid_from,
      valid_until: dto.valid_until,
      code: coupon.code.getValue(),
    });

    await this.repository.update(coupon);

    return coupon;
  }
}
