import { inject, injectable } from 'inversify';
import { ProductRepository } from '../provider';
import { AppConflictError } from '../../../errors';
import { Errors } from '../../shared';
import { Product } from '../model/Product';

@injectable()
export class ValidateProductService {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async validate(product: Product) {
    const productAlreadyExists = await this.repository.exists({
      name: product.name.getName(),
      idNotEquals: product.id,
    });

    if (productAlreadyExists) {
      throw new AppConflictError(Errors.PRODUCT_NAME_ALREADY_EXISTS);
    }
  }
}
