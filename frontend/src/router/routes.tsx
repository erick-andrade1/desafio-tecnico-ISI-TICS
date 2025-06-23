import { createBrowserRouter } from 'react-router';

import { PATHS } from '@/utils';
import { Layout, ErrorBoundary } from '@/components';
import { Products, NotFound, CreateProduct, UpdateProduct } from '@/pages';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, Component: Products },
      { path: PATHS.PRODUCTS.INDEX, Component: Products },
      { path: PATHS.PRODUCTS.CREATE_PRODUCTS, Component: CreateProduct },
      { path: PATHS.PRODUCTS.UPDATE_PRODUCTS, Component: UpdateProduct },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
