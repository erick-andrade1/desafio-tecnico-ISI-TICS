import { useState } from 'react';

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui';
import { VIEW_TYPES } from '@/utils';

import {
  SelectDiscountTypeButtons,
  DirectDiscountApplyance,
  CouponDiscountApplyance,
} from './components';

interface IProps {
  productId: number;
}

export function ApplyDiscountDialog({ productId }: IProps) {
  const [open, setOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState(VIEW_TYPES.COUPON);

  const handleDialogView = (value: boolean) => {
    setOpen(value);
    setClickedButton(VIEW_TYPES.COUPON);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogView}>
      <DialogTrigger asChild>
        <span
          className='material-symbols-outlined cursor-pointer text-[#64748b]'
          onClick={() => handleDialogView(true)}
        >
          attach_money
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <span className='material-symbols-outlined'>sell</span>
            Aplicar Desconto
          </DialogTitle>
          <DialogDescription>
            Escolha como aplicar o desconto ao produto
          </DialogDescription>
        </DialogHeader>

        <SelectDiscountTypeButtons
          setClickedButton={setClickedButton}
          clickedButton={clickedButton}
        />

        {clickedButton === VIEW_TYPES.COUPON ? (
          <CouponDiscountApplyance
            productId={productId}
            handleDialogView={handleDialogView}
          />
        ) : (
          <DirectDiscountApplyance
            productId={productId}
            handleDialogView={handleDialogView}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
