import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Controller, FindAllProductsUseCase } from '../../core';

import { FindAllProductsSchemaValidator } from '../../external/validators';

@injectable()
export class FindAllProductsController implements Controller {
  constructor(
    @inject(FindAllProductsUseCase)
    readonly useCase: FindAllProductsUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const filter = FindAllProductsSchemaValidator.parse(req.query);
    const result = await this.useCase.execute(filter);
    return res.json(result);
  }
}
