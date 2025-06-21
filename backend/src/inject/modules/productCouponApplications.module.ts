import { Container } from 'inversify';

import {
  FindApplicationByCouponAndProductService,
  FindAllApplicationsService,
} from '../../core/productCouponApplication/service';

import {
  CreateProductCouponApplicationUseCase,
  FindAllProductCouponApplicationsUseCase,
  FindApplicationByCouponAndProductUseCase,
  UpdateProductCouponApplicationUseCase,
  DeleteProductCouponApplicationUseCase,
} from '../../core/productCouponApplication/useCases';

import { ProductCouponApplicationRepository } from '../../core/productCouponApplication/provider';
import { ProductCouponApplicationPrismaRepository } from '../../repositories';

export function registerProductCouponApplicationsModule(
  container: Container,
): void {
  container.bind(CreateProductCouponApplicationUseCase).toSelf();
  container.bind(FindAllProductCouponApplicationsUseCase).toSelf();
  container.bind(FindApplicationByCouponAndProductUseCase).toSelf();
  container.bind(UpdateProductCouponApplicationUseCase).toSelf();
  container.bind(DeleteProductCouponApplicationUseCase).toSelf();

  container.bind(FindApplicationByCouponAndProductService).toSelf();
  container.bind(FindAllApplicationsService).toSelf();

  container
    .bind(ProductCouponApplicationRepository)
    .to(ProductCouponApplicationPrismaRepository);
}
