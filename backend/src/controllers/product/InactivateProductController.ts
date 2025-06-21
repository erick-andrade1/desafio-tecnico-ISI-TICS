import { Response, Request } from 'express';
import { Controller, InactivateProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class InactivateProductController implements Controller {
  constructor(
    @inject(InactivateProductUseCase)
    readonly useCase: InactivateProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(result);
  }
}
