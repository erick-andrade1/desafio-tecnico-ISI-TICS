import { Response, Request } from 'express';
import { Controller, ApplyCouponDiscountToProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';
import { ApplyCouponDiscountToProductSchemaValidator } from '../../external/validators';
import { createProductList } from '../../factories';

@injectable()
export class ApplyCouponDiscountToProductController implements Controller {
  constructor(
    @inject(ApplyCouponDiscountToProductUseCase)
    readonly useCase: ApplyCouponDiscountToProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = ApplyCouponDiscountToProductSchemaValidator.parse(req.body);
    const result = await this.useCase.execute({
      ...data,
      id: Number(req.params.id),
    });
    return res.json(createProductList(result));
  }
}
