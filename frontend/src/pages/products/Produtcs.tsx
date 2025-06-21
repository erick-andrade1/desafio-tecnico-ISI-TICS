import { productService } from '@/services/product.service';
import type { IGetProduct, IPaginateResponse } from '@/types';
import { useEffect, useState } from 'react';
import { PageHeader, ProductsFilter, ProductsList } from '@/components';

export function Products() {
  const [data, setData] = useState<IPaginateResponse<IGetProduct>>();

  useEffect(() => {
    productService.paginate().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className='flex flex-col gap-12'>
      <PageHeader icon='shopping_bag' title='Produtos' />

      <ProductsFilter />

      {/* <ProductsList data={data!.data} /> */}
    </div>
  );
}
