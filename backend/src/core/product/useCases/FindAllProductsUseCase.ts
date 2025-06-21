import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductRepository } from '../provider/ProductRepository';
import { ListProductDTO } from '../dto';
import { FilterProduct } from '../filter';

@injectable()
export class FindAllProductsUseCase
  implements UseCase<FilterProduct | undefined, ListProductDTO[]>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async execute(filter?: FilterProduct): Promise<ListProductDTO[]> {
    const products: ListProductDTO[] = [];

    const result = await this.repository.findAll(filter);

    for (const product of result) {
      products.push({
        id: product.id!,
        name: product.name.getName(),
        description: product.description,
        stock: product.stock,
        is_out_of_stock: product.stock === 0,
        price: product.price.getPrice(),
        finalPrice: product.calculateDiscount(),
        discount: product.discount,
        hasCouponApplied: product.discount ? true : false,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    }

    return products;
  }
}
