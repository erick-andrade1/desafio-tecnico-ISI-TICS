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
      ...dto,
    });

    await this.repository.update(coupon);

    return coupon;
  }
}
