import { inject, injectable } from 'inversify';

import { ProductCouponApplicationRepository } from '../provider';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { ProductCouponApplication } from '../model/ProductCouponApplication';
import { FilterProductCouponApplication } from '../filter';

@injectable()
export class FindApplicationByCouponAndProductService {
  constructor(
    @inject(ProductCouponApplicationRepository)
    private readonly repository: ProductCouponApplicationRepository,
  ) {}

  async execute(
    filter: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication> {
    const application = await this.repository.findOneByFilter({
      couponId: filter.couponId,
      productId: filter.productId,
    });

    if (!application) {
      throw new AppObjectNotFoundError(Errors.APPLICATION_NOT_FOUND);
    }

    return application;
  }
}
