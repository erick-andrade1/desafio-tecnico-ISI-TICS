import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared';

import { ValidateProductService } from '../service';
import { ProductRepository } from '../provider/ProductRepository';
import { Product, ProductProps } from '../model/Product';
import { CreateProductDTO } from '../dto';

@injectable()
export class CreateProductUseCase implements UseCase<ProductProps, Product> {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(ValidateProductService)
    private readonly validationService: ValidateProductService,
  ) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    const product = new Product({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
    });

    await this.validationService.validate(product);

    return this.repository.create(product);
  }
}
