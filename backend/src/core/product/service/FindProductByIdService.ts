import { inject, injectable } from 'inversify';
import { ProductRepository } from '../provider';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { Product } from '../model/Product';

@injectable()
export class FindProductByIdService {
  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppObjectNotFoundError(Errors.PRODUCT_NOT_FOUND);
    }

    return product;
  }
}
