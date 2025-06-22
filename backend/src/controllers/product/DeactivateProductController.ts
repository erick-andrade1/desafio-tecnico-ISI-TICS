import { Response, Request } from 'express';
import { Controller, DeactivateProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';
import { createProductList } from '../../factories';

@injectable()
export class DeactivateProductController implements Controller {
  constructor(
    @inject(DeactivateProductUseCase)
    readonly useCase: DeactivateProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(createProductList(result));
  }
}
