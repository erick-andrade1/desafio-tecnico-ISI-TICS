import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { Product } from '../model';

@injectable()
export class RemoveProductDiscountUseCase implements UseCase<number, Product> {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.findProductByIdService.execute(id);
    if (product.hasCouponApplied) {
      return await this.repository.removeProductDiscountWithCoupon(product.id!);
    } else {
      return await this.repository.removeProductDiscount(product.id!);
    }
  }
}
