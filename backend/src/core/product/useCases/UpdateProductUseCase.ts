import { injectable, inject } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductRepository } from '../provider/ProductRepository';
import { Product } from '../model/Product';
import { UpdateProductDTO } from '../dto/UpdateProductDTO';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { ValidateProductService } from '../service';

@injectable()
export class UpdateProductUseCase
  implements UseCase<UpdateProductDTO, Product>
{
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
    @inject(ValidateProductService)
    private readonly validationService: ValidateProductService,
  ) {}

  async execute(dto: UpdateProductDTO): Promise<Product> {
    let product = await this.findProductByIdService.execute(dto.id);

    product = product.copyWith({
      ...dto,
    });

    await this.validationService.validate(product);

    await this.repository.update(product);

    return product;
  }
}
