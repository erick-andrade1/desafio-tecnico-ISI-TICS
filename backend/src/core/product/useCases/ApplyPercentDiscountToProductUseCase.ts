import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { ApplyPercentDiscountToProductDTO } from '../dto';
import { CouponType } from '../../coupon';
import { Product } from '../model';

@injectable()
export class ApplyPercentDiscountToProductUseCase
  implements UseCase<ApplyPercentDiscountToProductDTO, Product>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(dto: ApplyPercentDiscountToProductDTO): Promise<Product> {
    const product = await this.findProductByIdService.execute(dto.productId);

    const updatedProduct = product.validateDiscountApplyance(
      dto.discountValue,
      CouponType.PERCENT,
    );

    return this.repository.update(updatedProduct);
  }
}
