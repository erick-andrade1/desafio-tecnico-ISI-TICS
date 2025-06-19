import { Response, Request } from 'express';
import { Controller, DeleteProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class DeleteProductController implements Controller {
  constructor(
    @inject(DeleteProductUseCase) readonly useCase: DeleteProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(Number(req.params.id));
    return res.json(result);
  }
}
