import { injectable, inject } from 'inversify';
import { CouponRepository } from '../provider/CouponRepository';
import { UseCase } from '../../shared/UseCase';
import { FindCouponByCodeService } from '../service/FindCouponByCodeService';

@injectable()
export class DeleteCouponUseCase implements UseCase<string, void> {
  constructor(
    @inject(CouponRepository)
    private readonly repository: CouponRepository,
    @inject(FindCouponByCodeService)
    private readonly findCouponByCodeService: FindCouponByCodeService,
  ) {}

  async execute(code: string): Promise<void> {
    const coupon = await this.findCouponByCodeService.execute(code);
    await this.repository.delete(code);
  }
}
