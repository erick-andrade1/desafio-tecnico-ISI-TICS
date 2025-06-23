import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import { errorToast } from '@/utils';
import {
  applyCouponDiscountSchema,
  type ApplyCouponDiscountSchemaSchema,
} from '@/schemas';
import { productService, couponService } from '@/services';
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
import { CouponsAvailableList } from './components';

interface IProps {
  productId: number;
  handleDialogView: (value: boolean) => void;
}

export function CouponDiscountApplyance({
  productId,
  handleDialogView,
}: IProps) {
  const queryClient = useQueryClient();
  const form = useForm<ApplyCouponDiscountSchemaSchema>({
    resolver: zodResolver(applyCouponDiscountSchema),
    defaultValues: {
      code: '',
    },
  });

  const { data } = useQuery({
    queryKey: ['paginate-coupons', 1, 6],
    queryFn: () => couponService.paginate(1, 6),
  });

  const { mutate } = useMutation({
    mutationKey: ['apply-coupon-discount'],
    mutationFn: productService.applyCouponDiscount,
    onSuccess: () => {
      toast.success('Cupom aplicado com sucesso');
      form.reset();
      handleDialogView(false);
      queryClient.invalidateQueries({
        queryKey: ['paginate-products', 'paginate-coupons'],
      });
    },
    onError: (err: AxiosError) => {
      errorToast(err);
    },
  });

  const handleCouponSelection = (code: string) => {
    form.setValue('code', code);
  };

  const onSubmit = (data: ApplyCouponDiscountSchemaSchema) => {
    mutate({
      code: data.code,
      id: productId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem className='w-full space-y-1 pb-4 pt-2'>
              <FormLabel>Código do Cupom</FormLabel>
              <FormControl className='w-full'>
                <Input
                  className='w-full'
                  placeholder='Digite o código do cupom'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Suspense fallback={<Loader2 className='h-8 w-8 animate-spin' />}>
          {data && data.data && (
            <CouponsAvailableList
              coupons={data.data}
              handleCouponSelection={handleCouponSelection}
              currentCoupon={form.watch('code')}
            />
          )}
        </Suspense>

        <DialogFooter className='pt-4'>
          <DialogClose asChild>
            <Button variant='outline' onClick={() => handleDialogView(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='submit'
            variant={form.watch('code') ? 'default' : 'secondary'}
            disabled={!form.watch('code')}
          >
            Aplicar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
