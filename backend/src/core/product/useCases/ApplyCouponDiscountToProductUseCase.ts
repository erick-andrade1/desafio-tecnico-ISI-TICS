import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { ApplyCouponDiscountToProductDTO } from '../dto';
import { CouponType, FindCouponByCodeService } from '../../coupon';
import { Product } from '../model';
import { ProductCouponApplication } from '../../productCouponApplication';

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
  ) {}

  async execute(dto: ApplyCouponDiscountToProductDTO): Promise<Product> {
    const product = await this.findProductByIdService.execute(dto.id);
    const coupon = await this.findCouponByCodeService.execute(dto.code);

    const updatedProduct = product.validateDiscountApplyance(
      coupon.value.getValue(),
      CouponType.PERCENT,
      true,
    );

    const newApplication = new ProductCouponApplication({
      product_id: product.id!,
      coupon_id: coupon.id!,
      applied_at: updatedProduct.discount!.applied_at!,
    });

    const productWithCoupon = await this.repository.addCouponToProduct(
      updatedProduct,
      newApplication,
    );

    return productWithCoupon;
  }
}
