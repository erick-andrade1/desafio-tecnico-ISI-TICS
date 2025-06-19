import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductRepository } from '../provider/ProductRepository';
import { Product } from '../model/Product';
import { FilterProduct } from '../filter';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export class PaginateProductsUseCase
  implements UseCase<FilterPaginate<FilterProduct>, ResultPaginate<Product>>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  execute(
    input: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<Product>> {
    return this.repository.paginate(input);
  }
}
