import { Container } from 'inversify';

const container = new Container();

import { registerProductModule } from './inject/modules/product.module';
import { registerCouponModule } from './inject/modules/coupon.module';
import { registerProductCouponApplicationsModule } from './inject/modules/productCouponApplications.module';
import { registerProviderModule } from './inject/modules/provider.module';

function registerAllModules(container: Container) {
  registerProductModule(container);
  registerCouponModule(container);
  registerProductCouponApplicationsModule(container);
  registerProviderModule(container);
}

registerAllModules(container);

export { container };
