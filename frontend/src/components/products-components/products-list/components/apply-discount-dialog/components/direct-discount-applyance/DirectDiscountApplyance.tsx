import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { errorToast } from '@/utils';
import {
  applyDirectDiscountSchema,
  type ApplyDirectDiscountSchemaSchema,
} from '@/schemas';
import { productService } from '@/services/product.service';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Form,
  DialogClose,
  DialogFooter,
} from '@/components';

interface IProps {
  productId: number;
  handleDialogView: (value: boolean) => void;
}

export function DirectDiscountApplyance({
  productId,
  handleDialogView,
}: IProps) {
  const queryClient = useQueryClient();
  const form = useForm<ApplyDirectDiscountSchemaSchema>({
    resolver: zodResolver(applyDirectDiscountSchema),
    defaultValues: {
      discountValue: 0,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['apply-percent-discount'],
    mutationFn: productService.applyPercentDiscount,
    onSuccess: () => {
      toast.success('Desconto aplicado com sucesso');
      form.reset();
      handleDialogView(false);
      queryClient.invalidateQueries({ queryKey: ['paginate-products'] });
    },
    onError: (err: AxiosError) => {
      errorToast(err);
    },
  });

  const onSubmit = (data: ApplyDirectDiscountSchemaSchema) => {
    mutate({
      discountValue: data.discountValue,
      id: productId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='discountValue'
          render={({ field }) => (
            <FormItem className='w-full space-y-1 pb-4 pt-2'>
              <FormLabel>Percentual de desconto</FormLabel>
              <FormControl className='w-full'>
                <Input
                  className='w-full'
                  type='number'
                  placeholder='Ex: 10%'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {form.formState.errors.discountValue?.message ? (
                <></>
              ) : (
                <span className='text-muted-foreground text-[10px]'>
                  Digite um valor entre 1% e 80%
                </span>
              )}
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' onClick={() => handleDialogView(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='submit'
            variant={form.formState.isValid ? 'default' : 'secondary'}
            disabled={!form.formState.isValid}
          >
            Aplicar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
