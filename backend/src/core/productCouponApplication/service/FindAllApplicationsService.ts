import { inject, injectable } from 'inversify';

import { ProductCouponApplicationRepository } from '../provider';
import { ProductCouponApplication } from '../model';
import { FilterProductCouponApplication } from '../filter';

@injectable()
export class FindAllApplicationsService {
  constructor(
    @inject(ProductCouponApplicationRepository)
    private readonly repository: ProductCouponApplicationRepository,
  ) {}

  execute(
    filter?: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication[]> {
    return this.repository.findAll(filter);
  }
}
