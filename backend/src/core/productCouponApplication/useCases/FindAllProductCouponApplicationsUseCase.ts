import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductCouponApplicationRepository } from '../provider';
import { ProductCouponApplication } from '../model';
import { FilterProductCouponApplication } from '../filter';

@injectable()
export class FindAllProductCouponApplicationsUseCase
  implements
    UseCase<
      FilterProductCouponApplication | undefined,
      ProductCouponApplication[]
    >
{
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
