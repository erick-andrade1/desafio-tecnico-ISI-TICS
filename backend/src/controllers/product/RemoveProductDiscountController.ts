import { Response, Request } from 'express';
import { Controller, RemoveProductDiscountUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class RemoveProductDiscountController implements Controller {
  constructor(
    @inject(RemoveProductDiscountUseCase)
    readonly useCase: RemoveProductDiscountUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(result);
  }
}
