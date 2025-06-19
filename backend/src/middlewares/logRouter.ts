import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default async function logRouter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info(
    `Nova requisição: [${req.method}][${req.url}] PID (${process.pid})`,
  );
  next();
}
