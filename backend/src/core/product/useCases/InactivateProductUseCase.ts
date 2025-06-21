import { injectable, inject } from 'inversify';
import { ProductRepository } from '../provider/ProductRepository';
import { UseCase } from '../../shared/UseCase';
import { FindProductByIdService } from '../service/FindProductByIdService';

@injectable()
export class InactivateProductUseCase implements UseCase<number, void> {
  constructor(
    @inject(ProductRepository)
    private readonly repository: ProductRepository,
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(id: number): Promise<void> {
    const product = await this.findProductByIdService.execute(id);
    await this.repository.inactivate(id);
  }
}
