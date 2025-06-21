import { Response, Request } from 'express';
import { Controller, ApplyPercentDiscountToProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';
import { ApplyDiscountToProductSchemaValidator } from '../../external/validators';

@injectable()
export class ApplyPercentDiscountToProductController implements Controller {
  constructor(
    @inject(ApplyPercentDiscountToProductUseCase)
    readonly useCase: ApplyPercentDiscountToProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = ApplyDiscountToProductSchemaValidator.parse(req.body);
    await this.useCase.execute({
      ...data,
      productId: Number(req.params.id),
    });
    return res.status(200);
  }
}
