import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductRepository } from '../provider/ProductRepository';
import { FilterProduct } from '../filter';
import { FilterPaginate, ResultPaginate } from '../../shared';
import { ListProductDTO } from '../dto';

@injectable()
export class PaginateProductsUseCase
  implements
    UseCase<FilterPaginate<FilterProduct>, ResultPaginate<ListProductDTO>>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async execute(
    input: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<ListProductDTO>> {
    const products: ListProductDTO[] = [];

    const result = await this.repository.paginate(input);

    for (const product of result.data) {
      products.push({
        id: product.id!,
        name: product.name.getName(),
        description: product.description,
        stock: product.stock,
        is_out_of_stock: product.stock === 0,
        price: product.price.getPrice(),
        finalPrice: product.calculateDiscount(),
        discount: product.discount,
        hasCouponApplied: product.hasCouponApplied,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    }

    return new ResultPaginate(
      result.meta.page,
      result.meta.limit,
      result.data.length,
      products,
    );
  }
}
