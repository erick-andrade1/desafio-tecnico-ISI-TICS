import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { productService } from '@/services/product.service';
import { PageHeader, UpdateProductForm } from '@/components';

export function UpdateProduct() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['get-product-by-id', id],
    queryFn: async () => await productService.getById(id! as unknown as number),
    retry: 1,
    refetchOnMount: 'always',
    enabled: !!id,
  });

  return (
    <div className='flex flex-col gap-12'>
      <PageHeader icon='edit_square' title='Editar Produto' />

      <Suspense
        fallback={
          <div className='flex items-center justify-center mt-16'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        }
      >
        {data && <UpdateProductForm product={data} />}
      </Suspense>
    </div>
  );
}
