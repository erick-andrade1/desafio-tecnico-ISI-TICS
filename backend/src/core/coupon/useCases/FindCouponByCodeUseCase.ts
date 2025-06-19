import { UseCase } from '../../shared/UseCase';
import { Coupon } from '../model/Coupon';
import { injectable, inject } from 'inversify';
import { FindCouponByCodeService } from '../service';

@injectable()
export class FindCouponByCodeUseCase implements UseCase<string, Coupon> {
  constructor(
    @inject(FindCouponByCodeService)
    private readonly findCouponByCodeService: FindCouponByCodeService,
  ) {}

  async execute(code: string): Promise<Coupon> {
    const product = await this.findCouponByCodeService.execute(code);
    return product;
  }
}
