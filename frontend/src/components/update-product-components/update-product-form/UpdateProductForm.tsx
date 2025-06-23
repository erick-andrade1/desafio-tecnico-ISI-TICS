import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';

import { productService } from '@/services/product.service';
import { type UpdateProductSchema, updateProductSchema } from '@/schemas';
import { errorToast, PATHS } from '@/utils';
import type { IGetProduct } from '@/types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Form,
  CurrencyInput,
  Label,
  Switch,
} from '@/components';

interface IProps {
  product: IGetProduct;
}

export function UpdateProductForm({ product }: IProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { ...product },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-product'],
    mutationFn: productService.update,
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso');
    },
    onError: (err: AxiosError) => {
      errorToast(err);
    },
  });

  const changeProductActivation = async (value: boolean) => {
    if (!value) {
      await productService
        .delete(product.id)
        .then(() => {
          toast.success('Produto desativado com sucesso');
          queryClient.invalidateQueries({ queryKey: ['get-product-by-id'] });
        })
        .catch((err) => {
          errorToast(err);
        });
    } else {
      await productService
        .restore(product.id)
        .then(() => {
          toast.success('Produto ativado com sucesso');
          queryClient.invalidateQueries({ queryKey: ['get-product-by-id'] });
        })
        .catch((err) => {
          errorToast(err);
        });
    }
  };

  const onSubmit = (data: UpdateProductSchema) => {
    mutate({
      ...data,
      description: data.description ?? '',
      id: product.id,
    });
  };

  return (
    <Card>
      <CardHeader className='border-b-2 border-b-[#f1f5f9] pb-3 flex'>
        <CardTitle> Dados do produto </CardTitle>
        <span className='text-[12px] text-[#3e424d]'>|</span>
        <span className='text-[12px] text-[#3e424d] italic'>
          Os campos abaixo com <span className='text-red-600'>*</span> são
          obrigatórios
        </span>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-6'>
            <div className='flex gap-12'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Nome do produto <span className='text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        placeholder='Insira o nome do produto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-full' />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      cols={6}
                      placeholder='Insira uma descrição para o produto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-12'>
              <FormField
                control={form.control}
                name='price'
                render={() => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Preço <span className='text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <CurrencyInput name='price' control={form.control} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='stock'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Estoque <span className='text-red-600'>*</span>
                    </FormLabel>
                    <FormControl className='w-full'>
                      <Input
                        className='w-full'
                        placeholder='Informe a quantidade no estoque'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='product-active'
                  checked={product.deletedAt ? false : true}
                  onCheckedChange={changeProductActivation}
                />
                <Label htmlFor='product-active'>Produto ativo</Label>
              </div>

              <div className='flex gap-5 justify-end'>
                <Button
                  variant={'outline'}
                  type='button'
                  onClick={() => navigate(PATHS.PRODUCTS.INDEX)}
                >
                  Cancelar
                </Button>
                <Button type='submit'>
                  {' '}
                  {isPending ? (
                    <Loader2 className='h-8 w-8 animate-spin' />
                  ) : (
                    'Salvar alterações'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
