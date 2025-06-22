import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

import { productService } from '@/services/product.service';
import { errorToast } from '@/utils';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components';
import { useState } from 'react';

interface IProps {
  productId: number;
}

export function RemoveProductDialog({ productId }: IProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['delete-product'],
    mutationFn: productService.delete,
    onSuccess: () => {
      toast.success('Produto removido com sucesso');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['paginate-products'] });
    },
    onError: (err: AxiosError) => {
      errorToast(err);
    },
  });

  const deactivateProduct = () => {
    mutate(productId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span
          className='material-symbols-outlined cursor-pointer text-[#64748b]'
          onClick={() => setOpen(true)}
        >
          delete
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Desativar produto</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja desativar o produto?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='button'
            variant={'destructive'}
            onClick={deactivateProduct}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
