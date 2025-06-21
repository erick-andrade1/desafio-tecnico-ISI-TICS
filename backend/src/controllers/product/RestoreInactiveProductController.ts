import { Response, Request } from 'express';
import { Controller, RestoreInactiveProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class RestoreInactiveProductController implements Controller {
  constructor(
    @inject(RestoreInactiveProductUseCase)
    readonly useCase: RestoreInactiveProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(result);
  }
}
