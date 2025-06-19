import { Controller } from '../core';
import { Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: any, res: Response) => {
    return controller.execute(req, res);
  };
};
