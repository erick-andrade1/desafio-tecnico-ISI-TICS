import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import {
  PageHeader,
  ProductsFilter,
  ProductsList,
  ProductsPagination,
} from '@/components';
import type { ProductsFilterSchema } from '@/schemas';

export function Products() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const queryClient = new QueryClient();

  const handleFilters = (params: ProductsFilterSchema) => {
    setFilters(params);

    queryClient.invalidateQueries({
      queryKey: ['paginate-products', 1, 10, params],
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ['paginate-products', page, 10, filters],
    queryFn: () => productService.paginate(page, 10, filters),
  });

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader icon='shopping_bag' title='Produtos' />

      <ProductsFilter handleFilters={handleFilters} />

      {isLoading ? (
        <div className='flex items-center justify-center mt-16'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        data &&
        data.meta &&
        data.data.length > 0 && (
          <div className='bg-white flex flex-col gap-4 pb-2'>
            <ProductsList data={data.data} />
            <ProductsPagination
              currentPage={page}
              setPage={setPage}
              totalPages={data.meta.totalPages}
            />
          </div>
        )
      )}
    </div>
  );
}
