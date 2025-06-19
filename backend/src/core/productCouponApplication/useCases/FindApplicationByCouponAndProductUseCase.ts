import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductCouponApplication } from '../model';
import { FindApplicationByCouponAndProductService } from '../service';
import { FilterProductCouponApplication } from '../filter';

@injectable()
export class FindApplicationByCouponAndProductUseCase
  implements UseCase<FilterProductCouponApplication, ProductCouponApplication>
{
  constructor(
    @inject(FindApplicationByCouponAndProductService)
    private readonly service: FindApplicationByCouponAndProductService,
  ) {}

  async execute(
    filter: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication> {
    const application = await this.service.execute(filter);
    return application;
  }
}
