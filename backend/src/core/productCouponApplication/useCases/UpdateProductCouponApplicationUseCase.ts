import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductCouponApplicationRepository } from '../provider';
import { ProductCouponApplication } from '../model';
import { UpdateProductCouponApplication } from '../dto';
import { FindApplicationByCouponAndProductService } from '../service/FindApplicationByCouponAndProductService';

@injectable()
export class UpdateProductCouponApplicationUseCase
  implements UseCase<UpdateProductCouponApplication, ProductCouponApplication>
{
  constructor(
    @inject(ProductCouponApplicationRepository)
    private readonly repository: ProductCouponApplicationRepository,
    @inject(FindApplicationByCouponAndProductService)
    private readonly findApplicationByCouponAndProductService: FindApplicationByCouponAndProductService,
  ) {}

  async execute(
    dto: UpdateProductCouponApplication,
  ): Promise<ProductCouponApplication> {
    let application =
      await this.findApplicationByCouponAndProductService.execute({
        productId: dto.product_id,
        couponId: dto.coupon_id,
      });

    application = application.copyWith({
      ...dto,
    });

    await this.repository.update(application);

    return application;
  }
}
