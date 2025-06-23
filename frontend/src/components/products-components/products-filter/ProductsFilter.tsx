import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  Input,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  CurrencyInput,
} from '@/components';
import { productsFilterSchema, type ProductsFilterSchema } from '@/schemas';
import { PATHS } from '@/utils';

interface IProps {
  handleFilters: (params: ProductsFilterSchema) => void;
}

export function ProductsFilter({ handleFilters }: IProps) {
  const navigate = useNavigate();

  const form = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (params: ProductsFilterSchema) => {
    handleFilters(params);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
          <div className='flex flex-col md:flex-row gap-6 md:items-end w-full md:w-auto'>
            <div className='flex gap-2 w-full'>
              <div className='w-full max-w-[150px]'>
                <FormField
                  control={form.control}
                  name='minPrice'
                  render={() => (
                    <FormItem>
                      <FormLabel>Preço mínimo</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          className='w-full'
                          name='minPrice'
                          control={form.control}
                        />
                      </FormControl>
                      <FormMessage className='mt-1' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full max-w-[150px]'>
                <FormField
                  control={form.control}
                  name='maxPrice'
                  render={() => (
                    <FormItem>
                      <FormLabel>Preço máximo</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          className='w-full'
                          name='maxPrice'
                          control={form.control}
                        />
                      </FormControl>
                      <FormMessage className='mt-1' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='w-full max-w-md'>
              <FormField
                control={form.control}
                name='search'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='w-full'
                        type='text'
                        placeholder='Buscar produto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='mt-1' />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex items-center'>
              <Button type='submit' className='whitespace-nowrap'>
                Filtrar
              </Button>
            </div>
          </div>

          <div className='flex justify-end w-full md:w-auto'>
            <Button
              type='button'
              onClick={() => navigate(PATHS.PRODUCTS.CREATE_PRODUCTS)}
              className='whitespace-nowrap flex items-center gap-1'
            >
              <span className='material-symbols-outlined'>add</span>
              Criar produto
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
