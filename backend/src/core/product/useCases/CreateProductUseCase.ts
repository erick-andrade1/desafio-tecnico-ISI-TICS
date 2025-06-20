import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared';

import { ProductRepository } from '../provider/ProductRepository';
import { Product, ProductProps } from '../model/Product';
import { CreateProductDTO } from '../dto';

@injectable()
export class CreateProductUseCase implements UseCase<ProductProps, Product> {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    const product = new Product({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
    });

    return this.repository.create(product);
  }

  private async validate(dto: CreateProductDTO) {
    return null;
  }
}
