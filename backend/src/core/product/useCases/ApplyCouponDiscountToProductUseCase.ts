import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { ApplyCouponDiscountToProductDTO } from '../dto';
import { CouponType, FindCouponByCodeService } from '../../coupon';
import { Product } from '../model';
import {
  ProductCouponApplication,
  FindAllApplicationsService,
} from '../../productCouponApplication';
import { AppValidationError } from '../../../errors';
import { Errors } from '../../shared';

@injectable()
export class ApplyCouponDiscountToProductUseCase
  implements UseCase<ApplyCouponDiscountToProductDTO, Product>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
    @inject(FindCouponByCodeService)
    private readonly findCouponByCodeService: FindCouponByCodeService,
    @inject(FindAllApplicationsService)
    private readonly findAllApplicationsService: FindAllApplicationsService,
  ) {}

  async execute(dto: ApplyCouponDiscountToProductDTO): Promise<Product> {
    const product = await this.findProductByIdService.execute(dto.id);
    const coupon = await this.findCouponByCodeService.execute(dto.code);
    const couponApplications = await this.findAllApplicationsService.execute({
      couponId: coupon.id,
    });
    const productApplications = await this.findAllApplicationsService.execute({
      productId: product.id,
    });

    const hasActiveApplication = productApplications.some(
      (application) => !application.removed_at,
    );

    if (
      (coupon.one_shot && couponApplications.length > 0) ||
      hasActiveApplication
    ) {
      throw new AppValidationError(Errors.COUPON_USE_NOT_PERMITED);
    }

    const updatedCouponUse = coupon.useCoupon();

    const updatedProduct = product.validateDiscountApplyance(
      coupon.value.getValue(),
      coupon.type.value,
      true,
    );

    const newApplication = new ProductCouponApplication({
      product_id: product.id!,
      coupon_id: coupon.id!,
      applied_at: updatedProduct.discount!.applied_at!,
    });

    const productWithDiscount = await this.repository.addCouponToProduct(
      updatedProduct,
      newApplication,
      updatedCouponUse,
    );

    return productWithDiscount;
  }
}
