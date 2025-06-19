import { createBrowserRouter } from 'react-router';

import { PATHS } from '@/utils';
import { Layout } from '@/components';
import { Products } from '@/pages';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Products },
      { path: PATHS.PRODUCTS.INDEX, Component: Products },
      { path: PATHS.PRODUCTS.CREATE_PRODUCTS, Component: Products },
      { path: PATHS.PRODUCTS.UPDATE_PRODUCTS, Component: Products },
    ],
  },
]);
