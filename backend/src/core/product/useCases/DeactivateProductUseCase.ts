import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';
import { Product } from '../model';

@injectable()
export class DeactivateProductUseCase implements UseCase<number, Product> {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.findProductByIdService.execute(id);
    return this.repository.deactivate(product.id!);
  }
}
