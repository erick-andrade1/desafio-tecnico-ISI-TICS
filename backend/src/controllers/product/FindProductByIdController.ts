import { Response, Request } from 'express';
import { Controller, FindProductByIdUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class FindProductByIdController implements Controller {
  constructor(
    @inject(FindProductByIdUseCase)
    readonly useCase: FindProductByIdUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(result);
  }
}
