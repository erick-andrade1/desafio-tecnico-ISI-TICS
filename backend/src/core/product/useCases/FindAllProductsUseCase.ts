import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductRepository } from '../provider/ProductRepository';
import { Product } from '../model/Product';
import { FilterProduct } from '../filter';

@injectable()
export class FindAllProductsUseCase
  implements UseCase<FilterProduct | undefined, Product[]>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  execute(filter?: FilterProduct): Promise<Product[]> {
    return this.repository.findAll(filter);
  }
}
