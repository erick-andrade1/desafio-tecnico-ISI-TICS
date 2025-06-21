import { Container } from 'inversify';

import { PrismaUnitOfWork } from '../../provider';
import { UnitOfWork } from '../../core';

export function registerProviderModule(container: Container) {
  container.bind(UnitOfWork).to(PrismaUnitOfWork);
}
