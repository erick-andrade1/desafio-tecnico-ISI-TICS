import { injectable } from 'inversify';
import { Prisma } from '@prisma/client';
import { UnitOfWork } from '../core';

import { prisma } from '../external/db/prisma';

@injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  async executeTransaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return await prisma.$transaction(fn);
  }
}
