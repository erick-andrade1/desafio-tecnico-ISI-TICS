import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { ApplyPercentDiscountToProductDTO } from '../dto';
import { CouponType } from '../../coupon';

@injectable()
export class ApplyPercentDiscountToProductUseCase
  implements UseCase<ApplyPercentDiscountToProductDTO, void>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(dto: ApplyPercentDiscountToProductDTO): Promise<void> {
    const product = await this.findProductByIdService.execute(dto.productId);

    const updatedProduct = product.validateDiscountApplyance(
      dto.discountValue,
      CouponType.PERCENT,
    );

    await this.repository.update(updatedProduct);
  }
}
