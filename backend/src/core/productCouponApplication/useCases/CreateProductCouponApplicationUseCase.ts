import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared';

import { ProductCouponApplicationRepository } from '../provider/ProductCouponApplicationRepository';
import {
  ProductCouponApplication,
  ProductCouponApplicationProps,
} from '../model/ProductCouponApplication';
import { CreateProductCouponApplication } from '../dto';

@injectable()
export class CreateProductCouponApplicationUseCase
  implements UseCase<ProductCouponApplicationProps, ProductCouponApplication>
{
  constructor(
    @inject(ProductCouponApplicationRepository)
    private readonly repository: ProductCouponApplicationRepository,
  ) {}

  async execute(
    dto: CreateProductCouponApplication,
  ): Promise<ProductCouponApplication> {
    const application = new ProductCouponApplication({
      product_id: dto.product_id,
      coupon_id: dto.coupon_id,
      applied_at: dto.applied_at,
      removed_at: dto.removed_at ?? null,
    });

    return this.repository.create(application);
  }
}
