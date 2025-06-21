import { injectable, inject } from 'inversify';
import { ProductCouponApplicationRepository } from '../provider/ProductCouponApplicationRepository';
import { UseCase } from '../../shared/UseCase';
import { FindApplicationByCouponAndProductService } from '../service/FindApplicationByCouponAndProductService';
import { FilterProductCouponApplication } from '../filter';

@injectable()
export class DeleteProductCouponApplicationUseCase
  implements UseCase<FilterProductCouponApplication, void>
{
  constructor(
    @inject(ProductCouponApplicationRepository)
    private readonly repository: ProductCouponApplicationRepository,
    @inject(FindApplicationByCouponAndProductService)
    private readonly findApplicationByCouponAndProductService: FindApplicationByCouponAndProductService,
  ) {}

  async execute(filter: FilterProductCouponApplication): Promise<void> {
    const appliaction =
      await this.findApplicationByCouponAndProductService.execute(filter);
    await this.repository.delete(appliaction.id!);
  }
}
