import { injectable } from 'inversify';

@injectable()
export abstract class UnitOfWork {
  abstract executeTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T>;
}
